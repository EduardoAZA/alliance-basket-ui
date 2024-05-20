import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/Header"
import StepNumber from "../components/StepNumber"
import { faCheck, faClose } from "@fortawesome/free-solid-svg-icons"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { fa1, fa2, fa3, fa4, fa5, fa6 } from "@fortawesome/free-solid-svg-icons"
import { useState } from "react"

export default function CreateGroup() {

  const [groupConfigs, setGroupConfigs] = useState({
    title: '',
    description: '',
    groupType: '',
    expenseCreator: '',
    invites: []
  })

  const handleChange = (event) => {
    const { name, value } = event.target

    setDetails((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const [nome, setNome] = useState('');
  const [participantes, setParticipantes] = useState([]);

  const handleChangeNome = (e) => {
    setNome(e.target.value);
  };

  const addInvite = (event) => {
    if (nome.trim() !== '') {
      setParticipantes([...participantes, nome]);
      // Limpando o campo
      setNome('');
    }
  };

  const removeInvite = (index) => {
    const newParticipantes = [...participantes];
    newParticipantes.splice(index, 1);
    setParticipantes(newParticipantes);
  };

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="bg-white   flex-grow overflow-y-auto flex flex-col items-center justify-center">
        <div className="max-w-[1600px]">
          <h1 className="font-bold text-6xl text-meteorite-dark relative text-center">Criando seu <span className="text-primary-dark">grupo</span></h1>
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
                  <form action="">
                    <DialogHeader className="flex flex-col gap-5">

                      <DialogTitle className="text-3xl text-center font-bold">Criar grupo</DialogTitle>
                      <DialogDescription className="flex flex-col text-xl ">
                        <label htmlFor="" className="text-dark ">Nome do grupo</label>
                        <input
                          type="text"
                          className="border border-grey-5800 pl-2"
                          name="title"
                        />
                      </DialogDescription>
                      <DialogDescription className="flex flex-col text-xl ">
                        <label htmlFor="" className="text-dark ">Descrição</label>
                        <textarea name="" id="" className="border resize-none h-40 p-2 border-grey-5800"></textarea>
                      </DialogDescription>
                      <DialogDescription className="flex flex-col text-xl ">
                        <Select>
                          <SelectTrigger className="border border-grey-5800">
                            <SelectValue placeholder="Tipo do grupo" className="text-2xl " />
                          </SelectTrigger>
                          <SelectContent >
                            <SelectItem value="viagem" >Viagem</SelectItem>
                            <SelectItem value="familia">Família</SelectItem>
                            <SelectItem value="org1">Organização</SelectItem>
                            <SelectItem value="org2">Organização</SelectItem>
                            <SelectItem value="org3">Organização</SelectItem>
                            <SelectItem value="org4">Organização</SelectItem>
                          </SelectContent>
                        </Select>
                      </DialogDescription>
                      <DialogDescription className="pl-4 flex flex-col text-xl ">
                        <RadioGroup defaultValue="option-one">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem className="size-4" value="option-one" id="option-one" />
                            <label htmlFor="option-one" className="text-dark">Apenas o administrador criar despesa</label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="option-two" id="option-two" />
                            <label htmlFor="option-two" className="text-dark">Todos criarem despesas</label>
                          </div>
                        </RadioGroup>

                      </DialogDescription>

                      <DialogDescription className="flex flex-col text-xl ">
                        <label htmlFor="" className="text-dark ">Adicionar participante</label>
                        <div className="flex gap-5">
                          <input
                            type="text"
                            className="border-b border-grey-5800 mt-3 w-4/5 pl-2"
                            placeholder="Nome"
                            value={nome}
                            onChange={handleChangeNome}
                          />
                          <button
                            type="button"
                            onClick={addInvite}
                            className="border border-primary pl-4 pr-4 rounded-md text-primary hover:bg-primary hover:text-white"
                          >
                            Adicionar
                          </button>
                        </div>
                        <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                          {participantes.map((participante, index) => (
                            <div key={index} className="flex justify-between pt-5">
                              <div>{participante}</div>
                              <button
                                type="button"
                                onClick={() => removeInvite(index)}
                                className="text-2xl"
                              >
                                <FontAwesomeIcon icon={faClose} className="text-red-500 font-black hover:text-red-700" />
                              </button>
                            </div>
                          ))}
                        </div>

                      </DialogDescription>

                      <div className="flex items-center justify-center pt-10">
                        <Button type="submit" className="py-6 w-2/5 text-white text-lg">Criar</Button>
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