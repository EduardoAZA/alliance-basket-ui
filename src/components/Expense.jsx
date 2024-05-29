import { useState } from 'react';
import { faCircleCheck, faPlusCircle, faEllipsisH, faRightFromBracket, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from "axios";
import api from "@/services/api";

export default function Expense({ data, nome, valor, pagante, idExpense }) {
  const [deleted, setDeleted] = useState(false); // Estado para controlar se a despesa foi excluída

  function deleteExpense(idExpense){
    api.delete(`expenses/${idExpense}`, { headers: { 'Authorization': localStorage.getItem('token') } })
    .then((response) => {
      console.log("Despesa excluída com sucesso");
      setDeleted(true); // Define o estado como true após a exclusão
    })
    .catch((error) => {
      console.error("Erro ao excluir despesa:", error);
    });
  }

  const dataFormatada = new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

  // Se a despesa foi excluída, não renderize nada
  if (deleted) {
    return null;
  }

  return (
    <div className="w-[70%] border rounded-md box-border p-3 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-bold">{dataFormatada}</p> {/* Usando a data formatada */}
          <p className="">{nome}</p>
        </div>
        <div className="flex flex-col items-center capitalize">
          <p className="font-bold">{pagante} pagou</p>
          <p>R${valor},00</p>
        </div>
        <DropdownMenu >
          <DropdownMenuTrigger className="absolute top-0 right-0 "><FontAwesomeIcon icon={faEllipsisH} /></DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-red-500 font-semibold flex items-center gap-4 ">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <button onClick={() => deleteExpense(idExpense)}>Excluir despesa</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
