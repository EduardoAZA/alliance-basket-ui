const { createUser } = require('../../../CreateUser.jsx');

const generateUniqueEmail = () => {
    const random = Math.floor(Math.random() * 10000);
    return `Eduardo${random}@teste.com`;
};

describe('Integração - Testando createUser', () => {
    beforeAll(() => {
        global.localStorage = {
            setItem: jest.fn()
        };
    });

    it('deve cadastrar um usuário com sucesso e retornar o id', async () => {
        const userDetails = {
            name: "juca",
            email: generateUniqueEmail(),
            password: "senha123",
            confirmPassword: "senha123"
        };

        const id = await createUser(userDetails);

        expect(id).toBeDefined();
        expect(typeof id).toBe('number');
    });

    it('deve lançar erro se o campo "Nome" for obrigatório', async () => {
        const userDetails = {
            email: generateUniqueEmail(), // Gera um email único
            password: "senha123",
            confirmPassword: "senha123"
        };

        try {
            await createUser(userDetails);
        } catch (error) {
            expect(error.response.data.name).toBe("RequiredFieldException");
        }
    });

    it('deve lançar erro se o campo "Email" for obrigatório', async () => {
        const userDetails = {
            name: "Eduardo",
            password: "senha123",
            confirmPassword: "senha123"
        };

        try {
            await createUser(userDetails);
        } catch (error) {
            expect(error.response.data.name).toBe("RequiredFieldException");
        }
    });

    it('deve lançar erro se o email for inválido', async () => {
        const userDetails = {
            name: "Eduardo",
            email: "eduardo@",
            password: "senha123",
            confirmPassword: "senha123"
        };

        try {
            await createUser(userDetails);
        } catch (error) {
            expect(error.response.data.name).toBe("InvalidFieldException");
        }
    });

    xit('deve lançar erro se a senha e a confirmação de senha forem diferentes', async () => {
        const userDetails = {
            name: "Eduardo",
            email: "felipeaaaqwedwdwa@gmail.com",
            password: "senha123",
            confirmPassword: "senha154"
        };

        try {
            await createUser(userDetails);
        } catch (error) {
            expect(error.response.data.name).toBe("InvalidFieldException");
        }
    });

    it('deve lançar erro ao tentar cadastrar um usuário já existente', async () => {
        const userDetails = {
            name: "Eduardo",
            email: "eduardo@example.com",
            password: "senha123",
            confirmPassword: "senha123"
        };

        try {
            await createUser(userDetails);
        } catch (error) {
            expect(error.response.data.name).toBe("UserExistsException");
        }
    });
});
