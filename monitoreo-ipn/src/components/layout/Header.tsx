import { Bell, ChevronDown, Search } from "lucide-react"

interface HeaderProps {
  usuario?: {
    name: string;
    role: string;
  };
  notificationsCount?: number; // Propiedad para traer alertas dinámicas de la BD
  onSearch?: (query: string) => void; // Handler opcional para capturar búsquedas en tiempo real
}

function Header({ usuario, notificationsCount = 0, onSearch }: HeaderProps) {
  // Manejo de valores reales devueltos por tu API auth
  const nombreUsuario = usuario?.name || "Usuario de Red"
  const rolUsuario = usuario?.role === "admin" || usuario?.role === "administrador" ? "Administrador" : "Analista"
  const inicial = nombreUsuario.charAt(0).toUpperCase()

  return (
    <header className="bg-white h-20 rounded-2xl px-6 flex items-center justify-between shadow-sm border border-gray-100 w-full">

      {/* SECCIÓN IZQUIERDA: BÚSQUEDA OPERATIVA */}
      <div className="flex items-center gap-4">
        <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-3 w-[350px] focus-within:ring-2 focus-within:ring-[#6A0032] transition">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por grupo, dispositivo o log..."
            className="bg-transparent outline-none text-sm w-full text-gray-700 placeholder-gray-400"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
      </div>

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