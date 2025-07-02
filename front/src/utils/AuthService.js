/**
 * Utilitário para gerenciamento de autenticação
 * Centraliza a lógica de verificação de usuário logado
 */

export const AuthService = {
  /**
   * Verifica se o usuário está autenticado
   * @returns {boolean} true se autenticado, false caso contrário
   */
  isAuthenticated() {
    const userEmail = localStorage.getItem('userEmail');
    return userEmail !== null && userEmail !== '';
  },

  /**
   * Obtém o email do usuário autenticado
   * @returns {string|null} Email do usuário ou null se não autenticado
   */
  getCurrentUserEmail() {
    return localStorage.getItem('userEmail');
  },

  /**
   * Realiza logout do usuário
   * Remove dados de autenticação do localStorage
   */
  logout() {
    localStorage.removeItem('userEmail');
  },

  /**
   * Salva dados de autenticação
   * @param {string} email - Email do usuário
   */
  login(email) {
    localStorage.setItem('userEmail', email);
  },

  /**
   * Verifica se o usuário está autenticado e redireciona se necessário
   * @param {object} router - Instância do Vue Router
   * @param {string} fallbackRoute - Rota para redirecionamento (padrão: '/')
   */
  requireAuth(router, fallbackRoute = '/') {
    if (!this.isAuthenticated()) {
      router.push(fallbackRoute);
      return false;
    }
    return true;
  }
};

export default AuthService;
