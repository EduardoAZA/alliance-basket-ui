
import Header from "@/components/Header"
import { faCircleCheck, faPlusCircle, faRightFromBracket, faHandHoldingDollar } from "@fortawesome/free-solid-svg-icons"
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
  DialogFooter
} from "@/components/ui/dialog"
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";


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
  
  const [users,setUsers] = useState([])
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
  }, [idGroup]); // Se idGroup é uma variável de dependência

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

  const animatedComponents = makeAnimated();
  const members = [
    { value: 'Duca@gmail.com', label: 'Duca@gmail.com' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'vanillas', label: 'Vanilla' },
    { value: 'vanillass', label: 'Vanilla' },
  ]

  const [inputValue, setInputValue] = useState('');
  const [values, setValues] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const inviteSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      setValues([...values, inputValue]);
      setInputValue('');
    }
  };

  const inviteRemove = (index, event) => {
    event.preventDefault();
    const newValues = [...values];
    newValues.splice(index, 1);
    setValues(newValues);
  };

  function onSubmit(data) {
    console.log(idGroup);
    api.post(`/members/groups`, { ...data, idGroup }, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        console.log("Received response from backend:", response.data);
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
              <div className=" min-h-52 overflow-y-auto  scrollbar-thin scrollbar-hidden">
                <div>
                  <Member nome="duca"/>
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                  <Member />
                </div>
              </div>
            </div>

            <div className="h-[20%] flex flex-col justify-end">


              <Dialog>
                <DialogTrigger className="flex items-center justify-center border-t-2 gap-2 relative">
                  <p className=" text-green-500 font-semibold text-xl py-2 w-full">Adicionar Membro</p>
                  <FontAwesomeIcon className="text-lg text-green-500 font-bold absolute left-[5.8rem]" icon={faPlusCircle} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar membro</DialogTitle>
                    <DialogDescription>Adicione integrantes ao seu grupo.</DialogDescription>
                  </DialogHeader>

                  <form className="space-y-6" onSubmit={handleSubmit((data) => onSubmit({ ...data, invites: values }))}>
                    <div className="flex gap-10">
                      <input
                        type="text"
                        value={inputValue}
                        onChange={handleChange}
                        placeholder="Digite um valor"
                        className="border w-4/5 p-2"
                      />
                      <button onClick={inviteSubmit} className="border px-3">Adicionar</button>
                    </div>
                    <div>
                      {values.map((value, index) => (
                        <div key={index}>
                          <span>{value}</span>
                          <button onClick={(event) => inviteRemove(index, event)}>Remover</button>
                        </div>
                      ))}
                    </div>

                    <DialogFooter>
                      <button className="border px-4 py-1 rounded-md font-semibold">Cancelar</button>
                      <button className="border px-4 py-1 rounded-md bg-primary-dark font-semibold text-white">Adicionar</button>
                    </DialogFooter>
                  </form>

                </DialogContent>
              </Dialog>


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

                  <div className="w-full h-full max-h-[31rem] overflow-y-auto scrollbar-thin scrollbar-hidden flex flex-col items-center gap-5">
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                    <Expense />
                  </div>
                </div>
                <div className="flex gap-10 w-full justify-center pt-2">
                  <Dialog>
                    <DialogTrigger>
                      <p className="py-2 bg-primary-dark px-8 rounded-md text-white font-semibold">Criar despesa</p>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Despesa</DialogTitle>
                        <DialogDescription>Adicione a despesa e os integrantes.</DialogDescription>
                      </DialogHeader>

                      <form className="space-y-6">
                        <div className="grid grid-cols-4 items-center text-right gap-3">
                          <label htmlFor="name" className="font-semibold">Nome</label>
                          <input className="col-span-3 border p-1 rounded-md" type="text" id="name" />
                        </div>

                        <div className="grid grid-cols-4 items-center text-right gap-3" >
                          <label htmlFor="name" className="font-semibold">Valor</label>
                          <input className="col-span-3 border p-1 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" id="name" />
                        </div>

                        <div className="grid grid-cols-4 items-center text-right gap-3">
                          <label htmlFor="name" className="font-semibold">Participante</label>
                          <Select options={members} className="col-span-3" isMulti closeMenuOnSelect={false}
                            components={animatedComponents} />
                        </div>

                        <DialogFooter>
                          <button className="border px-4 py-1 rounded-md font-semibold">Cancelar</button>
                          <button className="border px-4 py-1 rounded-md bg-primary-dark font-semibold text-white">Salvar</button>
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

                      <form className="space-y-6">
                        <div className="grid grid-cols-4 items-center text-right gap-3">
                          <label htmlFor="name" className="font-semibold">Participante</label>
                          <Select options={members} className="col-span-3 text-left" isMulti closeMenuOnSelect={false}
                            components={animatedComponents} />
                        </div>
                        <div className="grid grid-cols-4 items-center text-right gap-3" >
                          <label htmlFor="name" className="font-semibold">Valor</label>
                          <input className="col-span-3 border p-1 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="number" id="name" />
                        </div>

                        <DialogFooter>
                          <button className="border px-4 py-1 rounded-md font-semibold">Cancelar</button>
                          <button className="border px-4 py-1 rounded-md bg-primary-dark font-semibold text-white">Pagar</button>
                        </DialogFooter>
                      </form>

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