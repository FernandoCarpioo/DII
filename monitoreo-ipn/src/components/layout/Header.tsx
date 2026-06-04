import { Bell, ChevronDown } from "lucide-react"

interface HeaderProps {
  usuario?: {
    name: string;
    role: string;
  };
  notificationsCount?: number; 
}

function Header({ usuario, notificationsCount = 0 }: HeaderProps) {
  // Manejo de valores reales devueltos por tu API auth
  const nombreUsuario = usuario?.name || "Usuario de Red"
  const rolUsuario = usuario?.role === "admin" || usuario?.role === "administrador" ? "Administrador" : "Analista"
  const inicial = nombreUsuario.charAt(0).toUpperCase()

  return (
    // CAMBIO CLAVE AQUÍ: Cambiamos justify-between por justify-end
    <header className="bg-white h-20 rounded-2xl px-6 flex items-center justify-end shadow-sm border border-gray-100 w-full">

      {/* SECCIÓN DERECHA: ALERTAS Y SESIÓN ACTIVA */}
      <div className="flex items-center gap-6">

        {/* NOTIFICACIONES CONECTADAS */}
        <button className="relative text-gray-500 hover:text-[#6A0032] p-1.5 rounded-lg hover:bg-gray-50 transition">
          <Bell size={22} />
          {notificationsCount > 0 && (
            <span className="absolute top-1 right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center animate-pulse">
              {notificationsCount}
            </span>
          )}
        </button>

        {/* COMPONENTE DE PERFIL REAL */}
        <div className="flex items-center gap-3 border-l border-gray-200 pl-6 cursor-pointer group select-none">
          <div className="w-10 h-10 rounded-full bg-[#6A0032] text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-[#850040] transition">
            {inicial}
          </div>

          <div>
            <p className="font-semibold text-sm text-gray-800 leading-tight">
              {nombreUsuario}
            </p>
            <p className="text-xs text-gray-500 mt-0.5">
              {rolUsuario}
            </p>
          </div>

          <ChevronDown size={16} className="text-gray-400 group-hover:text-gray-600 transition" />
        </div>

      </div>
    </header>
  )
}

export default Header