import { Users } from "lucide-react"

export interface MemberData {
  id: string | number;
  name: string;
  role: string;
}

interface ChatInfoProps {
  chatName: string;
  members: MemberData[];
}

function ChatInfo({ chatName, members }: ChatInfoProps) {
  return (
    <div className="h-full overflow-y-auto bg-white border-l border-gray-100 w-full md:w-[320px] shrink-0">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-2xl font-semibold text-gray-800">
          Información del chat
        </h2>
      </div>

      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-3xl bg-purple-100 flex items-center justify-center mb-5 shadow-xs">
            <Users size={40} className="text-purple-600" />
          </div>

          <h3 className="text-2xl font-bold text-gray-800">
            {chatName || "Canal"}
          </h3>

          <p className="text-gray-500 mt-1 text-sm">
            {members.length} miembros asignados
          </p>
        </div>

        <div className="mt-10">
          <h4 className="font-semibold mb-5 text-gray-700 text-sm uppercase tracking-wider">
            Lista de Miembros
          </h4>

          <div className="space-y-4">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center gap-4 p-1 rounded-xl hover:bg-gray-50/50 transition"
              >
                <div className="w-11 h-11 rounded-full bg-[#6A0032] text-white flex items-center justify-center font-semibold shrink-0 text-sm shadow-xs">
                  {member.name.charAt(0).toUpperCase()}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm text-gray-800 truncate">
                    {member.name}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5 truncate">
                    {member.role || "Personal"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatInfo