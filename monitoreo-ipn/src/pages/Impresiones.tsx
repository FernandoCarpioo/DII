import { 
  Printer, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Filter, 
  RotateCcw, 
  Search,
  Eye,
  Unlock,
  Trash2,
  Lock
} from "lucide-react";

function Impresiones() {
  // Datos simulados para la tabla
  const trabajos = [
    { inicial: "H", nombre: "Héctor", depto: "DII", impresora: "HP LaserJet Pro M404dw", ip: "192.168.1.45", archivo: "Reporte_Mensual_Mayo.pdf", tamaño: "2.45 MB", fecha: "31/05/2024", hora: "10:24 AM", estado: "Completado", accion: "view" },
    { inicial: "M", nombre: "María", depto: "Contaduría", impresora: "Epson L3210", ip: "192.168.1.23", archivo: "Estados_Financieros.xlsx", tamaño: "890 KB", fecha: "31/05/2024", hora: "09:15 AM", estado: "Completado", accion: "view" },
    { inicial: "M", nombre: "María", depto: "Contaduría", impresora: "Brother HL-L2360DW", ip: "192.168.1.67", archivo: "Manual_Usuario_V2.pdf", tamaño: "6.25 GB", fecha: "30/05/2024", hora: "02:10 PM", estado: "Bloqueado", accion: "unlock" },
    { inicial: "L", nombre: "Luis", depto: "Redes Avanzadas", impresora: "HP LaserJet Pro M404dw", ip: "192.168.1.45", archivo: "Instalador_Software.zip", tamaño: "7.80 GB", fecha: "29/05/2024", hora: "11:45 AM", estado: "Bloqueado", accion: "unlock" },
    { inicial: "J", nombre: "Juan", depto: "Analistas", impresora: "HP LaserJet Pro M404dw", ip: "192.168.1.45", archivo: "Imagen_Estructura.png", tamaño: "3.15 MB", fecha: "28/05/2024", hora: "05:20 PM", estado: "En proceso", accion: "view" }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* CABECERA */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Impresiones</h1>
        <p className="text-sm text-gray-500 mt-1">Consulta el historial de trabajos de impresión enviados en el sistema.</p>
      </div>

      {/* TARJETAS DE ESTADÍSTICAS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Tarjeta 1: Totales */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-blue-50 text-blue-600 p-3 rounded-full">
            <Printer size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">128</h3>
            <p className="text-xs font-medium text-gray-800">Trabajos totales</p>
            <p className="text-[11px] text-gray-400">este mes</p>
          </div>
        </div>

        {/* Tarjeta 2: Completados */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-green-50 text-green-600 p-3 rounded-full">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">112</h3>
            <p className="text-xs font-medium text-gray-800">Completados</p>
            <p className="text-[11px] text-gray-400">este mes</p>
          </div>
        </div>

        {/* Tarjeta 3: En proceso */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-yellow-50 text-yellow-600 p-3 rounded-full">
            <Clock size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">10</h3>
            <p className="text-xs font-medium text-gray-800">En proceso</p>
            <p className="text-[11px] text-gray-400">actualmente</p>
          </div>
        </div>

        {/* Tarjeta 4: Bloqueados */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="bg-red-50 text-red-600 p-3 rounded-full">
            <XCircle size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">6</h3>
            <p className="text-xs font-medium text-gray-800">Bloqueados</p>
            <p className="text-[11px] text-gray-400">este mes</p>
          </div>
        </div>
      </div>

      {/* CONTENEDOR DE FILTROS Y TABLA */}
      <div className="flex flex-col gap-6">
        
        {/* BARRA DE FILTROS */}
        <div className="flex flex-wrap items-end gap-4 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500 font-medium">Rango de fechas</label>
            <input type="text" placeholder="01/05/2024 - 31/05/2024" className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full outline-none focus:border-[#6A0032]" />
          </div>
          
          <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
            <label className="text-xs text-gray-500 font-medium">Impresora</label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full bg-white outline-none focus:border-[#6A0032]">
              <option>Todas</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-[150px]">
            <label className="text-xs text-gray-500 font-medium">Estado</label>
            <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm w-full bg-white outline-none focus:border-[#6A0032]">
              <option>Todos</option>
            </select>
          </div>

          <div className="flex flex-col gap-1 flex-1 min-w-[200px]">
            <label className="text-xs text-gray-500 font-medium">Archivo</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Buscar archivo..." className="border border-gray-300 rounded-lg pl-9 pr-3 py-2 text-sm w-full outline-none focus:border-[#6A0032]" />
            </div>
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

        {/* TABLA DE IMPRESIONES */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-white border-b border-gray-100 text-gray-500 font-medium">
                <tr>
                  <th className="px-4 py-4 font-medium">Remitente</th>
                  <th className="px-4 py-4 font-medium">Impresora</th>
                  <th className="px-4 py-4 font-medium">IP de la impresora</th>
                  <th className="px-4 py-4 font-medium">Archivo</th>
                  <th className="px-4 py-4 font-medium">Tamaño</th>
                  <th className="px-4 py-4 font-medium">Fecha y hora</th>
                  <th className="px-4 py-4 font-medium">Estado</th>
                  <th className="px-4 py-4 font-medium text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {trabajos.map((trabajo, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    
                    {/* Celda Remitente con Avatar */}
                    <td className="px-4 py-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#fceef3] text-[#6A0032] flex items-center justify-center font-bold text-xs shrink-0">
                        {trabajo.inicial}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-800">{trabajo.nombre}</span>
                        <span className="text-[11px] text-gray-400">{trabajo.depto}</span>
                      </div>
                    </td>
                    
                    <td className="px-4 py-4 text-gray-800">{trabajo.impresora}</td>
                    <td className="px-4 py-4">{trabajo.ip}</td>
                    <td className="px-4 py-4 font-medium text-gray-800">{trabajo.archivo}</td>
                    <td className={`px-4 py-4 font-medium ${trabajo.estado === 'Bloqueado' ? 'text-red-500' : 'text-gray-600'}`}>
                      {trabajo.tamaño}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span>{trabajo.fecha}</span>
                        <span className="text-[11px] text-gray-400">{trabajo.hora}</span>
                      </div>
                    </td>
                    
                    {/* Celda Estado */}
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className={`flex items-center gap-1.5 font-medium ${
                          trabajo.estado === 'Completado' ? 'text-green-600' :
                          trabajo.estado === 'Bloqueado' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            trabajo.estado === 'Completado' ? 'bg-green-600' :
                            trabajo.estado === 'Bloqueado' ? 'bg-red-600' : 'bg-yellow-600'
                          }`}></span>
                          {trabajo.estado}
                        </span>
                        {trabajo.estado === 'Bloqueado' && (
                          <span className="text-[10px] text-gray-400 ml-3">Límite: 5 GB</span>
                        )}
                      </div>
                    </td>

                    {/* Celda Acciones */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-3">
                        {trabajo.accion === 'view' ? (
                          <button className="text-gray-400 hover:text-[#6A0032] transition" title="Ver detalle">
                            <Eye size={18} />
                          </button>
                        ) : (
                          <>
                            <button className="text-gray-400 hover:text-[#6A0032] transition" title="Desbloquear">
                              <Unlock size={18} />
                            </button>
                            <button className="text-gray-400 hover:text-red-600 transition" title="Eliminar">
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t border-gray-100 text-xs text-gray-500">
            Mostrando 1 a 5 de 9 trabajos
          </div>
        </div>

        {/* ALERTA INFERIOR */}
        <div className="bg-[#fff4ed] border border-[#ffdbce] rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="bg-white p-2 rounded-lg border border-[#ffdbce] text-[#c2410c] shrink-0">
              <Lock size={20} />
            </div>
            <p className="text-sm text-[#9a3412]">
              <span className="font-semibold block sm:inline">Los trabajos de impresión con archivos mayores a 5 GB son bloqueados automáticamente. </span>
              Puedes desbloquearlos para permitir la impresión si es necesario.
            </p>
          </div>
          <button className="bg-[#4b0024] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#330018] transition whitespace-nowrap">
            Gestionar bloqueos
          </button>
        </div>

      </div>
    </div>
  );
}

export default Impresiones;