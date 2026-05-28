import {
  ChevronDown,
  Ticket,
  Info,
  Paperclip,
} from "lucide-react"

import FileUpload from "../components/Envio/FileUpload"

function Tickets() {
  return (
    <div>

      {/* HEADER */}
      <div className="mb-8">

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <span>Inicio</span>
          <span>›</span>
          <span>Tickets</span>
          <span>›</span>
          <span className="text-gray-700 font-medium">
            Crear ticket
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900">
          Crear nuevo ticket
        </h1>

        <p className="text-gray-500 mt-2 text-lg">
          Completa la información para generar tu solicitud de soporte.
        </p>

      </div>

      {/* CONTENT */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">

        {/* FORM */}
        <div className="xl:col-span-8">

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">

            {/* TITLE */}
            <div className="flex items-center gap-3 mb-8">

              <div className="w-10 h-10 rounded-xl bg-pink-100 text-[#6A0032] flex items-center justify-center">
                <Ticket size={20} />
              </div>

              <h2 className="text-2xl font-semibold">
                Información del ticket
              </h2>

            </div>

            <form className="space-y-6">

              {/* AREA */}
              <div>

                <label className="block text-sm font-semibold mb-2">
                  Área <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <select className="w-full h-14 border border-gray-200 rounded-xl px-4 appearance-none outline-none focus:ring-2 focus:ring-[#6A0032] bg-white">

                    <option>
                      Selecciona el área
                    </option>

                    <option>
                      Dirección General
                    </option>

                    <option>
                      Sistemas
                    </option>

                    <option>
                      Proyecto 1
                    </option>

                    <option>
                      Contaduria
                    </option>

                  </select>

                  <ChevronDown
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />

                </div>

              </div>

              {/* EQUIPO */}
              <div>

                <label className="block text-sm font-semibold mb-2">
                  Equipo <span className="text-red-500">*</span>
                </label>

                <div className="relative">

                  <select className="w-full h-14 border border-gray-200 rounded-xl px-4 appearance-none outline-none focus:ring-2 focus:ring-[#6A0032] bg-white">

                    <option>
                      Selecciona el equipo
                    </option>

                    <option>
                      Equipo Dell 001
                    </option>

                    <option>
                      Equipo HP 003
                    </option>

                    <option>
                      Laptop Lenovo 008
                    </option>

                  </select>

                  <ChevronDown
                    size={20}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />

                </div>

              </div>

              {/* USER */}
              <div>

                <label className="block text-sm font-semibold mb-2">
                  Nombre de usuario <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Ingresa el nombre completo del usuario"
                  className="w-full h-14 border border-gray-200 rounded-xl px-4 outline-none focus:ring-2 focus:ring-[#6A0032]"
                />

              </div>

              {/* DESCRIPTION */}
              <div>

                <label className="block text-sm font-semibold mb-2">
                  Descripción <span className="text-red-500">*</span>
                </label>

                <textarea
                  placeholder="Describe el problema o solicitud en detalle..."
                  className="w-full h-40 border border-gray-200 rounded-xl px-4 py-4 outline-none resize-none focus:ring-2 focus:ring-[#6A0032]"
                />

                <div className="text-right text-sm text-gray-400 mt-2">
                  0/1000
                </div>

              </div>

              {/* UPLOAD */}
              <div>

                <label className="block text-sm font-semibold mb-3">
                  Evidencia
                  <span className="text-gray-400 font-normal ml-1">
                    (opcional)
                  </span>
                </label>

                <FileUpload />

                <p className="text-sm text-gray-400 mt-3">
                  Formatos permitidos: JPG, PNG, PDF, DOCX
                  (Máx. 10 MB por archivo)
                </p>

              </div>

              {/* BUTTONS */}
              <div className="flex items-center gap-4 pt-2">

                <button
                  type="submit"
                  className="h-12 px-6 rounded-xl bg-[#6A0032] hover:bg-[#850040] transition text-white font-medium flex items-center gap-2"
                >

                  <Paperclip size={18} />

                  Enviar ticket

                </button>

                <button
                  type="button"
                  className="h-12 px-6 rounded-xl border border-gray-200 hover:bg-gray-50 transition font-medium"
                >
                  Cancelar
                </button>

              </div>

            </form>

          </div>

        </div>

        {/* INFO PANEL */}
        <div className="xl:col-span-4">

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">

            <div className="border-b border-gray-100 p-6 flex items-center gap-3">

              <Info
                size={22}
                className="text-gray-700"
              />

              <div>

                <h3 className="font-semibold text-lg">
                  Información importante
                </h3>

                <p className="text-gray-500 text-sm mt-1">
                  Al enviar tu ticket, nuestro equipo lo revisará y te dará seguimiento.
                </p>

              </div>

            </div>

            <div className="p-6">

              <h4 className="font-semibold mb-4">
                Recomendaciones:
              </h4>

              <ul className="space-y-3 text-gray-600 text-sm">

                <li>
                  • Sé específico al describir el problema.
                </li>

                <li>
                  • Adjunta evidencia clara del inconveniente.
                </li>

                <li>
                  • Verifica que la información del equipo sea correcta.
                </li>

              </ul>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default Tickets