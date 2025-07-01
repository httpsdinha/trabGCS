import { ref } from 'vue';
import FavoriteModel from '../models/FavoriteModel';

export function useFavoriteViewModel() {
  const favoriteModel = new FavoriteModel();
  const favorites = ref([]);
  const loading = ref(false);

  // Buscar lista de favoritos
  const fetchFavorites = async () => {
    loading.value = true;
    try {
      const data = await favoriteModel.getFavorites();
      favorites.value = data;
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
    } finally {
      loading.value = false;
    }
  };

  // Alternar status de favorito
  const toggleFavorite = async (recipeId) => {
    try {
      const isFav = await favoriteModel.isFavorite(recipeId);
      
      if (isFav) {
        await favoriteModel.removeFavorite(recipeId);
        // Remove da lista local se estiver na página de favoritos
        favorites.value = favorites.value.filter(recipe => recipe.id !== recipeId);
        return false;
      } else {
        await favoriteModel.addFavorite(recipeId);
        return true;
      }
    } catch (error) {
      console.error('Erro ao alternar favorito:', error);
      throw error;
    }
  };

  // Verificar se uma receita é favorita
  const checkIsFavorite = async (recipeId) => {
    try {
      return await favoriteModel.isFavorite(recipeId);
    } catch (error) {
      console.error('Erro ao verificar favorito:', error);
      return false;
    }
  };

  return {
    favorites,
    loading,
    fetchFavorites,
    toggleFavorite,
    checkIsFavorite
  };
}
