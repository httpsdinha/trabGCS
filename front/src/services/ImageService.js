import axiosInstance from "@/plugins/axios";

/**
 * Serviço para gerenciar imagens de receitas
 */
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
const MAX_SIZE = 5 * 1024 * 1024; // 5MB

class ImageService {
  /**
   * Constrói a URL completa para uma imagem
   * @param {string} imageName - Nome do arquivo da imagem
   * @returns {string} URL completa da imagem
   */
  static getImageUrl(imageName) {
    if (!imageName) {
      return null;
    }
    // Usar a baseURL do axios configurada (http://localhost:8080)
    return `${axiosInstance.defaults.baseURL}receita/imagem/${imageName}`;
  }

  /**
   * Verifica se uma imagem existe no servidor
   * @param {string} imageName - Nome do arquivo da imagem
   * @returns {Promise<boolean>} True se a imagem existe
   */
  static async imageExists(imageName) {
    if (!imageName) {
      return false;
    }

    try {
      const response = await fetch(this.getImageUrl(imageName), {
        method: "HEAD",
      });
      return response.ok;
    } catch (error) {
      console.warn(`Imagem não encontrada: ${imageName}`);
      return false;
    }
  }

  /**
   * Obtém uma imagem com fallback para imagem padrão
   * @param {string} imageName - Nome do arquivo da imagem
   * @param {string} fallbackUrl - URL de fallback (opcional)
   * @returns {Promise<string>} URL da imagem ou fallback
   */
  static async getImageWithFallback(imageName, fallbackUrl = null) {
    const imageUrl = this.getImageUrl(imageName);

    if (!imageUrl) {
      return fallbackUrl;
    }

    const exists = await this.imageExists(imageName);
    return exists ? imageUrl : fallbackUrl;
  }

  /**
   * Valida se um arquivo é uma imagem válida
   * @param {File} file - Arquivo a ser validado
   * @returns {boolean} True se for uma imagem válida
   */
  static validateImageFile(file) {
    if (!file) return false;
    if (!isMimeTypeValid(file)) return false;
    if (!hasAllowedExtension(file.name)) return false;
    if (!isSizeValid(file)) return false;
    return true;
  }

  /**
   * Formata uma mensagem de erro para upload de imagem
   * @param {File} file - Arquivo que falhou na validação
   * @returns {string} Mensagem de erro formatada
   */
  static getValidationErrorMessage(file) {
    if (!file) return "Nenhum arquivo selecionado.";
    if (!isMimeTypeValid(file))
      return "Por favor, selecione apenas arquivos de imagem.";
    if (!hasAllowedExtension(file.name))
      return "Formato de arquivo não suportado. Use: JPG, JPEG, PNG, GIF ou WebP.";
    if (!isSizeValid(file)) return "Arquivo muito grande. Tamanho máximo: 5MB.";
    return "Arquivo de imagem inválido.";
  }
}

// Funções auxiliares pequenas para diminuir a complexidade ciclomática
function isMimeTypeValid(file) {
  return !!file.type && file.type.startsWith("image/");
}

function hasAllowedExtension(fileName) {
  if (!fileName) {
    return false;
  }
  const lower = fileName.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function isSizeValid(file) {
  return typeof file.size === "number" && file.size <= MAX_SIZE;
}

export default ImageService;
