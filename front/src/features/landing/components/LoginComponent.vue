<template>
    <section class="container-login">
        <h1>ENTRAR</h1>
        <form class="form-login" @submit.prevent="login">
            <label for="email" class="label">E-mail</label>
            <input type="email" class="input" id="email" name="email" v-model="email" required>
            <label for="senha" class="label">Senha</label>
            <input type="password" id="senha" class="input" name="senha" v-model="senha" required>
            <button type="submit">ENTRAR</button>
            <a href="/cadastro" class="register-link">Cadastre-se</a>
        </form>
    </section>
</template>

<script>
import LandingPageViewModel from '@/features/landing/viewmodels/LandingPageViewModel.js';

export default {
    name: "LoginComponent",
    data() {
        return {
            email: '',
            senha: ''
        };
    },
    methods: {
        async login() {
            await LandingPageViewModel.methods.handleLogin.call(this, this.email, this.senha);
        },
    },
};
</script>

<style scoped>
.container-login{
    max-width: 25rem;
    height: 25.9375rem;
    flex-shrink: 0;
    border-radius: 1.25rem;
    background: #FFF;
    box-shadow: -8px 14px 15.7px 4px rgba(0, 0, 0, 0.25);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

h1{
    color: #000;
    font-family: "Jost", sans-serif;
    font-size: 1.5rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin-bottom: 1rem;
}

.form-login {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.input{
    width: 17.5rem;
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

@media (min-width: 1600px) {
    .container-login {
        max-width: 35rem;
        height: 35rem;
    }

    .input {
        width: 25rem;
        height: 3rem;
    }

    button {
        font-size: 1.5rem;
        padding: 0.75rem 3rem;
    }
}
</style>