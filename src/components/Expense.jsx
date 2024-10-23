export default function Expense({ data, nome, valor, pagante }) {

  const dataFormatada = new Date(data).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' });
  const valorFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(valor));


  return (

    <div className="flex justify-between items-center py-2 border-b">
      <div>
        <p className="font-medium">{nome}</p>
        <p className="text-sm text-muted-foreground capitalize">Pago por: {pagante}</p>
      </div>
      <p className="font-bold">
        {valorFormatado}
      </p>
    </div>





  );
}
