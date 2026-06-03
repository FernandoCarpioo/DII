import { useState, useEffect } from "react";
import { CalendarDays, Users, Type, AlignLeft, Loader2, X } from "lucide-react";
import Swal from "sweetalert2";

// Interfaz para el selector de grupos reales de la BD
interface GrupoSelect {
  id: string | number;
  name: string;
}

interface AsignarTareaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTareaCreada?: () => void; // Callback para refrescar vistas padres
  defaultGroup?: string;
}

function AsignarTareaModal({ isOpen, onClose, onTareaCreada }: AsignarTareaModalProps) {
  const [grupos, setGrupos] = useState<GrupoSelect[]>([]);
  const [loadingGrupos, setLoadingGrupos] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Campos del formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [groupName, setGroupName] = useState(""); // Mandamos el nombre o ID según tu API
  const [date, setDate] = useState("");

  // 1. Cargar la lista de grupos disponibles desde la BD para el menú desplegable
  useEffect(() => {
    if (!isOpen) return;
    const fetchGruposSelector = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/admin/grupos", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        // Mapeamos para el select
        setGrupos(data.map((g: any) => ({ id: g.id, name: g.title || g.name })));
      } catch (err) {
        console.error("Error al cargar grupos para el asignador:", err);
      } finally {
        setLoadingGrupos(false);
      }
    };
    fetchGruposSelector();
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !groupName || !date) {
      Swal.fire("Campos incompletos", "Por favor, llena todos los datos de la asignación.", "warning");
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      
      // Formatear la fecha a dd/mm/aaaa si tu base de datos la requiere como texto plano
      const [year, month, day] = date.split("-");
      const formattedDate = `${day}/${month}/${year}`;

      const response = await fetch("http://localhost:3000/api/tasks/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          description,
          group: groupName, // Se vincula al grupo correspondiente
          date: formattedDate,
          status: "Pendiente" // Toda tarea nueva inicia como pendiente
        })
      });

      if (!response.ok) throw new Error();

      Swal.fire("Tarea Asignada", "La actividad se distribuyó a los miembros del grupo.", "success");
      
      // Limpiar campos y cerrar
      setTitle("");
      setDescription("");
      setGroupName("");
      setDate("");
      if (onTareaCreada) onTareaCreada();
      onClose();

    } catch (err) {
      Swal.fire("Error", "No se pudo guardar la tarea en la base de datos.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* HEADER */}
        <div className="bg-[#6A0032] text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CalendarDays size={24} className="text-pink-200" />
            <div>
              <h2 className="text-xl font-bold">Asignar Nueva Tarea (Teams)</h2>
              <p className="text-xs text-pink-100/80 mt-0.5">La actividad aparecerá en el panel de los usuarios asignados.</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition">
            <X size={20} />
          </button>
        </div>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* TÍTULO */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Título de la actividad</label>
            <div className="border rounded-xl flex items-center px-4 h-14 bg-white focus-within:ring-2 focus-within:ring-[#6A0032]/20 focus-within:border-[#6A0032] transition">
              <Type size={18} className="text-gray-400 mr-3 shrink-0" />
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ej. Elaborar reporte mensual de actividades"
                className="w-full outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400"
                disabled={submitting}
              />
            </div>
          </div>

          {/* ASIGNACIÓN DE GRUPO */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Asignar al Grupo Destino</label>
            <div className="border rounded-xl flex items-center px-4 h-14 bg-white focus-within:ring-2 focus-within:ring-[#6A0032]/20 focus-within:border-[#6A0032] transition relative">
              <Users size={18} className="text-gray-400 mr-3 shrink-0" />
              <select
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                disabled={submitting || loadingGrupos}
                className="w-full outline-none bg-transparent text-sm text-gray-700 appearance-none cursor-pointer"
              >
                <option value="">Selecciona el equipo de trabajo</option>
                {grupos.map((g) => (
                  <option key={g.id} value={g.name}>{g.name}</option>
                ))}
              </select>
              <ChevronDown size={16} className="absolute right-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* FECHA LÍMITE */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Fecha de vencimiento</label>
            <div className="border rounded-xl flex items-center px-4 h-14 bg-white focus-within:ring-2 focus-within:ring-[#6A0032]/20 focus-within:border-[#6A0032] transition">
              <CalendarDays size={18} className="text-gray-400 mr-3 shrink-0" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full outline-none bg-transparent text-sm text-gray-700 appearance-none"
                disabled={submitting}
              />
            </div>
          </div>

          {/* DESCRIPCIÓN */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">Instrucciones o descripción</label>
            <div className="border rounded-xl flex items-start p-4 bg-white focus-within:ring-2 focus-within:ring-[#6A0032]/20 focus-within:border-[#6A0032] transition">
              <AlignLeft size={18} className="text-gray-400 mr-3 mt-0.5 shrink-0" />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe los entregables o criterios de aceptación..."
                className="w-full h-24 outline-none bg-transparent text-sm text-gray-800 placeholder-gray-400 resize-none"
                disabled={submitting}
              />
            </div>
          </div>

          {/* ACCIONES */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="h-11 px-5 rounded-xl border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="h-11 px-6 rounded-xl bg-[#6A0032] hover:bg-[#850040] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold text-sm flex items-center gap-2 shadow-xs active:scale-95 transition"
            >
              {submitting ? (
                <>
                  <Loader2 className="animate-spin" size={16} />
                  Asignando...
                </>
              ) : (
                "Asignar actividad"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import { ChevronDown } from "lucide-react"; // Auxiliar de UI
export default AsignarTareaModal;