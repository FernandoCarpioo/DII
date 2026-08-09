import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Building2, Calendar, Laptop, ArrowUpRight, Loader2 } from "lucide-react";
import GroupsTable from "../../components/dashboard/GroupsTable";

// Importamos la interfaz para tipar la tabla real
import type { Grupo } from "../../components/dashboard/GroupsTable";

interface HistorialSesion {
  id: string | number;
  evento: string;
  dispositivo: string;
  hora: string;
}

function DashboardAnalista() {
  const navigate = useNavigate();

  // Estados para la base de datos
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [historialSesion, setHistorialSesion] = useState<HistorialSesion[]>([]);
  const [usuario, setUsuario] = useState({
    name: "Analista",
    grupoAsignado: "Cargando...",
    ubicacion: "DII",
    descripcionGrupo: "Cargando descripción del entorno..."
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalistaData = async () => {
      try {
        const token = localStorage.getItem("token");
        const savedName = localStorage.getItem("userName") || "Analista";

        // Petición al endpoint exclusivo del Analista
        const response = await fetch("http://localhost:5002/api/user/dashboard-summary", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Error al obtener datos del analista");
        }

        const data = await response.json();

        // Mapeamos los datos reales de la BD
        setGrupos(data.grupos || []);
        setHistorialSesion(data.historialSesion || []);
        setUsuario({
          name: savedName,
          grupoAsignado: data.perfilGrupo?.name || "Sin grupo asignado",
          ubicacion: data.perfilGrupo?.ubicacion || "DII",
          descripcionGrupo: data.perfilGrupo?.description || "No cuentas con una descripción de entorno configurada."
        });

      } catch (error) {
        console.error("Error conectando a la base de datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalistaData();
  }, []);

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-300">
      
      {/* HEADER DE BIENVENIDA DINÁMICO */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          ¡Bienvenido de nuevo, {usuario.name}! 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Consulta tus grupos asignados, tareas pendientes y las novedades de la DII.
        </p>
      </div>

      {/* TARJETA DE RESUMEN DEL GRUPO ASIGNADO */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-2 text-gray-500 font-semibold text-sm">
            <Users size={18} />
            <span>Mi entorno de trabajo</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-pink-100 text-[#6A0032] rounded-full flex items-center justify-center shrink-0">
              <Users size={28} />
            </div>
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-gray-800">
                  {loading ? "Buscando..." : usuario.grupoAsignado}
                </h2>
                <span className="bg-green-100 text-green-700 font-semibold text-xs px-3 py-1 rounded-full">
                  Activo
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Building2 size={16} />
            <span>Ubicación: {usuario.ubicacion}</span>
          </div>

          <div className="mt-2">
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Descripción</h5>
            {loading ? (
              <div className="h-4 bg-gray-100 rounded w-2/3 animate-pulse mt-2" />
            ) : (
              <p className="text-sm text-gray-600 leading-relaxed max-w-xl">
                {usuario.descripcionGrupo}
              </p>
            )}
          </div>
        </div>

        {/* ILUSTRACIÓN LADO DERECHO */}
        <div className="shrink-0 hidden md:block">
          <div className="w-32 h-32 flex items-center justify-center bg-gray-50 rounded-2xl p-4 border border-gray-100">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3201/3201558.png" 
              className="w-24 h-24 object-contain opacity-40 grayscale" 
              alt="Monitoreo" 
            />
          </div>
        </div>
      </div>

      {/* ELEMENTOS AUXILIARES: SECCIÓN DE TABLAS E HISTORIAL */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start w-full">
        
        {/* Tabla inyectada con los datos reales de la BD */}
        <div className="xl:col-span-8">
          <GroupsTable context="user" data={grupos} loading={loading} />
        </div>

        {/* Historial de sesión del día desde la base de datos */}
        <div className="xl:col-span-4 flex flex-col gap-4">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Calendar size={18} className="text-[#6A0032]" /> Historial de Sesión
            </h2>
            
            <div className="flex flex-col gap-3">
              {loading && (
                <div className="flex items-center justify-center py-6 gap-2 text-sm text-gray-400">
                  <Loader2 className="animate-spin text-[#6A0032]" size={16} />
                  Sincronizando accesos...
                </div>
              )}

              {!loading && historialSesion.length === 0 && (
                <p className="text-xs text-gray-400 text-center py-4">No hay logs de inicio de sesión hoy.</p>
              )}

              {!loading && historialSesion.map((sesion) => (
                <div key={sesion.id} className="p-3 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg text-gray-400 border border-gray-200">
                    <Laptop size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-gray-700 truncate">{sesion.evento}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5 truncate">{sesion.dispositivo}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">{sesion.hora}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ACCESO RÁPIDO */}
          <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
              <h4 className="font-bold text-sm text-gray-800">Tareas Asignadas</h4>
              <p className="text-xs text-gray-400 mt-0.5">Sube tus entregables pendientes.</p>
            </div>
            <button 
              onClick={() => navigate("/user/pendientes")}
              className="p-2.5 bg-pink-50 hover:bg-pink-100 text-[#6A0032] rounded-xl transition"
              title="Ir a Pendientes"
            >
              <ArrowUpRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default DashboardAnalista;