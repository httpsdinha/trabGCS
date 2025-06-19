import axiosInstance from '@/plugins/axios';
import CadastroModel from '../models/CadastroModel';

export default class CadastroViewModels {
    constructor() {
        this.model = new CadastroModel();
        this.errorMessage = ''; 
    }

    async handleSubmit(goToPage) {
        this.errorMessage = ''; 
        if (!this.isValidEmail(this.model.email)) {
            this.errorMessage = "e-mail inválido";
            return;
        }
        if (this.model.password.length < 8) {
            this.errorMessage = "minimo 8 digitos para a senha";
            return;
        }
        if (this.model.password !== this.model.confirmPassword) {
            this.errorMessage = "senhas não correspondentes";
            return;
        }

        try {
            const formData = new FormData();
            formData.append('email', this.model.email);
            formData.append('senha', this.model.password);

            await axiosInstance.post('/usuario/adicionar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert("Cadastro realizado com sucesso!");
            goToPage('/');
        } catch (error) {
            alert("Aconteceu um erro inesperado")
            console.log('Erro ao cadastrar: ' + error.message);
        }
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}