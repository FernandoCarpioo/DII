import {
  Users,
  ShieldAlert,
  CircleCheck,
  Bell
} from "lucide-react"

import StatCard from "../../components/dashboard/StatCard"
import GroupsTable from "../../components/dashboard/GroupsTable"
import ActivityPanel from "../../components/dashboard/ActivityPanel"

function DashboardAdministrador() {
  return (
    <div>

      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          ¡Bienvenido, Héctor! 👋
        </h1>

        <p className="text-gray-500 mt-1">
          Desde aquí puedes gestionar grupos,
          bloqueos, permisos y monitorear la actividad del sistema.
        </p>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Grupos activos"
          value="8"
          subtitle="Ver grupos"
          icon={Users}
          iconBg="bg-pink-100 text-[#6A0032]"
        />

        <StatCard
          title="Bloqueos activos"
          value="3"
          subtitle="Ver bloqueos"
          icon={ShieldAlert}
          iconBg="bg-orange-100 text-orange-600"
        />

        <StatCard
          title="Acciones recientes"
          value="37"
          subtitle="Ver reportes"
          icon={CircleCheck}
          iconBg="bg-green-100 text-green-600"
        />

        <StatCard
          title="Notificaciones"
          value="4"
          subtitle="Ver notificaciones"
          icon={Bell}
          iconBg="bg-yellow-100 text-yellow-600"
        />

      </div>
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-8">

      <div className="xl:col-span-8">
        <GroupsTable />
      </div>

      <div className="xl:col-span-4">
        <ActivityPanel />
      </div>

      </div>

    </div>
  )
}

export default DashboardAdministrador