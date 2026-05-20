import {
  House,
  Users,
  MessageCircle,
  Settings,
  CircleHelp,
  LogOut,
  NotebookTabs,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import { Link, useLocation } from "react-router-dom"
import logoIPN from "../../../assets/logo-ipn.png"

// Definimos las props para controlar el estado desde el MainLayout
interface SidebarUsuarioProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

function SidebarUsuario({ isCollapsed, setIsCollapsed }: SidebarUsuarioProps) {
  const location = useLocation()

  const menuItems = [
    {
      name: "Inicio",
      path: "/user",
      icon: House
    },
    {
      name: "Mis Grupos",
      path: "/MisGrupos",
      icon: Users
    },
    {
      name: "Mensajes",
      path: "/mensajes",
      icon: MessageCircle
    },
    {
      name: "Pendientes",
      path: "/Pendientes",
      icon: NotebookTabs
    }
  ]

  const bottomItems = [
    {
      name: "Configuración",
      path: "/configuracion",
      icon: Settings
    },
    {
      name: "Ayuda",
      path: "/ayuda",
      icon: CircleHelp
    },
    {
      name: "Cerrar sesión",
      path: "/login",
      icon: LogOut
    }
  ]

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#6A0032] text-white flex flex-col justify-between p-5 transition-all duration-300 z-50 ${
        isCollapsed ? "w-[90px]" : "w-[300px]"
      }`}
    >
      {/* BOTÓN PARA COLAPSAR/EXPANDIR */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-[#6A0032] p-1.5 rounded-full border border-white/20 hover:bg-[#850040] transition flex items-center justify-center z-50"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* TOP */}
      <div>

        {/* LOGO E INFORMACIÓN INSTITUCIONAL */}
        <div className="mb-10 flex flex-col items-center overflow-hidden">
          
          {/* AQUÍ ESTÁ EL CAMBIO: Usamos la variable logoIPN */}
          <img 
            src={logoIPN} 
            alt="Logo IPN" 
            className={`transition-all duration-300 object-contain ${
              isCollapsed ? "w-10 h-10 mb-0" : "w-16 h-16 mb-4"
            }`}
          />

          {!isCollapsed && (
            <div className="text-center transition-opacity duration-300">
              <h1 className="text-xl font-bold whitespace-nowrap">
                MONITOREO IPN
              </h1>
              <p className="text-[11px] text-gray-300 mt-1 whitespace-nowrap tracking-wider">
                SISTEMA DE GESTIÓN
              </p>
            </div>
          )}

        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2">

          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.name : ""} // Muestra el nombre como tooltip si está colapsado
                className={`flex items-center px-4 py-3 rounded-xl transition ${
                  isCollapsed ? "justify-center" : "gap-3"
                } ${
                  location.pathname === item.path
                    ? "bg-[#850040]"
                    : "hover:bg-[#850040]"
                }`}
              >
                <Icon size={20} className="min-w-[20px]" />

                {!isCollapsed && (
                  <span className="text-sm whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            )
          })}

        </nav>

      </div>

      {/* BOTTOM */}
      <div>

        <div className="flex flex-col gap-2 mb-6">

          {bottomItems.map((item) => {
            const Icon = item.icon

            return (
              <Link
                key={item.path}
                to={item.path}
                title={isCollapsed ? item.name : ""}
                className={`flex items-center px-4 py-3 rounded-xl transition ${
                  isCollapsed ? "justify-center" : "gap-3"
                } ${
                  location.pathname === item.path
                    ? "bg-[#850040]"
                    : "hover:bg-[#850040]"
                }`}
              >
                <Icon size={20} className="min-w-[20px]" />

                {!isCollapsed && (
                  <span className="text-sm whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            )
          })}

        </div>

      </div>

    </aside>
  )
}

export default SidebarUsuario