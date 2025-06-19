<template>
    <section class="container-cadastro">
        <h1>CADASTRAR</h1>
        <form class="form-cadastro" @submit.prevent="handleSubmit">
            <label for="email" class="label">E-mail</label>
            <input type="email" class="input" id="email" name="email" v-model="viewModel.model.email" required>

            <label for="password" class="label">Senha</label>
            <input type="password" id="password" class="input" name="password" v-model="viewModel.model.password" required>

            <label for="confirmPassword" class="label">Confirmar Senha</label>
            <input type="password" id="confirmPassword" class="input" name="confirmPassword" v-model="viewModel.model.confirmPassword" required>
                <span v-if="viewModel.errorMessage" class="error-message">{{ viewModel.errorMessage }}</span>
            <button type="submit">CADASTRAR</button>
            <a href="/" class="register-link" @click.prevent="goToLandingWithLogin">Entrar</a>
        </form>
    </section>
</template>

<script>

import CadastroViewModel from '../viewmodels/CadastroViewModels';

export default {
    name: "CadastroComponent",
    data() {
        return {
            viewModel: new CadastroViewModel(),
        };
    },
    methods: {
        goToPage(route) {
            this.$router.push(route);
        },
        goToLandingWithLogin() {
            this.$router.push({ name: 'LandingPage', query: { login: true } });
            this.$emit('showLoginComponent');
            this.$emit('hideCadastroComponent');
        },
        handleSubmit() {
            this.viewModel.handleSubmit(this.goToPage);
        },
    },
};
</script>

<style scoped>
.container-cadastro{
    width: 32.6875rem;
    height: 31.25rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
    background: #FFF;
    box-shadow: -8px 14px 15.7px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 6rem;
}

h1{
    color: #000;
    font-family: "Jost";
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 1rem;
}

.form-cadastro {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input{
    width: 22.4375rem;
    height: 2.5rem;
    border-radius: 0.3125rem;
    border: 1px solid #940D0D;
    background-color: transparent;
    margin-top: 0.5rem;
    margin-bottom: 1rem;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
}

.label {
    color: #000;
    font-family: "Jost", sans-serif;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    align-self: flex-start;
}

button {
    border-radius: 0.3125rem;
    background: linear-gradient(90deg, #940D0D 0%, #A12A09 100%);
    color: #FFF;
    font-family: "Jockey One", sans-serif;
    font-size: 1.25rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    border: none;
    padding: 0.5rem 2rem;
    margin-top: 1rem;
    cursor: pointer;
}

button:hover{
    background: #A12A09;
}
.register-link {
    color: #940D0D;
    font-family: "Jost", sans-serif;
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    text-decoration: none;
}

.register-link:hover {
    text-decoration: underline;
}

.error-message {
    color: #A12A09;
    font-family: "Jost", sans-serif;
    font-size: 0.8rem;
    font-weight: 700;
}

@media (min-width: 1600px) {
    .container-cadastro {
        max-width: 45rem;
        height: auto;
    }

    .input {
        width: 35rem;
        height: 3rem;
    }
    h1{
        margin-bottom: 3rem;
    }
    button {
        font-size: 1.5rem;
        padding: 0.75rem 3rem;
        margin-top: 3rem;
    }
}
</style>