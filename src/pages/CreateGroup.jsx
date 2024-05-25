import Aos from "aos";
import 'aos/dist/aos.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faClose, fa1, fa2, fa3, fa4, fa5, fa6 } from "@fortawesome/free-solid-svg-icons"
import { useState, useEffect } from "react"
import { useForm } from "react-hook-form";
import Header from "../components/Header"
import StepNumber from "../components/StepNumber"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Search } from "lucide-react";
import api from "@/services/api";


export default function CreateGroup() {

  //Initializate AOS
  useEffect(() => {
    Aos.init();
  }, [])

  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  const onSubmit = data => console.log(data);

  // api.get(`/clients/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
  //   .then((response) => {
  //     console.log("Received response from backend:", response.data);
  //     setUser(response.data);
  //   })
  //   .catch((error) => {
  //     console.error("Error fetching clients:", error);
  //   });


  const [fields, setFields] = useState(
    {
      email: ""
    }
  )

  function SearchClients(event) {
    const { value } = event.target;
    setFields({ email: value });

    if (value.length >= 3) {
      api.post(`/clients/search`, { email: value }, { headers: { 'Authorization': localStorage.getItem('token') } })
        .then((response) => {
          console.log("Received response from backend:", response.data);
        })
        .catch((error) => {
          console.error("Error fetching clients:", error);
        });
    }
  }





  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="bg-white flex-grow overflow-y-auto flex flex-col items-center justify-center">
        <div data-aos="fade-left" data-aos-duration="600" className="max-w-[1600px]">
          <h1 className="font-bold text-6xl text-dark relative text-center">Criando seu <span className="text-primary-dark">grupo</span></h1>
          <p className="mt-4 text-2xl text-center text-meteorite-dark">Nossa plataforma permite que você crie grupos personalizados de forma simples e intuitiva. Siga os passos abaixo para criar o seu grupo:</p>
          <div className="py-10 grid grid-cols-3 gap-9">

            <StepNumber icon={fa1} groupName="Inserir Nome do Grupo:" content="Insira um nome significativo para identificar seu grupo. Certifique-se de escolher um título claro e fácil de lembrar." />
            <StepNumber icon={fa2} groupName="Descrição do Grupo" content="Descreva o propósito ou a missão do grupo. Destaque as principais atividades ou interesses compartilhados pelos membros." />
            <StepNumber icon={fa3} groupName="Tipo do Grupo:" content="Selecione o tipo de grupo que melhor se adapta à sua comunidade e seus propósitos." />
            <StepNumber icon={fa4} groupName="Quem Pode Criar Despesa:" content="Defina quem tem permissão para criar despesas dentro do grupo. Escolha entre todos os membros ou apenas o admnistrador." />
            <StepNumber icon={fa5} groupName="Adicionar Membros:" content="Adicione novos membros ao seu grupo. Insira os endereços de e-mail ou nomes de usuário dos indivíduos que deseja incluir." />
            <StepNumber icon={fa6} groupName="Criar Finalmente:" content="Revise todas as configurações e informações do grupo. Certifique-se de que tudo esteja correto." />
          </div>


          <div>
            <div className="flex items-center justify-center gap-4 text-meteorite-dark text-xl">
              <FontAwesomeIcon icon={faCheck} className="text-success-dark font-black" />
              <p className="text-xl text-success-dark">Lembre-se de manter uma comunicação clara e aberta com os membros do grupo para garantir uma
                experiência positiva para todos.</p>
            </div>

            <div className="flex flex-col items-center justify-center pt-6">
              <Dialog>
                <DialogTrigger className="bg-success-dark py-4 px-8 text-xl font-bold text-white rounded-xl">Criar grupo</DialogTrigger>
                <DialogContent>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <DialogHeader className="flex flex-col gap-5">

                      <DialogTitle className="text-3xl text-center font-bold">Criar grupo</DialogTitle>
                      <DialogDescription className="flex flex-col text-xl ">
                        <label htmlFor="" className="text-dark ">Nome do grupo</label>
                        <input
                          {...register("name", { required: true })}
                          className="border border-grey-5800 pl-2"
                        />
                      </DialogDescription>
                      <DialogDescription className="flex flex-col text-xl ">
                        <label htmlFor="" className="text-dark ">Descrição</label>
                        <textarea  {...register("description")} className="border resize-none h-40 p-2 border-grey-5800"></textarea>
                      </DialogDescription>
                      <DialogDescription className="flex flex-col text-xl ">
                        <select {...register("type", { required: true })}>
                          <option value="">Select...</option>
                          <option value="Trabalho">Trabalho</option>
                          <option value="Viagem">Viagem</option>
                          <option value="Casa">Casa</option>
                          <option value="Evento">Evento</option>
                          <option value="Grupo">Grupo</option>
                        </select>
                      </DialogDescription>
                      <DialogDescription className="pl-4 flex flex-col text-xl ">
                        {/* <RadioGroup defaultValue="option-one">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem className="size-4" value="option-one" id="option-one" />
                            <label htmlFor="option-one" className="text-dark">Apenas o administrador criar despesa</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <label htmlFor="option-two" className="text-dark">Todos criarem despesas</label>
                          </div>
                        </RadioGroup> */}
                        <div className="flex flex-col">
                          <label htmlFor="field-rain" className="flex gap-2">
                            <input
                              {...register("allow_edit")}
                              type="radio"
                              value="0"
                              id="field-rain"
                            />
                            Apenas o admnistrador pode criar despesas
                          </label>
                          <label htmlFor="field-rain" className="flex gap-2">
                            <input
                              {...register("allow_edit")}
                              type="radio"
                              value="1"
                              id="field-rain"
                            />
                            Todos os usuários podem criar despesas
                          </label>
                        </div>


                      </DialogDescription>
                      <DialogDescription>
                        <div className="flex flex-col w-full">
                          <input type="text" placeholder="membro" onChange={SearchClients} className="border border-grey-5800 py-2 pl-2" />

                        </div>
                      </DialogDescription>

                      <div className="flex items-center justify-center pt-2">
                        <input type="submit" className="bg-primary py-3 w-1/5 text-white rounded-md" placeholder="submit" />
                      </div>

                    </DialogHeader>
                  </form>
                </DialogContent>
              </Dialog>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}