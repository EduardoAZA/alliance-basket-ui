import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/Header"
import Step from "../components/StepNumber"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
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


export default function CreateGroup() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="bg-primary flex-grow overflow-y-auto">
        <div className="flex items-center justify-center">
          {/* FAZER O AFTER */}
          <h1 className="font-bold text-5xl text-white pt-16 relative">Criando seu grupo</h1>
        </div>


        <div className="container-text">
          <p className="mt-4 text-xl text-center text-white">Nossa plataforma permite que você crie grupos personalizados de forma simples e intuitiva. Siga os passos abaixo para criar o seu grupo:</p>

          <div className="py-16 px-10 grid grid-cols-3 gap-14">
            <Step content="Escolha um nome que represente bem o seu grupo. Pode ser o nome de
                        uma equipe, projeto ou qualquer outro tema relevante.
                    "/>
            <Step content="Descreva brevemente o propósito do grupo. Isso ajudará os
                            participantes a entenderem do que se trata e o que esperar ao participar.
                    " />
            <Step content="Selecione o tipo de grupo que melhor se encaixa na sua
                            necessidade. Pode ser um grupo de estudo, de trabalho, social, entre outros.
                    " />
            <Step content="Adicione os membros que farão parte do grupo. Você pode
                            convidá-los por e-mail ou através de um link de convite.
                    " />
            <Step content="Personalize as configurações do grupo de acordo com
                            suas preferências. Você pode definir regras, permissões e outras configurações para melhor
                            atender às necessidades do grupo.
                    " />
            <Step content="Após preencher todas as informações, clique em 'Criar Grupo' para
                            finalizar o processo. Seu grupo estará pronto para uso e os participantes poderão começar a
                            interagir imediatamente." />
          </div>


          <div className="">
            <div className="flex items-center justify-center gap-4 text-success text-xl">
              <FontAwesomeIcon icon={faCheck} className="" />
              <p>Lembre-se de manter uma comunicação clara e aberta com os membros do grupo para garantir uma
                experiência positiva para todos.</p>
            </div>




            <div className="flex flex-col items-center justify-center pt-10">
              <Dialog>
                <DialogTrigger className="bg-success py-4 px-12 text-xl font-bold text-white rounded-md">Criar grupo</DialogTrigger>
                <DialogContent>
                  <DialogHeader className="flex flex-col gap-5">
                    <DialogTitle className="text-3xl text-center font-bold">Criar grupo</DialogTitle>
                    <DialogDescription className="flex flex-col text-xl ">
                      <label htmlFor="" className="text-dark ">Nome do grupo</label>
                      <input type="text" className="border" />
                    </DialogDescription>
                    <DialogDescription className="flex flex-col text-xl ">
                      <label htmlFor="" className="text-dark ">Descrição</label>
                      <textarea name="" id="" className="border resize-none h-40"></textarea>
                    </DialogDescription>
                    <DialogDescription className="flex flex-col text-xl ">
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo do grupo" className="text-2xl" />
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
                          <label htmlFor="option-one">Option One</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-two" id="option-two" />
                          <label htmlFor="option-two">Option Two</label>
                        </div>
                      </RadioGroup>

                    </DialogDescription>
                    
                    <DialogDescription className="flex flex-col text-xl ">
                    <label htmlFor="" className="text-dark ">Adicionar participante</label>
                    <input type="text" name="" id="" className="border-b" placeholder="Nome" />
                    </DialogDescription>
                    
                    <div className="flex items-center justify-center pt-10">
                      <Button className="py-6 w-2/5">Criar</Button>
                    </div>

                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>


          </div>
        </div>
      </div>
    </div>
  )
}