import Header from "@/components/Header";
import api from "@/services/api";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import CloseTicket from "@/components/CloseTicket";
export default function Ticket() {
  const { id, idTicket } = useParams();
  const navigate = useNavigate();
  const [infos, setInfos] = useState({});
  const { register, handleSubmit, formState: { errors }, reset } = useForm(); // Adicionando reset
  const [user, setUser] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    console.log("Making request to backend...");
    api.get(`/clients/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        console.log("Received response from backend:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [id]);

  useEffect(() => {
    if (user && user.email === 'admin@admin.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  useEffect(() => {
    if (id && idTicket) {
      api.get(`/tickets/${idTicket}`, { headers: { 'Authorization': localStorage.getItem('token') } })
        .then((res) => {
          setInfos(res.data);
          console.log(res.data);
          setMessages(res.data.messages || []);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, idTicket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesEndRef, messages]);

  function formattedTime(createdAt) {
    return `${createdAt.getHours().toString().padStart(2, '0')}:${createdAt.getMinutes().toString().padStart(2, '0')}`;
  }

  function createMessage(formData) {
    api.post(`/tickets/${idTicket}`, formData, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((res) => {
        console.log(res);
        setMessages([...messages, { ...formData, createdAt: new Date() }]);
        reset();
      })
      .catch((err) => {
        console.log(err);
      });
  }


  return (
    <div className='m-0 p-0 box-border h-100 flex flex-col'>
      <Header />
      <div className='overflow-y-auto h-[90vh] flex flex-col justify-center gap-5 items-center'>
        <h1 className="text-6xl font-bold ">Chat</h1>
        {infos.status === 'open' ?
          <div className="flex items-center gap-1 ">
            <FontAwesomeIcon icon={faCircle} className="text-green-500 size-3" />
            <p className='text-green-500 text-lg'>Aberto</p>

          </div>
          :
          <div className="flex items-center gap-1 ">
              <FontAwesomeIcon icon={faCircle} className="text-red-500 size-3" />
              <p className='text-red-500 text-lg'>Fechado</p>
          </div>
         
        }

        <div className="flex flex-col w-[1200px] min-h-[36em] max-h-[36em] border shadow-mild ">
          <div className=" p-5 h-[90%] max-h-[90%]  overflow-y-auto scrollbar-thin scrollbar-hidden">
            <div className="flex flex-col gap-4">
              {messages.map((message, index) => (
                <div className={message.from === 'admin@admin.com' ? "flex flex-col gap-5 items-end" : 'flex flex-col gap-5'} key={index}>
                  <div className={message.from === 'admin@admin.com' ? 'border w-1/3 relative  bg-blue-500   rounded-md p-3' : 'border w-1/3 relative  bg-green-500  rounded-md p-3'}>
                    <div className={message.from === 'admin@admin.com' ? "size-2 bg-blue-500 rotate-45 absolute top-[4px] right-[-3px]" : "size-2 bg-green-500 rotate-45 absolute top-[4px] left-[-3px]"}></div>
                    <p className="font-bold">{message.from}</p>
                    <p className="absolute bottom-0 right-2">{formattedTime(new Date(message.createdAt))}</p>
                    <div className='flex justify-start'>
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>
          </div>

          <div className="border-t p-2 ">
            {isAdmin ? (
              <form onSubmit={handleSubmit((formData) => createMessage({ ...formData, from: user.email, to: 'vo@vo.vo' }))}>

                <div className="flex gap-10">
                  <input
                    {...register("message", { required: true })}
                    className="w-full rounded-md p-1 pl-3 text-lg font-semibold text-primary-dark"
                    placeholder="Digite sua mensagem"
                  />
                  <button className="hover:bg-gray-300 transition-all duration-300 rounded-md p-2" type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit((formData) => createMessage({ ...formData, from: user.email, to: 'admin@admin.com' }))}>
                <div className="flex gap-10">
                  <input
                    {...register("message", { required: "Nome do grupo é obrigatório" })}
                    className="w-full rounded-md p-1 pl-3 text-lg font-semibold text-primary-dark"
                    placeholder="Digite sua mensagem"
                  />
                  <button className="hover:bg-gray-300 transition-all duration-300 rounded-md p-2" type="submit">
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        {isAdmin && infos.status !== 'resolved' && (
          <div>
            <CloseTicket idTicket={idTicket} id={id} />
          </div>
        )}

      </div>
    </div>
  );
}
