const groups = [
  {
    id: 1,
    name: "Administrativos",
    admin: "Héctor",
    devices: 24,
    status: "Activo"
  },
  {
    id: 2,
    name: "Laboratorio",
    admin: "Ana",
    devices: 12,
    status: "Activo"
  },
  {
    id: 3,
    name: "Soporte",
    admin: "Luis",
    devices: 8,
    status: "Inactivo"
  },
  {
    id: 4,
    name: "Dirección",
    admin: "Fernanda",
    devices: 16,
    status: "Activo"
  },
]

function GroupsTable() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-xl font-bold">
            Grupos de trabajo
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Administración de grupos y equipos.
          </p>
        </div>

        <button className="bg-[#6A0032] text-white px-4 py-2 rounded-xl hover:bg-[#850040] transition">
          Crear grupo
        </button>

      </div>

      <table className="w-full">

        <thead>

          <tr className="text-left text-gray-500 text-sm border-b">

            <th className="pb-4">
              Grupo
            </th>

            <th className="pb-4">
              Administrador
            </th>

            <th className="pb-4">
              Equipos
            </th>

            <th className="pb-4">
              Estado
            </th>

            <th className="pb-4">
              Acciones
            </th>

          </tr>

        </thead>

        <tbody>

          {groups.map((group) => (
            <tr
              key={group.id}
              className="border-b last:border-none"
            >

              <td className="py-5 font-medium">
                {group.name}
              </td>

              <td className="py-5">
                {group.admin}
              </td>

              <td className="py-5">
                {group.devices}
              </td>

              <td className="py-5">

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    group.status === "Activo"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {group.status}
                </span>

              </td>

              <td className="py-5">

                <button className="text-[#6A0032] hover:underline">
                  Ver detalles
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}

export default GroupsTable