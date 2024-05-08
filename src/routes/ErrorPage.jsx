import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function ErrorPage() {
  const { id } = useParams();
  return (
    <>
      <div className="absolute top-6 left-6 max-[600px]:left-1/2 max-[600px]:-translate-x-1/2">
        {id ? (
          <Link to={`/home/${id}`} className='font-bold text-3xl text-primary-dark hover:text-primary transition-all duration-300'> AllianceBasket</Link>
        ) : (
          <Link to="/home" className='font-bold text-3xl text-primary-dark hover:text-primary transition-all duration-300'> AllianceBasket</Link>
        )}</div>
      <div className='w-full h-screen flex justify-center items-center bg-white '>
        <div className="flex flex-col items-center justify-evenly py-12 px-8 h-[30rem] max-w-[40rem] text-center shadow-mild rounded-lg bg-primary max-[600px]:w-full max-[600px]:flex max-[600px]:flex-col max-[600px]:items-center  ">
          <div>
            <h1 className="text-9xl font-bold text-white">404</h1>
            <p className="text-4xl text-white">Página não encontrada!</p>
            <p className="text-xl pt-10 text-center text-white">Desculpe, página não encontrada. Por favor, retorne à tela inicial.</p>
          </div>
          <Button className="bg-white w-[60%] py-7 text-2xl text-primary font-bold">HOME</Button>
        </div>
      </div>
    </>
  )
}