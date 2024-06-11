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
                <label htmlFor="value" className="font-semibold">Valor</label>
                <input  {...register("value", { required: true })} className="col-span-3 border p-1 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="text" id="value" />
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <button className="border px-4 py-1 rounded-md font-semibold">Cancelar</button>
                </DialogClose>
                <button className="border px-4 py-1 rounded-md bg-primary-dark font-semibold text-white">Criar</button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      ) : (
        allow_Edit === true ? (
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
                  <label htmlFor="value" className="font-semibold">Valor</label>
                  <input  {...register("value", { required: true })} className="col-span-3 border p-1 rounded-md [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" type="text" id="value" />
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <button className="border px-4 py-1 rounded-md font-semibold">Cancelar</button>
                  </DialogClose>
                  <button className="border px-4 py-1 rounded-md bg-primary-dark font-semibold text-white">Criar</button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        ) : (
          <Dialog>
          <DialogTrigger>
            <p className="py-2 bg-primary-dark px-8 rounded-md text-white font-semibold">Criar despesa</p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar Despesa</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="text-red-500 text-md">Apenas administradores podem criar despesas no grupo</div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
        )
      )}
    </>
  )
}