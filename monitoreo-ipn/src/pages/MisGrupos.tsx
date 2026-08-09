import { useState, useEffect } from "react"
import { Plus, Loader2, X, CalendarDays, Clock, Save, AlignLeft, CheckCircle2, User } from "lucide-react"
import Swal from "sweetalert2"
import GroupCard from "../components/groups/GroupCard"
import CrearGrupos from "./CrearGrupos"

interface Grupo {
  id: number;
  nombre: string;
  descripcion: string;
  estado: string;
  integrantes?: any[];
  cantidad_integrantes?: number; 
}

function MisGrupos() {
  const roleGuardado = localStorage.getItem("userRole")?.toLowerCase();
  const userId = localStorage.getItem("userId");
  
  const rolUsuario: "admin" | "user" = (roleGuardado === "admin" || roleGuardado === "administrador") 
    ? "admin" 
    : "user";

  const [grupos, setGrupos] = useState<Grupo[]>([])
  const [loading, setLoading] = useState(true)
  
  // Controles de Modales
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)

  const [grupoSeleccionado, setGrupoSeleccionado] = useState<Grupo | null>(null)
  const [grupoAEditar, setGrupoAEditar] = useState<Grupo | null>(null)

  // 🟢 NUEVO: Estado para controlar el formulario de la tarea
  const [taskForm, setTaskForm] = useState({
    titulo: "",
    instrucciones: "",
    fecha: "",
    hora: "",
    asignadoA: "todos" // Por defecto a todo el grupo
  });

  const fetchGrupos = async () => {
    try {
      const response = await fetch(`http://localhost:5002/api/grupos?userId=${userId}`)
      if (!response.ok) throw new Error("Error en la respuesta del servidor")
      const data = await response.json()
      setGrupos(data)
    } catch (error) {
      console.error("Error al obtener grupos:", error)
      Swal.fire({ icon: "error", title: "Error", text: "No se pudieron cargar los grupos desde la base de datos." })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGrupos()
  }, [])

  const handleDelete = async (id: number, nombre: string) => {
    // ... tu código de handleDelete intacto ...
    const result = await Swal.fire({
      title: `¿Eliminar "${nombre}"?`,
      text: "Esta acción no se puede deshacer y se borrará la estructura del equipo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch(`http://localhost:5002/api/grupos/${id}`, { method: "DELETE" })
        if (!response.ok) throw new Error("Error al intentar eliminar el grupo")
        setGrupos((prevGrupos) => prevGrupos.filter((grupo) => grupo.id !== id))
        Swal.fire({ icon: "success", title: "Eliminado", text: "El grupo ha sido eliminado correctamente.", timer: 2000, showConfirmButton: false })
      } catch (error) {
        Swal.fire({ icon: "error", title: "Error", text: "No se pudo eliminar el grupo." })
      }
    }
  }

  const handleEdit = (grupo: Grupo) => {
    setGrupoAEditar(grupo)
    setIsEditModalOpen(true)
  }

  const handleAgregarNuevoGrupo = () => {
    setIsModalOpen(false) 
    setIsEditModalOpen(false) 
    fetchGrupos() 
  }

  const handleOpenTaskModal = (grupo: Grupo) => {
    setGrupoSeleccionado(grupo)
    // 🟢 NUEVO: Limpiamos el formulario cada vez que se abre el modal
    setTaskForm({ titulo: "", instrucciones: "", fecha: "", hora: "", asignadoA: "todos" })
    setIsTaskModalOpen(true)
  }

  // 🟢 NUEVO: Función que enviará la tarea a la base de datos
  const handleGuardarTarea = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validación básica
    if (!taskForm.titulo || !taskForm.fecha) {
      return Swal.fire({ icon: "warning", title: "Campos incompletos", text: "Por favor llena el título y la fecha." });
    }

    try {
      // Aquí preparamos los datos para tu tabla de tareas
      const nuevaTarea = {
        grupo_id: grupoSeleccionado?.id,
        asignado_por: userId,
        // Si es "todos", mandamos null al backend para indicar que es grupal
        asignado_a: taskForm.asignadoA === "todos" ? null : taskForm.asignadoA, 
        titulo: taskForm.titulo,
        instrucciones: taskForm.instrucciones,
        fecha_entrega: `${taskForm.fecha} ${taskForm.hora}`.trim()
      };

      // ⚠️ Cambia esta URL por la ruta real de tu API para guardar tareas
      const response = await fetch("http://localhost:5002/api/tareas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevaTarea)
      });

      if (!response.ok) throw new Error("Error al guardar la tarea");

      Swal.fire({ icon: "success", title: "Tarea asignada", text: "La tarea se guardó correctamente en la base de datos." });
      setIsTaskModalOpen(false);
      
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Error", text: "No se pudo guardar la tarea." });
    }
  }

  return (
    <div className="relative">
      {/* HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Mis grupos de trabajo</h1>
          <p className="text-gray-500 mt-2 text-lg max-w-2xl">
            {rolUsuario === "admin" 
              ? "Administra todos los equipos de la institución. Selecciona uno para ver más detalles."
              : "Estos son los grupos a los que perteneces. Revisa tus actualizaciones y tareas."}
          </p>
        </div>
        {rolUsuario === "admin" && (
          <button onClick={() => setIsModalOpen(true)} className="bg-[#6A0032] hover:bg-[#850040] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition shrink-0 shadow-sm">
            <Plus size={20} /> Crear grupo
          </button>
        )}
      </div>

      {/* CONTENIDO PRINCIPAL */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <Loader2 size={40} className="animate-spin text-[#6A0032] mb-4" />
          <p>Cargando grupos...</p>
        </div>
      ) : grupos.length === 0 ? (
        <div className="bg-white border border-gray-100 rounded-3xl p-10 text-center flex flex-col items-center shadow-sm">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4"><span className="text-3xl">📭</span></div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Aún no tienes grupos</h3>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {grupos.map((grupo) => {
            if (!grupo) return null;
            const numeroMiembros = grupo.cantidad_integrantes || (grupo.integrantes ? grupo.integrantes.length : 0);
            return (
              <GroupCard
                key={grupo.id || Math.random()}
                data={{
                  id: grupo.id,
                  title: grupo.nombre || "Grupo sin nombre",
                  description: grupo.descripcion || "Sin descripción",
                  members: numeroMiembros,
                  status: grupo.estado || "Desconocido"
                }}
                context={rolUsuario}
                onDelete={() => handleDelete(grupo.id, grupo.nombre)}
                onEdit={() => handleEdit(grupo)} 
                onManageCalendar={() => handleOpenTaskModal(grupo)}
              />
            )
          })}
        </div>
      )}

      {/* MODAL 1 y 2 (Crear y Editar) ... se quedan igual ... */}
      {/* ... */}

      {/* ================================================== */}
      {/* MODAL 3: ASIGNAR TAREA ESTILO TEAMS                */}
      {/* ================================================== */}
      {isTaskModalOpen && grupoSeleccionado && rolUsuario === "admin" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative p-8 animate-in fade-in zoom-in-95 duration-200">
            <button onClick={() => setIsTaskModalOpen(false)} className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition text-gray-500">
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Nueva Tarea</h2>
                <p className="text-gray-500 text-sm">Asignando en: <span className="font-semibold text-gray-700">{grupoSeleccionado.nombre}</span></p>
              </div>
            </div>
            
            <form className="flex flex-col gap-5" onSubmit={handleGuardarTarea}>
              
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  <User size={14} /> Asignar a
                </label>
                <select 
                  value={taskForm.asignadoA}
                  onChange={(e) => setTaskForm({ ...taskForm, asignadoA: e.target.value })}
                  className="w-full h-12 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#6A0032] text-sm text-gray-700 bg-white"
                >
                  <option value="todos">Todo el grupo</option>
                  {grupoSeleccionado.integrantes?.map((miembro: any) => (
                    <option key={miembro.id} value={miembro.id}>
                      {miembro.nombre || miembro.email} {/* Ajusta esto según cómo devuelva tu BD los nombres */}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Título de la tarea</label>
                <input 
                  type="text" 
                  value={taskForm.titulo}
                  onChange={(e) => setTaskForm({ ...taskForm, titulo: e.target.value })}
                  className="w-full h-12 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#6A0032] text-sm text-gray-700" 
                  required
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                  <AlignLeft size={14} /> Instrucciones
                </label>
                <textarea 
                  rows={4} 
                  value={taskForm.instrucciones}
                  onChange={(e) => setTaskForm({ ...taskForm, instrucciones: e.target.value })}
                  className="w-full border border-gray-200 rounded-xl p-4 outline-none focus:ring-2 focus:ring-[#6A0032] text-sm text-gray-700 resize-none" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    <CalendarDays size={14} /> Fecha
                  </label>
                  <input 
                    type="date" 
                    value={taskForm.fecha}
                    onChange={(e) => setTaskForm({ ...taskForm, fecha: e.target.value })}
                    className="w-full h-11 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#6A0032] text-sm text-gray-700" 
                    required
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                    <Clock size={14} /> Hora
                  </label>
                  <input 
                    type="time" 
                    value={taskForm.hora}
                    onChange={(e) => setTaskForm({ ...taskForm, hora: e.target.value })}
                    className="w-full h-11 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#6A0032] text-sm text-gray-700" 
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-100">
                <button 
                  type="button" 
                  onClick={() => setIsTaskModalOpen(false)} 
                  className="px-6 h-11 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl transition text-sm"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-6 h-11 bg-[#6A0032] hover:bg-[#850040] text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition text-sm shadow-sm"
                >
                  <Save size={16} /> Asignar Tarea
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MisGrupos