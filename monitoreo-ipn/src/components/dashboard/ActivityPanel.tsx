import { useNavigate } from "react-router-dom";
import { 
  Bell, 
  ShieldAlert, 
  MessageSquare, 
  FileText, 
  Clock,
  Loader2
} from "lucide-react";

// Definimos la estructura exacta que mandará el backend para cada actividad
export interface Actividad {
  id: string | number;
  title: string;
  description: string;
  type: "block" | "message" | "file" | "system" | string;
  time: string; // Puede ser un string formateado desde el backend o un timestamp
}

interface ActivityPanelProps {
  activities: Actividad[];
  loading?: boolean;
}

const getActivityConfig = (type: string) => {
  switch (type) {
    case "block":
      return { icon: ShieldAlert, bg: "bg-red-50 text-red-600 border border-red-100" };
    case "message":
      return { icon: MessageSquare, bg: "bg-blue-50 text-blue-600 border border-blue-100" };
    case "file":
      return { icon: FileText, bg: "bg-green-50 text-green-600 border border-green-100" };
    case "system":
    default:
      return { icon: Bell, bg: "bg-amber-50 text-amber-600 border border-amber-100" };
  }
};

function ActivityPanel({ activities, loading = false }: ActivityPanelProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 h-full flex flex-col justify-between">
      
      <div>
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-800">
            Actividad reciente
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Últimos eventos y actualizaciones registradas en el sistema.
          </p>
        </div>

        <div className="space-y-5 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
          {/*Los datos están cargando desde la BD */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-2">
              <Loader2 className="animate-spin text-[#6A0032]" size={24} />
              <p className="text-xs">Cargando...</p>
            </div>
          )}

          {/*Terminó de cargar pero no hay registros en la BD */}
          {!loading && activities.length === 0 && (
            <div className="text-center py-12 text-sm text-gray-400">
              No hay actividades recientes para mostrar.
            </div>
          )}

          {/* Renderizado de datos reales */}
          {!loading && activities.map((activity) => {
            const config = getActivityConfig(activity.type);
            const Icon = config.icon;

            return (
              <div
                key={activity.id}
                className="flex items-start gap-4 p-2 rounded-xl hover:bg-gray-50/50 transition duration-200"
              >
                <div className={`${config.bg} w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs`}>
                  <Icon size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-semibold text-sm text-gray-800 truncate">
                      {activity.title}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    {activity.description}
                  </p>
                  
                  <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-1.5 font-medium">
                    <Clock size={11} />
                    <span>{activity.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t border-gray-50 pt-4 mt-4 text-center">
        <button 
          onClick={() => navigate("/admin/configuracion")}
          className="text-xs text-[#6A0032] font-semibold hover:text-[#850040] hover:underline transition"
        >
          Ver historial completo
        </button>
      </div>

    </div>
  );
}

export default ActivityPanel;