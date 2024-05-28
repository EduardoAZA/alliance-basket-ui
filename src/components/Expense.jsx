

export default function Expense() {
  return (
    <div className="w-[70%] border rounded-md box-border p-2">
      <div className=" flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-bold">05, novembro</p>
          <p className="">Goleiros</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold">Duca pagou</p>
          <p>R$ 100,00</p>
        </div>
        <div className="flex flex-col items-center ">
          <p className="font-bold">Você pegou emprestado</p>
          <p>R$ 20,00</p>
        </div>
      </div>
    </div>
  )
}