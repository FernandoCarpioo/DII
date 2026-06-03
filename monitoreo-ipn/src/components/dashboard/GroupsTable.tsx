import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Eye, X, Users, Shield, Monitor, Loader2 } from "lucide-react";

// Interfaz exportada para mapear el modelo de la Base de Datos
export interface Grupo {
  id: number | string;
  name: string;
  admin: string;
  devices: number;
  status: "Activo" | "Inactivo" | string;
  description: string;
  ubicacion: string;
  fechaCreacion: string;
}

interface GroupsTableProps {
  context?: 'admin' | 'user';
  data: Grupo[];         // Aquí caerán los datos reales de la BD
  loading?: boolean;     // Para mostrar feedback visual de carga
}

function GroupsTable({ context = 'user', data, loading = false }: GroupsTableProps) {
  const navigate = useNavigate();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Grupo | null>(null);

  const handleOpenModal = (group: Grupo) => {
    setSelectedGroup(group);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedGroup(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">

      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Grupos de trabajo
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Administración de grupos y equipos institucionales.
          </p>
        </div>

        {context === "admin" && (
          <button 
            onClick={() => navigate("/admin/grupos/crear")}
            className="bg-[#6A0032] text-white px-4 py-2 rounded-xl hover:bg-[#850040] transition text-sm font-semibold flex items-center gap-2 shadow-sm"
          >
            <Plus size={16} /> Crear grupo
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead>
            <tr className="text-gray-500 text-sm border-b border-gray-100">
              <th className="pb-4 font-semibold">Grupo</th>
              <th className="pb-4 font-semibold">Administrador</th>
              <th className="pb-4 font-semibold">Equipos</th>
              <th className="pb-4 font-semibold">Estado</th>
              <th className="pb-4 text-center font-semibold">Acciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-50">
            {/* Loader de Base de Datos */}
            {loading && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="animate-spin text-[#6A0032]" size={18} />
                    Cargando grupos desde la base de datos...
                  </div>
                </td>
              </tr>
            )}

            {/* Caso sin registros en BD */}
            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-400">
                  No se encontraron grupos registrados.
                </td>
              </tr>
            )}

            {/* Renderizado de filas */}
            {!loading && data.map((group) => (
              <tr key={group.id} className="hover:bg-gray-50/50 transition">
                <td className="py-4 font-medium text-gray-800">
                  {group.name}
                </td>
                <td className="py-4">{group.admin}</td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-gray-50 rounded-lg border text-xs font-medium">
                    {group.devices} PCs
                  </span>
                </td>
                <td className="py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      group.status === "Activo" || group.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {group.status}
                  </span>
                </td>
                <td className="py-4 text-center">
                  <button 
                    onClick={() => handleOpenModal(group)}
                    className="text-[#6A0032] hover:text-[#850040] font-semibold text-xs flex items-center gap-1 justify-center mx-auto bg-pink-50/50 px-3 py-1.5 rounded-lg hover:bg-pink-50 transition"
                  >
                    <Eye size={14} /> Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL DETALLES */}
      {isOpen && selectedGroup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4 transition-all duration-300">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative border border-gray-100 animate-in fade-in zoom-in-95 duration-200">
            
            <div className="bg-[#6A0032] text-white p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-pink-200" />
                <div>
                  <h3 className="text-xl font-bold">{selectedGroup.name}</h3>
                  <p className="text-xs text-pink-100 mt-0.5">ID de control: #{selectedGroup.id}</p>
                </div>
              </div>
              <button onClick={handleCloseModal} className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-5">
              <div>
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Descripción del Grupo</h4>
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                  {selectedGroup.description || "Sin descripción disponible."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Administrador</span>
                  <span className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 flex items-center gap-2">
                    <Shield size={16} className="text-[#6A0032]" /> {selectedGroup.admin}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dispositivos Vinculados</span>
                  <span className="text-sm font-semibold text-gray-800 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 flex items-center gap-2">
                    <Monitor size={16} className="text-blue-600" /> {selectedGroup.devices} Equipos
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Ubicación Física</span>
                  <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                    {selectedGroup.ubicacion}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Fecha de Alta</span>
                  <span className="text-sm font-medium text-gray-700 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100">
                    {selectedGroup.fechaCreacion}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-2">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Estado Operativo</span>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  selectedGroup.status === "Activo" || selectedGroup.status === "active"
                    ? "bg-green-100 text-green-700 flex items-center gap-1.5" 
                    : "bg-red-100 text-red-700 flex items-center gap-1.5"
                }`}>
                  <span className={`w-2 h-2 rounded-full ${selectedGroup.status === "Activo" || selectedGroup.status === "active" ? "bg-green-600" : "bg-red-600"}`} />
                  {selectedGroup.status}
                </span>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default GroupsTable;