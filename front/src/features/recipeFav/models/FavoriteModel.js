import axiosInstance from "@/plugins/axios";

export default class FavoriteModel {
  constructor() {
    this.userEmail = localStorage.getItem("userEmail");
  }

  // Adicionar receita aos favoritos
  async addFavorite(recipeId) {
    try {
      const response = await axiosInstance.post("/favorito/adicionar", {
        email: this.userEmail,
        receitaId: recipeId,
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao adicionar favorito:", error);
      throw error;
    }
  }

  // Remover receita dos favoritos
  async removeFavorite(recipeId) {
    try {
      const response = await axiosInstance.delete("/favorito/remover", {
        data: {
          email: this.userEmail,
          receitaId: recipeId,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao remover favorito:", error);
      throw error;
    }
  }

  // Buscar favoritos do usuário
  async getFavorites() {
    try {
      const response = await axiosInstance.get("/favorito/listar", {
        params: {
          email: this.userEmail,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar favoritos:", error);
      throw error;
    }
  }

  // Verificar se uma receita é favorita
  async isFavorite(recipeId) {
    try {
      const response = await axiosInstance.get("/favorito/verificar", {
        params: {
          email: this.userEmail,
          receitaId: recipeId,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
      return false;
    }
  }
}
