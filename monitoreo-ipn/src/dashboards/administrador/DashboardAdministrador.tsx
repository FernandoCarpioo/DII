import { useEffect, useState } from "react";
import {
  Users,
  ShieldAlert,
  CircleCheck,
  Bell,
} from "lucide-react";

import StatCard from "../../components/dashboard/StatCard";
import GroupsTable from "../../components/dashboard/GroupsTable";
import ActivityPanel from "../../components/dashboard/ActivityPanel";

// Interfaces para tipar los estados 
import type { Grupo } from "../../components/dashboard/GroupsTable";
import type { Actividad } from "../../components/dashboard/ActivityPanel";

function DashboardAdministrador() {
  // Estados para almacenar los datos reales de la base de datos
  const [grupos, setGrupos] = useState<Grupo[]>([]);
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [metrics, setMetrics] = useState({
    bloqueosActivos: 0,
    accionesRecientes: 0,
    notificacionesCount: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Administrador");

  // useEffect para disparar la consulta a la base de datos al montar el componente
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        
        // Si guardaste el nombre del usuario al loguearte, lo recuperas aquí
        const savedName = localStorage.getItem("userName"); 
        if (savedName) setAdminName(savedName);

        // Petición al backend (Ajusta esta URL a tu endpoint real de métricas/dashboard)
        const response = await fetch("http://localhost:5002/api/admin/dashboard-summary", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Enviamos el token de seguridad
          }
        });

        if (!response.ok) {
          throw new Error("Error al consultar los datos del servidor");
        }

        const data = await response.json();

        // Asignamos los datos reales provenientes de la consulta 
        setGrupos(data.grupos || []);
        setActividades(data.actividades || []);
        setMetrics({
          bloqueosActivos: data.metrics?.bloqueosActivos || 0,
          accionesRecientes: data.metrics?.accionesRecientes || 0,
          notificacionesCount: data.metrics?.notificacionesCount || 0
        });

      } catch (error) {
        console.error("Error conectando a la base de datos:", error);
      } finally {
        setLoading(false); // Apagamos el estado de carga
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div>
      {/* SECCIÓN DE BIENVENIDA */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          ¡Bienvenido, {adminName}! 👋
        </h1>
        <p className="text-gray-500 mt-1">
          Desde aquí puedes gestionar grupos, bloqueos, permisos y monitorear la actividad del sistema.
        </p>
      </div>

      {/* SECCIÓN DE TARJETAS MÉTRICAS (STATCARDS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard
          title="Grupos activos"
          value={grupos.length} // Calculado dinámicamente del total de filas devueltas
          subtitle="Ver grupos"
          icon={Users}
          iconBg="bg-pink-100 text-[#6A0032]"
          path="/admin/grupos"
          loading={loading}
        />

        <StatCard
          title="Bloqueos activos"
          value={metrics.bloqueosActivos}
          subtitle="Ver bloqueos"
          icon={ShieldAlert}
          iconBg="bg-orange-100 text-orange-600"
          path="/admin/bloqueos"
          loading={loading}
        />

        <StatCard
          title="Acciones recientes"
          value={metrics.accionesRecientes}
          subtitle="Ver reportes"
          icon={CircleCheck}
          iconBg="bg-green-100 text-green-600"
          path="/admin/reportes"
          loading={loading}
        />

        <StatCard
          title="Notificaciones"
          value={metrics.notificacionesCount}
          subtitle="Ver notificaciones"
          icon={Bell}
          iconBg="bg-yellow-100 text-yellow-600"
          path="/admin/notificaciones"
          loading={loading}
        />
      </div>

      {/* SECCIÓN INFERIOR: TABLA Y BITÁCORA */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 mt-8">
        {/* Tabla de grupos vinculada a los datos reales */}
        <div className="xl:col-span-8">
          <GroupsTable context="admin" data={grupos} loading={loading} />
        </div>

        {/* Panel de actividades vinculado a los datos reales */}
        <div className="xl:col-span-4">
          <ActivityPanel activities={actividades} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default DashboardAdministrador;