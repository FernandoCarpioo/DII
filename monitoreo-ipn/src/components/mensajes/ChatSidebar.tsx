import { Search, Plus, Users } from "lucide-react"

function ChatSidebar() {
  const chats = [
    {
      name: "Analistas",
      message: "María: No olviden enviar ...",
      time: "10:24 AM",
      unread: 0, // En tu imagen Analistas no tiene badge rojo
      selected: true
    },
    {
      name: "Carlos Ramírez",
      message: "¿Puedes revisar el archivo?",
      time: "09:15 AM",
      unread: 1,
      selected: false
    },
    {
      name: "Proyecto 1",
      message: "Se actualizó el cronograma...",
      time: "Ayer",
      unread: 0,
      selected: false
    },
    {
      name: "Redes Avanzadas",
      message: "Jorge: Configuración aplicada...",
      time: "Lun.",
      unread: 0,
      selected: false
    },
    {
      name: "Sistemas Distribuidos",
      message: "Se creó la tarea: Verificar respaldos",
      time: "Lun.",
      unread: 0,
      selected: false
    }
  ]

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 min-w-[320px]">
      
      {/* HEADER */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center justify-between mb-5 gap-3">
          <h2 className="text-3xl font-bold text-gray-900">
            Mensajes
          </h2>
          <button className="h-10 px-4 rounded-full bg-[#6A0032] hover:bg-[#520026] transition text-white text-sm font-medium flex items-center gap-2 shrink-0 shadow-sm">
            <Plus size={18} />
            Nuevo mensaje
          </button>
        </div>

        {/* SEARCH */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Buscar conversaciones..."
            className="w-full h-11 border border-gray-200 rounded-full pl-11 pr-4 outline-none focus:ring-2 focus:ring-[#6A0032]/20 focus:border-[#6A0032] text-sm text-gray-700 placeholder-gray-400 transition"
          />
        </div>
      </div>

      {/* LISTA CHATS */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`px-5 py-4 border-b border-gray-50 cursor-pointer transition flex items-center gap-4 hover:bg-gray-50 ${
              chat.selected ? "bg-pink-50/40" : "bg-white"
            }`}
          >
            {/* ICON */}
            <div className="w-12 h-12 rounded-2xl bg-purple-100 flex items-center justify-center shrink-0">
              <Users size={22} className="text-purple-600" />
            </div>

            {/* INFO */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-[15px] truncate">
                {chat.name}
              </h3>
              <p className="text-sm text-gray-500 mt-0.5 truncate">
                {chat.message}
              </p>
            </div>

            {/* TIME & BADGE */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-xs text-gray-400 font-medium">
                {chat.time}
              </span>
              
              {chat.unread > 0 ? (
                <div className="min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {chat.unread}
                </div>
              ) : (
                // Espacio invisible para mantener la alineación cuando no hay notificaciones
                <div className="h-5"></div>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatSidebar