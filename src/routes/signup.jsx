import { faEnvelope, faLock, faUser, faUserAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toaster, toast } from 'sonner'
export default function Signup() {
  const handleSubmit = (event) => {
    event.preventDefault(); 
  };
  return (
    <>

      <div className="absolute top-6 left-6">
        <a className="text-3xl text-dark font-bold cursor-pointer transition-all duration-300 hover:text-4xl">AllianceBasket</a>
      </div>
      <div className="w-full h-screen flex items-center justify-center bg-primary-light">
        <div className="w-3/5 h-3/5  flex bg-white rounded-3xl shadow-md" >
          <div className="w-1/2 h-full flex flex-col justify-center items-center bg-primary rounded-tl-3xl rounded-bl-3xl rounded-tr-[60px] rounded-br-[60px]">
            <h1 className="text-white text-3xl font-bold">Seja bem-vindo</h1>

            <div className="flex flex-col text-center pt-[5%] gap-1 text-lg text-white">
              <p>Caso você ja tenha uma conta</p>
              <p>Clique para entrar no botão abaixo</p>
            </div>

            <button className="w-1/2 text-lg font-semibold p-[10px] rounded-md border-none outline-none bg-white text-primary mt-[5%] hover:bg-primary-light  "> Entrar</button>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <div className="relative font-bold after:content-[''] after:w-10 after:h-1 after:rounded-sm after:bg-primary after:absolute after:bottom-[-12px] after:left-1/2 after:translate-x-[-50%]">
              <h1 className="text-3xl font-bold">Cadastre-se</h1>
            </div>

            <form className="w-4/5 flex flex-col items-center" onSubmit={handleSubmit}>
              <div className="w-full">
                <div className="w-full my-4 flex items-center border-b border-solid border-silver">
                  <FontAwesomeIcon icon={faUser} className="text-dark" />
                  <input type="text" placeholder="Nome" className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg" />
                </div>

                <div className="w-full my-4 flex items-center border-b border-solid border-silver">
                  <FontAwesomeIcon icon={faEnvelope} className="text-dark" />
                  <input type="email" placeholder="Email" className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg" />
                </div>

                <div className="w-full my-4 flex items-center border-b border-solid border-silver">
                  <FontAwesomeIcon icon={faLock} className="text-dark" />
                  <input type="password" placeholder="Senha" className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg" />
                </div>
                <div className="w-full my-4 flex items-center border-b border-solid border-silver">
                  <FontAwesomeIcon icon={faLock} className="text-dark" />
                  <input type="password" placeholder="Confirmar Senha" className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg" />
                </div>
              </div>
              <button onClick={() => toast.error('Error')} className="w-3/5 text-lg font-medium p-3 rounded-md outline-none border-none bg-primary text-white hover:bg-meteorite-dark transition-all duration-300 mt-[7%]" type="submit">Cadastrar</button>
            </form>
          </div>
        </div>
        
      </div>
    </>
  )
}