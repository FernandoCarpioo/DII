import {
  Users,
  Shield,
  MessageCircle,
  CalendarDays,
  FileText
} from "lucide-react"

type Props = {
  title: string
  description: string
  members: number
  status: string
}

function GroupCard({
  title,
  description,
  members,
  status
}: Props) {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm">

      {/* HEADER */}
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-4">

          <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center">
            <Users
              size={38}
              className="text-[#6A0032]"
            />
          </div>

          <div>

            <div className="flex items-center gap-3">

              <h2 className="text-3xl font-bold text-gray-800">
                {title}
              </h2>

              <span className="bg-green-100 text-green-700 text-sm px-3 py-1 rounded-full font-medium">
                {status}
              </span>

            </div>

            <p className="text-gray-500 mt-3 text-lg">
              {description}
            </p>

          </div>

        </div>

      </div>

      {/* LINE */}
      <div className="h-[1px] bg-gray-200 my-6" />

      {/* INFO */}
      <div className="grid grid-cols-2 gap-6">

        <div className="flex items-center gap-3">

          <Users
            size={20}
            className="text-gray-500"
          />

          <div>

            <p className="font-semibold">
              {members}
            </p>

            <p className="text-gray-500 text-sm">
              Miembros
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Shield
            size={20}
            className="text-gray-500"
          />

          <div>

            <p className="font-semibold">
              Miembro
            </p>

            <p className="text-gray-500 text-sm">
              Mi rol
            </p>

          </div>

        </div>

      </div>

      {/* LINE */}
      <div className="h-[1px] bg-gray-200 my-6" />

      {/* ACTIONS */}
      <div className="grid grid-cols-3 divide-x divide-gray-200">

        <button className="flex flex-col items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-xl transition">

          <MessageCircle
            size={24}
            className="text-gray-600"
          />

          <div className="text-center">

            <p className="font-semibold text-sm">
              Abrir chat
            </p>

            <p className="text-xs text-gray-500">
              del grupo
            </p>

          </div>

        </button>

        <button className="flex flex-col items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-xl transition">

          <FileText
            size={24}
            className="text-gray-600"
          />

          <div className="text-center">

            <p className="font-semibold text-sm">
              Ver
            </p>

            <p className="text-xs text-gray-500">
              actualizaciones
            </p>

          </div>

        </button>

        <button className="flex flex-col items-center justify-center gap-2 py-3 hover:bg-gray-50 rounded-xl transition">

          <CalendarDays
            size={24}
            className="text-gray-600"
          />

          <div className="text-center">

            <p className="font-semibold text-sm">
              Ver calendario
            </p>

            <p className="text-xs text-gray-500">
              de actividades
            </p>

          </div>

        </button>

      </div>

    </div>
  )
}

export default GroupCard