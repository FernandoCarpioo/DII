import {
  ClipboardList,
  Clock3,
  CircleCheckBig,
  TimerReset,
  Search,
  ChevronRight,
  CalendarDays,
  Users,
  Folder,
  DatabaseBackup,
  BriefcaseBusiness
} from "lucide-react"

import StatCard from "../components/dashboard/StatCard"

function Tareas() {

  const tasks = [
    {
      title: "Elaborar reporte mensual de actividades",
      description:
        "Generar el reporte de actividades correspondiente al mes en curso y compartirlo con el equipo.",
      group: "Analistas",
      date: "24/05/2024",
      status: "Pendiente",
      extra: "Vence en 2 días",
      icon: ClipboardList
    },
    {
      title: "Revisión de inventario de equipos",
      description:
        "Verificar el estado de los equipos del laboratorio y actualizar el inventario en el sistema.",
      group: "Sistemas Distribuidos",
      date: "28/05/2024",
      status: "En progreso",
      extra: "Vence en 6 días",
      icon: DatabaseBackup
    },
    {
      title: "Documentar proceso de instalación",
      description:
        "Crear documentación paso a paso del proceso de instalación del software.",
      group: "Proyecto 1",
      date: "31/05/2024",
      status: "Pendiente",
      extra: "Vence en 9 días",
      icon: Folder
    },
    {
      title: "Actualizar configuración de red",
      description:
        "Realizar cambios en la configuración de red según el nuevo esquema aprobado.",
      group: "Redes Avanzadas",
      date: "15/05/2024",
      status: "Vencida",
      extra: "Vencida",
      icon: BriefcaseBusiness
    },
    {
      title: "Capacitación al personal nuevo",
      description:
        "Impartir capacitación sobre el uso del sistema y procedimientos internos.",
      group: "Departamento de Recursos Humanos",
      date: "20/05/2024",
      status: "Completada",
      extra: "Completada el 19/05/2024",
      icon: Users
    }
  ]

  const getBadge = (status: string) => {

    switch (status) {

      case "Pendiente":
        return "bg-orange-100 text-orange-600"

      case "En progreso":
        return "bg-blue-100 text-blue-600"

      case "Completada":
        return "bg-green-100 text-green-600"

      case "Vencida":
        return "bg-red-100 text-red-600"

      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Mis tareas asignadas
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Consulta y da seguimiento a las tareas que tienes pendientes.
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">

        <StatCard
          title="Total de tareas"
          value="12"
          subtitle="Tareas registradas"
          icon={ClipboardList}
          iconBg="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Pendientes"
          value="7"
          subtitle="Por revisar"
          icon={Clock3}
          iconBg="bg-orange-100 text-orange-600"
        />

        <StatCard
          title="En progreso"
          value="3"
          subtitle="Actualmente activas"
          icon={TimerReset}
          iconBg="bg-blue-100 text-blue-600"
        />

        <StatCard
          title="Completadas"
          value="2"
          subtitle="Finalizadas"
          icon={CircleCheckBig}
          iconBg="bg-green-100 text-green-600"
        />

        <StatCard
          title="Vencidas"
          value="0"
          subtitle="Fuera de fecha"
          icon={Clock3}
          iconBg="bg-red-100 text-red-600"
        />

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">

        {/* FILTERS */}
        <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row gap-4">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Buscar por título o descripción..."
              className="w-full h-14 border border-gray-200 rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#6A0032]"
            />

          </div>

          <select className="h-14 px-4 rounded-xl border border-gray-200 outline-none">
            <option>Todos los grupos</option>
          </select>

          <select className="h-14 px-4 rounded-xl border border-gray-200 outline-none">
            <option>Todos los estados</option>
          </select>

          <button className="h-14 px-6 rounded-xl border border-[#6A0032] text-[#6A0032] hover:bg-pink-50 transition font-medium">
            Limpiar filtros
          </button>

        </div>

        {/* HEADERS */}
        <div className="grid grid-cols-12 px-6 py-4 text-sm text-gray-400 font-semibold border-b border-gray-100">

          <div className="col-span-5">
            TAREA
          </div>

          <div className="col-span-3">
            GRUPO
          </div>

          <div className="col-span-2">
            FECHA LÍMITE
          </div>

          <div className="col-span-2">
            ESTADO
          </div>

        </div>

        {/* ROWS */}
        {tasks.map((task, index) => {

          const Icon = task.icon

          return (
            <div
              key={index}
              className="grid grid-cols-12 px-6 py-5 items-center border-b border-gray-100 hover:bg-gray-50 transition"
            >

              {/* TASK */}
              <div className="col-span-5 flex items-start gap-4">

                <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center">

                  <Icon className="text-[#6A0032]" />

                </div>

                <div>

                  <h3 className="font-semibold text-lg">
                    {task.title}
                  </h3>

                  <p className="text-gray-500 text-sm mt-1 max-w-lg">
                    {task.description}
                  </p>

                </div>

              </div>

              {/* GROUP */}
              <div className="col-span-3 flex items-center gap-3">

                <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">

                  <Users
                    size={18}
                    className="text-[#6A0032]"
                  />

                </div>

                <span className="font-medium">
                  {task.group}
                </span>

              </div>

              {/* DATE */}
              <div className="col-span-2">

                <div className="flex items-center gap-2 font-medium">

                  <CalendarDays size={16} />

                  {task.date}

                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {task.extra}
                </p>

              </div>

              {/* STATUS */}
              <div className="col-span-2 flex items-center justify-between">

                <span className={`px-4 py-2 rounded-full text-sm font-medium ${getBadge(task.status)}`}>
                  {task.status}
                </span>

                <ChevronRight className="text-gray-400" />

              </div>

            </div>
          )
        })}

      </div>

    </div>
  )
}

export default Tareas