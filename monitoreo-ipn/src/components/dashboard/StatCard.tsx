import type { LucideIcon } from "lucide-react"
type StatCardProps = {
  title: string
  value: string
  subtitle: string
  icon: LucideIcon
  iconBg: string
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg
}: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">

      <div className="flex items-start justify-between">

        <div>

          <h2 className="text-3xl font-bold">
            {value}
          </h2>

          <p className="text-sm font-medium mt-1">
            {title}
          </p>

        </div>

        <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center`}>

          <Icon size={22} />

        </div>

        

      </div>

      <button className="text-[#6A0032] text-sm font-medium mt-6 hover:underline">
        Ver detalles →
      </button>

    </div>
  )
}

export default StatCard