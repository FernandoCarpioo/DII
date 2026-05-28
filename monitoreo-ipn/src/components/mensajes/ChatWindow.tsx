import {
  Smile,
  Send,
  Paperclip,
  Users
} from "lucide-react"

function ChatWindow() {

  const messages = [
    {
      user: "María González",
      text: "Buenos días equipo, les comparto el reporte mensual.",
      own: false
    },
    {
      user: "Tú",
      text: "Gracias María, lo reviso y comparto comentarios.",
      own: true
    },
    {
      user: "Luis Hernández",
      text: "Recordatorio: mañana tenemos reunión a las 10:00 AM.",
      own: false
    }
  ]

  return (

    <div className="h-full flex flex-col">

      {/* TOP */}
      <div className="h-24 border-b border-gray-100 px-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center">

            <Users className="text-purple-600" />

          </div>

          <div>

            <h2 className="text-2xl font-semibold">
              Analistas
            </h2>

            <p className="text-gray-500">
              6 miembros
            </p>

          </div>

        </div>

      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fafafa]">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`flex ${message.own ? "justify-end" : "justify-start"}`}
          >

            <div
              className={`max-w-xl rounded-2xl px-5 py-4 ${
                message.own
                  ? "bg-green-100"
                  : "bg-white border border-gray-100"
              }`}
            >

              {!message.own && (

                <p className="font-semibold text-sm text-[#6A0032] mb-2">
                  {message.user}
                </p>

              )}

              <p className="text-gray-700">
                {message.text}
              </p>

            </div>

          </div>

        ))}

      </div>

      {/* INPUT */}
      <div className="p-5 border-t border-gray-100 flex items-center gap-4">

        <button className="w-12 h-12 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50">

          <Paperclip size={20} />

        </button>

        <input
          type="text"
          placeholder="Escribe un mensaje..."
          className="flex-1 h-12 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#6A0032]"
        />

        <button className="w-12 h-12 rounded-xl bg-[#6A0032] text-white flex items-center justify-center">

          <Smile size={18} />

        </button>

        <button className="w-12 h-12 rounded-xl bg-[#6A0032] text-white flex items-center justify-center">

          <Send size={18} />

        </button>

      </div>

    </div>

  )
}

export default ChatWindow