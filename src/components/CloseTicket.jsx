import api from "@/services/api";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
      <AlertDialog>
        <AlertDialogTrigger className="px-5 py-2 bg-primary-dark rounded-md text-white font-semibold">
          Fechar ticket
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">Você tem certeza?</AlertDialogTitle>
            <AlertDialogDescription>
                Ao clicar em fechar , você estará fechando todo o sistema de chat para apoio ao usuário
              </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="text-white hover:bg-meteorite-dark" onClick={() => closeTicket(idTicket)}>Fechar</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
