import Aos from "aos";
import 'aos/dist/aos.css';
import axios from "axios";
import api from "@/services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser, faUserAlt, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from 'sonner'
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {

  //Initializate AOS
  useEffect(() => {
    Aos.init();
  }, [])

  const navigate = useNavigate();
  //Valores do form
  const [details, setDetails] = useState({
    name: '',
    email: '',
    password: ''
  })
  const handleChange = (event) => {
    const { name, value } = event.target
    setDetails((prev) => {
      return { ...prev, [name]: value }
    })
  }

   function createUser(details) {
    api.post('/clients', details)
        .then((response) => {
          localStorage.setItem('token', response.data.token);
          const id = response.data.user.id;
          return navigate(`/${id}`);
        })
        .catch((error) => {
          // Acessando diretamente as propriedades de error.response.data
          if (error.response && error.response.data && error.response.data.name) {
            switch (error.response.data.name) {
              case "RequiredFieldException":
                toast.error(`${error.response.data.message}`); // Exibe a mensagem e o campo do erro
                break;
              case "InvalidFieldException":
                toast.error(`${error.response.data.message}`);
                break;
              case "UserExistsException":
                toast.error(`${error.response.data.message}`);
                break;
              default:
                toast.error(`${error.response.data.message}`);
                break;
            }
          } else {
            // Caso o erro não tenha a estrutura esperada
            toast.error("Erro desconhecido. Tente novamente.");
          }
        });
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    createUser(details);
  }

  //Senha oculta por padrão
  const [showPassword, setShowPassword] = useState(false);
  //Invertendo o valor do ShowPassword
  function handleTogglePasswordVisibility(fieldName) {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName]
    }));
  };


  return (
    <>
      <div data-aos="zoom-in" data-aos-duration="600" className="absolute top-6 left-6">
        <Link to="/home" className='font-bold text-3xl text-primary-dark hover:text-primary transition-all duration-300'> AllianceBasket</Link>
      </div>
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-b from-white via-primary-light to-primary ">
        <div data-aos="zoom-in" data-aos-duration="600" className="w-3/5 h-3/5  flex bg-white rounded-3xl shadow-md" >
          <div className="w-1/2 h-full flex flex-col justify-center items-center bg-primary rounded-tl-3xl rounded-bl-3xl rounded-tr-[60px] rounded-br-[60px]">
            <h1 className="text-white text-3xl font-bold">Seja bem-vindo</h1>

            <div className="flex flex-col text-center pt-[5%] gap-1 text-lg text-white">
              <p>Caso você ja tenha uma conta</p>
              <p>Clique para entrar no botão abaixo</p>
            </div>

            <Link to="/login" className="w-1/2 text-lg text-center font-semibold p-[10px] rounded-md border-none outline-none bg-white text-primary mt-[5%] hover:bg-primary-light  "> Entrar</Link>
          </div>
          <div className="w-1/2 h-full flex flex-col items-center justify-center">
            <div className="relative font-bold after:content-[''] after:w-10 after:h-1 after:rounded-sm after:bg-primary after:absolute after:bottom-[-12px] after:left-1/2 after:translate-x-[-50%]">
              <h1 className="text-3xl font-bold">Cadastre-se</h1>
            </div>

            <form className="w-4/5 flex flex-col items-center" onSubmit={handleSubmit}>
              <div className="w-full">
                <div className="w-full my-4 flex items-center border-b border-solid border-silver">
                  <FontAwesomeIcon icon={faUser} className="text-dark" />
                  <input
                    type="text"
                    placeholder="Nome"
                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg"
                    name="name"
                    onChange={handleChange} />
                </div>

                <div className="w-full my-4 flex items-center border-b border-solid border-silver">
                  <FontAwesomeIcon icon={faEnvelope} className="text-dark" />
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg"
                    name="email"
                    onChange={handleChange}
                  />
                </div>

                <div className="w-full my-4 flex items-center border-b border-solid border-silver relative">
                  <FontAwesomeIcon icon={faLock} className="text-dark" />
                  <div className="w-[90%]">
                    <input
                      type={showPassword.password ? "text" : "password"}
                      placeholder="Senha"
                      className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg"
                      name="password"
                      onChange={handleChange}
                    />
                    {showPassword.password ? (
                      <FontAwesomeIcon icon={faEye} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('password')} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('password')} />
                    )}
                  </div>
                </div>
                <div className="w-full my-4 flex items-center border-b border-solid border-silver relative">
                  <FontAwesomeIcon icon={faLock} className="text-dark" />
                  <div className="w-[90%]">
                    <input
                      type={showPassword.confirmPassword ? "text" : "password"}
                      placeholder="Confirmar Senha"
                      className="w-full bg-transparent border-none outline-none px-4 py-3 text-lg"
                      name="confirmPassword"
                      onChange={handleChange}
                    />
                    {showPassword.confirmPassword ? (
                      <FontAwesomeIcon icon={faEye} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('confirmPassword')} />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('confirmPassword')} />
                    )}
                  </div>


                </div>
                
              </div>
              <button className="w-3/5 text-lg font-medium p-3 rounded-md outline-none border-none bg-primary text-white hover:bg-meteorite-dark transition-all duration-300 mt-[7%]" type="submit">Cadastrar</button>
            </form>
          </div>
        </div>

      </div>
    </>
  )
}