import ChatSidebar from "../components/mensajes/ChatSidebar"
import ChatWindow from "../components/mensajes/ChatWindow"
import ChatInfo from "../components/mensajes/ChatInfo"

function Mensajes() {
  return (

    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden h-[calc(100vh-140px)]">

      <div className="grid grid-cols-12 h-full">

        <div className="col-span-3 border-r border-gray-100 flex flex-col overflow-hidden">          <ChatSidebar />
        </div>

        <div className="col-span-6 border-r border-gray-100 flex flex-col overflow-hidden">
          <ChatWindow />
        </div>

        <div className="col-span-3 overflow-hidden">
          <ChatInfo />
        </div>

      </div>

    </div>

  )
}

export default Mensajes