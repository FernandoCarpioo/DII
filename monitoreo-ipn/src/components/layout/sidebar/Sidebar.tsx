import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Users,
  Folder,
  Printer,
  Monitor,
  Settings,
  CircleHelp,
  LogOut,
  House,
  ChevronLeft,
  ChevronRight, 
  Tickets,
  MessageCircle,
  NotebookTabs
} from "lucide-react"

import logoIPN from "../../../assets/logo-ipn.png"

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  role?: "admin" | "user" | string; // Añadimos el rol proveniente de la BD
}

function Sidebar({ isCollapsed, setIsCollapsed, role = "user" }: SidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()

  // Catálogo maestro de rutas mapeadas por rol real de la BD
  const adminMenuItems = [
    { name: "Inicio", path: "/admin", icon: House },
    { name: "Grupos de trabajo", path: "/admin/grupos", icon: Users },
    { name: "Archivos enviados", path: "/admin/archivos-enviados", icon: Folder },
    { name: "Impresiones", path: "/admin/impresiones", icon: Printer },
    { name: "Equipos", path: "/admin/equipos", icon: Monitor },
    { name: "Tickets", path: "/admin/tickets", icon: Tickets },
    { name: "Mensajes", path: "/admin/mensajes", icon: MessageCircle }
  ]

  const userMenuItems = [
    { name: "Inicio", path: "/user", icon: House },
    { name: "Mis Grupos", path: "/user/grupos", icon: Users },
    { name: "Mensajes", path: "/user/mensajes", icon: MessageCircle },
    { name: "Pendientes", path: "/user/pendientes", icon: NotebookTabs }
  ]

  // Selecciona el menú basándose en el rol del usuario logueado
  const menuItems = role === "admin" || role === "administrador" ? adminMenuItems : userMenuItems

  // Las opciones de configuración apuntan a sus respectivos dashboards de la BD
  const bottomItems = [
    {
      name: "Configuración",
      path: role === "admin" || role === "administrador" ? "/admin/configuracion" : "/user/configuracion",
      icon: Settings
    },
    {
      name: "Ayuda",
      path: role === "admin" || role === "administrador" ? "/admin/ayuda" : "/user/ayuda",
      icon: CircleHelp
    },
  ]

  const handleLogout = () => {
    // Limpieza de credenciales de la BD al cerrar sesión
    localStorage.clear(); 
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen bg-[#6A0032] text-white transition-all duration-300 z-50 ${
        isCollapsed ? "w-[90px]" : "w-[300px]"
      }`}
    >
      {/* BOTÓN PARA COLAPSAR/EXPANDIR */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-10 bg-[#6A0032] rounded-full border border-white/20 hover:bg-[#850040] transition flex items-center justify-center z-50 w-8 h-8"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      {/* CONTENEDOR INTERNO */}
      <div className="flex flex-col justify-between h-full p-5 overflow-y-auto custom-scrollbar">
        <div className="flex flex-col">
          {/* LOGO INSTITUCIONAL */}
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
                <h1 className="text-xl font-bold whitespace-nowrap">IPN Workspace</h1>
                <p className="text-[11px] text-gray-300 mt-1 whitespace-nowrap tracking-wider">
                  Instituto Politécnico Nacional           
                </p>
              </div>
            )}
          </div>

          {/* RENDERIZADO DINÁMICO DEL MENÚ */}
          <nav className="flex flex-col gap-2 shrink-0">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.name : ""}
                  className={`flex items-center px-4 py-3 rounded-xl transition ${
                    isCollapsed ? "justify-center" : "gap-3"
                  } ${isActive ? "bg-[#850040]" : "hover:bg-[#850040]"}`}
                >
                  <Icon size={20} className="min-w-[20px]" />
                  {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.name}</span>}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* MENÚ INFERIOR */}
        <div className="mt-8 shrink-0"> 
          <div className="flex flex-col gap-2 mb-6">
            {bottomItems.map((item) => {
              const Icon = item.icon
              const isActive = location.pathname === item.path

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.name : ""}
                  className={`flex items-center px-4 py-3 rounded-xl transition ${
                    isCollapsed ? "justify-center" : "gap-3"
                  } ${isActive ? "bg-[#850040]" : "hover:bg-[#850040]"}`}
                >
                  <Icon size={20} className="min-w-[20px]" />
                  {!isCollapsed && <span className="text-sm whitespace-nowrap">{item.name}</span>}
                </Link>
              )
            })}
          </div>

          {/* CERRAR SESIÓN */}
          <button 
            onClick={handleLogout}
            title={isCollapsed ? "Cerrar sesión" : ""}
            className={`flex items-center px-4 py-3 rounded-xl hover:bg-[#850040] transition w-full ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <LogOut size={20} className="min-w-[20px]" />
            {!isCollapsed && <span className="text-sm whitespace-nowrap">Cerrar sesión</span>}
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar;