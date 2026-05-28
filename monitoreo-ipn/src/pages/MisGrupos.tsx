import { Plus } from "lucide-react"
import GroupCard from "../components/groups/GroupCard"
// import { Link } from "react-router-dom" // Descomenta esto si vas a usar <Link> en lugar de <button>

function MisGrupos() {

  const groups = [
    {
      title: "Analistas",
      description: "Análisis y revisión de información",
      members: 6,
      status: "Activo"
    },
    {
      title: "Departamento de Contaduría",
      description: "Contabilidad y finanzas",
      members: 8,
      status: "Activo"
    },
    {
      title: "Proyecto 1",
      description: "Desarrollo e implementación",
      members: 5,
      status: "Temporal"
    },
    {
      title: "Redes Avanzadas",
      description: "Administración de redes",
      members: 7,
      status: "Activo"
    },
    {
      title: "Sistemas Distribuidos",
      description: "Gestión de sistemas distribuidos",
      members: 7,
      status: "Inactivo"
    }
  ]

  return (
    <div>

      {/* HEADER */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* TEXTOS */}
        <div>
          <h1 className="text-4xl font-bold">
            Mis grupos de trabajo
          </h1>
          <p className="text-gray-500 mt-2 text-lg max-w-2xl">
            Estos son los grupos a los que perteneces.
            Selecciona uno para ver más detalles y acceder a su información.
          </p>
        </div>

        {/* BOTÓN CREAR GRUPO */}
        {/* Nota: Puedes cambiar la etiqueta <button> por <Link to="/user/creargrupos"> si necesitas que navegue */}
        <button 
          className="bg-[#6A0032] hover:bg-[#850040] text-white px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition shrink-0 shadow-sm"
        >
          <Plus size={20} />
          Crear grupo
        </button>

      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {groups.map((group) => (
          <GroupCard
            key={group.title}
            title={group.title}
            description={group.description}
            members={group.members}
            status={group.status}
          />
        ))}

      </div>

    </div>
  )
}

export default MisGrupos