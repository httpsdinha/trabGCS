import LandingPageModel from '@/features/landing/models/LandingPageModel.js';
import axiosInstance from '@/plugins/axios';

export default {
  data() {
    return {
      showLogin: LandingPageModel.showLogin,
      isLoading: false,
    };
  },

  methods: {
    /**
     * Atualiza o estado para mostrar o componente de login
     */
    updateLoginVisibility(show = true) {
      this.showLogin = show;
      LandingPageModel.showLogin = show;
    },

    /**
     * Expande o painel esquerdo e mostra o login
     */
    expandLeft() {
      this.updateLoginVisibility();
    },

    /**
     * Mostra o componente de login
     */
    showLoginComponent() {
      this.updateLoginVisibility();
    },

    /**
     * Realiza o login do usuário
     * @param {string} email - Email do usuário
     * @param {string} senha - Senha do usuário
     */
    async handleLogin(email, senha) {
      // Validação básica
      if (!email || !senha) {
        alert('Por favor, preencha todos os campos');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido');
        return;
      }

      try {
        const response = await axiosInstance.post('/usuario/login', {
          email: email,
          senha: senha
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200 && response.data === 'Login válido') {
          localStorage.setItem('userEmail', email);
          
          // Verifica se há uma rota de redirecionamento salva
          const redirectTo = this.$route.query.redirect || '/recipelist';
          this.$router.push(redirectTo);
        } else {
          alert('Email ou senha inválidos');
        }
      } catch (error) {
        console.error('Erro no login:', error);
        alert('Erro interno do servidor. Tente novamente.');
      }
    },
  },

  created() {
    // Verifica se deve mostrar o login baseado na query string
    if (this.$route.query.login) {
      this.expandLeft();
    }
  },
};