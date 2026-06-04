import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Users,
  Folder,
  Printer,
  Monitor,
  Settings,
  LogOut,
  House,
  ChevronLeft,
  ChevronRight,
  Tickets,
  MessageCircle,
  NotebookTabs
} from "lucide-react";

import logoIPN from "../../../assets/logo-ipn.png";

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  role: string;
}

function Sidebar({
  isCollapsed,
  setIsCollapsed,
  role
}: SidebarProps) {

  const location = useLocation();
  const navigate = useNavigate();

  const adminMenu = [
    {
      name: "Inicio",
      path: "/admin",
      icon: House
    },
    {
      name: "Grupos",
      path: "/admin/grupos",
      icon: Users
    },
    {
      name: "Equipos",
      path: "/admin/equipos",
      icon: Monitor
    },
    {
      name: "Tickets",
      path: "/admin/tickets",
      icon: Tickets
    },
    {
      name: "Impresiones",
      path: "/admin/impresiones",
      icon: Printer
    },
    {
      name: "Archivos enviados",
      path: "/admin/archivos-enviados",
      icon: Folder
    },
    {
      name: "Mensajes",
      path: "/admin/mensajes",
      icon: MessageCircle
    },
    {
      name: "Usuarios",
      path: "/admin/usuario",
      icon: Users
    }
  ];

  const userMenu = [
    {
      name: "Inicio",
      path: "/user",
      icon: House
    },
    {
      name: "Mis Grupos",
      path: "/user/grupos",
      icon: Users
    },
    {
      name: "Pendientes",
      path: "/user/pendientes",
      icon: NotebookTabs
    },
    {
      name: "Mensajes",
      path: "/user/mensajes",
      icon: MessageCircle
    }
  ];

  const menuItems =
    role === "admin"
      ? adminMenu
      : userMenu;


  const handleLogout = () => {

    localStorage.clear();

    navigate("/login");

  };

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen
        bg-[#6A0032]
        text-white
        transition-all duration-300
        z-50
        ${isCollapsed ? "w-[90px]" : "w-[300px]"}
      `}
    >

      <button
        onClick={() =>
          setIsCollapsed(!isCollapsed)
        }
        className="
          absolute
          -right-4
          top-10
          w-8
          h-8
          rounded-full
          bg-[#6A0032]
          border border-white/20
          flex items-center justify-center
          hover:bg-[#850040]
        "
      >
        {isCollapsed
          ? <ChevronRight size={16} />
          : <ChevronLeft size={16} />
        }
      </button>

      <div className="flex flex-col justify-between h-full p-5">

        <div>

          <div className="flex flex-col items-center mb-10">

            <img
              src={logoIPN}
              alt="IPN"
              className={`
                object-contain
                transition-all
                ${isCollapsed
                  ? "w-10 h-10"
                  : "w-16 h-16 mb-4"}
              `}
            />

            {!isCollapsed && (
              <>
                <h1 className="text-xl font-bold">
                  IPN Workspace
                </h1>

                <p className="text-xs text-gray-300">
                  Instituto Politécnico Nacional
                </p>

              </>
            )}

          </div>

          <nav className="space-y-2">

            {menuItems.map((item) => {

              const Icon = item.icon;

              const isActive =
                location.pathname === item.path;

              return (

                <Link
                  key={item.path}
                  to={item.path}
                  className={`
                    flex items-center
                    px-4 py-3
                    rounded-xl
                    transition
                    ${
                      isCollapsed
                        ? "justify-center"
                        : "gap-3"
                    }
                    ${
                      isActive
                        ? "bg-[#850040]"
                        : "hover:bg-[#850040]"
                    }
                  `}
                >

                  <Icon size={20} />

                  {!isCollapsed && (
                    <span>
                      {item.name}
                    </span>
                  )}

                </Link>

              );

            })}

          </nav>

        </div>

        <div>

          <Link
            to={
              role === "admin"
                ? "/admin/configuracion"
                : "/user/configuracion"
            }
            className={`
              flex items-center
              px-4 py-3
              rounded-xl
              hover:bg-[#850040]
              mb-2
              ${
                isCollapsed
                  ? "justify-center"
                  : "gap-3"
              }
            `}
          >

            <Settings size={20} />

            {!isCollapsed && (
              <span>
                Configuración
              </span>
            )}

          </Link>

          <button
            onClick={handleLogout}
            className={`
              w-full
              flex items-center
              px-4 py-3
              rounded-xl
              hover:bg-[#850040]
              ${
                isCollapsed
                  ? "justify-center"
                  : "gap-3"
              }
            `}
          >

            <LogOut size={20} />

            {!isCollapsed && (
              <span>
                Cerrar sesión
              </span>
            )}

          </button>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;