import { useEffect, useState } from "react";
import ChatSidebar, { type ChatPreview } from "../components/mensajes/ChatSidebar";
import ChatWindow, { type MessageData } from "../components/mensajes/ChatWindow";
import ChatInfo, { type MemberData } from "../components/mensajes/ChatInfo";

function Mensajes() {
  // 1. Estados globales para la comunicación con la Base de Datos
  const [chats, setChats] = useState<ChatPreview[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string | number | null>(null);
  const [messages, setMessages] = useState<MessageData[]>([]);
  const [members, setMembers] = useState<MemberData[]>([]);
  
  const [loadingChats, setLoadingChats] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);

  useEffect(() => {
    const fetchConversaciones = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://148.204.107.52:5002/api/chat/conversations", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        setChats(data || []);
        
        // Selecciona automáticamente el primer chat de la lista si existe
        if (data && data.length > 0) {
          setSelectedChatId(data[0].id);
        }
      } catch (err) {
        console.error("Error al obtener los chats de la BD:", err);
      } {
        setLoadingChats(false);
      }
    };
    fetchConversaciones();
  }, []);

  useEffect(() => {
    if (!selectedChatId) return;

    const fetchChatDetails = async () => {
      setLoadingMessages(true);
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://148.204.107.52:5002/api/chat/conversations/${selectedChatId}`, {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        
        setMessages(data.messages || []);
        setMembers(data.members || []);
      } catch (err) {
        console.error("Error al descargar los detalles del chat:", err);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchChatDetails();
  }, [selectedChatId]);

  const handleSendMessage = async (text: string) => {
    if (!selectedChatId) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://148.204.107.52:5002/api/chat/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ chatId: selectedChatId, message: text })
      });

      if (res.ok) {
        const nuevoMsg = await res.json(); // Tu backend retorna la fila creada en la BD
        setMessages((prev) => [...prev, nuevoMsg]);
        
        setChats((prevChats) =>
          prevChats.map((c) =>
            c.id === selectedChatId ? { ...c, lastMessage: text, time: "Ahora" } : c
          )
        );
      }
    } catch (err) {
      console.error("No se pudo enviar el mensaje a la base de datos:", err);
    }
  };

  const currentChat = chats.find(c => c.id === selectedChatId);

  return (
    <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden h-[calc(100vh-140px)] shadow-sm">
      <div className="grid grid-cols-12 h-full">
        
        {/* COLUMNA IZQUIERDA: LISTADO DE CONVERSACIONES (3/12) */}
        <div className="col-span-3 border-r border-gray-100 flex flex-col overflow-hidden">
          <ChatSidebar 
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
            loading={loadingChats}
          />
        </div>

        <div className="col-span-6 border-r border-gray-100 flex flex-col overflow-hidden">
          <ChatWindow 
            chatName={currentChat?.name || "Selecciona un chat"}
            memberCount={members.length}
            messages={messages}
            onSendMessage={handleSendMessage}
            loading={loadingMessages}
          />
        </div>

        <div className="col-span-3 overflow-hidden">
          <ChatInfo 
            chatName={currentChat?.name || ""}
            members={members}
          />
        </div>

      </div>
    </div>
  );
}

export default Mensajes;