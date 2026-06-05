import { useEffect, useState } from "react";
import { Monitor, RefreshCcw, Loader2 } from "lucide-react";

interface PC {
  id: string;
  ubi: string;
  estado: "encendido" | "apagado" | "sin-conexion" | string;
}

interface Departamento {
  id: string;
  nombre: string;
  equiposTotales: number;
  estadoGlobal: string;
  equipos: PC[];
  ocultos: number;
}

function Equipos() {
  const [data, setData] = useState<Departamento[]>([]);
  const [totals, setTotals] = useState({ total: 0, on: 0, off: 0, disconnected: 0 });
  const [loading, setLoading] = useState(true);

  const fetchEquiposTree = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://148.204.107.52:5002/api/infrastructure/devices", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      const resData = await res.json();
      setData(resData.departamentos || []);
      setTotals(resData.totales || { total: 0, on: 0, off: 0, disconnected: 0 });
    } catch (err) {
      console.error("Error en topología de red:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquiposTree();
  }, []);

  const getStatusColor = (estado: string) => {
    switch(estado) {
      case 'encendido': return 'bg-green-500';
      case 'apagado': return 'bg-red-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in duration-200">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-gray-800">Topología de Equipos</h1>
          <p className="text-sm text-gray-500 mt-1">Monitoreo del parque computacional conectado a la red institucional.</p>
        </div>
        <button onClick={fetchEquiposTree} className="h-12 bg-white border border-[#6A0032] text-[#6A0032] px-5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-pink-50 transition shadow-xs">
          <RefreshCcw size={16} /> Actualizar nodos
        </button>
      </div>

      {/* METRICAS TOTALES */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-wrap items-center justify-between gap-6">
        <div className="flex flex-wrap items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-pink-50 p-3 rounded-2xl text-[#6A0032]"><Monitor size={22} /></div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{loading ? "..." : totals.total}</p>
              <p className="text-xs text-gray-400 font-medium">Inventariados</p>
            </div>
          </div>
          <div className="h-8 w-px bg-gray-200 hidden sm:block"></div>
          <div>
            <p className="text-xl font-bold text-gray-800 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> {loading ? "..." : totals.on}</p>
            <p className="text-xs text-gray-400 font-medium">Activos</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800 flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> {loading ? "..." : totals.off}</p>
            <p className="text-xs text-gray-400 font-medium">Apagados</p>
          </div>
        </div>
      </div>

      {/* ÁRBOL DE RED */}
      <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center py-16 text-gray-400 gap-2"><Loader2 className="animate-spin text-[#6A0032]"/> Mapeando directorios activos...</div>
        ) : (
          <div className="min-w-[1000px] flex flex-col items-center">
            <div className="flex justify-center w-full">
              {data.map((dept) => (
                <div key={dept.id} className="relative flex flex-col items-center flex-1 px-2">
                  <div className="border border-gray-100 rounded-2xl p-4 flex flex-col items-center gap-2 w-full max-w-[220px] bg-white relative z-10 shadow-xs">
                    <div className="flex items-start gap-3 w-full">
                      <div className="bg-pink-50 text-[#6A0032] p-2 rounded-xl shrink-0"><Monitor size={18} /></div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs font-bold text-gray-800 truncate leading-tight">{dept.nombre}</h3>
                        <p className="text-[10px] text-gray-400 mt-1 font-medium">{dept.equiposTotales} terminales</p>
                      </div>
                      <span className={`w-2 h-2 rounded-full shrink-0 mt-1 ${getStatusColor(dept.estadoGlobal)}`}></span>
                    </div>
                  </div>

                  <div className="w-full max-w-[220px] mt-4 flex flex-col relative">
                    <div className="absolute left-[20px] top-0 bottom-6 w-px bg-gray-200"></div>
                    {dept.equipos?.map((equipo) => (
                      <div key={equipo.id} className="relative flex items-center mb-3 ml-8">
                        <div className="absolute -left-[12px] w-[12px] h-px bg-gray-200"></div>
                        <div className="border border-gray-100 rounded-xl p-2.5 flex items-center gap-3 bg-white w-full shadow-2xs">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-gray-800 truncate leading-none">{equipo.id}</h4>
                            <p className="text-[10px] text-gray-400 mt-1 truncate">{equipo.ubi}</p>
                          </div>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(equipo.estado)}`}></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Equipos;