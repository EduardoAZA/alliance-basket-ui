
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

export default function Group() {
  const { idGroup } = useParams()
  const { id } = useParams()

  const { register, handleSubmit } = useForm();

  const [groupID, setGroupID] = useState('');


  const [groupData, setGroupData] = useState([]);

  useEffect(() => {
    console.log("Making request to backend...");
    api.get(`/groups/${idGroup}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        setGroupData(response.data)
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [id]);

  const [users, setUsers] = useState([])
  const [idValues, setIdValues] = useState([]);
  useEffect(() => {
    console.log("Fazendo requisição para o backend...");
    api.get(`/members/groups/${idGroup}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
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


  function createExpense(expenseValues) {
    api.post(`expenses/client/${id}/group/${idGroup}`, expenseValues, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        // Atualiza o estado das despesas com a nova despesa criada
        setExpenses([...expenses, response.data]);
        // Exibe uma mensagem de sucesso
        toast.success('Dispesa criada com sucesso');
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }



  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="bg-white flex-grow overflow-y-auto flex flex-col items-center justify-center">
        <div className=" w-[70%] h-[80%] border rounded-xl shadow-normal flex">
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
                  <p className="text-meteorite-dark text-sm">Todos os usuários podem criar despesas no grupo</p>
                </div>
              </div>
              <h1 className=" text-2xl font-bold ">Membros: {idValues.length} </h1>
              <div className=" min-h-52 overflow-y-auto  scrollbar-thin scrollbar-hidden border">
                {usersName.map((nome, index) => (
                  <Member key={index} nome={nome.name} />
                ))}
              </div>
            </div>

            <div className="h-[20%] flex flex-col justify-end">
              <div className="flex items-center justify-center border-t-2 gap-2 relative">
                <FormAddMember />
              </div>
              <div className="flex items-center justify-center border-t-2 gap-2 relative">
                <FontAwesomeIcon className="text-lg text-red-500 font-bold absolute left-40" icon={faRightFromBracket} />
                <button className="text-red-500 py-2 font-semibold rounded-bl-xl text-xl  w-full">Sair</button>
              </div>
            </div>
          </div>

          <div className="w-[70%] relative">
            <button className="absolute top-5 right-5 w-12 h-12 border rounded-full bg-meteorite-dark text-white font-bold"><FontAwesomeIcon className="text-2xl" icon={faHandHoldingDollar} /></button>
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
                  <Dialog>
                    <DialogTrigger>
                      <p className="py-2 bg-primary-dark px-8 rounded-md text-white font-semibold">Criar despesa</p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Despesa</DialogTitle>
                        <DialogDescription>Crie agora sua despesa</DialogDescription>
                      </DialogHeader>

                      <form className="space-y-6" onSubmit={handleSubmit(createExpense)}>
                        <div className="grid grid-cols-4 items-center text-right gap-3">
                          <label htmlFor="name" className="font-semibold">Nome</label>
                          <input   {...register("name", { required: true })} className="col-span-3 border p-1 rounded-md" id="name" />
                        </div>

                        <div className="grid grid-cols-4 items-center text-right gap-3" >
                          <label htmlFor="name" className="font-semibold">Valor</label>
                          <input  {...register("value", { required: true })} className="col-span-3 border p-1 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="text" id="name" />
                        </div>
                        <DialogFooter><DialogClose asChild>
                          <button className="border px-4 py-1 rounded-md font-semibold">Cancelar</button>
                        </DialogClose>
                          <button className="border px-4 py-1 rounded-md bg-primary-dark font-semibold text-white">Criar</button>
                        </DialogFooter>
                      </form>

                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger>
                      <p className="py-2 bg-red-500 px-8 rounded-md text-white font-semibold">Quitar dívida</p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Quitar dívida</DialogTitle>
                        <DialogDescription>Escolha o usuário e o valor que será quitado.</DialogDescription>
                      </DialogHeader>
                      {/* 
                      <form className="space-y-6">
                        <div className="grid grid-cols-4 items-center text-right gap-3">
                  
                        </div>
                        <div className="grid grid-cols-4 items-center text-right gap-3" >
                          <label htmlFor="name" className="font-semibold">Valor</label>
                          <input className="col-span-3 border p-1 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" id="name" />
                        </div>

                        <DialogFooter>
                          <button className="border px-4 py-1 rounded-md font-semibold">Cancelar</button>
                          <button className="border px-4 py-1 rounded-md bg-primary-dark font-semibold text-white">Pagar</button>
                        </DialogFooter>
                      </form> */}

                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    </div>
  )
}