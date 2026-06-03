import { useEffect, useState } from "react"
import {
  ClipboardList,
  Clock3,
  CircleCheckBig,
  TimerReset,
  Search,
  ChevronRight,
  CalendarDays,
  Users,
  Loader2
} from "lucide-react"

import StatCard from "../components/dashboard/StatCard"

export interface Tarea {
  id: string | number;
  title: string;
  description: string;
  group: string;
  date: string;
  status: "Pendiente" | "En progreso" | "Completada" | "Vencida" | string;
  extra: string;
}

function Tareas() {
  const [tasks, setTasks] = useState<Tarea[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/tasks", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await response.json();
        setTasks(data || []);
      } catch (error) {
        console.error("Error al traer tareas de la BD:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTareas();
  }, []);

  // Filtro en tiempo real por búsqueda
  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  );

  // Cálculos dinámicos de métricas en memoria para los StatCards
  const countByStatus = (status: string) => tasks.filter(t => t.status === status).length;

  const getBadge = (status: string) => {
    switch (status) {
      case "Pendiente": return "bg-orange-100 text-orange-600";
      case "En progreso": return "bg-blue-100 text-blue-600";
      case "Completada": return "bg-green-100 text-green-600";
      case "Vencida": return "bg-red-100 text-red-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-200">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Mis tareas asignadas</h1>
        <p className="text-gray-500 mt-2 text-lg">Consulta y da seguimiento a las tareas operativas de tu entorno.</p>
      </div>

      {/* METRICAS DIRECTAS DE LA BD */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-5 mb-8">
        <StatCard title="Total de tareas" value={tasks.length} subtitle="Métricas globales" icon={ClipboardList} iconBg="bg-purple-100 text-purple-600" loading={loading} />
        <StatCard title="Pendientes" value={countByStatus("Pendiente")} subtitle="Por revisar" icon={Clock3} iconBg="bg-orange-100 text-orange-600" loading={loading} />
        <StatCard title="En progreso" value={countByStatus("En progreso")} subtitle="Activas" icon={TimerReset} iconBg="bg-blue-100 text-blue-600" loading={loading} />
        <StatCard title="Completadas" value={countByStatus("Completada")} subtitle="Finalizadas" icon={CircleCheckBig} iconBg="bg-green-100 text-green-600" loading={loading} />
        <StatCard title="Vencidas" value={countByStatus("Vencida")} subtitle="Fuera de fecha" icon={Clock3} iconBg="bg-red-100 text-red-600" loading={loading} />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col xl:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por título o descripción..."
              className="w-full h-14 border border-gray-200 rounded-xl pl-12 pr-4 outline-none focus:ring-2 focus:ring-[#6A0032]/20 focus:border-[#6A0032] transition"
            />
          </div>
        </div>

        {/* HEADERS */}
        <div className="grid grid-cols-12 px-6 py-4 text-sm text-gray-400 font-semibold border-b border-gray-100 bg-gray-50/50">
          <div className="col-span-5">TAREA</div>
          <div className="col-span-3">GRUPO</div>
          <div className="col-span-2">FECHA LÍMITE</div>
          <div className="col-span-2">ESTADO</div>
        </div>

        {/* LISTADO */}
        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-400 gap-2"><Loader2 className="animate-spin text-[#6A0032]" /> Cargando tareas...</div>
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No se encontraron tareas asignadas.</p>
        ) : (
          filteredTasks.map((task) => (
            <div key={task.id} className="grid grid-cols-12 px-6 py-5 items-center border-b border-gray-100 hover:bg-gray-50/50 transition">
              <div className="col-span-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-pink-50 text-[#6A0032] flex items-center justify-center shrink-0"><ClipboardList size={22} /></div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-base">{task.title}</h3>
                  <p className="text-gray-500 text-sm mt-1 max-w-lg line-clamp-2">{task.description}</p>
                </div>
              </div>
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500"><Users size={16} /></div>
                <span className="font-medium text-gray-700 text-sm truncate">{task.group}</span>
              </div>
              <div className="col-span-2 text-sm text-gray-700">
                <div className="flex items-center gap-2 font-medium"><CalendarDays size={15} className="text-gray-400" /> {task.date}</div>
                <p className="text-xs text-gray-400 mt-1">{task.extra}</p>
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getBadge(task.status)}`}>{task.status}</span>
                <ChevronRight className="text-gray-400" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Tareas;