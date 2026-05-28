import { useState, useRef, useEffect } from "react"
import {
  Users,
  Shield,
  MessageCircle,
  FileText,
  MoreVertical,
  Pencil,
  Trash2,
  CalendarDays
} from "lucide-react"

type Props = {
  title: string
  description: string
  members: number
  status: string
  // Agregamos las funciones como props opcionales
  onEdit?: () => void
  onDelete?: () => void
}

function GroupCard({
  title,
  description,
  members,
  status,
  onEdit,
  onDelete
}: Props) {
  const [showMenu, setShowMenu] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Efecto para cerrar el menú si haces clic afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition duration-300">

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center shrink-0">
            <Users size={38} className="text-[#6A0032]" />
          </div>

          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-gray-800 line-clamp-1">
                {title}
              </h2>
              <span className={`text-sm px-3 py-1 rounded-full font-medium shrink-0 ${
                status.toLowerCase() === 'activo' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {status}
              </span>
            </div>
            <p className="text-gray-500 mt-2 text-base line-clamp-2">
              {description}
            </p>
          </div>
        </div>

        {/* MENÚ DE OPCIONES (CRUD) */}
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 hover:bg-gray-100 rounded-full transition text-gray-400 hover:text-gray-600"
          >
            <MoreVertical size={24} />
          </button>

          {/* DROPDOWN */}
          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10 animate-in fade-in zoom-in-95 duration-100">
              <button 
                onClick={() => {
                  setShowMenu(false)
                  if(onEdit) onEdit()
                }}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 flex items-center gap-3 text-gray-700 transition"
              >
                <Pencil size={16} className="text-gray-400" /> 
                Editar grupo
              </button>
              
              <button 
                onClick={() => {
                  setShowMenu(false)
                  if(onDelete) onDelete()
                }}
                className="w-full px-4 py-2.5 text-left text-sm hover:bg-red-50 text-red-600 flex items-center gap-3 transition"
              >
                <Trash2 size={16} /> 
                Eliminar grupo
              </button>
            </div>
          )}
        </div>

      </div>

      {/* LINE */}
      <div className="h-[1px] bg-gray-200 my-6" />

      {/* INFO */}
      <div className="grid grid-cols-2 gap-6">
        <div className="flex items-center gap-3">
          <Users size={20} className="text-gray-500" />
          <div>
            <p className="font-semibold text-gray-800">{members}</p>
            <p className="text-gray-500 text-sm">Miembros</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Shield size={20} className="text-gray-500" />
          <div>
            <p className="font-semibold text-gray-800">Miembro</p>
            <p className="text-gray-500 text-sm">Mi rol</p>
          </div>
        </div>
      </div>

      {/* LINE */}
      <div className="h-[1px] bg-gray-200 my-6" />

      {/* ACTIONS */}
      <div className="grid grid-cols-3 divide-x divide-gray-200">
        <button className="flex flex-col items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-xl transition">
          <MessageCircle size={24} className="text-gray-600" />
          <div className="text-center">
            <p className="font-semibold text-sm text-gray-800">Abrir chat</p>
            <p className="text-xs text-gray-500">del grupo</p>
          </div>
        </button>

        <button className="flex flex-col items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-xl transition">
          <FileText size={24} className="text-gray-600" />
          <div className="text-center">
            <p className="font-semibold text-sm text-gray-800">Ver</p>
            <p className="text-xs text-gray-500">actualizaciones</p>
          </div>
        </button>

        <button className="flex flex-col items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-xl transition">
          <CalendarDays size={24} className="text-gray-600" />
          <div className="text-center">
            <p className="font-semibold text-sm text-gray-800">Ver calendario</p>
            <p className="text-xs text-gray-500">de actividades</p>
          </div>
        </button>
      </div>

    </div>
  )
}

export default GroupCard