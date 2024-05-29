import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faCheck, faCircleCheck, faCircleMinus, faEllipsisH, faPlusCircle, faRightFromBracket, faX } from "@fortawesome/free-solid-svg-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function Member({nome}) {
  return (
    <div className="relative p-4">
      <p>{nome}</p>
      <DropdownMenu >
        <DropdownMenuTrigger className="absolute top-1 right-2"><FontAwesomeIcon icon={faEllipsisH} /></DropdownMenuTrigger>
        <DropdownMenuContent>

          <DropdownMenuItem className="text-red-500 font-semibold flex items-center gap-2 ">
            <FontAwesomeIcon className="text-sm" icon={faCircleMinus} />
            <p>Remover</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

}