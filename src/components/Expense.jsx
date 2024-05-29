
export default function Expense({ data, nome, valor, pagante }) {
  const dataFormatada = new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });

  return (
    <div className="w-[70%] border rounded-md box-border p-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-bold">{dataFormatada}</p> {/* Usando a data formatada */}
          <p className="">{nome}</p>
        </div>
        <div className="flex flex-col items-center capitalize">
          <p className="font-bold">{pagante} pagou</p>
          <p>R${valor},00</p>
        </div>

      </div>
    </div>
  );
}
