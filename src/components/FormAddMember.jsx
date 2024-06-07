import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { toast } from "sonner";
import api from "@/services/api";

export default function FormAddMember({ id, idGroup }) {
  const { register, handleSubmit } = useForm();
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

  const onSubmit = () => { 
    // Criando um objeto com a estrutura esperada pela API
    const dataToSend = {
      invites: values,
      idGroup: idGroup
    };

    // Envie os dados para a API
    api.post(`members/clients/${id}/groups`, dataToSend, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        toast.success("Usuários adicionados com sucesso");
      })
      .catch((error) => {
        toast.error(error)
      });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger className="flex items-center justify-center border-t-2 gap-2 relative w-full">
          <button className="py-2 flex outline-none border-none items-center gap-2 font-semibold text-xl">
            <FontAwesomeIcon className="text-lg text-green-500 font-bold" icon={faPlusCircle} />
            <p className="text-green-600">Adicionar Membro</p>
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Adicionar membro</DialogTitle>
            <DialogDescription>Adicione integrantes ao seu grupo.</DialogDescription>
          </DialogHeader>

          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
                <div key={index} className="flex mt-5 justify-between border-b border-primary-dark">
                  <p className="pb-2 text-lg font-bold">{value}</p>
                  <button className="px-4 border bg-red-500 text-white hover:bg-red-600 rounded-md" onClick={(event) => inviteRemove(index, event)}>Remover</button>
                </div>
              ))}
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <button className="border px-4 py-1 rounded-md font-semibold">Cancelar</button>
              </DialogClose>
              <button type="submit" className="border px-4 py-1 rounded-md bg-primary-dark  font-semibold text-white">Adicionar</button>
            </DialogFooter>
          </form>

        </DialogContent>
      </Dialog>
    </>
  )
}
