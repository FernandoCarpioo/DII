import { Search, Plus, Users, Loader2 } from "lucide-react"

// Interfaz para mapear las conversaciones de la base de datos
export interface ChatPreview {
  id: string | number;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
}

interface ChatSidebarProps {
  chats: ChatPreview[];
  selectedChatId: string | number | null;
  onSelectChat: (id: string | number) => void;
  loading?: boolean;
}

function ChatSidebar({ chats, selectedChatId, onSelectChat, loading = false }: ChatSidebarProps) {
  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100 min-w-[320px] w-full md:w-[350px] shrink-0">
      
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
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 gap-2 text-gray-400 text-sm">
            <Loader2 className="animate-spin text-[#6A0032]" size={20} />
            <span>Sincronizando chats...</span>
          </div>
        )}

        {!loading && chats.length === 0 && (
          <p className="text-center py-10 text-sm text-gray-400">No hay canales de comunicación.</p>
        )}

        {!loading && chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onSelectChat(chat.id)}
            className={`px-5 py-4 border-b border-gray-50 cursor-pointer transition flex items-center gap-4 hover:bg-gray-50/70 ${
              selectedChatId === chat.id ? "bg-pink-50/40 border-r-4 border-r-[#6A0032]" : "bg-white"
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
                {chat.lastMessage || "Sin mensajes aún"}
              </p>
            </div>

            {/* TIME & BADGE */}
            <div className="flex flex-col items-end gap-1.5 shrink-0">
              <span className="text-xs text-gray-400 font-medium">
                {chat.time}
              </span>
              
              {chat.unreadCount > 0 ? (
                <div className="min-w-[20px] h-5 px-1.5 rounded-full bg-red-500 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
                  {chat.unreadCount}
                </div>
              ) : (
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