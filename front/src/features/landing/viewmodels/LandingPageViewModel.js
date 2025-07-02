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
      if (!this.validateLoginData(email, senha)) {
        return;
      }

      this.isLoading = true;

      try {
        const response = await this.performLogin(email, senha);
        
        if (this.isLoginSuccessful(response)) {
          this.handleSuccessfulLogin(email);
        } else {
          this.showError('Email ou senha inválidos');
        }
      } catch (error) {
        console.error('Erro no login:', error);
        this.showError('Erro interno do servidor. Tente novamente.');
      } finally {
        this.isLoading = false;
      }
    },

    /**
     * Valida os dados de login
     * @param {string} email - Email do usuário
     * @param {string} senha - Senha do usuário
     * @returns {boolean} - True se os dados são válidos
     */
    validateLoginData(email, senha) {
      if (!email || !senha) {
        this.showError('Por favor, preencha todos os campos');
        return false;
      }

      if (!this.isValidEmail(email)) {
        this.showError('Por favor, insira um email válido');
        return false;
      }

      return true;
    },

    /**
     * Valida o formato do email
     * @param {string} email - Email a ser validado
     * @returns {boolean} - True se o email é válido
     */
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    /**
     * Realiza a requisição de login
     * @param {string} email - Email do usuário
     * @param {string} senha - Senha do usuário
     * @returns {Promise} - Promise da requisição
     */
    async performLogin(email, senha) {
      return await axiosInstance.post('/usuario/login', {
        email,
        senha
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },

    /**
     * Verifica se o login foi bem-sucedido
     * @param {Object} response - Resposta da API
     * @returns {boolean} - True se o login foi bem-sucedido
     */
    isLoginSuccessful(response) {
      return response.status === 200 && response.data === 'Login válido';
    },

    /**
     * Trata o login bem-sucedido
     * @param {string} email - Email do usuário
     */
    handleSuccessfulLogin(email) {
      localStorage.setItem('userEmail', email);
      
      const redirectTo = this.$route.query.redirect || '/recipelist';
      this.$router.push(redirectTo);
    },

    /**
     * Exibe mensagem de erro
     * @param {string} message - Mensagem de erro
     */
    showError(message) {
      alert(message);
    },
  },

  created() {
    // Verifica se deve mostrar o login baseado na query string
    if (this.$route.query.login) {
      this.expandLeft();
    }
  },
};