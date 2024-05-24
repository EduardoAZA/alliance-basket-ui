import Header from "@/components/Header"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard, faClipboardCheck, faClipboardList, faEllipsisH, faEllipsisV, faEye, faEyeSlash, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function MyGroups() {
  const { id } = useParams()

  const [groups, setGroups] = useState(
    [
      { id: 1, name: "Grupos do fut" },
      { id: 2, name: "Grupos da sala" },
      { id: 3, name: "Amigos" },
    ]
  )
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className=" bg-primary-light flex-grow overflow-y-auto flex flex-col items-center">
        <div className="flex min-w-[95%] w-full">
          <h1 className="p-10 text-5xl font-bold text-dark-primary">Meus grupos</h1>

        </div>
        <div className="max-w-[75%]  grid grid-cols-3 gap-60 ">
          {groups.map((group, index) => (
            <div key={index} className="bg-white border rounded-xl flex flex-col overflow-x-hidden relative" >
              <div className="pl-5">
                <p className="text-3xl font-bold text-dark-primary  max-w-[90%]  border-b py-4">{group.name}</p>

              </div>
              <div>
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon icon={faClipboard} className="pl-5 pt-3" />
                  <h1 className="text-gray-500 font-semibold text-lg  pt-3">Descrição</h1>
                </div>
                <p className="text-dark-primary pl-5 pr-5 pt-3 pb-6 mt-2 text-left text-sm bg-gray-50">
                  Um grupo diversificado de amigos unidos por laços profundos de amizade, compartilhando risadas, aventuras e apoio mútuo em todas as jornadas da vida.</p>
              </div>
              <div className="flex items-center w-full  justify-center bg-gray-50">
                <button className="hover:bg-meteorite-dark w-2/5 bg-primary py-2 mb-4 text-white font-bold rounded-md ">Acessar</button>
              </div>
              <DropdownMenu >
                <DropdownMenuTrigger className="absolute top-0 right-0 p-3"><FontAwesomeIcon icon={faEllipsisH} /></DropdownMenuTrigger>
                <DropdownMenuContent>
                  
                  <DropdownMenuItem className="text-red-500 font-semibold flex items-center gap-4 ">
                  <FontAwesomeIcon icon={faRightFromBracket}  />
                    <p>Sair</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}

        </div>
      </div>
    </div>
  )

}