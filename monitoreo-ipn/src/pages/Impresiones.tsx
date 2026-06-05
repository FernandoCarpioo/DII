import { useEffect, useState } from "react";
import { Printer, CheckCircle2, Clock, XCircle, Eye, Unlock, Loader2 } from "lucide-react";
import StatCard from "../components/dashboard/StatCard";

export interface TrabajoImpresion {
  id: string | number;
  nombre: string;
  depto: string;
  impresora: string;
  ip: string;
  archivo: string;
  tamaño: string;
  fecha: string;
  hora: string;
  estado: "Completado" | "Bloqueado" | "En proceso" | string;
}

function Impresiones() {
  const [trabajos, setTrabajos] = useState<TrabajoImpresion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpooler = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://148.204.107.52:5002/api/printing/jobs", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        setTrabajos(data || []);
      } catch (err) {
        console.error(err);
      } finally { 
        setLoading(false); 
      }
    };
    fetchSpooler();
  }, []);

  // Función para manejar el desbloqueo
  const handleDesbloquear = async (id: string | number) => {
    // Aquí puedes agregar un SweetAlert2 para confirmar antes de desbloquear
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://148.204.107.52:5002/api/printing/jobs/${id}/unblock`, {
        method: 'POST',
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (res.ok) {
        // Actualizamos el estado local para que UI cambie inmediatamente
        setTrabajos(prev => prev.map(trabajo => 
          trabajo.id === id ? { ...trabajo, estado: "En proceso" } : trabajo
        ));
      } else {
        console.error("Error al desbloquear el trabajo");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getMetric = (status: string) => trabajos.filter(t => t.estado === status).length;

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Impresiones</h1>
        <p className="text-sm text-gray-500 mt-1">Historial del servidor de impresión central de la DII.</p>
      </div>

      {/* METRICAS DINAMICAS DE IMPRESION */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Trabajos totales" value={trabajos.length} subtitle="Buffer mensual" icon={Printer} iconBg="bg-blue-50 text-blue-600" loading={loading} />
        <StatCard title="Completados" value={getMetric("Completado")} subtitle="Exitosos" icon={CheckCircle2} iconBg="bg-green-50 text-green-600" loading={loading} />
        <StatCard title="En proceso" value={getMetric("En proceso")} subtitle="En cola" icon={Clock} iconBg="bg-yellow-50 text-yellow-600" loading={loading} />
        <StatCard title="Bloqueados" value={getMetric("Bloqueado")} subtitle="Retenidos" icon={XCircle} iconBg="bg-red-50 text-red-600" loading={loading} />
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-semibold">Remitente</th>
                <th className="px-4 py-4 font-semibold">Impresora</th>
                <th className="px-4 py-4 font-semibold">Archivo</th>
                <th className="px-4 py-4 font-semibold">Fecha y hora</th>
                <th className="px-4 py-4 font-semibold">Estado</th>
                <th className="px-6 py-4 text-center font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr><td colSpan={6} className="py-10 text-center text-gray-400"><Loader2 className="animate-spin text-[#6A0032] inline mr-2"/> Leyendo cola de impresión...</td></tr>
              ) : (
                trabajos.map((trabajo) => (
                  <tr key={trabajo.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-pink-50 text-[#6A0032] flex items-center justify-center font-bold text-xs shrink-0">{trabajo.nombre.charAt(0)}</div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-800">{trabajo.nombre}</span>
                        <span className="text-[11px] text-gray-400">{trabajo.depto}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4"><span className="text-gray-800 font-medium block">{trabajo.impresora}</span><span className="text-xs text-gray-400">{trabajo.ip}</span></td>
                    <td className="px-4 py-4 text-gray-800 font-medium">{trabajo.archivo} <span className="text-xs text-gray-400 block font-normal">{trabajo.tamaño}</span></td>
                    <td className="px-4 py-4 text-xs text-gray-400"><span>{trabajo.fecha}</span><span className="block mt-0.5">{trabajo.hora}</span></td>
                    <td className="px-4 py-4">
                      <span className={`flex items-center gap-1.5 font-bold text-xs ${trabajo.estado === 'Completado' ? 'text-green-600' : trabajo.estado === 'Bloqueado' ? 'text-red-600' : 'text-yellow-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${trabajo.estado === 'Completado' ? 'bg-green-600' : trabajo.estado === 'Bloqueado' ? 'bg-red-600' : 'bg-yellow-600'}`}></span>
                        {trabajo.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-3 text-gray-400">
                        {trabajo.estado === 'Bloqueado' ? (
                          <button 
                            onClick={() => handleDesbloquear(trabajo.id)} 
                            className="hover:text-green-600 transition"
                            title="Desbloquear impresión"
                          >
                            <Unlock size={18}/>
                          </button>
                        ) : (
                          <button className="hover:text-[#6A0032] transition"><Eye size={18}/></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Impresiones;