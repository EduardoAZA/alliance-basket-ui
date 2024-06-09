import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import api from "@/services/api";

export default function Member({ nome, isAdmin, id, idGroup }) {

  function RemoveCliente() {
    api.delete(`/members/groups/${idGroup}/clients/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((res) => {
        console.log(res)
        console.log('deu boa')
      })
      .catch((err) => {
        console.log(err)
      })
  }


  return (
    <div className="relative p-4">
      <p>{nome}</p>
      {isAdmin &&
        (
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
