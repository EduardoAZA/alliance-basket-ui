import Aos from "aos";
import 'aos/dist/aos.css';
import Header from "../components/Header"
import { useEffect, useState } from "react";
import api from "../services/api";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { Toaster, toast } from 'sonner'

export default function Profile() {
  //Initializate AOS
  useEffect(() => {
    Aos.init();
  }, [])

  const { id } = useParams();

  useEffect(() => {
    console.log("Making request to backend...");
    api.get(`/clients/${id}`, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        console.log("Received response from backend:", response.data);
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, [id]);

  const [user, setUser] = useState({});

  const [newData, setNewData] = useState({
    name: "",
    // email: ""
  })

  const handleChangeData = (e) => {
    const { name, value } = e.target
    setNewData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  function handleSubmitData(event) {
    event.preventDefault();
    updateClient(newData);
  }

  function updateClient(newData) {
    api.put(`/clients/${id}`, newData, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        setUser(response.data); 
        toast.success("Perfil atualizado com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        toast.error("Email ja cadastrado.");
      });
  }

  const [newPassword, setNewPassword] = useState(
    {
      password: "",
      oldPassword: ""
    }
  )

  const handleChangePassword = (e) => {
    const { name, value } = e.target
    setNewPassword((prev) => {
      return { ...prev, [name]: value }
    })
  }

  function updatePassoword(newPassword) {
    console.log(newData.email)
    api.put(`/clients/${id}`, newPassword, { headers: { 'Authorization': localStorage.getItem('token') } })
      .then((response) => {
        toast.success("Perfil atualizado com sucesso!");
        setTimeout(() => {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        toast.error("Senha anterior inválida.");
      });
  }

  function handleSubmitPassword(event) {
    event.preventDefault();

    if (!confirmPassword || !newPassword.oldPassword || !newPassword.password) {
      toast.error("Preencha todos os campos")
      return
    }

    if (newPassword.password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return
    }

    // Verificação de caracteres
    if (newPassword.password.length < 8) {
      toast.error("Sua senha deve conter ao menos 8 caracteres ")
      return;
    }

    // Verificação de letra maiscula
    if (!/[A-Z]/.test(newPassword.password)) {
      toast.error("Sua senha deve conter uma letra minúscula");
      return;
    }

    //Verificação de caracter especial
    if (!/[^a-zA-Z0-9]/.test(newPassword.password)) {
      toast.error("Sua senha deve conter pelo menos um caractere especial");
      return;
    }

    if (!/[0-9]/.test(newPassword.password)) {
      toast.error("Sua senha deve conter ao menos um número")
      return;
    }

    updatePassoword(newPassword);
  }

  //Armazenar senha antiga
  const [oldPassword, setOldPassword] = useState("")
  // Setar senha antiga
  const handleChangeOldPassword = (event) => {
    setOldPassword(event.target.value);
  };
  //Armazenar confirmação de senha
  const [confirmPassword, setConfirmPassword] = useState("")
  // Setar senha antiga
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  //Senha oculta por padrão
  const [showPassword, setShowPassword] = useState(
    {
      oldPassword: false,
      password: false,
      confirmPassword: false
    }
  );
  //Invertendo o valor do ShowPassword
  function handleTogglePasswordVisibility(fieldName) {
    setShowPassword((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName]
    }));
  };
  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div data-aos="zoom-in" data-aos-duration="600" className="absolute bottom-6 right-6 z-10"><img src="/src/assets/images/profile.svg" className=" w-[20rem]" /></div>
      <div data-aos="zoom-in" data-aos-duration="600" className="absolute top-24 left-6 z-10"><img src="/src/assets/images/profile-2.svg" className=" w-[20rem]" /></div>

      <div className="flex-grow overflow-y-auto flex flex-col items-center justify-center">
        <div data-aos="zoom-in" data-aos-duration="600" className="shadow-mild w-[25%]  flex flex-col items-center p-10 justify-between z-50 bg-white">
          <div className="flex flex-col items-center gap-4">
            <p className="text-3xl font-bold text-meteorite-dark">Perfil</p>
            <img className="w-[50%]" src="/src/assets/images/avatar.svg" alt="" />
          </div>
          <div className="w-full flex flex-col gap-8">
            <div className="w-full flex flex-col gap-2">
              <p className="text-xl font-bold">Nome</p>
              <input type="text" className="w-full p-2 border-none outline-none bg-primary-light rounded-md" placeholder={user.name} readOnly />
            </div>
            <div className="w-full flex flex-col gap-2">
              <p className="text-xl font-bold">Email</p>
              <input type="text" className="w-full p-2 border-none outline-none bg-primary-light rounded-md" placeholder={user.email} readOnly />
            </div>
          </div>
          <div className="flex gap-12 w-full mt-5">
            <Dialog>
              <DialogTrigger className="w-3/5 ">
                <p className="w-full hover:bg-meteorite-dark py-3 bg-primary text-sm text-white font-bold rounded-md">Editar</p>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-primary-light">
                <DialogHeader>
                  <DialogTitle className="text-center">Editar</DialogTitle>
                  <DialogFooter className="flex flex-col items-center">
                    <form className="w-full flex flex-col items-center" onSubmit={handleSubmitData}>
                      <div className="w-full flex flex-col mt-5 gap-5">
                        <div>
                          <label htmlFor="" className="w-full border-none outline-none text-dark rounded-md text-lg font-bold">Nome</label>
                          <input
                            type="text"
                            className="w-full p-2 border-none outline-none bg-gray-200 rounded-md"
                            name="name"
                            placeholder={user.name}
                            onChange={handleChangeData}
                          />
                        </div>
                        <div>
                          <label htmlFor="" className="outline-none text-dark  text-lg font-bold">Email</label>
                          <input
                            type="text"
                            className="w-full p-2 border-none outline-none bg-gray-200 rounded-md"
                            name="email"
                            placeholder={user.email}
                            onChange={handleChangeData}
                          />
                        </div>
                      </div>
                      <button type="submit" className="w-2/5 bg-green-500 py-2 mt-5 text-white font-bold rounded-md hover:bg-green-700 transition-all duration-300">Salvar</button>
                    </form>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger className="w-3/5">
                <p className="w-full hover:bg-meteorite-dark py-3 bg-primary text-sm text-white font-bold rounded-md" >Alterar senha</p>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-primary-light">
                <DialogHeader>
                  <DialogTitle className="text-center ">Alterar Senha </DialogTitle>
                  <DialogFooter className="flex flex-col items-center">
                    <form className="w-full flex flex-col items-center" onSubmit={handleSubmitPassword}>
                      <div className="w-full flex flex-col mt-5 gap-5">
                        <div className="">
                          <label htmlFor="" className="w-full border-none text-dark outline-nonerounded-md text-lg font-bold">Senha antiga</label>
                          <div className="relative">
                            <input type={showPassword.oldPassword ? "text" : "password"} name="oldPassword" className="w-full p-2 border-none outline-none bg-gray-200 rounded-md" onChange={handleChangePassword} />
                            {showPassword.oldPassword ? (
                              <FontAwesomeIcon icon={faEye} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('oldPassword')} />
                            ) : (
                              <FontAwesomeIcon icon={faEyeSlash} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('oldPassword')} />
                            )}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="" className="outline-none text-lg font-bold text-dark ">Nova senha</label>
                          <div className="relative">
                            <input type={showPassword.password ? "text" : "password"} name="password" onChange={handleChangePassword} className="w-full p-2 border-none outline-none bg-gray-200 rounded-md" />
                            {showPassword.password ? (
                              <FontAwesomeIcon icon={faEye} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('password')} />
                            ) : (
                              <FontAwesomeIcon icon={faEyeSlash} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('password')} />
                            )}
                          </div>
                        </div>
                        <div>
                          <label htmlFor="" className="outline-none text-lg font-bold text-dark ">Confirmação da senha</label>
                          <div className="relative">
                            <input type={showPassword.confirmPassword ? "text" : "password"} name="confirmPassword" onChange={handleChangeConfirmPassword} className="w-full p-2 border-none outline-none bg-gray-200 rounded-md" />
                            {showPassword.confirmPassword ? (
                              <FontAwesomeIcon icon={faEye} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('confirmPassword')} />
                            ) : (
                              <FontAwesomeIcon icon={faEyeSlash} className="absolute top-3 right-2 cursor-pointer" onClick={() => handleTogglePasswordVisibility('confirmPassword')} />
                            )}
                          </div>
                        </div>
                      </div>
                      <button type="submit" className="w-2/5 bg-green py-2 mt-5 text-white font-bold rounded-md bg-green-500 hover:bg-green-700 transition-all duration-300">Salvar</button>
                    </form>
                  </DialogFooter>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>

        </div>
      </div>
    </div>
  )
}
