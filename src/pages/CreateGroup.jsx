import Aos from "aos";
import 'aos/dist/aos.css';
import axios from "axios";
import api from "@/services/api";
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
} from "@/components/ui/dialog"
import { useParams } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, Search } from "lucide-react";
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
export default function CreateGroup() {

  const navigate = useNavigate();
  const { id } = useParams();
  //Initializate AOS
  useEffect(() => {
    Aos.init();
  }, [])

  const { register, handleSubmit } = useForm();


  const animatedComponents = makeAnimated();

  const options = [
    { value: 'Trabalho', label: 'Trabalho' },
    { value: 'Viagem', label: 'Viagem' },
    { value: 'Casa', label: 'Casa' },
    { value: 'Evento', label: 'Evento' },
    { value: 'Grupo', label: 'Grupo' },
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

  function onSubmit(data, event) {
    api.post(`/groups/clients/${id}`, data, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        console.log("Received response from backend:", response.data);
        const idGroup = response.data.group.id
        navigate(`/grupo/${idGroup}/cliente/${id}`)
      })
      .catch((error) => {
        console.error(error);
      });
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
                  <form onSubmit={handleSubmit((data) => onSubmit({ ...data, invites: values }))}>
                    <DialogHeader className="flex flex-col gap-5">

                      <DialogTitle className="text-3xl text-center font-bold">Criar grupo</DialogTitle>
                      <div className="flex flex-col text-xl ">
                        <label className="text-dark">Nome do grupo</label>
                        <input
                          {...register("name", { required: true })}
                          className="border border-dark-primary rounded-sm pl-2"
                        />
                      </div>
                      <div className="flex flex-col text-xl ">
                        <label htmlFor="" className="text-dark ">Descrição</label>
                        <textarea  {...register("description")} className="border border-dark-primary rounded-sm resize-none h-40 p-2 border-grey-5800"></textarea>
                      </div>
                      <div className="flex flex-col text-xl ">
                        <select {...register("type", { required: true })} className=" border border-dark-primary rounded-sm">
                          <option value="">Tipo do grupo</option>
                          <option value="Trabalho">Trabalho</option>
                          <option value="Viagem">Viagem</option>
                          <option value="Casa">Casa</option>
                          <option value="Evento">Evento</option>
                          <option value="Grupo">Grupo</option>
                        </select>
                      </div>
                      <div className="pl-4 flex flex-col text-xl ">
                        <div className="flex flex-col">
                          <label htmlFor="admin" className="flex gap-2">
                            <input
                              {...register("allowEdit")}
                              type="radio"
                              value="false"
                              id="admin"
                            />
                            Apenas o admnistrador pode criar despesas
                          </label>
                          <label htmlFor="allUsers" className="flex gap-2">
                            <input
                              {...register("allowEdit")}
                              type="radio"
                              value="true"
                              id="allUsers"
                            />
                            Todos os usuários podem criar despesas
                          </label>
                        </div>


                      </div>
                      <div>
                        <div className="">
                          <div className="flex gap-10">
                            <input
                              type="text"
                              value={inputValue}
                              onChange={handleChange}
                              placeholder="Digite um valor"
                              className="border border-dark-primary rounded-sm w-4/5 p-2 "
                            />
                            <button onClick={inviteSubmit} className="border-2 border-primary-dark rounded-sm px-3 text-primary-dark hover:bg-gray-200">Adicionar</button>
                          </div>
                          <div>
                            {values.map((value, index) => (
                              <div key={index} className="flex mt-5 justify-between border-b border-primary-dark">
                                <p className="pb-2 text-lg font-bold">{value}</p>
                                <button className="px-4 border bg-red-500 text-white hover:bg-red-600 rounded-md" onClick={(event) => inviteRemove(index, event)}>Remover</button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-center pt-2">
                        <button type="submit" className="bg-primary py-3 w-1/5 text-white rounded-md  cursor-pointer hover:bg-meteorite-dark" placeholder="submit" > Criar</button>
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
