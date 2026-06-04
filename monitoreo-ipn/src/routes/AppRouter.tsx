import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardAdministrador from "../dashboards/administrador/DashboardAdministrador";
import DashboardAnalista from "../dashboards/usuario/DashboardAnalista";

import MisGrupos from "../pages/MisGrupos";
import Equipos from "../pages/Equipos";
import Configuracion from "../pages/Configuracion";
import ArchivosEnviados from "../pages/ArchivosEnviados";
import Impresiones from "../pages/Impresiones";
import Tickets from "../pages/Tickets";
import Tareas from "../pages/Pendientes";
import Mensajes from "../pages/Mensajes";
import Usuarios from "../pages/Usuarios";

import Login from "../pages/Login";

import ProtectedRoute from "./ProtectedRoute";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* ========================= */}
        {/* RUTAS ADMIN */}
        {/* ========================= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardAdministrador />} />

          <Route path="grupos" element={<MisGrupos />} />
          <Route path="equipos" element={<Equipos />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="archivos-enviados" element={<ArchivosEnviados />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="impresiones" element={<Impresiones />} />
          <Route path="mensajes" element={<Mensajes />} />
          <Route path="usuario" element={<Usuarios />} />
        </Route>

        {/* ========================= */}
        {/* RUTAS USER */}
        {/* ========================= */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRole="user">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardAnalista />} />

          <Route path="grupos" element={<MisGrupos />} />
          <Route path="pendientes" element={<Tareas />} />
          <Route path="mensajes" element={<Mensajes />} />
          <Route path="impresiones" element={<Impresiones />} />
          <Route path="configuracion" element={<Configuracion />} />
        </Route>

        {/* REDIRECCIONES */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="*"
          element={
            <div className="p-8 text-center font-bold text-gray-800">
              404 - Página No Encontrada
            </div>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;