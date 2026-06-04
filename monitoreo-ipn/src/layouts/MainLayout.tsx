import { useState, useEffect } from "react"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/layout/sidebar/Sidebar"
import Header from "../components/layout/Header"

function MainLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [usuario, setUsuario] = useState({ name: "Usuario", role: "user" });

 useEffect(() => {

  const dbRole =
    localStorage.getItem("userRole") || "user";

  const dbName =
    localStorage.getItem("userName") || "Personal DII";

  setUsuario({
    name: dbName,
    role: dbRole
  });

}, []);


  return (
    <div className="bg-[#f5f6fa] min-h-screen flex">
      
      {/* SIDEBAR UNIFICADO: Ya no duplica componentes, solo le pasamos el rol real */}
      <Sidebar 
        isCollapsed={isCollapsed} 
        setIsCollapsed={setIsCollapsed} 
        role={usuario.role} 
      />

      {/* CONTENEDOR PRINCIPAL CON MARGEN ADAPTATIVO */}
      <div className={`flex-1 flex flex-col p-6 transition-all duration-300 ease-in-out ${
        isCollapsed ? "ml-[90px]" : "ml-[300px]"
      }`}>
        
        {/* Renderiza el buscador, avatar y nombre real de la BD */}
        <Header usuario={usuario} notificationsCount={2} />

        {/* VISTAS HIJAS DEL ENRUTADOR */}
        <div className="mt-6 flex-1">
          <Outlet />
        </div>

      </div>

    </div>
  )
}

export default MainLayout