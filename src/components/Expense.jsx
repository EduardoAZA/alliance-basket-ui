export default function Expense({ data, nome, valor, pagante}) {
 
  const dataFormatada = new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(valor));


  return (
    <div className="w-[70%] border rounded-md box-border p-3 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className="font-bold">{dataFormatada}</p>
          <p className="">{nome}</p>
        </div>
        <div className="flex flex-col items-center capitalize">
          <p className="font-bold">{pagante} pagou</p>
          <p>{valorFormatado}</p>
        </div>
      </div>
    </div>
  );
}
