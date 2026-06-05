import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Loader2 
} from "lucide-react";
import Swal from "sweetalert2";

import logoIPN from "../assets/logo-ipn.png";
import bgIPN from "../assets/fondo-ipn.jpeg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // Estado para bloquear el botón durante la petición
  
  const navigate = useNavigate();

  const API_URL = "/api/login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor, ingresa tu usuario y contraseña.",
        confirmButtonColor: "#6A0032"
      });
      return;
    }

    setLoading(true); 

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password: password,
        }),
      });

      // 1. PRIMERO validamos si la respuesta fue exitosa (200 OK)
      if (!response.ok) {
        // 2. Si no fue exitosa, leemos el error como TEXTO, no como JSON
        const errorText = await response.text();
        console.error("ERROR CRÍTICO DEL SERVIDOR (No es JSON):", errorText);
        
        throw new Error(`Error del servidor (Código ${response.status}). Revisa la consola (F12).`);
      }

      // 3. Si todo salió bien, AHORA SÍ lo convertimos a JSON
      const data = await response.json();
      console.log("RESPUESTA LOGIN EXITOSA:", data);

      localStorage.setItem("userId", data.id);
      localStorage.setItem("userName", data.nombre);
      localStorage.setItem("userRole", data.role); 

      Swal.fire({
        icon: "success",
        title: data.role === "admin" ? "¡Bienvenido Administrador!" : "Sesión Iniciada",
        text: data.role !== "admin" ? "Accediendo al panel de analista..." : undefined,
        timer: 1500,
        showConfirmButton: false
      }).then(() => {
        if (data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
      });

    } catch (error: any) {
      console.error("Error capturado:", error);
      Swal.fire({
        icon: "error",
        title: "Error de conexión",
        text: error.message || "Hubo un problema al conectar con el servidor.",
        confirmButtonColor: "#6A0032"
      });
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen flex">
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
              Dirección de Información Institucional
            </h2>
          </div>
          <div className="max-w-md">
            <h3 className="text-4xl font-bold leading-tight">
              Bienvenido al Sistema Institucional IPN
            </h3>
            <p className="mt-6 text-xl text-gray-200 leading-relaxed">
              Accede a herramientas institucionales, colabora con tus equipos de trabajo
              y mantente conectado desde una plataforma segura y centralizada.
            </p>
          </div>
        </div>
      </div>

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

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Usuario (Correo Institucional)
              </label>
              <div className="border rounded-xl flex items-center px-4 h-14 bg-white focus-within:ring-2 focus-within:ring-[#6A0032] transition">
                <User size={20} className="text-gray-400" />
                <input
                  type="text"
                  placeholder="ejemplo@ipn.mx"
                  className="w-full outline-none px-3 bg-transparent text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Contraseña
              </label>
              <div className="border rounded-xl flex items-center px-4 h-14 bg-white focus-within:ring-2 focus-within:ring-[#6A0032] transition">
                <Lock size={20} className="text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingresa tu contraseña"
                  className="w-full outline-none px-3 bg-transparent text-gray-800"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  disabled={loading}
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                onClick={() => Swal.fire("Recuperación de cuenta", "Por políticas institucionales, acuda al departamento de Soporte Técnico de la DII para restaurar sus credenciales.", "info")}
                className="text-[#6A0032] font-medium hover:underline"
                disabled={loading}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-[#6A0032] hover:bg-[#850040] disabled:bg-gray-400 disabled:scale-100 disabled:cursor-not-allowed transition rounded-xl text-white font-semibold text-lg shadow-md active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Verificando...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;