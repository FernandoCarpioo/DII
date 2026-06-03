import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string | number; // Cambiado a string o number para métricas reales de BD
  subtitle: string;
  icon: LucideIcon;
  iconBg: string;
  path?: string;
  loading?: boolean;       
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  path,
  loading = false
}: StatCardProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-50 flex flex-col justify-between h-full">
      
      <div className="flex items-start justify-between">
        <div>
          {loading ? (
            <div className="h-9 flex items-center">
              <Loader2 className="animate-spin text-gray-400" size={20} />
            </div>
          ) : (
            <h2 className="text-3xl font-bold text-gray-800">
              {value}
            </h2>
          )}
          <p className="text-sm font-medium text-gray-500 mt-1">
            {title}
          </p>
        </div>

        <div className={`${iconBg} w-12 h-12 rounded-xl flex items-center justify-center shrink-0`}>
          <Icon size={22} />
        </div>
      </div>

      <button 
        onClick={() => path && navigate(path)}
        disabled={!path}
        className="text-[#6A0032] text-sm font-semibold mt-6 hover:text-[#850040] hover:underline text-left w-fit transition disabled:opacity-50 disabled:no-underline"
      >
        {subtitle} →
      </button>

    </div>
  );
}

export default StatCard;