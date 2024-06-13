
import Header from "@/components/Header"
import { faCircleCheck, faRightFromBracket, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useParams } from "react-router-dom"
import Expense from "@/components/Expense"
import Member from "@/components/Member"
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
      <div className="bg-white flex-grow overflow-y-auto flex flex-col items-center justify-center ">
        <div data-aos="flip-up" data-aos-duration="600" className=" w-[70%] h-[80%] border rounded-xl shadow-normal flex">
          <div className="w-[30%] border-r h-full  flex flex-col ">
            <div className="h-[80%] p-5 flex flex-col gap-4">
              <div className="flex flex-col gap-5 ">
                <h1 className="text-4xl font-bold text-center text-meteorite-dark">{groupData.name}</h1>
                <div>
                  <h1 className=" text-2xl font-bold text-dark-primary">Descrição</h1>
                  <p>{groupData.description}</p>

                </div>
                <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faCircleCheck} className="text-success-dark font-black text-sm" />
                  {groupData.allow_edit === false ? (
                    <p className="text-meteorite-dark text-sm">Apenas o adminstrador pode criar despesas.</p>
                  ) : (
                    <p className="text-meteorite-dark text-sm">Todos os membros podem criar despesas.</p>
                  )}


                </div>
              </div>
              <h1 className=" text-2xl font-bold ">Membros: {idValues.length} </h1>
              <div className=" min-h-52 overflow-y-auto  scrollbar-thin scrollbar-hidden ">
                {usersName.map((nome, index) => (
                  <Member key={index} nome={nome.name} isAdmin={isAdmin} id={id} idGroup={idGroup} idUser={nome.id} />
                ))}
              </div>
            </div>

            <div className="h-[20%] flex flex-col justify-end">
              <div className="flex items-center justify-center border-t-2 gap-2 relative">
                <FormAddMember id={id} idGroup={idGroup} isAdmin={isAdmin} />
              </div>
              <div className="flex items-center justify-center border-t-2 gap-2 relative">
                <AlertDialog>
                  <AlertDialogTrigger className="flex items-center justify-center gap-2 text-lg text-red-500  py-2 font-semibold rounded-bl-xl w-full">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                    <p>Sair</p>
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
            </div>
          </div>

          <div className="w-[70%] relative">
            <button className="absolute top-3 right-3 rounded-md border text-white font-bold">
              {divida.totalAmountOwed >= 0 ? (
                <Dialog>
                  <DialogTrigger className="text-black flex gap-2 p-2 bg-gray-200">
                    Saldo:{" "}
                    <p className="text-green-500">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      }).format(Math.abs(divida.totalAmountOwed).toFixed(2))}
                    </p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dívidas</DialogTitle>
                      <DialogDescription>Veja aqui os débitos do grupo.</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              ) : (
                <Dialog>
                  <DialogTrigger className="text-black flex gap-2 p-2 bg-gray-200">
                    Saldo:{" "}
                    <p className="text-red-500">
                      {new Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                      }).format(Math.abs(divida.totalAmountOwed).toFixed(2))}
                    </p>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Dívidas</DialogTitle>
                      <DialogDescription>Veja aqui os débitos do grupo.</DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              )}
            </button>


            <div className="flex flex-col gap-6 justify-between">

              <h1 className="text-6xl font-bold text-center text-dark-primary">Despesas</h1>
              <div className="flex flex-col items-center gap-5">
                <div className="w-full h-[20%]">
                  {expenses.length === 0 ? (
                    <div className="max-h-[31rem] min-h-[31rem] flex justify-center">
                      <p className="text-center border-b border-primary p-5 text-3xl text-primary h-1/3">Adicione sua primeira despesa</p>
                    </div>
                  ) : (
                    <div className="w-full h-full max-h-[31rem] min-h-[31rem] overflow-y-auto scrollbar-thin scrollbar-hidden flex flex-col items-center gap-5">
                      {expenses.slice().reverse().map((expense, index) => (
                        <Expense key={index} nome={expense.name} valor={expense.value} data={expense.createdAt} idExpense={expense.id} pagante={usersName.find(cliente => cliente.id === expense.id_client)?.name} />
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex gap-10 w-full justify-center pt-2">
                  <CreateExpense id={id} idGroup={idGroup} isAdmin={isAdmin} allow_Edit={allow_Edit} />
                  <QuitarDivida id={id} idGroup={idGroup}/>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}