/**
 * Serviço de Autenticação
 * Gerencia o estado de autenticação do usuário, armazenamento de dados
 * e funcionalidades relacionadas à segurança da aplicação
 */

class AuthenticationService {
  // Constantes para chaves do localStorage
  static STORAGE_KEYS = {
    USER_EMAIL: 'userEmail',
    LOGIN_TIMESTAMP: 'loginTimestamp',
    SESSION_DURATION: 'sessionDuration'
  };

  // Configurações padrão
  static CONFIG = {
    DEFAULT_SESSION_DURATION: 24 * 60 * 60 * 1000, // 24 horas em ms
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  };

  /**
   * Verifica se o usuário está autenticado
   * Inclui validação de sessão e expiração
   * @returns {boolean} true se autenticado e sessão válida
   */
  isAuthenticated() {
    try {
      const userEmail = this.getCurrentUserEmail();
      
      if (!userEmail || !this.isValidEmail(userEmail)) {
        this.clearAuthData();
        return false;
      }

      if (this.isSessionExpired()) {
        this.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error('Erro ao verificar autenticação:', error);
      this.clearAuthData();
      return false;
    }
  }

  /**
   * Obtém o email do usuário autenticado
   * @returns {string|null} Email do usuário ou null se não autenticado
   */
  getCurrentUserEmail() {
    try {
      return localStorage.getItem(AuthenticationService.STORAGE_KEYS.USER_EMAIL);
    } catch (error) {
      console.error('Erro ao obter email do usuário:', error);
      return null;
    }
  }

  /**
   * Obtém informações completas do usuário
   * @returns {object|null} Dados do usuário ou null se não autenticado
   */
  getCurrentUser() {
    const email = this.getCurrentUserEmail();
    
    if (!email) return null;

    return {
      email,
      loginTimestamp: this.getLoginTimestamp(),
      sessionExpiry: this.getSessionExpiry(),
      isSessionValid: !this.isSessionExpired()
    };
  }

  /**
   * Realiza logout completo do usuário
   * Remove todos os dados de autenticação e limpa o armazenamento
   */
  logout() {
    try {
      this.clearAuthData();
      this.logSecurityEvent('user_logout', { 
        timestamp: new Date().toISOString() 
      });
    } catch (error) {
      console.error('Erro durante logout:', error);
    }
  }

  /**
   * Autentica o usuário no sistema
   * @param {string} email - Email do usuário
   * @param {number} sessionDuration - Duração da sessão em ms (opcional)
   * @returns {boolean} true se login foi bem-sucedido
   */
  login(email, sessionDuration = AuthenticationService.CONFIG.DEFAULT_SESSION_DURATION) {
    try {
      if (!email || !this.isValidEmail(email)) {
        throw new Error('Email inválido fornecido');
      }

      const timestamp = Date.now();
      
      localStorage.setItem(AuthenticationService.STORAGE_KEYS.USER_EMAIL, email);
      localStorage.setItem(AuthenticationService.STORAGE_KEYS.LOGIN_TIMESTAMP, timestamp.toString());
      localStorage.setItem(AuthenticationService.STORAGE_KEYS.SESSION_DURATION, sessionDuration.toString());

      this.logSecurityEvent('user_login', {
        email,
        timestamp: new Date().toISOString(),
        sessionDuration
      });

      return true;
    } catch (error) {
      console.error('Erro durante login:', error);
      return false;
    }
  }

  /**
   * Verifica se o usuário está autenticado e redireciona se necessário
   * @param {object} router - Instância do Vue Router
   * @param {string} fallbackRoute - Rota para redirecionamento (padrão: '/')
   * @returns {boolean} true se autenticado, false se redirecionado
   */
  requireAuth(router, fallbackRoute = '/') {
    if (!this.isAuthenticated()) {
      this.logSecurityEvent('unauthorized_access_attempt', {
        attemptedRoute: router.currentRoute.value?.path,
        timestamp: new Date().toISOString()
      });
      
      router.push(fallbackRoute);
      return false;
    }
    return true;
  }

  /**
   * Renova a sessão do usuário
   * @param {number} additionalTime - Tempo adicional em ms (opcional)
   * @returns {boolean} true se renovação foi bem-sucedida
   */
  renewSession(additionalTime = AuthenticationService.CONFIG.DEFAULT_SESSION_DURATION) {
    if (!this.isAuthenticated()) {
      return false;
    }

    try {
      const currentTimestamp = Date.now();
      localStorage.setItem(AuthenticationService.STORAGE_KEYS.LOGIN_TIMESTAMP, currentTimestamp.toString());
      
      if (additionalTime) {
        localStorage.setItem(AuthenticationService.STORAGE_KEYS.SESSION_DURATION, additionalTime.toString());
      }

      this.logSecurityEvent('session_renewed', {
        timestamp: new Date().toISOString(),
        newExpiry: new Date(currentTimestamp + additionalTime).toISOString()
      });

      return true;
    } catch (error) {
      console.error('Erro ao renovar sessão:', error);
      return false;
    }
  }

  /**
   * Verifica se a sessão expirou
   * @returns {boolean} true se a sessão expirou
   */
  isSessionExpired() {
    try {
      const loginTimestamp = this.getLoginTimestamp();
      const sessionDuration = this.getSessionDuration();
      
      if (!loginTimestamp || !sessionDuration) {
        return true;
      }

      const currentTime = Date.now();
      const expiryTime = loginTimestamp + sessionDuration;
      
      return currentTime > expiryTime;
    } catch (error) {
      console.error('Erro ao verificar expiração da sessão:', error);
      return true;
    }
  }

  /**
   * Obtém o tempo restante da sessão em minutos
   * @returns {number} Minutos restantes ou 0 se expirada
   */
  getSessionTimeRemaining() {
    if (this.isSessionExpired()) {
      return 0;
    }

    try {
      const loginTimestamp = this.getLoginTimestamp();
      const sessionDuration = this.getSessionDuration();
      const currentTime = Date.now();
      const expiryTime = loginTimestamp + sessionDuration;
      const remainingMs = expiryTime - currentTime;
      
      return Math.floor(remainingMs / (1000 * 60)); // Converter para minutos
    } catch (error) {
      console.error('Erro ao calcular tempo restante:', error);
      return 0;
    }
  }

  /**
   * Valida formato do email
   * @param {string} email - Email a ser validado
   * @returns {boolean} true se email é válido
   */
  isValidEmail(email) {
    return typeof email === 'string' && 
           email.length > 0 && 
           AuthenticationService.CONFIG.EMAIL_REGEX.test(email);
  }

  /**
   * Limpa todos os dados de autenticação
   * @private
   */
  clearAuthData() {
    Object.values(AuthenticationService.STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }

  /**
   * Obtém timestamp do login
   * @private
   * @returns {number|null} Timestamp ou null se não encontrado
   */
  getLoginTimestamp() {
    const timestamp = localStorage.getItem(AuthenticationService.STORAGE_KEYS.LOGIN_TIMESTAMP);
    return timestamp ? parseInt(timestamp, 10) : null;
  }

  /**
   * Obtém duração da sessão
   * @private
   * @returns {number} Duração da sessão em ms
   */
  getSessionDuration() {
    const duration = localStorage.getItem(AuthenticationService.STORAGE_KEYS.SESSION_DURATION);
    return duration ? parseInt(duration, 10) : AuthenticationService.CONFIG.DEFAULT_SESSION_DURATION;
  }

  /**
   * Obtém data de expiração da sessão
   * @private
   * @returns {Date|null} Data de expiração ou null
   */
  getSessionExpiry() {
    const loginTimestamp = this.getLoginTimestamp();
    const sessionDuration = this.getSessionDuration();
    
    if (!loginTimestamp) return null;
    
    return new Date(loginTimestamp + sessionDuration);
  }

  /**
   * Registra eventos de segurança
   * @private
   * @param {string} eventType - Tipo do evento
   * @param {object} data - Dados do evento
   */
  logSecurityEvent(eventType, data = {}) {
    try {
      const logEntry = {
        event: eventType,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ...data
      };

      console.info('🔐 [AUTH-EVENT]:', logEntry);
      
      // Aqui você poderia enviar para um serviço de auditoria
      // await this.sendToAuditService(logEntry);
    } catch (error) {
      console.error('Erro ao registrar evento de segurança:', error);
    }
  }
}

// Instância singleton
const AuthService = new AuthenticationService();

export default AuthService;