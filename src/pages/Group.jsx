
import Header from "@/components/Header"
import { faCircleCheck, faRightFromBracket, faHandHoldingDollar, faDoorOpen, faUser, faDollar, faCirclePlus, faUserPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Form, useParams } from "react-router-dom"
import Expense from "@/components/Expense"
import Member from "@/components/Member"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import axios from "axios";
import api from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import FormAddMember from "@/components/FormAddMember"
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import 'aos/dist/aos.css';
import CreateExpense from "@/components/CreateExpense"
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
import { User } from "lucide-react"
import QuitarDivida from "@/components/QuitarDivida"
import { faUsb } from "@fortawesome/free-brands-svg-icons"
export default function Group() {
  //Initializate AOS
  useEffect(() => {
    Aos.init();
  }, [])

  const { idGroup } = useParams()
  const { id } = useParams()
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [groupID, setGroupID] = useState('');
  const [groupData, setGroupData] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allow_Edit, setAllowEdit] = useState(false);
  useEffect(() => {
    console.log("Making request to backend...");
    api.get(`/groups/${idGroup}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        setGroupData(response.data)
        setAllowEdit(response.data.allow_edit)
        if (response.data.admin_id?.toString() === id) {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [id]);

  const [divida, setDivida] = useState('')
  useEffect(() => {
    api.get(`expenses/client/${id}/group/${idGroup}/howmuchiowe`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((res) => {
        console.log('boa')
        console.log(res.data)
        setDivida(res.data)

      })
      .catch((err) => {
        console.log(err)
      })
  }, [id])

  const [users, setUsers] = useState([])
  const [idValues, setIdValues] = useState([]);
  useEffect(() => {
    console.log("Fazendo requisição para o backend...");
    api.get(`/members/groups/${idGroup}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        console.log("aqui duca")
        console.log(response.data)
        const ids = response.data.map(item => item.id);
        setIdValues(ids);
      })
      .catch((error) => {
        console.error("Erro ao buscar os IDs:", error);
      });
  }, [idGroup]);

  useEffect(() => {
    api.get(`/clients/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        console.log("Received response from backend:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [id]);

  const [usersName, setUsersName] = useState([])
  useEffect(() => {
    api.get(`/groups/${idGroup}/members`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        const name = response.data.map(item => item);
        setUsersName(name)
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [id]);

  const [expenses, setExpenses] = useState([])
  useEffect(() => {
    console.log(idGroup)
    api.get(`expenses/group/${idGroup}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        console.log("despesa")
        const expense = response.data.map(item => item);
        setExpenses(expense)
        console.log(expense)
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [id]);


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
    <div className="h-screen flex flex-col">
      <Header />
      <div className="container mx-auto p-10">

        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{groupData.name}</h1>
          <AlertDialog>
            <AlertDialogTrigger className="border rounded-md px-5 py-2 flex items-center gap-2">
              <FontAwesomeIcon icon={faRightFromBracket} />
              <p>Sair Do Grupo</p>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-500">Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação removerá você do grupo e você perderá acesso às conversas e atividades futuras. Tem certeza de que deseja continuar?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction className="text-white hover:bg-meteorite-dark" onClick={leaveGroup}>Sair</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        <p className="text-muted-foreground mb-6">{groupData.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <Card data-aos="zoom-in" data-aos-duration="600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FontAwesomeIcon icon={faUser} />
                Membros: {idValues.length}
              </CardTitle>
            </CardHeader>
            <CardContent>

              <div className=" min-h-52 overflow-y-auto capitalize scrollbar-thin scrollbar-hidden ">
                {usersName.map((nome, index) => (
                  <Member key={index} nome={nome.name} isAdmin={isAdmin} id={id} idGroup={idGroup} idUser={nome.id} />
                ))}
              </div>

              <div className="flex items-center gap-2 mt-4">
                <FormAddMember id={id} idGroup={idGroup} isAdmin={isAdmin} />
              </div>
            </CardContent>
          </Card>


          <Card data-aos="zoom-in" data-aos-duration="600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FontAwesomeIcon icon={faDollar} />
                Saldo
              </CardTitle>
            </CardHeader>
            <CardContent>
              {divida.totalAmountOwed >= 0 ? (
                <p className="text-primary-dark text-3xl font-bold">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  }).format(Math.abs(divida.totalAmountOwed).toFixed(2))}
                </p>
              ) :
                (
                  <p className="text-red-500 text-3xl font-bold">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    }).format(Math.abs(divida.totalAmountOwed).toFixed(2))}
                  </p>
                )}

              <QuitarDivida id={id} idGroup={idGroup} />
            </CardContent>

          </Card>

          <Card data-aos="zoom-in" data-aos-duration="600">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FontAwesomeIcon icon={faCirclePlus} />
                Criar Despesa
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CreateExpense id={id} idGroup={idGroup} isAdmin={isAdmin} allow_Edit={allow_Edit} />
            </CardContent>
          </Card>

          <Card className="mt-6 md:col-span-3"  data-aos="zoom-in" data-aos-duration="600">
            <CardHeader>
              <CardTitle>Lista de Despesas</CardTitle>
            </CardHeader>
            <CardContent>

              {expenses.length > 0 ? (
                <>
                  {expenses.slice().reverse().map((expense, index) => (
                    <div >
                      <Expense
                        key={index}
                        nome={expense.name}
                        valor={expense.value}
                        data={expense.createdAt}
                        idExpense={expense.id}
                        pagante={usersName.find(cliente => cliente.id === expense.id_client)?.name}
                      />
                    </div>
                  ))}
                </>
              ) : null}

            </CardContent>

          </Card>

        </div>


      </div >
    </div >
  )
}