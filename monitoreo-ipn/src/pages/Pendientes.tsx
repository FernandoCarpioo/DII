import { useEffect, useState, useRef } from "react"
import {
  ClipboardList,
  Clock3,
  CircleCheckBig,
  TimerReset,
  Search,
  ChevronRight,
  CalendarDays,
  Users,
  Loader2,
  X,
  UploadCloud,
  FileText
} from "lucide-react"
import Swal from "sweetalert2"

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

  const [selectedTask, setSelectedTask] = useState<Tarea | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userId = localStorage.getItem("userId");

  const fetchTareas = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5002/api/tareas?userId=${userId}`);
      if (!response.ok) throw new Error("Error al cargar tareas");
      const data = await response.json();
      setTasks(data || []);
    } catch (error) {
      console.error("Error al traer tareas de la BD:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchTareas();
    }
  }, [userId]);

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(search.toLowerCase()) || 
    t.description.toLowerCase().includes(search.toLowerCase())
  );

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

  const handleTaskClick = (task: Tarea) => {
    setSelectedTask(task);
    setFileToUpload(null);
    setIsModalOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileToUpload(e.target.files[0]);
    }
  };

  const handleUploadEvidence = async () => {
    if (!fileToUpload || !selectedTask) return;

    setUploading(true);
    
    // Usamos FormData porque estamos enviando un archivo físico, no JSON
    const formData = new FormData();
    formData.append("evidencia", fileToUpload);
    formData.append("tarea_id", selectedTask.id.toString());
    formData.append("usuario_id", userId || "");

    try {
      const response = await fetch("http://localhost:5002/api/evidencias", {
        method: "POST",
        body: formData,

      });

      if (!response.ok) throw new Error("Error al subir archivo");

      Swal.fire({
        icon: "success",
        title: "Evidencia enviada",
        text: "Tu trabajo ha sido registrado exitosamente.",
        timer: 2000,
        showConfirmButton: false
      });
      
      setIsModalOpen(false);
      fetchTareas(); 
      
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Error", text: "Hubo un problema al subir tu archivo." });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full animate-in fade-in duration-200 relative">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Mis tareas asignadas</h1>
        <p className="text-gray-500 mt-2 text-lg">Consulta y da seguimiento a las tareas operativas de tu entorno.</p>
      </div>

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

        <div className="grid grid-cols-12 px-6 py-4 text-sm text-gray-400 font-semibold border-b border-gray-100 bg-gray-50/50">
          <div className="col-span-5">TAREA</div>
          <div className="col-span-3">GRUPO</div>
          <div className="col-span-2">FECHA LÍMITE</div>
          <div className="col-span-2">ESTADO</div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-gray-400 gap-2"><Loader2 className="animate-spin text-[#6A0032]" /> Cargando tareas...</div>
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-400 py-12">No se encontraron tareas asignadas.</p>
        ) : (
          filteredTasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => handleTaskClick(task)}
              className="grid grid-cols-12 px-6 py-5 items-center border-b border-gray-100 hover:bg-gray-50/50 transition cursor-pointer group"
            >
              <div className="col-span-5 flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-pink-50 text-[#6A0032] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"><ClipboardList size={22} /></div>
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
              </div>
              <div className="col-span-2 flex items-center justify-between">
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${getBadge(task.status)}`}>{task.status}</span>
                <ChevronRight className="text-gray-300 group-hover:text-[#6A0032] group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* ================================================== */}
      {/* VER DETALLES Y SUBIR EVIDENCIA      */}
      {/* ================================================== */}
      {isModalOpen && selectedTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative p-8 animate-in fade-in zoom-in-95 duration-200">
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-6 right-6 p-2 bg-gray-50 rounded-full hover:bg-gray-200 transition text-gray-500"
            >
              <X size={20} />
            </button>
            
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4 pr-10">
              <div className="w-12 h-12 bg-pink-50 text-[#6A0032] rounded-xl flex items-center justify-center shrink-0">
                <ClipboardList size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 leading-tight">{selectedTask.title}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <span className={`px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${getBadge(selectedTask.status)}`}>
                    {selectedTask.status}
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <CalendarDays size={14}/> Límite: {selectedTask.date}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Instrucciones</h4>
              <p className="text-gray-700 text-sm bg-gray-50 p-4 rounded-xl border border-gray-100">
                {selectedTask.description || "No hay instrucciones adicionales."}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-6">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Evidencia de Trabajo</h4>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
              />

              {!fileToUpload ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#6A0032] hover:bg-pink-50/30 transition group"
                >
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:text-[#6A0032] group-hover:bg-white transition mb-3">
                    <UploadCloud size={24} />
                  </div>
                  <p className="font-semibold text-gray-700">Haz clic para seleccionar un archivo</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOCX, JPG o PNG (Max. 10MB)</p>
                </div>
              ) : (
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                      <FileText size={20} />
                    </div>
                    <div className="truncate">
                      <p className="text-sm font-bold text-blue-900 truncate">{fileToUpload.name}</p>
                      <p className="text-xs text-blue-600/70">{(fileToUpload.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setFileToUpload(null)}
                    className="p-2 hover:bg-blue-100 rounded-full text-blue-400 hover:text-blue-600 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="px-6 h-11 bg-gray-100 hover:bg-gray-200 text-gray-600 font-semibold rounded-xl transition text-sm"
              >
                Cerrar
              </button>
              <button 
                onClick={handleUploadEvidence}
                disabled={!fileToUpload || uploading}
                className="px-6 h-11 bg-[#6A0032] hover:bg-[#850040] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition text-sm shadow-sm"
              >
                {uploading ? (
                  <><Loader2 size={16} className="animate-spin" /> Subiendo...</>
                ) : (
                  <><UploadCloud size={16} /> Enviar Evidencia</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Tareas;