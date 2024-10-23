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
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
export default function CreateExpense({ id, idGroup, isAdmin, allow_Edit }) {
  const { register, handleSubmit } = useForm();
  const [expenses, setExpenses] = useState([])
  function createExpense(expenseValues) {
    api.post(`expenses/client/${id}/group/${idGroup}`, expenseValues, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        setExpenses([...expenses, response.data]);
        toast.success('Dispesa criada com sucesso');
        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }



  return (
    <>
      {allow_Edit === false && isAdmin ? (

        <form className="space-y-6" onSubmit={handleSubmit(createExpense)}>
          <div className=" items-center text-right gap-3">
            <Input placeholder="Nome"  {...register("name", { required: true })} id="name" />
          </div>

          <div className="items-center text-right gap-3" >
            <Input placeholder="Valor" {...register("value", { required: true })} type="text" id="value" />
          </div>

          <Button type="submit" className="w-full text-white" >Criar </Button>
        </form>

      ) : (
        allow_Edit === true ? (
          <form className="space-y-6" onSubmit={handleSubmit(createExpense)}>
            <div className=" items-center text-right gap-3">
              <Input placeholder="Nome"  {...register("name", { required: true })} id="name" />
            </div>

            <div className="items-center text-right gap-3" >
              <Input placeholder="Valor" {...register("value", { required: true })} type="text" id="value" />
            </div>

            <Button type="submit" className="w-full text-white" >Criar </Button>
          </form>
        ) : (

          <div className="text-red-500 text-md">Apenas administradores podem criar despesas no grupo</div>

        )
      )}
    </>
  )
}