import React, { useState, useEffect } from "react"
import { 
  Crown, 
  User as UserIcon, 
  Save, 
  GripVertical, 
  Search, 
  Filter, 
  Briefcase,
  X,
  RefreshCw 
} from "lucide-react"
import Swal from "sweetalert2"

interface CrearGruposProps {
  grupoInicial?: any; // 
  onGrupoCreado: (grupo: any) => void;
  onCancelar: () => void;
}

function CrearGrupos({ grupoInicial, onGrupoCreado, onCancelar }: CrearGruposProps) {
  // 1. ESTADOS
  const [nombreGrupo, setNombreGrupo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tipo, setTipo] = useState("permanente")
  // Forzamos a que el estado guarde puramente números
  const [integrantes, setIntegrantes] = useState<number[]>([])
  
  const [empleados, setEmpleados] = useState<any[]>([])
  const [loadingUsuarios, setLoadingUsuarios] = useState(true)

  const [busquedaNombre, setBusquedaNombre] = useState("")
  const [filtroDepto, setFiltroDepto] = useState("Todos")
  const [filtroPuesto, setFiltroPuesto] = useState("Todos")

 // IDs ocultos por defecto
  const MI_ID = Number(localStorage.getItem("userId"));
  const SUPERADMIN_HECTOR = 1;
  const SUPERADMIN_IT = 5;

 // 2. EFECTO PARA RELLENAR DATOS SI ESTAMOS EDITANDO
  useEffect(() => {
    if (grupoInicial) {
      setNombreGrupo(grupoInicial.nombre || "")
      setDescripcion(grupoInicial.descripcion || "")
      setTipo(grupoInicial.estado === "Temporal" ? "temporal" : "permanente")
      
      // Limpiamos la data que manda Postgres para evitar errores y fantasmas
      let integrantesBase = grupoInicial.integrantes || [];
      if (typeof integrantesBase === "string") {
        // Si Postgres lo mandó como texto "{1,2}", lo limpiamos
        integrantesBase = integrantesBase.replace(/[{}]/g, "").split(",").filter(Boolean);
      }

      // En el useEffect de edición:
      const integrantesVisibles = integrantesBase
        .map((id: any) => Number(id))
        .filter((id: number) => !isNaN(id) && id !== 0 && id !== MI_ID && id !== SUPERADMIN_HECTOR && id !== SUPERADMIN_IT);
        
      setIntegrantes(integrantesVisibles) 
    }
  }, [grupoInicial, MI_ID])

  const fetchUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/usuarios")
      const data = await response.json()
      setEmpleados(data)
    } catch (error) {
      console.error(error)
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudieron cargar los usuarios"
      })
    } finally {
      setLoadingUsuarios(false)
    }
  }

  useEffect(() => {
    fetchUsuarios()
  }, [])

  const departamentosUnicos = ["Todos", ...Array.from(new Set(empleados.map(e => e.depto)))]
  const puestosUnicos = ["Todos", ...Array.from(new Set(empleados.map(e => e.puesto)))]

  // En el filtro de empleados (para que no salgan abajo):
  const empleadosFiltrados = empleados.filter(empleado => {
    const empId = Number(empleado.id);
    if (integrantes.includes(empId) || empId === MI_ID || empId === SUPERADMIN_HECTOR || empId === SUPERADMIN_IT) return false;
    // ... lo demás sigue igual
    const nombreSeguro = empleado.name || ""; 
    const coincideNombre = nombreSeguro.toLowerCase().includes(busquedaNombre.toLowerCase());
    
    const coincideDepto = filtroDepto === "Todos" || empleado.depto === filtroDepto;
    const coincidePuesto = filtroPuesto === "Todos" || empleado.puesto === filtroPuesto;
    
    return coincideNombre && coincideDepto && coincidePuesto;
  })

  // Convertimos todo a Número al agregar
  const agregarMiembroALista = (userId: string | number) => {
    const idNum = Number(userId);
    setIntegrantes(prev => {
      if (prev.includes(idNum)) return prev;
      return [...prev, idNum];
    });
  }

  const removerMiembro = (userId: string | number) => {
    const idNum = Number(userId);
    setIntegrantes(prev => prev.filter(id => id !== idNum));
  }

  const handleDragStart = (e: React.DragEvent, userId: string) => {
    e.dataTransfer.setData("text/plain", userId)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const userId = e.dataTransfer.getData("text/plain")
    if (userId) agregarMiembroALista(userId);
  }

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!nombreGrupo.trim()) {
      Swal.fire({
        icon: "error",
        title: "Faltan campos",
        text: "El nombre del grupo es obligatorio"
      })
      return
    }

    try {
      const isEditing = !!grupoInicial;
      const url = isEditing 
        ? `http://localhost:3000/api/grupos/${grupoInicial.id}` 
        : "http://localhost:3000/api/grupos";
      const method = isEditing ? "PUT" : "POST";

        const integrantesParaEnviar = Array.from(new Set([
          ...integrantes, 
          MI_ID, 
          SUPERADMIN_HECTOR, 
          SUPERADMIN_IT
        ]));

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          nombre: nombreGrupo,
          descripcion,
          estado: tipo === "permanente" ? "Activo" : "Temporal",
          integrantes: integrantesParaEnviar // Mandamos la lista combinada
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      await Swal.fire({
        icon: "success",
        title: isEditing ? "Grupo actualizado" : "Grupo creado",
        timer: 1500,
        showConfirmButton: false
      })

      onGrupoCreado({
        title: nombreGrupo,
        description: descripcion,
        members: integrantesParaEnviar.length,
        status: tipo === "permanente" ? "Activo" : "Temporal"
      })

    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message
      })
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
      
      {/* FORMULARIO (5/12 col) */}
      <form onSubmit={handleSubmitForm} className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4 shadow-xs">
        <h3 className="text-base font-bold text-gray-800 border-b border-gray-50 pb-2">
          {grupoInicial ? "Editar Propiedades" : "Propiedades del Grupo"}
        </h3>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nombre del Equipo</label>
          <input
            type="text"
            placeholder="Ej. Analistas de Riesgo"
            className="w-full h-11 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#6A0032] text-sm text-gray-700 bg-white"
            value={nombreGrupo}
            onChange={(e) => setNombreGrupo(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Descripción</label>
          <textarea
            placeholder="Escribe una breve descripción del propósito del grupo..."
            rows={4}
            className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#6A0032] text-sm text-gray-700 resize-none bg-white"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Tipo de Grupo</label>
          <select
            className="w-full h-11 border border-gray-200 rounded-xl px-4 bg-white outline-none text-sm text-gray-700 focus:ring-2 focus:ring-[#6A0032]"
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
          >
            <option value="permanente">Fijo / Permanente</option>
            <option value="temporal">Temporal</option>
          </select>
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="submit"
            className="flex-1 h-11 bg-[#6A0032] hover:bg-[#850040] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition text-sm"
          >
            {grupoInicial ? (
              <><RefreshCw size={16} /> Actualizar</>
            ) : (
              <><Save size={16} /> Guardar Equipo</>
            )}
          </button>
          <button
            type="button"
            onClick={onCancelar} 
            className="px-4 h-11 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl transition text-sm"
          >
            Cancelar
          </button>
        </div>
      </form>

      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <h3 className="text-base font-bold text-gray-800 mb-3">Estructura del Equipo</h3>
          
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50/50 min-h-[160px] flex flex-col gap-4 items-center justify-center relative"
          >
            {/* Etiqueta fija del creador para dar a entender que siempre pertenece */}
            <div className="bg-[#6A0032] text-white px-5 py-2 rounded-lg flex items-center gap-2 font-semibold text-xs">
              <Crown size={14} className="text-yellow-400" /> Miembro Fijo (Tú)
            </div>

          <div className="flex flex-wrap gap-2.5 justify-center w-full">
              {integrantes.map((id) => {
                // Comparamos como texto para que sea 100% seguro
                const emp = empleados.find(e => String(e.id) === String(id)) 
                
                // Buscamos 'name' o 'nombre' por si tu BD se llama diferente
                const nombreEmpleado = emp?.name || emp?.nombre || "Cargando...";
                const deptoEmpleado = emp?.depto || emp?.departamento || "...";

                return (
                  <div key={id} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold">
                    <UserIcon size={12} className="text-gray-400" />
                    <div className="text-left">
                      <p className="text-gray-800 leading-tight">{nombreEmpleado}</p>
                      <p className="text-[10px] text-gray-400">{deptoEmpleado}</p>
                    </div>
                    <button type="button" onClick={() => removerMiembro(id)} className="text-gray-400 hover:text-red-500 p-0.5 ml-0.5">
                      <X size={12} />
                    </button>
                  </div>
                )
              })}
            </div>

            {integrantes.length === 0 && (
              <p className="text-center text-xs text-gray-400">Arrastra usuarios o haz clic en ellos abajo</p>
            )}
          </div>
        </div>

        {/* DIRECTORIO */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs flex flex-col gap-4">
          <h3 className="text-base font-bold text-gray-800">Directorio de Personal</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase">Nombre</label>
              <div className="relative">
                <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full h-8 pl-8 pr-2 bg-white border border-gray-200 rounded-lg outline-none text-xs text-gray-700 focus:border-[#6A0032]"
                  value={busquedaNombre}
                  onChange={(e) => setBusquedaNombre(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase">Departamento</label>
              <div className="relative">
                <Filter size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full h-8 pl-8 pr-1 bg-white border border-gray-200 rounded-lg outline-none text-xs text-gray-700 focus:border-[#6A0032]"
                  value={filtroDepto}
                  onChange={(e) => setFiltroDepto(e.target.value)}
                >
                  {departamentosUnicos.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-gray-400 uppercase">Ocupación</label>
              <div className="relative">
                <Briefcase size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <select
                  className="w-full h-8 pl-8 pr-1 bg-white border border-gray-200 rounded-lg outline-none text-xs text-gray-700 focus:border-[#6A0032]"
                  value={filtroPuesto}
                  onChange={(e) => setFiltroPuesto(e.target.value)}
                >
                  {puestosUnicos.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 max-h-[140px] overflow-y-auto p-1 custom-scrollbar">
            {empleadosFiltrados.map((empleado) => (
              <div
                key={empleado.id}
                draggable
                onDragStart={(e) => handleDragStart(e, empleado.id)}
                onClick={() => agregarMiembroALista(empleado.id)}
                className="bg-white border border-gray-200 hover:border-[#6A0032] px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer select-none group shadow-2xs hover:shadow-xs transition"
              >
                <GripVertical size={12} className="text-gray-300 group-hover:text-[#6A0032] transition" />
                <div className="text-left">
                  <p className="text-gray-800">{empleado.name}</p>
                  <p className="text-[9px] text-gray-400 font-normal">{empleado.puesto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default CrearGrupos