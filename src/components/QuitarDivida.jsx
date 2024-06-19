import api from "@/services/api";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function QuitarDivida({ id, idGroup }) {
    const [divida, setDivida] = useState({
        totalAmountOwed: 0,
        amountsOwedToMembers: {}
    });

    const [user, setUser] = useState(null);
    const [users, setUsers] = useState({}); 
    const [isDebtLoaded, setIsDebtLoaded] = useState(false); // Controle de carregamento da dívida

    useEffect(() => {
        console.log("Making request to backend for debt...");
        api.get(`expenses/client/${id}/group/${idGroup}/howmuchiowe`, {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then((res) => {
                console.log('Resposta da API de dívida:', res.data);
                setDivida(res.data);
                setIsDebtLoaded(true); // Marca que a dívida foi carregada
            })
            .catch((err) => {
                console.log('Erro ao obter dados de dívida:', err);
            });
    }, [id, idGroup]); // Depende apenas de id e idGroup

    useEffect(() => {
        if (isDebtLoaded) {
            console.log("Making request to backend for user names...");
            const fetchUsers = async () => {
                const usersData = await Promise.all(Object.keys(divida.amountsOwedToMembers).map(clientId =>
                    api.get(`/clients/${clientId}`, {
                        headers: { 'Authorization': localStorage.getItem('token') }
                    })
                        .then(response => ({
                            id: clientId,
                            name: response.data.name
                        }))
                        .catch(error => ({
                            id: clientId,
                            name: `Cliente ${clientId}`
                        }))
                ));
                const usersObj = usersData.reduce((acc, user) => {
                    acc[user.id] = user.name;
                    return acc;
                }, {});
                setUsers(usersObj);
            };

            fetchUsers();
        }
    }, [divida.amountsOwedToMembers, isDebtLoaded]); // Depende de amountsOwedToMembers e isDebtLoaded

    useEffect(() => {
        console.log("Making request to backend for client info...");
        api.get(`/clients/${id}`, {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then((response) => {
                console.log("Received response from backend:", response.data);
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching client:", error);
            });
    }, [id]); // Depende apenas de id

    const { register, handleSubmit, setValue } = useForm();

    function Quitar(data) {
        api.post(`expenses/client/${id}/group/${idGroup}/pay`, data, {
            headers: { 'Authorization': localStorage.getItem('token') }
        })
            .then((res) => {
                console.log('Pagamento realizado com sucesso');
                toast.success('Valor quitado com sucesso');
                setTimeout(() => {
                    window.location.reload();
                }, 400);

            })
            .catch((err) => {
                console.log('Erro ao realizar pagamento:', err);
            });
    }

    function handleRecipientChange(event) {
        const selectedId = event.target.value;
        let selectedValue = divida.amountsOwedToMembers[selectedId];

        // Formata o valor para duas casas decimais e notação brasileira
        selectedValue = Number(selectedValue).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

        // Remove o sinal de menos se houver
        if (selectedValue.startsWith('-')) {
            selectedValue = selectedValue.substring(1);
        }

        setValue("amount", selectedValue);
    }

    const formattedTotalAmount = divida.totalAmountOwed >= 0 ? divida.totalAmountOwed.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : (-divida.totalAmountOwed).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <button className="py-2 bg-red-500 px-8 rounded-md text-white font-semibold">
                        Quitar dívida
                    </button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Quitar dívida</DialogTitle>
                        <DialogDescription>
                            {user ? `Dívida de ${user.name}: ${formattedTotalAmount}` : 'Carregando...'}
                            <br />
                            Escolha o usuário e o valor que será quitado.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(Quitar)}>
                        <div className="flex flex-col gap-2">

                            <select
                                {...register("recipient_id", { required: true })}
                                onChange={handleRecipientChange}
                                className="border border-gray-400 rounded-md p-1 pl-3 text-lg font-semibold text-primary-dark"
                            >
                                <option value="">Selecione o usuário</option>
                                {Object.entries(divida.amountsOwedToMembers).map(([key, value]) => (
                                    <option key={key} value={key}>
                                        {`${users[key] || `Cliente ${key}`} - Valor: ${value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                step="0.01"
                                {...register("amount", { required: true })}
                                className="border border-gray-400 rounded-md p-1 pl-3 text-lg font-semibold text-primary-dark"
                                placeholder="Valor"
                            />
                        </div>
                        <button type="submit" className="w-2/5 bg-green-500 py-2 mt-5 text-white font-bold rounded-md hover:bg-green-700 transition-all duration-300">
                            Pagar
                        </button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
