import Header from "../components/Header"
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

export default function Profile() {
  const [user, setUser] = useState();


 useEffect(() => {
    console.log("Making request to backend...");
    api.get("/signup")
      .then((response) => {
        console.log("Received response from backend:", response.data);
        setUser(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  return (
    <div className="h-screen flex flex-col ">
      <Header />
      <div className="absolute bottom-6 right-6"><img src="/src/assets/images/profile.svg" className=" w-[24rem]" /></div>
      <div className="absolute top-24 left-6 "><img src="/src/assets/images/profile-2.svg" className=" w-[24rem]" /></div>

      <div className="flex-grow overflow-y-auto flex flex-col items-center justify-center">
        <div className="shadow-mild w-[25%] h-[70%] flex flex-col items-center p-10 justify-between">
          <div className="flex flex-col items-center gap-4">
            <p className="text-3xl font-bold text-meteorite-dark">Perfil</p>
            <img className="w-[50%]" src="/src/assets/images/avatar.svg" alt="" />
    
          </div>
          <div className="w-full flex flex-col gap-8">
            <div className="w-full flex flex-col gap-2">
              <p className="text-xl font-bold">Nome</p>
              <input type="text" className="w-full p-2 border-none outline-none bg-primary-light rounded-md" placeholder="Eduardo Affonso" />
            </div>
            <div>
              <p className="text-xl font-bold">Senha</p>
              <input type="password" className="w-full p-2 border-none outline-none bg-primary-light rounded-md"placeholder="***********" />
            </div>
          </div>
          <div className="w-3/5">
            <button className="bg-primary w-full p-3 rounded-md text-white">Editar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
