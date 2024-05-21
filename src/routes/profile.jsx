import Aos from "aos";
import 'aos/dist/aos.css';
import Header from "../components/Header"
import { useEffect, useState } from "react";
import api from "../services/api";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function Profile() {
  const { id } = useParams();

  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  
  //Initializate AOS
  useEffect( () => {
    Aos.init();
  }, [])


  useEffect(() => {
    console.log("Making request to backend...");
    api.get(`/clients/${id}`, { headers: { 'authorization': localStorage.getItem('token') } })
      .then((response) => {
        console.log("Received response from backend:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [id]);

  //Senha oculta por padrão
  const [showPassword, setShowPassword] = useState(false);
  //Invertendo o valor do ShowPassword
  function handleTogglePasswordVisibility() {
    setShowPassword(!showPassword);
  };


  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div data-aos="zoom-in" data-aos-duration="600" className="absolute bottom-6 right-6 z-10"><img src="/src/assets/images/profile.svg" className=" w-[20rem]" /></div>
      <div data-aos="zoom-in" data-aos-duration="600" className="absolute top-24 left-6 z-10"><img src="/src/assets/images/profile-2.svg" className=" w-[20rem]" /></div>

      <div className="flex-grow overflow-y-auto flex flex-col items-center justify-center">
        <div data-aos="zoom-in" data-aos-duration="600" className="shadow-mild w-[25%] h-[70%] flex flex-col items-center p-10 justify-between z-50 bg-white">
          <div  className="flex flex-col items-center gap-4">
            <p className="text-3xl font-bold text-meteorite-dark">Perfil</p>
            <img className="w-[50%]" src="/src/assets/images/avatar.svg" alt="" />
          </div>
          <div className="w-full flex flex-col gap-8">
            <div className="w-full flex flex-col gap-2">
              <p className="text-xl font-bold">Email</p>
              <input type="text" className="w-full p-2 border-none outline-none bg-primary-light rounded-md" placeholder={user.email} readOnly />
            </div>
            <div>
              <p className="text-xl font-bold">Senha</p>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} className="w-full p-2 border-none outline-none bg-primary-light rounded-md" placeholder="********" readOnly />
                {showPassword ? (
                  <FontAwesomeIcon icon={faEyeSlash} className="absolute top-3 right-2 cursor-pointer" onClick={handleTogglePasswordVisibility} />
                ) : (
                  <FontAwesomeIcon icon={faEye} className="absolute top-3 right-2 cursor-pointer" onClick={handleTogglePasswordVisibility} />
                )}
              </div>
            </div>
          </div>
          <div className="flex gap-12 w-full mt-5">
            <Dialog>
              <DialogTrigger className="w-3/5 ">
                <button className="w-full hover:bg-meteorite-dark py-3 bg-primary text-white font-bold rounded-md">Editar</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-primary-light">
                <DialogHeader>
                  <DialogTitle className="text-center">Editar</DialogTitle>
                  <DialogDescription className="flex flex-col items-center">

                    <div className="w-full flex flex-col mt-5 gap-5">
                      <div>
                        <label htmlFor="" className="w-full border-none outline-none text-dark rounded-md text-lg font-bold">Nome</label>
                        <input type="text" className="w-full p-2 border-none outline-none bg-gray-200 rounded-md" />
                      </div>
                      <div>
                        <label htmlFor="" className="outline-none text-dark  text-lg font-bold">Email</label>
                        <input type="text" className="w-full p-2 border-none outline-none bg-gray-200 rounded-md" />
                      </div>
                    </div>
                    <button className="w-2/5 bg-green-500 py-2 mt-5 text-white font-bold rounded-md hover:bg-green-700 transition-all duration-300">Salvar</button>

                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className="w-3/5">
                <button className="w-full hover:bg-meteorite-dark py-3 bg-primary text-white font-bold rounded-md" >Alterar senha</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-primary-light">
                <DialogHeader>
                  <DialogTitle className="text-center ">Alterar Senha </DialogTitle>
                  <DialogDescription className="flex flex-col items-center">
                    <div className="w-full flex flex-col mt-5 gap-5">
                      <div >
                        <label htmlFor="" className="w-full border-none text-dark outline-nonerounded-md text-lg font-bold">Senha antiga</label>
                        <input type="password" className="w-full p-2 border-none outline-none bg-gray-200 rounded-md" />
                      </div>
                      <div>
                        <label htmlFor="" className="outline-none text-lg font-bold text-dark ">Nova senha</label>
                        <input type="password" className="w-full p-2 border-none outline-none bg-gray-200 rounded-md" />
                      </div>
                      <div>
                        <label htmlFor="" className="outline-none text-lg font-bold text-dark ">Confirmação da senha</label>
                        <input type="password" className="w-full p-2 border-none outline-none bg-gray-200 rounded-md" />
                      </div>
                    </div>
                    <button className="w-2/5 bg-green py-2 mt-5 text-white font-bold rounded-md bg-green-500 hover:bg-green-700 transition-all duration-300">Salvar</button>

                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </div>
    </div>
  )
}