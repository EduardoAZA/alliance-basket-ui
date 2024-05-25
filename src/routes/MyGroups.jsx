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
      { id: 3, name: "Amigos" },
      { id: 3, name: "Amigos" },
      { id: 3, name: "Amigos" },
    ]
  )
  return (
    <div className="h-screen flex flex-col box-border">
      <Header />
      <div className=" bg-primary-light flex-grow overflow-y-auto flex flex-col items-center">
        <div className=" flex flex-col items-center justify-center ">
          <div className="text-left my-10 w-full">
            <h1 className="text-5xl font-bold text-dark-primary">Meus grupos</h1>

          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-[280px] ">
            {groups.map((group, index) => (
              <div key={index} className="bg-white rounded-xl flex flex-col relative max-w-96" >
                <div className="pl-5">
                  <p className="text-3xl font-bold text-dark-primary  max-w-[90%]  border-b py-4">{group.name}</p>

                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faClipboard} className="pl-5 pt-3" />
                    <h1 className="text-gray-500 font-semibold text-lg  pt-3">Descrição</h1>
                  </div>
                  <p className="text-dark-primary pl-5 pr-5 pt-3 pb-6 mt-2 text-left text-sm ">
                    Um grupo diversificado de amigos unidos por laços profundos de amizade, compartilhando risadas, aventuras e apoio mútuo em todas as jornadas da vida.</p>
                </div>
                <div className="flex items-center w-full  justify-center pb-6">
                  <button className="hover:bg-meteorite-dark w-2/5 bg-primary py-2 text-white font-bold rounded-md  ">Acessar</button>
                </div>
                <DropdownMenu >
                  <DropdownMenuTrigger className="absolute top-0 right-0 p-3"><FontAwesomeIcon icon={faEllipsisH} /></DropdownMenuTrigger>
                  <DropdownMenuContent>

                    <DropdownMenuItem className="text-red-500 font-semibold flex items-center gap-4 ">
                      <FontAwesomeIcon icon={faRightFromBracket} />
                      <p>Sair</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>
  )

}