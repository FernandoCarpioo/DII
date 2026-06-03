import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"

import DashboardAdministrador from "../dashboards/administrador/DashboardAdministrador"
import DashboardAnalista from "../dashboards/usuario/DashboardAnalista"

import MisGrupos from "../pages/MisGrupos" 
import Equipos from "../pages/Equipos"
import Configuracion from "../pages/Configuracion"
import ArchivosEnviados from "../pages/ArchivosEnviados"
import Impresiones from "../pages/Impresiones"
import Tickets from "../pages/Tickets"
import Tareas from "../pages/Pendientes"
import Mensajes from "../pages/Mensajes"

import Login from "../pages/Login"
import GruposUsuario from "../pages/GruposUsuario"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pantalla inicial de autenticación */}
        <Route path="/login" element={<Login />} />

        {/* ======================================================= */}
        {/* RUTAS ADMINISTRADOR (Prefijo /admin)                    */}
        {/* ======================================================= */}
        {/* Se remueve el prop 'rol', MainLayout ahora se autogestiona */}
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<DashboardAdministrador />} />
          
          {/* Mapeo del catálogo de tarjetas antiguo */}
          <Route path="grupos" element={<MisGrupos />} />
          
          {/* Módulos Operativos Administrador */}
          <Route path="equipos" element={<Equipos />} />
          <Route path="configuracion" element={<Configuracion />} />
          <Route path="archivos-enviados" element={<ArchivosEnviados />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="impresiones" element={<Impresiones />} />
          <Route path="mensajes" element={<Mensajes />} /> 
        </Route>

        {/* ======================================================= */}
        {/* RUTAS USUARIO ANALISTA / PÚBLICO (Prefijo /user)        */}
        {/* ======================================================= */}
        {/* Se remueve el prop 'rol', MainLayout ahora se autogestiona */}
        <Route path="/user" element={<MainLayout />}>
          <Route index element={<DashboardAnalista />} />
          
          {/* Módulos Operativos Analista */}
          <Route path="grupos" element={<GruposUsuario />} />
          <Route path="equipos" element={<Equipos />} /> 
          <Route path="pendientes" element={<Tareas />} /> 
          <Route path="mensajes" element={<Mensajes />} /> 
          <Route path="impresiones" element={<Impresiones />} /> 
        </Route>

        {/* Redirecciones de control perimetral */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<div className="p-8 text-center font-bold text-gray-800">404 - Página No Encontrada</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter