import Header from "@/components/Header"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClipboard, faEllipsisH, faUser, faPlusCircle, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import api from "../services/api"
import Aos from "aos"
import 'aos/dist/aos.css'

export default function MyGroups() {
  const { id } = useParams()
  const [groups, setGroups] = useState([])
  const [groupData, setGroupData] = useState([])

  useEffect(() => {
    Aos.init()
    fetchGroups()
  }, [id])

  const fetchGroups = async () => {
    try {
      const response = await api.get(`/groups/clients/${id}`, {
        headers: { 'Authorization': localStorage.getItem('token') }
      })
      setGroups(response.data)

      const groupDetailsPromises = response.data.map(group =>
        api.get(`/groups/${group.id_group}`, {
          headers: { 'Authorization': localStorage.getItem('token') }
        })
      )

      const groupDetails = await Promise.all(groupDetailsPromises)
      setGroupData(groupDetails.map(response => ({
        name: response.data.name,
        description: response.data.description,
        id: response.data.id
      })))
    } catch (error) {
      console.error("Error fetching groups:", error)
    }
  }

  function leaveGroup() {
    api.post(`groups/${idGroup}/clients/${id}`, {}, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        console.log(response.data)
        navigate(`/meus-grupos/${id}`)
        console.log('deu boa')
      })
      .catch((error) => {
        console.log(error)
        console.log('deu ruim')
      })
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow p-6">
        <div data-aos="zoom-in" data-aos-duration="600" className="container mx-auto">
          {groups.length > 0 ? (
            <>
              <h1 className="text-4xl font-bold text-primary mb-8">Meus grupos</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {groupData.map((group, index) => (
                  <Card key={index} className="overflow-hidden relative">
                    <CardHeader className="border-b">
                      <CardTitle className="text-2xl font-bold truncate">{group.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 mb-2">
                        <FontAwesomeIcon icon={faClipboard} className="text-primary" />
                        <h2 className="text-lg font-semibold">Descrição</h2>
                      </div>
                      <p className="text-gray-600 text-sm line-clamp-3">{group.description}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <Link to={`/grupo/${group.id}/cliente/${id}`} className="w-full">
                        <Button className="w-full text-white" >Acessar</Button>
                      </Link>
                      <DropdownMenu >
                        <DropdownMenuTrigger asChild className="absolute top-0 right-0">
                          <Button variant="ghost" size="icon">
                            <FontAwesomeIcon icon={faEllipsisH} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="text-red-500">
                            <FontAwesomeIcon icon={faRightFromBracket} className="mr-2" />
                            <button onClick={leaveGroup} >Sair</button>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
              <div className="mb-6 p-6 bg-primary/10 rounded-full">
                <FontAwesomeIcon icon={faUser} className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-2">Você ainda não tem grupos</h2>
              <p className="text-gray-600 mb-6 max-w-md">
                Crie um grupo para começar a gerenciar despesas com amigos, família ou colegas de trabalho.
              </p>
              <Link to={`/criar-grupo/${id}`}>
                <Button className="flex items-center gap-2 text-white">
                  <FontAwesomeIcon icon={faPlusCircle} />
                  Criar Novo Grupo
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}