import Header from "@/components/Header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useForm } from "react-hook-form";
import api from "@/services/api";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner";
import { Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faPlus, faPlusCircle, faQuestionCircle, faSquareCaretDown } from "@fortawesome/free-solid-svg-icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function Support() {
  const { id } = useParams()
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState('')
  useEffect(() => {
    api.get(`/clients/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
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

  const [idAdminTicket, setIdAdminTicket] = useState('')
  const [adminTickets, setAdminTickets] = useState([])
  useEffect(() => {
    if (isAdmin) {
      api.get(`/tickets`, { headers: { 'Authorization': localStorage.getItem('token') } })
        .then((res) => {
          setAdminTickets(res.data);
          const idsTicketsAdmin = res.data.map(ticket => ticket.id);
          setIdAdminTicket(idsTicketsAdmin);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAdmin]);

  const [idTicket, setIdTickets] = useState('')
  const [tickets, setTicket] = useState([])
  useEffect(() => {
    api.get(`/tickets/clients/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((res) => {
        const uniqueTickets = res.data.reduce((unique, ticket) => {
          return unique.some((t) => t.id === ticket.id) ? unique : [...unique, ticket];
        }, []);

        setTicket(uniqueTickets);
        const idsTickets = uniqueTickets.map(ticket => ticket.id);
        setIdTickets(idsTickets);
      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])


  function createTicket(formData) {
    console.log('Criando ticket com valores:', formData);
    console.log(localStorage.getItem('token'))
    api.post(`/tickets`, formData, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((res) => {
        toast.success("Ticket criado com sucesso");
        const idTicket = res.data.id;
        setTimeout(() => {
          navigate(`/suporte/${id}/ticket/${idTicket}`);
        }, 400);
      })
      .catch((err) => {
        toast.error(err)
      })
  }

  const openTickets = adminTickets.filter(ticket => ticket.status === 'open');
  const resolvedTickets = adminTickets.filter(ticket => ticket.status === 'resolved');

  openTickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  resolvedTickets.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const sortedAdminTickets = openTickets.concat(resolvedTickets);

  return (
    <div className='m-0 p-0 box-border h-100 flex flex-col'>
      <Header />
      <div className={isAdmin ? 'overflow-y-auto h-[90vh] flex justify-center ' : 'overflow-y-auto h-[90vh] flex justify-center items-center'}>
        {isAdmin ? (
          <div className="w-[1000px] mt-10 overflow-y-auto scrollbar-thin scrollbar-hidden">
            <h1 className="text-5xl font-bold text-center">Tickets</h1>
            <div>
              {sortedAdminTickets.map((ticket, index) => (
                <div className="flex flex-col gap-2 border rounded-md mt-5 p-2" key={index}>
                  <div className="flex justify-evenly">
                    <div className="w-1/3">
                      <p className="text-xl">{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</p>
                      <h1 className="text-xl font-bold  overflow-hidden whitespace-nowrap">{ticket.title}</h1>
                    </div>
                    <div className="flex flex-col items-center w-1/3">
                      <p className="text-lg">{ticket.type}</p>
                      <p className={(ticket.status === 'open') ? 'text-green-500 capitalize ' : 'text-red-500 capitalize'}>
                        {ticket.status === 'open' && <p>Aberto</p>}
                        {ticket.status === 'resolved' && <p>Fechado</p>}
                      </p>
                    </div>
                    <div className="flex justify-end items-center w-1/3 ">
                      <Link to={`/suporte/${id}/ticket/${ticket.id}`} className="bg-success-dark p-2 rounded-md text-white font-semibold flex justify-center transition-all duration-300 hover:bg-success">
                        Visualizar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        ) : (
          <div className="w-[1600px] flex min-h-[70%]">
            <div className="w-3/5 p-5 flex flex-col justify-center gap-6">
              <h1 className="text-5xl font-bold text-meteorite-dark">Estamos Aqui para Ajudar!</h1>
              <p className="text-lg text-justify">Bem-vindo à nossa página de suporte para gerenciamento de despesas. Estamos aqui para <span className="text-meteorite-dark font-semibold">ajudar com qualquer problema</span> que você tenha. Nossa equipe está pronta para oferecer orientações e soluções para garantir uma experiência tranquila e eficiente. Valorizamos suas sugestões e feedback para melhorar nosso sistema. Explore nossos recursos de suporte para encontrar a ajuda que precisa.</p>
              <div className="border rounded-md p-8">
                <div className="flex gap-2 items-center ">
                  <FontAwesomeIcon icon={faQuestionCircle} />
                  <h1 className="font-bold text-2xl">Perguntas Frequentes (FAQ) </h1>
                </div>
                <Accordion type="multiple" collapsible="true" className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-normal">Problemas com o nosso sistema?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                      Não se preocupe! Estamos aqui para ajudar. Entre em contato conosco através da nossa página de suporte e nossa equipe resolverá o problema rapidamente para garantir sua experiência contínua e eficiente.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-xl font-normal">Sugestões de melhoras?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                      Agradecemos suas sugestões para melhorar nosso sistema de gerenciamento de despesas. Para enviar ideias, acesse nossa página de suporte e use o formulário de feedback. Todas as sugestões serão analisadas com cuidado pela nossa equipe, que trabalhará para implementar melhorias na plataforma. Sua contribuição é valiosa para aprimorarmos nosso sistema.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-xl font-normal">Reclamações?</AccordionTrigger>
                    <AccordionContent className="text-lg">
                      Se precisar registrar uma reclamação sobre nosso sistema de gerenciamento de despesas, entre em contato conosco pela página de suporte. Use o formulário de reclamações para nos informar sobre qualquer problema encontrado. Valorizamos suas opiniões e trabalharemos para resolver os problemas e melhorar nossos serviços.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
            <div className="w-2/5 flex flex-col p-12 max-h-[36em]  overflow-y-auto scrollbar-thin scrollbar-hidden">
              <div className="flex justify-between">
                <h1 className="text-3xl">Meus tickets</h1>
                <Dialog>
                  <DialogTrigger className="bg-primary px-5 py-3  rounded-md text-white font-semibold flex justify-center items-center gap-3 transition-all duration-300 hover:bg-meteorite-dark">
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <p>Abrir Novo Ticket</p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Sistema de suporte</DialogTitle>
                      <DialogDescription>
                        Obtenha ajuda rápida e eficiente de nossa equipe de suporte.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(createTicket)}>
                      <div className="flex flex-col text-xl gap-1 mt-5">
                        <label className="text-dark font-bold text-lg">Titulo</label>
                        <input
                          {...register("title", { required: "Titulo é obrigatório" })}
                          className="border border-gray-400 rounded-md p-1 pl-3 text-lg font-semibold text-primary-dark"
                          placeholder="Titulo"
                        />
                        {errors.name && <p className="text-red-500 text-center">{errors.name.message}</p>}
                      </div>
                      <div className="flex flex-col text-xl gap-1 mt-5">
                        <label className="text-dark font-bold text-lg">Tipo </label>
                        <select {...register("type", { required: "Tipo da duvida é obrigatório" })} className="border border-gray-400 rounded-md p-1 pl-3 text-lg font-semibold text-primary-dark">
                          <option value="" className="text-dark-primary font-semibold">Tipo</option>
                          <option value="Sugestões" className="text-primary-dark font-semibold" >Sugestão</option>
                          <option value="Reclamações" className="text-primary-dark font-semibold">Reclamação</option>
                          <option value="Ajuda" className="text-primary-dark font-semibold">Ajuda</option>
                          <option value="Outros" className="text-primary-dark font-semibold">Outro</option>
                        </select>
                        {errors.type && <p className="text-red-500 text-center">{errors.type.message}</p>}
                      </div>
                      <div className="flex flex-col text-xl gap-1 mt-5">
                        <label className="text-dark font-bold text-lg">Mensagem</label>
                        <textarea  {...register("message", { required: "Nome do grupo é obrigatório" })} className="border border-gray-400 resize-none p-2 rounded-md h-32 font-semibold text-primary-dark" placeholder="Digite aqui sua mensagem"></textarea>
                      </div>
                      <div className="flex justify-center mt-5 ">
                        <button type="submit" className="bg-dark-primary px-10 py-2 rounded-sm text-white font-semibold hover:bg-zinc-800 transition-all duration-300">Enviar</button>
                      </div>
                      <input type="hidden" {...register("to")} value="admin@admin.com" />
                      <input type="hidden" {...register("from")} value={user.email} />
                    </form>

                  </DialogContent>
                </Dialog>
              </div>


              <Card className="mt-3 ">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    Lista de tickets
                  </CardTitle>
                </CardHeader>
                <CardContent >
                  {tickets.length === 0 ? (
                    <div className="py-8 text-muted-foreground flex flex-col items-center justify-center">
                      <FontAwesomeIcon icon={faMessage} className="h-10 w-10" />
                      <p>Você ainda não tem tickets abertos.</p>
                      <p>Se precisar de ajuda, não hesite em abrir um novo ticket!</p>
                    </div>
                  ) : (
                    tickets.map((ticket, index) => (
                      <div className="flex flex-col border rounded-md mt-5 p-2 relative" key={index}>
                        <div className="flex flex-col justify-between">
                          <div>
                            <h1 className="text-xl font-bold">{ticket.title}</h1>
                          </div>
                          <div className="flex justify-between mt-4">
                            <div>
                              <p className="text-xl">{new Date(ticket.createdAt).toLocaleDateString('pt-BR')}</p>
                            </div>
                            <div>

                              <p className="text-lg">{ticket.type}</p>
                            </div>
                          </div>



                          <div className="absolute top-2 right-2">
                            <Link to={`/suporte/${id}/ticket/${ticket.id}`} className="bg-primary p-2 rounded-md text-white font-semibold flex justify-center transition-all duration-300 hover:bg-meteorite-dark ">
                              Visualizar
                            </Link>
                          </div>

                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}