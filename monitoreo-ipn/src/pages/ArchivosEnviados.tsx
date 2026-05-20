import { 
  Filter, 
  RotateCcw, 
  FileText, 
  FileImage, 
  FileArchive,
  Lock,
  Paperclip,
  Smile,
  Send,
  X
} from "lucide-react";

function ArchivosEnviados() {
  // Datos de ejemplo para la tabla
  const archivos = [
    { nombre: "Reporte_Mensual_Mayo.pdf", tamaño: "2.45 GB", remitente: "IT", destino: "Analistas", tipo: "Grupo", fecha: "31/05/2024 10:24 AM", estado: "Enviado", icon: FileText, color: "text-red-500" },
    { nombre: "Datos_Financieros.xlsx", tamaño: "890 MB", remitente: "IT", destino: "Departamento de Contaduría", tipo: "Grupo", fecha: "31/05/2024 09:15 AM", estado: "Enviado", icon: FileText, color: "text-green-500" },
    { nombre: "Instalador_Software.zip", tamaño: "7.80 GB", remitente: "IT", destino: "Redes Avanzadas", tipo: "Grupo", fecha: "29/05/2024 11:45 AM", estado: "Bloqueado", icon: FileArchive, color: "text-gray-500" },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Archivos enviados</h1>
        <p className="text-sm text-gray-500 mt-1">Consulta los archivos que has enviado a grupos o usuarios.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        
        <div className="lg:col-span-2 flex flex-col gap-6">
          
          {/* BARRA DE FILTROS */}
          <div className="flex flex-wrap items-end gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
              <label className="text-xs text-gray-500 font-medium">Rango de fechas</label>
              <input type="text" placeholder="01/05/2024 - 31/05/2024" className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full" />
            </div>
            
            <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
              <label className="text-xs text-gray-500 font-medium">Destino</label>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full bg-white">
                <option>Todos</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
              <label className="text-xs text-gray-500 font-medium">Tipo de destino</label>
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full bg-white">
                <option>Todos</option>
              </select>
            </div>

            <div className="flex gap-2">
              <button className="bg-[#6A0032] text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-[#850040] transition">
                <Filter size={16} /> Filtrar
              </button>
              <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-gray-50 transition">
                <RotateCcw size={16} /> Limpiar
              </button>
            </div>
          </div>

          {/* TABLA DE DATOS */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-white border-b border-gray-100 text-gray-500 font-medium">
                  <tr>
                    <th className="px-4 py-4 font-medium">Archivo</th>
                    <th className="px-4 py-4 font-medium">Tamaño</th>
                    <th className="px-4 py-4 font-medium">Remitente</th>
                    <th className="px-4 py-4 font-medium">Destino</th>
                    <th className="px-4 py-4 font-medium">Tipo de destino</th>
                    <th className="px-4 py-4 font-medium">Fecha y hora</th>
                    <th className="px-4 py-4 font-medium">Estado</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {archivos.map((archivo, index) => {
                    const Icono = archivo.icon;
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-4 flex items-center gap-3">
                          <Icono size={18} className={archivo.color} />
                          <span className="font-medium text-gray-800">{archivo.nombre}</span>
                        </td>
                        <td className="px-4 py-4">{archivo.tamaño}</td>
                        <td className="px-4 py-4">{archivo.remitente}</td>
                        <td className="px-4 py-4">{archivo.destino}</td>
                        <td className="px-4 py-4">{archivo.tipo}</td>
                        <td className="px-4 py-4">{archivo.fecha}</td>
                        <td className="px-4 py-4">
                          <span className="flex flex-col">
                            <span className={`flex items-center gap-1 font-medium ${archivo.estado === 'Bloqueado' ? 'text-red-600' : 'text-green-600'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${archivo.estado === 'Bloqueado' ? 'bg-red-600' : 'bg-green-600'}`}></span>
                              {archivo.estado}
                            </span>
                            {archivo.estado === 'Bloqueado' && <span className="text-[10px] text-gray-400">Límite: 5 GB</span>}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="p-4 border-t border-gray-100 text-xs text-gray-500">
              Mostrando 1 a 3 de 9 archivos
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">

          {/* ALERTA DE BLOQUEO */}
          <div className="bg-[#fff4ed] border border-[#ffdbce] rounded-xl p-4 flex gap-4 items-center">
            <div className="bg-white p-2 rounded-lg border border-[#ffdbce] text-[#c2410c]">
              <Lock size={20} />
            </div>
            <p className="text-sm text-[#9a3412]">
              Los archivos mayores a 5 GB no pueden ser enviados y serán bloqueados.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default ArchivosEnviados;