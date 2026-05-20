import {
  User,
  Lock,
  EyeOff
} from "lucide-react"

import logoIPN from "../assets/logo-ipn.png"
import bgIPN from "../assets/fondo-ipn.jpeg"

function Login() {
  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
        src={bgIPN}
        alt="IPN"
        className="absolute inset-0 w-full h-full object-cover"
        />

    <div className="absolute inset-0 bg-[#6A0032]/70" />
        <div className="relative z-10 flex flex-col justify-center px-20 text-white">

          <div className="mb-10">

            <img
                src={logoIPN}
                alt="IPN"
                className="w-40 mb-6"
            />

            <h2 className="text-4xl font-bold mt-4">
            Dirección de Información Intitucional
            </h2>

          </div>

          <div className="max-w-md">

           <h3 className="text-4xl font-bold leading-tight">
            Bienvenido al Sistema Institucional IPN
            </h3>

            <p className="mt-6 text-xl text-gray-200 leading-relaxed">
            Accede a herramientas institucionales,
            colabora con tus equipos de trabajo
            y mantente conectado desde una
            plataforma segura y centralizada.
            </p>

          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex-1 flex items-center justify-center bg-[#f5f6fa] px-6">

        <div className="bg-white w-full max-w-xl rounded-3xl shadow-xl p-10">

          <div className="mb-10">

            <h2 className="text-4xl font-bold text-gray-800">
              Iniciar sesión
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Ingresa tus credenciales para acceder al sistema.
            </p>

          </div>

          <form className="space-y-6">

            {/* USER */}
            <div>

              <label className="block text-sm font-semibold mb-2">
                Usuario
              </label>

              <div className="border rounded-xl flex items-center px-4 h-14">

                <User
                  size={20}
                  className="text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Ingresa tu usuario"
                  className="w-full outline-none px-3"
                />

              </div>

            </div>

            {/* PASSWORD */}
            <div>

              <label className="block text-sm font-semibold mb-2">
                Contraseña
              </label>

              <div className="border rounded-xl flex items-center px-4 h-14">

                <Lock
                  size={20}
                  className="text-gray-400"
                />

                <input
                  type="password"
                  placeholder="Ingresa tu contraseña"
                  className="w-full outline-none px-3"
                />

                <EyeOff
                  size={20}
                  className="text-gray-400 cursor-pointer"
                />

              </div>

            </div>

            {/* OPTIONS */}
            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2 text-gray-600">

                <input type="checkbox" />

                Recordarme

              </label>

              <button
                type="button"
                className="text-[#6A0032] font-medium hover:underline"
              >
                ¿Olvidaste tu contraseña?
              </button>

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full h-14 bg-[#6A0032] hover:bg-[#850040] transition rounded-xl text-white font-semibold text-lg"
            >
              Iniciar sesión
            </button>

          </form>

          <p className="text-center text-gray-500 text-sm mt-10">

            ¿Necesitas ayuda?

            <span className="text-[#6A0032] font-medium ml-1">
              Contacta al soporte técnico
            </span>

          </p>

        </div>

      </div>

    </div>
  )
}

export default Login