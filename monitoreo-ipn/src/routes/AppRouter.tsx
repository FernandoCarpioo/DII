import { BrowserRouter, Routes, Route } from "react-router-dom"

import MainLayout from "../layouts/MainLayout"

import DashboardAdministrador from "../dashboards/administrador/DashboardAdministrador"
import DashboardAnalista from "../dashboards/usuario/DashboardAnalista"

import MisGrupos from "../pages/MisGrupos"
import CrearGrupos from "../pages/CrearGrupos"
import Equipos from "../pages/Equipos"
import Configuracion from "../pages/Configuracion"
import ArchivosEnviados from "../pages/ArchivosEnviados"
import Impresiones from "../pages/Impresiones"

import Login from "../pages/Login"

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN - Ruta pública, no lleva layout */}
        <Route path="/login" element={<Login />} />

        {/* =========================================
            RUTAS DEL ADMINISTRADOR
            ========================================= */}
        <Route element={<MainLayout rol="administrador" />}>
          <Route 
            path="/" 
            element={<DashboardAdministrador />} 
          />
          <Route 
            path="/MisGrupos" 
            element={<MisGrupos />} 
          />
          <Route 
            path="/equipos" 
            element={<Equipos />} 
          />
          <Route 
            path="/configuracion" 
            element={<Configuracion />} 
          />
           <Route 
            path="/ArchivosEnviados" 
            element={<ArchivosEnviados />} 
          />
          <Route 
            path="/impresiones" 
            element={<Impresiones />} 
          />
        </Route>

        {/* =========================================
            RUTAS DEL ANALISTA / USUARIO
            ========================================= */}
        <Route element={<MainLayout rol="usuario" />}>
          <Route 
            path="/user" 
            element={<DashboardAnalista />} 
          />
              <Route path="/user/equipos" element={<Equipos />} /> 
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter