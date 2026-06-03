import { useState } from "react"
import { Smile, Send, Paperclip, Users, Loader2 } from "lucide-react"

export interface MessageData {
  id?: string | number;
  user: string;
  text: string;
  own: boolean;
}

interface ChatWindowProps {
  chatName: string;
  memberCount: number;
  messages: MessageData[];
  onSendMessage: (text: string) => void;
  loading?: boolean;
}

function ChatWindow({ chatName, memberCount, messages, onSendMessage, loading = false }: ChatWindowProps) {
  const [inputText, setInputText] = useState("");

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(inputText);
    setInputText(""); // Limpia la caja de texto
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div className="h-full flex flex-col flex-1 bg-white">
      {/* TOP BAR */}
      <div className="h-24 border-b border-gray-100 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">
            <Users className="text-purple-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {chatName || "Selecciona un chat"}
            </h2>
            <p className="text-gray-500 text-sm">
              {memberCount} miembros
            </p>
          </div>
        </div>
      </div>

      {/* MESSAGES CONTAINER */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fafafa]">
        {loading && (
          <div className="flex items-center justify-center h-full text-gray-400 gap-2">
            <Loader2 className="animate-spin text-[#6A0032]" size={20} />
            <p className="text-sm">Descargando mensajes...</p>
          </div>
        )}

        {!loading && messages.length === 0 && (
          <div className="h-full flex items-center justify-center text-gray-400 text-sm">
            Escribe un mensaje para iniciar la conversación institucional.
          </div>
        )}

        {!loading && messages.map((message, index) => (
          <div
            key={message.id || index}
            className={`flex ${message.own ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xl rounded-2xl px-5 py-4 shadow-xs ${
                message.own
                  ? "bg-green-100 text-gray-800"
                  : "bg-white border border-gray-100 text-gray-800"
              }`}
            >
              {!message.own && (
                <p className="font-semibold text-sm text-[#6A0032] mb-2">
                  {message.user}
                </p>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* INPUT BAR */}
      <div className="p-5 border-t border-gray-100 flex items-center gap-4 bg-white shrink-0">
        <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition text-gray-500">
          <Paperclip size={20} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe un mensaje seguro..."
          className="flex-1 h-12 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#6A0032] transition text-sm"
        />

        <button className="w-12 h-12 rounded-xl border border-gray-100 flex items-center justify-center hover:bg-gray-50 transition text-gray-500">
          <Smile size={20} />
        </button>

        <button 
          onClick={handleSend}
          className="w-12 h-12 rounded-xl bg-[#6A0032] text-white flex items-center justify-center hover:bg-[#850040] transition active:scale-95 shadow-sm"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}

export default ChatWindow