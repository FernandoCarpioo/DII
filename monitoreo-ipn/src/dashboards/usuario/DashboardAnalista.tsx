import {
  MessageCircle,
  Clock3,
  MonitorSmartphone,
  Bell
} from "lucide-react"

import StatCard from "../../components/dashboard/StatCard"

function DashboardAnalista() {
  return (

    <div>

      {/* HEADER */}
      <div className="mb-6">

        <h1 className="text-3xl font-bold">
          ¡Bienvenido, Luis! 👋
        </h1>

        <p className="text-gray-500 mt-1">
          Aquí puedes ver tus grupos, pendientes
          y comunicarte con tu equipo.
        </p>

      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">

        <StatCard
          title="Mensajes nuevos"
          value="2"
          subtitle="Ir al chat"
          icon={MessageCircle}
          iconBg="bg-pink-100 text-[#6A0032]"
        />

        <StatCard
          title="Pendiente"
          value="1"
          subtitle="Ver pendientes"
          icon={Clock3}
          iconBg="bg-purple-100 text-purple-600"
        />

        <StatCard
          title="Grupo activo"
          value="1"
          subtitle="Ver grupo"
          icon={MonitorSmartphone}
          iconBg="bg-green-100 text-green-600"
        />

        <StatCard
          title="Notificación"
          value="1"
          subtitle="Ver notificación"
          icon={Bell}
          iconBg="bg-yellow-100 text-yellow-600"
        />

      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-8">

        {/* LEFT */}
        <div className="xl:col-span-8 space-y-6">

          {/* CARD GRUPO */}
          <div className="bg-white rounded-3xl shadow-sm border p-6">

            <div className="flex items-start justify-between">

              <div>

                <div className="flex items-center gap-3">

                  <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center">

                    <MessageCircle
                      className="text-[#6A0032]"
                    />

                  </div>

                  <div>

                    <div className="flex items-center gap-3">

                      <h2 className="text-2xl font-bold">
                        Analistas
                      </h2>

                      <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full font-medium">
                        Activo
                      </span>

                    </div>

                    <p className="text-gray-500 mt-2">
                      DII
                    </p>

                  </div>

                </div>

                <div className="mt-6">

                  <p className="text-sm text-gray-400">
                    Descripción
                  </p>

                  <p className="text-gray-600 mt-1">
                    Grupo de trabajo para análisis
                    y revisión de información.
                  </p>

                </div>

              </div>

              {/* IMAGE */}
              <div className="hidden md:flex items-center justify-center w-60 h-40 rounded-2xl bg-pink-50">

                <MonitorSmartphone
                  size={100}
                  className="text-pink-200"
                />

              </div>

            </div>

          </div>

          {/* ACTIVIDAD */}
          <div className="bg-white rounded-3xl shadow-sm border p-6">

            <h2 className="text-xl font-bold mb-6">
              Actividad reciente
            </h2>

            <div className="space-y-5">

              <div className="flex items-start justify-between">

                <div>

                  <p className="font-semibold">
                    Nuevo mensaje en Analistas
                  </p>

                  <p className="text-gray-500 text-sm">
                    María envió un mensaje en el chat del grupo.
                  </p>

                </div>

                <span className="text-sm text-gray-400">
                  10:24 AM
                </span>

              </div>

              <div className="flex items-start justify-between">

                <div>

                  <p className="font-semibold">
                    Archivo compartido en Analistas
                  </p>

                  <p className="text-gray-500 text-sm">
                    Reporte_Mensual.pdf fue compartido por Juan.
                  </p>

                </div>

                <span className="text-sm text-gray-400">
                  Ayer
                </span>

              </div>

              <div className="flex items-start justify-between">

                <div>

                  <p className="font-semibold">
                    Notificación del sistema
                  </p>

                  <p className="text-gray-500 text-sm">
                    Mantenimiento programado para el sábado.
                  </p>

                </div>

                <span className="text-sm text-gray-400">
                  9:30 AM
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT CHAT */}
        <div className="xl:col-span-4">

          <div className="bg-white rounded-3xl shadow-sm border h-full p-6 flex flex-col">

            <h2 className="text-xl font-bold">
              Chat del grupo
            </h2>

            <p className="text-[#6A0032] font-semibold mb-6">
              Analistas
            </p>

            {/* CHAT */}
            <div className="flex-1 space-y-4 overflow-y-auto">

              <div>

                <div className="bg-gray-100 rounded-2xl p-4 max-w-[90%]">

                  <p className="font-semibold text-sm">
                    María
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    ¿Alguien revisó el reporte?
                  </p>

                </div>

              </div>

              <div className="flex justify-end">

                <div className="bg-pink-100 rounded-2xl p-4 max-w-[90%]">

                  <p className="font-semibold text-sm">
                    Tú
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    Lo reviso más tarde.
                  </p>

                </div>

              </div>

            </div>

            {/* INPUT */}
            <div className="mt-6 border rounded-2xl px-4 h-14 flex items-center">

              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 outline-none"
              />

              <button className="w-10 h-10 rounded-full bg-[#6A0032] text-white">
                →
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>

  )
}

export default DashboardAnalista