import { 
  Monitor, 
  Calculator, 
  Users, 
  Server, 
  PieChart, 
  GraduationCap, 
  ChevronDown, 
  RefreshCcw 
} from "lucide-react";

// 1. LA BASE DE DATOS MOCK (Esto vendrá de tu API en el futuro)
const organizacionData = {
  raiz: {
    nombre: "Dirección General",
    equipos: 1,
    estado: "encendido"
  },
  departamentos: [
    {
      id: "contaduria",
      nombre: "Departamento de Contaduría",
      equiposTotales: 8,
      icon: Calculator,
      estadoGlobal: "encendido",
      colorIcono: "text-[#6A0032]", // Guinda IPN
      bgIcono: "bg-[#fceef3]",
      equipos: [
        { id: "PC-CON-01", ubi: "Oficina 101", estado: "encendido" },
        { id: "PC-CON-02", ubi: "Oficina 102", estado: "encendido" },
        { id: "PC-CON-03", ubi: "Oficina 103", estado: "apagado" },
      ],
      ocultos: 5
    },
    {
      id: "rrhh",
      nombre: "Departamento de Recursos Humanos",
      equiposTotales: 6,
      icon: Users,
      estadoGlobal: "encendido",
      colorIcono: "text-[#6A0032]",
      bgIcono: "bg-[#fceef3]",
      equipos: [
        { id: "PC-RH-01", ubi: "Oficina 201", estado: "encendido" },
        { id: "PC-RH-02", ubi: "Oficina 202", estado: "encendido" },
        { id: "PC-RH-03", ubi: "Oficina 203", estado: "encendido" },
      ],
      ocultos: 3
    },
    {
      id: "sistemas",
      nombre: "Departamento de Sistemas",
      equiposTotales: 10,
      icon: Server,
      estadoGlobal: "encendido",
      colorIcono: "text-[#6A0032]",
      bgIcono: "bg-[#fceef3]",
      equipos: [
        { id: "PC-SIS-01", ubi: "Laboratorio 1", estado: "encendido" },
        { id: "PC-SIS-02", ubi: "Laboratorio 2", estado: "encendido" },
        { id: "PC-SIS-03", ubi: "Laboratorio 3", estado: "encendido" },
      ],
      ocultos: 7
    },
    {
      id: "planeacion",
      nombre: "Departamento de Planeación",
      equiposTotales: 5,
      icon: PieChart,
      estadoGlobal: "apagado",
      colorIcono: "text-[#6A0032]",
      bgIcono: "bg-[#fceef3]",
      equipos: [
        { id: "PC-PLA-01", ubi: "Oficina 301", estado: "apagado" },
        { id: "PC-PLA-02", ubi: "Oficina 302", estado: "apagado" },
        { id: "PC-PLA-03", ubi: "Oficina 403", estado: "sin-conexion" },
      ],
      ocultos: 2
    },
    {
      id: "escolares",
      nombre: "Departamento de Servicios Escolares",
      equiposTotales: 3,
      icon: GraduationCap,
      estadoGlobal: "apagado",
      colorIcono: "text-[#6A0032]",
      bgIcono: "bg-[#fceef3]",
      equipos: [
        { id: "PC-SE-01", ubi: "Oficina 401", estado: "apagado" },
        { id: "PC-SE-02", ubi: "Oficina 402", estado: "apagado" },
        { id: "PC-SE-03", ubi: "Oficina 403", estado: "apagado" },
      ],
      ocultos: 0
    }
  ]
};

// Función auxiliar para los colores de estado
const getStatusColor = (estado: string) => {
  switch(estado) {
    case 'encendido': return 'bg-green-500';
    case 'apagado': return 'bg-red-500';
    case 'sin-conexion': return 'bg-gray-400';
    default: return 'bg-gray-200';
  }
};

function Equipos() {
  return (
    <div className="flex flex-col gap-6 w-full">
      
      {/* CABECERA */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Equipos</h1>
        <p className="text-sm text-gray-500 mt-1">Visualiza el estado y la distribución de los equipos conectados.</p>
      </div>

      {/* BARRA DE ESTADÍSTICAS */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-red-50 p-2 rounded-lg text-[#6A0032]">
              <Monitor size={20} />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-800">32</p>
              <p className="text-xs text-gray-500">Equipos totales</p>
            </div>
          </div>
          
          <div className="h-8 w-px bg-gray-200"></div>
          
          <div>
            <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500"></span> 24
            </p>
            <p className="text-xs text-gray-500">Encendidos</p>
          </div>
          
          <div>
            <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500"></span> 8
            </p>
            <p className="text-xs text-gray-500">Apagados</p>
          </div>

          <div>
            <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-gray-400"></span> 0
            </p>
            <p className="text-xs text-gray-500">Sin conexión</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm bg-white outline-none focus:border-[#6A0032] min-w-[200px]">
            <option>Todos los grupos</option>
          </select>
          <button className="bg-white border border-[#6A0032] text-[#6A0032] px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-red-50 transition">
            <RefreshCcw size={16} /> Actualizar estado
          </button>
        </div>
      </div>

      {/* ÁRBOL ORGANIZACIONAL */}
      <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <div className="min-w-[1000px] flex flex-col items-center">
          
          {/* NODO RAÍZ (Dirección General) */}
          <div className="flex flex-col items-center">
            <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 w-64 bg-white relative z-10">
              <div className="bg-[#fceef3] text-[#6A0032] p-2 rounded-lg">
                <Monitor size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800">{organizacionData.raiz.nombre}</h3>
                <p className="text-xs text-gray-500">{organizacionData.raiz.equipos} equipo</p>
              </div>
              <span className={`w-2 h-2 rounded-full absolute top-4 right-4 ${getStatusColor(organizacionData.raiz.estado)}`}></span>
            </div>
            {/* Línea vertical central que baja de la raíz */}
            <div className="w-px h-8 bg-gray-300"></div>
          </div>

          {/* DEPARTAMENTOS Y SUS EQUIPOS */}
          <div className="flex justify-center w-full">
            {organizacionData.departamentos.map((dept, index) => {
              const IconoDept = dept.icon;
              
              return (
                <div key={dept.id} className="relative flex flex-col items-center flex-1 px-2">
                  
                  {/* TRUCO CSS: Las líneas horizontales superiores */}
                  {/* Dibuja la línea izquierda si no es el primer elemento */}
                  {index !== 0 && <div className="absolute top-0 left-0 w-1/2 h-px bg-gray-300"></div>}
                  {/* Dibuja la línea derecha si no es el último elemento */}
                  {index !== organizacionData.departamentos.length - 1 && <div className="absolute top-0 right-0 w-1/2 h-px bg-gray-300"></div>}
                  
                  {/* Línea vertical que conecta la línea horizontal con la tarjeta del departamento */}
                  <div className="w-px h-8 bg-gray-300 absolute top-0"></div>

                  {/* TARJETA DEL DEPARTAMENTO */}
                  <div className="border border-gray-200 rounded-xl p-3 flex flex-col items-center gap-2 w-full max-w-[220px] bg-white mt-8 relative z-10 shadow-sm">
                    <div className="flex items-start gap-3 w-full">
                      <div className={`${dept.bgIcono} ${dept.colorIcono} p-2 rounded-lg shrink-0`}>
                        <IconoDept size={18} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xs font-bold text-gray-800 leading-tight">{dept.nombre}</h3>
                        <p className="text-[10px] text-gray-500 mt-0.5">{dept.equiposTotales} equipos</p>
                      </div>
                      <span className={`w-2 h-2 rounded-full shrink-0 mt-1 ${getStatusColor(dept.estadoGlobal)}`}></span>
                    </div>
                  </div>

                  {/* LISTA DE EQUIPOS TIPO ÁRBOL (Sub-ramas) */}
                  <div className="w-full max-w-[220px] mt-4 flex flex-col relative">
                    
                    {/* Línea vertical que baja a lo largo de las PCs */}
                    <div className="absolute left-[28px] top-0 bottom-8 w-px bg-gray-300"></div>

                    {dept.equipos.map((equipo) => (
                      <div key={equipo.id} className="relative flex items-center mb-3 ml-12">
                        {/* Gancho horizontal hacia la PC */}
                        <div className="absolute -left-[20px] w-[20px] h-px bg-gray-300"></div>
                        
                        {/* Tarjeta de la PC */}
                        <div className="border border-gray-200 rounded-lg p-2 flex items-center gap-3 bg-white w-full shadow-sm">
                          <Monitor size={14} className={getStatusColor(equipo.estado).replace('bg-', 'text-')} />
                          <div className="flex-1">
                            <h4 className="text-[11px] font-bold text-gray-800 leading-none">{equipo.id}</h4>
                            <p className="text-[9px] text-gray-500 mt-1">{equipo.ubi}</p>
                          </div>
                          <span className={`w-1.5 h-1.5 rounded-full ${getStatusColor(equipo.estado)}`}></span>
                        </div>
                      </div>
                    ))}

                    {/* Botón de "Ver X más" */}
                    {dept.ocultos > 0 && (
                      <button className="text-[10px] text-gray-500 font-medium flex items-center justify-center gap-1 mt-2 hover:text-gray-800">
                        Ver {dept.ocultos} más <ChevronDown size={12} />
                      </button>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* PIE DE PÁGINA (Leyenda) */}
      <div className="flex justify-between items-center text-xs text-gray-500 px-2 mt-2">
        <div className="flex gap-6">
          <span className="font-medium text-gray-600">Estado del equipo:</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500"></div> Encendido</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div> Apagado</span>
          <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-gray-400"></div> Sin conexión</span>
        </div>
        <div className="flex items-center gap-2">
          <span>Última actualización: 10:24 AM</span>
          <RefreshCcw size={12} className="cursor-pointer hover:text-gray-800" />
        </div>
      </div>

    </div>
  );
}

export default Equipos;