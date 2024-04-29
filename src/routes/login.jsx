import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button"
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [fields, setFields] = useState({
    email:'',
    password:'',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prev) => {
      return {...prev, [name] : value};
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!fields.email || !fields.password) { 
      toast.error("Por favor, preencha todos os campos."); 
      return;
    }
    
  }
  
  return (
    <>
      <div className="absolute top-6 left-6 max-[600px]:left-1/2 max-[600px]:-translate-x-1/2">
        <Link to="/" className="text-3xl text-dark font-bold cursor-pointer transition-all duration-300 hover:text-4xl max-[450px]:text-3xl">AllianceBasket</Link>
      </div>
      <div className='w-full h-screen flex justify-center items-center bg-gradient-to-b from-primary-dark via-primary to-white  '>
        <div className="py-16 px-12 text-center shadow-normal rounded-lg bg-white max-[600px]:w-full max-[600px]:flex max-[600px]:flex-col max-[600px]:items-center  ">
          <h1 className="text-[40px] mb-14 text-primary relative font-bold after:content-[''] after:w-10 after:h-1 after:rounded-sm after:bg-primary after:absolute after:bottom-[-12px] after:left-1/2 after:translate-x-[-50%] max-[600px]:text-3xl">Login</h1>
          <form className="w-96 h-72 max-[450px]:w-80" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="flex items-center border-b border-solid border-silver">
                <FontAwesomeIcon icon={faEnvelope} className="text-dark" />
                <input 
                type="text"
                className="border-none outline-none px-4 py-3 text-dark text-lg focus:text-primary-dark " 
                placeholder="Email"
                name="email"
                onChange={handleChange}
                />
              </div>
              <div className="flex items-center border-b border-solid border-silver">
                <FontAwesomeIcon icon={faLock} className="text-dark" />
                <input 
                type="password"
                className="border-none outline-none px-4 py-3 text-dark text-lg" 
                placeholder="Senha" 
                name="password"
                onChange={handleChange}
                />
              </div>
            </div>
            <p className="text-left text-lg font-semibold pt-3"><Link to="/" href="" className="text-primary cursor-pointer hover:text-meteorite-dark transition-all duration-300">Esqueceu a senha?</Link></p>
            <div className="w-full flex mt-8">
              <button className="w-full text-lg font-medium p-4 rounded-md outline-none border-none bg-primary text-white hover:bg-meteorite-dark transition-all duration-300" type="submit">Login</button>
            </div>
            <p className="text-lg mt-4 font-semibold">Nao tem sua conta ainda? <Link to="/cadastro" className="text-primary font-semibold cursor-pointer hover:text-meteorite-dark transition-all duration-300">Cadastre-se</Link></p>
          
          </form>
        </div>
      </div>
    </>
  )
}