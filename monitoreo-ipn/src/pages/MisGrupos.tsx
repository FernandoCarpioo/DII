import { useState, useEffect } from "react"
import { Plus, X, Users, Loader2 } from "lucide-react"
import Swal from "sweetalert2"
import GroupCard, { type GrupoData } from "../components/groups/GroupCard"
import CrearGrupos from "./CrearGrupos"
import AsignarTareaModal from "../components/groups/AsignarTareasModal"

function MisGrupos() {
  const [groups, setGroups] = useState<GrupoData[]>([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [selectedGroupTitle, setSelectedGroupTitle] = useState("")

  const fetchGruposDesdeBD = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("http://localhost:3000/api/admin/grupos", {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` }
      })
      if (!response.ok) throw new Error()
      const data = await response.json()
      setGroups(data || [])
    } catch (error) {
      console.error("Error al sincronizar el catálogo de grupos:", error)
      // Datos mock de respaldo por si el servidor local de desarrollo está apagado:
      setGroups([
        { title: "Analistas", description: "Análisis y revisión de información", members: 6, status: "Activo" },
        { title: "Departamento de Contaduría", description: "Contabilidad y finanzas", members: 8, status: "Activo" },
        { title: "Proyecto 1", description: "Desarrollo e implementación", members: 5, status: "Temporal" }
      ])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchGruposDesdeBD()
  }, [])

  const handleAgregarNuevoGrupo = (nuevoGrupo: GrupoData) => {
    setGroups([nuevoGrupo, ...groups])
    setIsModalOpen(false)
  }

  const handleOpenAsignarTarea = (groupTitle: string) => {
    setSelectedGroupTitle(groupTitle)
    setIsTaskModalOpen(true)
  }

  const handleEditGroup = (title: string) => {
    Swal.fire("Editar grupo", `Solicitando cambios para el grupo: ${title}`, "info")
  }

  const handleDeleteGroup = (title: string) => {
    Swal.fire({
      title: `¿Eliminar ${title}?`,
      text: "Esta acción inhabilitará el acceso de los miembros al entorno.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6A0032",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        setGroups(groups.filter(g => g.title !== title))
        Swal.fire("Eliminado", "El grupo ha sido removido.", "success")
      }
    })
  }

  return (
    <div className="relative w-full animate-in fade-in duration-200">
      <div>
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Mis grupos de trabajo</h1>
            <p className="text-gray-500 mt-2 text-lg max-w-2xl">
              Gestiona los equipos operativos de la DII y asigna tareas centralizadas.
            </p>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#6A0032] hover:bg-[#850040] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition shrink-0 shadow-sm active:scale-95"
          >
            <Plus size={20} />
            Crear grupo
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 gap-3">
            <Loader2 className="animate-spin text-[#6A0032]" size={32} />
            <p className="font-medium">Sincronizando entornos de la BD...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {groups.map((group) => (
              <GroupCard
                key={group.title}
                data={group}
                context="admin"
                onEdit={() => handleEditGroup(group.title)}
                onDelete={() => handleDeleteGroup(group.title)}
                onManageCalendar={() => handleOpenAsignarTarea(group.title)}
              />
            ))}
          </div>
        )}
      </div>

      {/* MODAL CREAR GRUPO */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#f5f6fa] rounded-3xl w-full max-w-6xl shadow-2xl overflow-hidden border border-gray-100 my-8">
            <div className="bg-[#6A0032] text-white p-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-pink-200" />
                <h2 className="text-2xl font-bold">Crear Nuevo Equipo</h2>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition">
                <X size={22} />
              </button>
            </div>
            <div className="p-6 max-h-[calc(100vh-220px)] overflow-y-auto">
              <CrearGrupos onGrupoCreado={handleAgregarNuevoGrupo} onCancelar={() => setIsModalOpen(false)} />
            </div>
          </div>
        </div>
      )}

      {/* MODAL ASIGNAR TAREA */}
      <AsignarTareaModal 
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        defaultGroup={selectedGroupTitle}
      />
    </div>
  )
}

export default MisGrupos