import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/services/api";
import { useState } from "react";
import { toast } from "sonner";
export default function Member({ nome, isAdmin, id, idGroup, idUser }) {
  function RemoveCliente() {
    api.delete(`groups/${idGroup}`, { data: { idClient: Number(id), idMember: Number(idUser) }, headers: { 'Authorization': localStorage.getItem('token') } })
      .then((res) => {
        toast.success('Usuario removido com sucesso')
        setTimeout(() => {
          window.location.reload()
        }, 400);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="relative p-4">
      <p>{nome}</p>
      {isAdmin && (id != idUser) && (
        <DropdownMenu>
          <DropdownMenuTrigger className="absolute top-1 right-2">
            <FontAwesomeIcon icon={faEllipsisH} />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem className="text-red-500 font-semibold flex items-center gap-2">
              <button className="flex items-center gap-2" onClick={RemoveCliente}>
                <FontAwesomeIcon icon={faX} />
                <p>Remover</p>
              </button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}


    </div>
  );
}
