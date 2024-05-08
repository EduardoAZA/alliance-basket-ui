import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Header from "../components/Header"
import { faCheck } from "@fortawesome/free-solid-svg-icons"
export default function Home() {
  
  
  return (
    <div className='m-0 p-0 box-border h-100 flex flex-col'>
      <Header/>
      <div className='flex-grow: 1;overflow-y:auto; h-[90vh] flex justify-center items-center'>
        <div className="w-[80%] h-[80%] rounded-2xl flex" >
          <div className="w-[50%] flex flex-col justify-center items-center">
            <h1 className="text-6xl pb-3 text-dark font-bold">Sua plataforma inovadora de <span className="text-primary">controle de gastos</span></h1>
            <p className="text-justify text-lg text-dark ">
              Descubra uma nova forma de encarar suas finanças. Com nosso aplicativo de controle de gastos, você terá em suas mãos uma poderosa ferramenta para organizar suas finanças pessoais. Registre suas despesas, acompanhe seus gastos, defina metas e alcance uma vida financeira mais equilibrada. Não deixe para amanhã, comece hoje mesmo a transformar sua relação com o dinheiro.
            </p>

            <div className="w-full flex gap-6 text-xl mt-4">
              <p className="flex items-center gap-2 text-lg text-meteorite-dark"><FontAwesomeIcon icon={faCheck}/> Visão Geral das Finanças</p>
              <p className="flex items-center gap-2 text-lg text-meteorite-dark"><FontAwesomeIcon icon={faCheck}/>Organização Financeira em Grupo</p>
              <p className="flex items-center gap-2 text-lg text-meteorite-dark"><FontAwesomeIcon icon={faCheck}/> Plataforma intuitiva</p>
            </div>


          </div>
          <div className="w-[50%] flex justify-center items-center">
              <img src="https://hubify.com.br/wp-content/uploads/2017/04/criar-um-site.jpg" alt="Imagem representativa do site"  className="w-[70%] h-[70%]"/>
          </div>
        </div>
      </div>
    </div>
  )
}