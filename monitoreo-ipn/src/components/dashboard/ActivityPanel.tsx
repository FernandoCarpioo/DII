import {
  Bell,
  ShieldAlert,
  UserCheck,
  Monitor
} from "lucide-react"

const activities = [
  {
    id: 1,
    title: "Nuevo bloqueo detectado",
    description: "USB bloqueado en Equipo-04",
    icon: ShieldAlert
  },
  {
    id: 2,
    title: "Usuario conectado",
    description: "Héctor inició sesión",
    icon: UserCheck
  },
  {
    id: 3,
    title: "Equipo agregado",
    description: "Nuevo equipo registrado",
    icon: Monitor
  },
  {
    id: 4,
    title: "Nueva notificación",
    description: "Reporte semanal generado",
    icon: Bell
  },
]

function ActivityPanel() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 h-full">

      <div className="mb-6">

        <h2 className="text-xl font-bold">
          Actividad reciente
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Últimos eventos del sistema.
        </p>

      </div>

      <div className="space-y-5">

        {activities.map((activity) => {
          const Icon = activity.icon

          return (
            <div
              key={activity.id}
              className="flex gap-4"
            >

              <div className="bg-gray-100 w-11 h-11 rounded-xl flex items-center justify-center">

                <Icon
                  size={20}
                  className="text-[#6A0032]"
                />

              </div>

              <div>

                <h3 className="font-semibold text-sm">
                  {activity.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {activity.description}
                </p>

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default ActivityPanel