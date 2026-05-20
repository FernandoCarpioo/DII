import { Link, useLocation } from "react-router-dom"

import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Folder,
  Printer,
  FileBarChart,
  Monitor,
  Settings,
  ScrollText,
  CircleHelp,
  LogOut,
  House,
  ChevronLeft,
  ChevronRight
} from "lucide-react"

import logoIPN from "../../../assets/logo-ipn.png"

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

function SidebarMaster({ isCollapsed, setIsCollapsed }: SidebarProps) {
  const location = useLocation()

  const menuItems = [
    {
      name: "Inicio",
      path: "/",
      icon: House
    },
    {
      name: "Grupos de trabajo",
      path: "/MisGrupos",
      icon: Users
    },
    {
      name: "Bloqueos y permisos",
      path: "/bloqueos",
      icon: ShieldAlert
    },
    {
      name: "Archivos enviados",
      path: "/archivos",
      icon: Folder
    },
    {
      name: "Impresiones",
      path: "/impresiones",
      icon: Printer
    },
    
    {
      name: "Equipos",
      path: "/equipos",
      icon: Monitor
    },
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
  ]

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#6A0032] text-white transition-all duration-300 z-50 ${
        isCollapsed ? "w-[90px]" : "w-[300px]"
      }`}
    >
      
      {/* BOTÓN PARA COLAPSAR/EXPANDIR (Ahora tiene w-8 h-8 para asegurar que sea un círculo perfecto) */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-10 bg-[#6A0032] rounded-full border border-white/20 hover:bg-[#850040] transition flex items-center justify-center z-50 w-8 h-8"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* CONTENEDOR INTERNO CON SCROLL */}
      {/* Aquí es donde ocurre la magia: este div ocupa el 100% del alto (h-full) y hace el scroll, no el aside */}
      <div className="flex flex-col justify-between h-full p-5 overflow-y-auto custom-scrollbar">
        
        {/* Contenedor Superior (Logo + Menú Principal) */}
        <div className="flex flex-col">
          {/* LOGO E INFORMACIÓN INSTITUCIONAL */}
          <div className="mb-10 flex flex-col items-center overflow-hidden shrink-0">
            
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
                  Sistema de Gestión
                </p>
              </div>
            )}
          </div>

          {/* MENÚ PRINCIPAL */}
          <nav className="flex flex-col gap-2 shrink-0">
            {menuItems.map((item) => {
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
          </nav>
        </div>

        {/* MENÚ INFERIOR (Configuración, etc.) */}
        <div className="mt-8 shrink-0"> 
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

          {/* BOTÓN DE CERRAR SESIÓN */}
          <button 
            title={isCollapsed ? "Cerrar sesión" : ""}
            className={`flex items-center px-4 py-3 rounded-xl hover:bg-[#850040] transition w-full ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <LogOut size={20} className="min-w-[20px]" />

            {!isCollapsed && (
              <span className="text-sm whitespace-nowrap">
                Cerrar sesión
              </span>
            )}
          </button>
        </div>

      </div>

    </aside>
  )
}

export default SidebarMaster