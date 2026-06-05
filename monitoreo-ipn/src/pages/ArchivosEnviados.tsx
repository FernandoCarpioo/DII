import { useEffect, useState } from "react";
import { FileText, FileArchive, Lock, Loader2 } from "lucide-react";

export interface Archivo {
  id: string | number;
  nombre: string;
  tamaño: string;
  remitente: string;
  destino: string;
  tipo: string;
  fecha: string;
  estado: "Enviado" | "Bloqueado" | string;
}

function ArchivosEnviados() {
  const [archivos, setArchivos] = useState<Archivo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArchivos = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://148.204.107.52:5002/api/files/sent", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        setArchivos(data || []);
      } catch (err) {
        console.error("Error en BD de archivos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchArchivos();
  }, []);

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">Archivos enviados</h1>
        <p className="text-sm text-gray-500 mt-1">Consulta la auditoría de documentos distribuidos en los servidores.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Archivo</th>
                    <th className="px-4 py-4 font-semibold">Tamaño</th>
                    <th className="px-4 py-4 font-semibold">Destino</th>
                    <th className="px-4 py-4 font-semibold">Fecha y hora</th>
                    <th className="px-6 py-4 font-semibold">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400">
                        <div className="flex justify-center gap-2 items-center"><Loader2 className="animate-spin text-[#6A0032]" size={16}/> Leyendo almacenamiento seguro...</div>
                      </td>
                    </tr>
                  ) : archivos.length === 0 ? (
                    <tr><td colSpan={5} className="py-10 text-center text-gray-400">No hay registros de envío.</td></tr>
                  ) : (
                    archivos.map((archivo) => (
                      <tr key={archivo.id} className="hover:bg-gray-50/50 transition">
                        <td className="px-6 py-4 flex items-center gap-3">
                          {archivo.nombre.endsWith(".zip") ? <FileArchive size={18} className="text-purple-500" /> : <FileText size={18} className="text-[#6A0032]" />}
                          <span className="font-medium text-gray-800">{archivo.nombre}</span>
                        </td>
                        <td className="px-4 py-4 text-gray-500">{archivo.tamaño}</td>
                        <td className="px-4 py-4 text-gray-700 font-medium">{archivo.destino} <span className="text-xs text-gray-400 font-normal">({archivo.tipo})</span></td>
                        <td className="px-4 py-4 text-gray-400 text-xs">{archivo.fecha}</td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 font-bold text-xs ${archivo.estado === 'Bloqueado' ? 'text-red-600' : 'text-green-600'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${archivo.estado === 'Bloqueado' ? 'bg-red-600' : 'bg-green-600'}`}></span>
                            {archivo.estado}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-[#fff4ed] border border-[#ffdbce] rounded-2xl p-5 flex gap-4 items-start shadow-xs">
            <div className="bg-white p-2 rounded-xl border border-[#ffdbce] text-[#c2410c] shrink-0"><Lock size={20} /></div>
            <p className="text-sm text-[#9a3412] leading-relaxed">
              <span className="font-bold block mb-1">Directiva de Infraestructura:</span>
              Los archivos mayores a 5 GB son interceptados para mitigar la saturación de los servidores institucionales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArchivosEnviados;