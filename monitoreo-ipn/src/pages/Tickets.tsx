import { useState } from "react"
import { ChevronDown, Ticket, Info, Paperclip, Loader2 } from "lucide-react"
import Swal from "sweetalert2"
import FileUpload from "../components/Envio/FileUpload"

function Tickets() {
  const [area, setArea] = useState("");
  const [equipo, setEquipo] = useState("");
  const [usuario, setUsuario] = useState("");
  const [description, setDescription] = useState("");
  const [evidencias, setEvidencias] = useState<File[]>([]); // Estado para capturar los archivos de FileUpload
  const [enviando, setEnviando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!area || !equipo || !usuario.trim() || !description.trim()) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa la información obligatoria marcada con (*).",
        icon: "warning",
        confirmButtonColor: "#6A0032"
      });
      return;
    }

    setEnviando(true);

    try {
      const token = localStorage.getItem("token");
      
      // 1. Instanciamos FormData para poder mandar archivos binarios a la BD
      const formData = new FormData();
      formData.append("area", area);
      formData.append("equipo", equipo);
      formData.append("usuario", usuario);
      formData.append("description", description);
      
      evidencias.forEach((file) => {
        formData.append("evidencia", file); 
      });

      const response = await fetch("http://localhost:3000/api/tickets", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}` 
        },
        body: formData
      });

      if (!response.ok) throw new Error();

      Swal.fire({
        title: "¡Ticket Creado!",
        text: "La solicitud de soporte fue guardada en la base de datos.",
        icon: "success",
        confirmButtonColor: "#6A0032"
      });

      setArea("");
      setEquipo("");
      setUsuario("");
      setDescription("");
      setEvidencias([]);

    } catch (error) {
      Swal.fire({
        title: "Error de red",
        text: "No se pudo sincronizar el reporte con la base de datos central.",
        icon: "error",
        confirmButtonColor: "#6A0032"
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-200">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Crear nuevo ticket</h1>
        <p className="text-gray-500 mt-2 text-lg">
          Completa la información para generar tu solicitud de soporte de manera segura.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* FORM */}
        <div className="xl:col-span-8">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#6A0032] flex items-center justify-center">
                <Ticket size={20} />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">Información del ticket</h2>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Área <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={area} onChange={(e) => setArea(e.target.value)} disabled={enviando} className="w-full h-14 border border-gray-200 rounded-xl px-4 appearance-none outline-none focus:ring-2 focus:ring-[#6A0032]/20 focus:border-[#6A0032] bg-white text-sm text-gray-700 disabled:opacity-60">
                      <option value="">Selecciona el área</option>
                      <option value="Dirección General">Dirección General</option>
                      <option value="Sistemas">Sistemas</option>
                      <option value="Proyecto 1">Proyecto 1</option>
                      <option value="Contaduría">Contaduría</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Equipo <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={equipo} onChange={(e) => setEquipo(e.target.value)} disabled={enviando} className="w-full h-14 border border-gray-200 rounded-xl px-4 appearance-none outline-none focus:ring-2 focus:ring-[#6A0032]/20 focus:border-[#6A0032] bg-white text-sm text-gray-700 disabled:opacity-60">
                      <option value="">Selecciona el equipo</option>
                      <option value="Equipo Dell 001">Equipo Dell 001</option>
                      <option value="Equipo HP 003">Equipo HP 003</option>
                      <option value="Laptop Lenovo 008">Laptop Lenovo 008</option>
                    </select>
                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Nombre de usuario <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  disabled={enviando}
                  placeholder="Ingresa el nombre completo del solicitante"
                  className="w-full h-14 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#6A0032]/20 focus:border-[#6A0032] text-sm text-gray-700 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Descripción <span className="text-red-500">*</span></label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} disabled={enviando} placeholder="Describe el problema o solicitud en detalle..." className="w-full h-40 border border-gray-200 rounded-xl px-4 py-4 outline-none resize-none focus:ring-2 focus:ring-[#6A0032]/20 focus:border-[#6A0032] text-sm text-gray-700 disabled:opacity-60" />
              </div>

              {/* UPLOAD CONECTADO AL ESTADO PADRE */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-700">Evidencia <span className="text-gray-400 font-normal ml-1">(opcional)</span></label>
                <FileUpload onChangeFiles={setEvidencias} />
                <p className="text-xs text-gray-400 mt-3">
                  Formatos permitidos: JPG, PNG, PDF, DOCX (Máx. 10 MB por archivo)
                </p>
              </div>

              {/* BOTONES INTERACTIVOS */}
              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={enviando}
                  className="h-12 px-6 rounded-xl bg-[#6A0032] hover:bg-[#850040] disabled:bg-gray-400 disabled:cursor-not-allowed transition text-white font-semibold text-sm flex items-center gap-2 shadow-xs active:scale-95"
                >
                  {enviando ? (
                    <>
                      <Loader2 className="animate-spin" size={16} />
                      Procesando solicitud...
                    </>
                  ) : (
                    <>
                      <Paperclip size={16} />
                      Enviar ticket
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* INFO PANEL */}
        <div className="xl:col-span-4">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-start gap-3 text-gray-700 mb-4">
              <Info size={20} />
              <h3 className="font-semibold text-base">Recomendaciones</h3>
            </div>
            <ul className="space-y-3 text-gray-500 text-sm leading-relaxed">
              <li>• Sé específico al describir el inconveniente operativo.</li>
              <li>• Adjunta imágenes nítidas de los errores si es posible.</li>
              <li>• Asegúrate de validar el identificador del equipo.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tickets