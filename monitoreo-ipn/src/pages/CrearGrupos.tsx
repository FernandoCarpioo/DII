import React, { useState } from "react"
import { 
  Crown, 
  User as UserIcon, 
  Save, 
  GripVertical, 
  Search, 
  Filter, 
  Briefcase,
  X 
} from "lucide-react"
import Swal from "sweetalert2"

const mockEmpleadosBase = [
  { id: "u2", name: "María C.", depto: "Contaduría", puesto: "Analista Financiero" },
  { id: "u3", name: "Luis H.", depto: "Sistemas", puesto: "Administrador de Red" },
  { id: "u4", name: "Juan P.", depto: "Sistemas", puesto: "Desarrollador" },
  { id: "u5", name: "Carlos R.", depto: "Recursos Humanos", puesto: "Coordinador" },
  { id: "u6", name: "Ana G.", depto: "Contaduría", puesto: "Auditor" },
  { id: "u7", name: "Fernanda M.", depto: "Dirección", puesto: "Asistente Ejecutivo" },
  { id: "u8", name: "Roberto T.", depto: "Sistemas", puesto: "Soporte Técnico" }
]

interface CrearGruposProps {
  onGrupoCreado: (grupo: { title: string; description: string; members: number; status: string }) => void;
  onCancelar: () => void;
}

function CrearGrupos({ onGrupoCreado, onCancelar }: CrearGruposProps) {
  const [nombreGrupo, setNombreGrupo] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [tipo, setTipo] = useState("permanente")
  const [integrantes, setIntegrantes] = useState<string[]>([])

  const [busquedaNombre, setBusquedaNombre] = useState("")
  const [filtroDepto, setFiltroDepto] = useState("Todos")
  const [filtroPuesto, setFiltroPuesto] = useState("Todos")

  const departamentosUnicos = ["Todos", ...Array.from(new Set(mockEmpleadosBase.map(e => e.depto)))]
  const puestosUnicos = ["Todos", ...Array.from(new Set(mockEmpleadosBase.map(e => e.puesto)))]

  const empleadosFiltrados = mockEmpleadosBase.filter(empleado => {
    if (integrantes.includes(empleado.id)) return false;
    const coincideNombre = empleado.name.toLowerCase().includes(busquedaNombre.toLowerCase())
    const coincideDepto = filtroDepto === "Todos" || empleado.depto === filtroDepto
    const coincidePuesto = filtroPuesto === "Todos" || empleado.puesto === filtroPuesto
    return coincideNombre && coincideDepto && coincidePuesto
  })

  const agregarMiembroALista = (userId: string) => {
    setIntegrantes(prev => {
      if (prev.includes(userId)) return prev;
      return [...prev, userId];
    });
  }

  const removerMiembro = (userId: string) => {
    setIntegrantes(prev => prev.filter(id => id !== userId));
  }

  const handleDragStart = (e: React.DragEvent, userId: string) => {
    e.dataTransfer.setData("text/plain", userId)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const userId = e.dataTransfer.getData("text/plain")
    if (userId) agregarMiembroALista(userId);
  }

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nombreGrupo.trim()) {
      Swal.fire({ icon: "error", title: "Faltan campos", text: "El nombre del equipo es obligatorio.", confirmButtonColor: "#6A0032" })
      return
    }

    onGrupoCreado({
      title: nombreGrupo,
      description: descripcion || "Sin descripción corta.",
      members: integrantes.length + 1,
      status: tipo === "permanente" ? "Activo" : "Temporal"
    })
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start w-full">
      
      {/* FORMULARIO (5/12 col) */}
      <form onSubmit={handleSubmitForm} className="lg:col-span-5 bg-white p-6 rounded-2xl border border-gray-100 flex flex-col gap-4 shadow-xs">
        <h3 className="text-base font-bold text-gray-800 border-b border-gray-50 pb-2">Propiedades del Grupo</h3>

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
            <Save size={16} /> Guardar Equipo
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

      {/* JERÁRQUICA + BUSCADOR (7/12 col) */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs">
          <h3 className="text-base font-bold text-gray-800 mb-3">Estructura del Equipo</h3>
          
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-gray-50/50 min-h-[160px] flex flex-col gap-4 items-center justify-center relative"
          >
            <div className="bg-[#6A0032] text-white px-5 py-2 rounded-lg flex items-center gap-2 font-semibold text-xs">
              <Crown size={14} className="text-yellow-400" /> Héctor (Tú)
            </div>

            <div className="flex flex-wrap gap-2.5 justify-center w-full">
              {integrantes.map((id) => {
                const emp = mockEmpleadosBase.find(e => e.id === id)
                return (
                  <div key={id} className="bg-white border border-gray-200 text-gray-700 px-3 py-1.5 rounded-xl flex items-center gap-2 text-xs font-semibold">
                    <UserIcon size={12} className="text-gray-400" />
                    <div className="text-left">
                      <p className="text-gray-800 leading-tight">{emp?.name}</p>
                      <p className="text-[10px] text-gray-400">{emp?.depto}</p>
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

export default CrearGrupos;