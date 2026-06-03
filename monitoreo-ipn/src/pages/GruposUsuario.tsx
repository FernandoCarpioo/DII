import GroupCard, { type GrupoData } from "../components/groups/GroupCard"

function GruposUsuario() {
  const groups: GrupoData[] = [
    { title: "Analistas", description: "Análisis y revisión de información", members: 6, status: "Activo" },
    { title: "Departamento de Contaduría", description: "Contabilidad y finanzas", members: 8, status: "Activo" },
    { title: "Proyecto 1", description: "Desarrollo e implementación", members: 5, status: "Temporal" },
    { title: "Redes Avanzadas", description: "Administración de redes", members: 7, status: "Activo" },
    { title: "Sistemas Distribuidos", description: "Gestión de sistemas distribuidos", members: 7, status: "Inactivo" }
  ]

  return (
    <div className="animate-in fade-in duration-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Mis grupos de trabajo</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Estos son los grupos a los que perteneces de acuerdo con tus credenciales de la base de datos.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {groups.map((group) => (
          <GroupCard
            key={group.title}
            data={group}
            context="user"
          />
        ))}
      </div>
    </div>
  )
}

export default GruposUsuario