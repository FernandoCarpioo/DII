import {
  Users
} from "lucide-react"

function ChatInfo() {

  const members = [
    "Héctor",
    "María González",
    "Luis Hernández",
    "Carlos Ramírez"
  ]

  return (

    <div className="h-full overflow-y-auto">

      <div className="p-6 border-b border-gray-100">

        <h2 className="text-2xl font-semibold">
          Información del chat
        </h2>

      </div>

      <div className="p-6">

        <div className="flex flex-col items-center text-center">

          <div className="w-24 h-24 rounded-3xl bg-purple-100 flex items-center justify-center mb-5">

            <Users
              size={40}
              className="text-purple-600"
            />

          </div>

          <h3 className="text-2xl font-bold">
            Analistas
          </h3>

          <p className="text-gray-500 mt-2">
            6 miembros
          </p>

        </div>

        <div className="mt-10">

          <h4 className="font-semibold mb-5">
            Miembros
          </h4>

          <div className="space-y-4">

            {members.map((member, index) => (

              <div
                key={index}
                className="flex items-center gap-4"
              >

                <div className="w-12 h-12 rounded-full bg-[#6A0032] text-white flex items-center justify-center font-semibold">

                  {member.charAt(0)}

                </div>

                <div>

                  <p className="font-medium">
                    {member}
                  </p>

                  <p className="text-sm text-gray-500">
                    Analista
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