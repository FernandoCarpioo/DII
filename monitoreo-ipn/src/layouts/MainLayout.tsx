import { useState } from "react"
import { Outlet } from "react-router-dom"

import Sidebar from "../components/layout/sidebar/Sidebar"
import Header from "../components/layout/Header"
import SidebarUsuario from "../components/layout/sidebar/SidebarUsuario"


// Definimos que el layout puede recibir el rol
interface MainLayoutProps {
  rol?: 'administrador' | 'usuario';
}

function MainLayout({ rol = 'usuario' }: MainLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="bg-[#f5f6fa] min-h-screen">

      {rol === 'administrador' ? (
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      ) : (
        <SidebarUsuario isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      )}

      <main className={`p-6 transition-all duration-300 ease-in-out ${
        isCollapsed ? "ml-[90px]" : "ml-[300px]"
      }`}>

        <Header />

        <div className="mt-6">
          <Outlet />
        </div>

      </main>

    </div>
  )
}

export default MainLayout