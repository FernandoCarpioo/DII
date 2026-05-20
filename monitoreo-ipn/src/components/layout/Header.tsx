import {
  Bell,
  ChevronDown,
  Search
} from "lucide-react"

function Header() {
  return (
    <header className="bg-white h-20 rounded-2xl px-6 flex items-center justify-between shadow-sm">

      <div className="flex items-center gap-4">

        <button className="text-gray-600">
          ☰
        </button>

        <div className="bg-gray-100 rounded-xl px-4 py-2 flex items-center gap-3 w-[350px]">

          <Search
            size={18}
            className="text-gray-400"
          />

          <input
            type="text"
            placeholder="Buscar en el sistema..."
            className="bg-transparent outline-none text-sm w-full"
          />

        </div>

      </div>

      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell size={22} />

          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
            2
          </span>
        </button>

        <div className="flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-[#6A0032] text-white flex items-center justify-center font-semibold">
            H
          </div>

          <div>
            <p className="font-semibold text-sm">
              Héctor
            </p>

            <p className="text-xs text-gray-500">
              Directivo
            </p>
          </div>

          <ChevronDown size={18} />

        </div>

      </div>

    </header>
  )
}

export default Header