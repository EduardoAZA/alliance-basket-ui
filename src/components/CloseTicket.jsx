import api from "@/services/api";
import { useNavigate } from "react-router-dom";

export default function CloseTicket({ idTicket, id }) {
  const navigate = useNavigate();

  function closeTicket(idTicket) {
    const requestData = {
      id: parseInt(idTicket) 
    };

    api.patch(`/tickets/`, requestData, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((res) => {
        console.log('Fechou o ticket');
        navigate(`/suporte/${id}`);
      })
      .catch((error) => {
        console.error('Erro ao fechar o ticket:', error);
      });
  }

  return (
    <>
      <button 
        className="px-5 py-2 bg-primary-dark rounded-md text-white font-semibold" 
        onClick={() => closeTicket(idTicket)}
      >
        Fechar ticket
      </button>
    </>
  );
}
