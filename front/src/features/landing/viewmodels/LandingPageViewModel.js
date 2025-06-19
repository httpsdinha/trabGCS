import LandingPageModel from '@/features/landing/models/LandingPageModel.js';
import axiosInstance from '@/plugins/axios';

export default {
  data() {
    return {
      showLogin: LandingPageModel.showLogin,
    };
  },
  methods: {
    expandLeft() {
      this.showLogin = true;
      LandingPageModel.showLogin = true;
    },
    showLoginComponent() {
      this.showLogin = true;
      LandingPageModel.showLogin = true;
    },
    async handleLogin(email, senha) {
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
          localStorage.setItem('userEmail', email); // Store user's email
          this.$router.push('/recipelist');
        } else {
          alert('Email ou senha inválidos');
        }
      } catch (error) {
        console.error('Login error:', error);
        alert('An error occurred during login');
      }
    },
   },
  created() {
    if (this.$route.query.login) {
      this.expandLeft();
    }
  },
};
