import axios from "axios";
import { toast } from "sonner";

export function createUser(details) {
    const api = axios.create({
        baseURL : "http://localhost:8080/api",
    });

    return api.post('/clients', details)
        .then((response) => {
            localStorage.setItem('token', response.data.token);
            const id = response.data.user.id;
            return id;
        })
        .catch((error) => {
            if (error.response && error.response.data && error.response.data.name) {
                switch (error.response.data.name) {
                    case "RequiredFieldException":
                        toast.error(`${error.response.data.message}`);
                        break;
                    case "InvalidFieldException":
                        toast.error(`${error.response.data.message}`);
                        break;
                    case "UserExistsException":
                        toast.error(`${error.response.data.message}`);
                        break;
                    default:
                        toast.error(`${error.response.data.message}`);
                        break;
                }
            } else {
                toast.error("Erro desconhecido. Tente novamente.");
            }
            throw error;
        });
}
