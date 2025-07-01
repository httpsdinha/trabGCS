<template>
  <header-component />
  
  <main class="favorites-page">
    <div class="page-header">
      <h1>Meus Favoritos</h1>
      <p v-if="!loading && !error && favorites.length === 0" class="empty-message">
        Você ainda não tem receitas favoritas. Explore nossas receitas e adicione suas favoritas!
      </p>
    </div>

    <section v-if="loading" class="loading">
      <p>Carregando favoritos...</p>
    </section>

    <section v-else-if="error" class="error-state">
      <div class="error-icon">
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#e74c3c" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      </div>
      <h2>Erro ao carregar favoritos</h2>
      <p>{{ errorMessage }}</p>
      <button-base @click="retryLoadFavorites" class="retry-button">
        Tentar Novamente
      </button-base>
    </section>

    <section v-else-if="favorites.length > 0" class="favorites-container">
      <recipe-card 
        v-for="recipe in favorites" 
        :key="recipe.id" 
        :recipe="recipe"
        @favoriteChanged="handleFavoriteChanged"
      />
    </section>

    <section v-else class="empty-favorites">
      <div class="empty-icon">
        <svg width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </div>
      <button-base @click="goToRecipeList" class="explore-button">
        Explorar Receitas
      </button-base>
    </section>
  </main>
</template>

<script>
import { useFavoriteViewModel } from '../viewmodels/FavoriteViewModel';
import RecipeCard from '@/features/recipeList/components/RecipeCard.vue';

export default {
  name: 'FavoritesPage',
  components: {
    RecipeCard
  },
  data() {
    return {
      error: false,
      errorMessage: ''
    };
  },
  setup() {
    const { favorites, loading, fetchFavorites } = useFavoriteViewModel();
    
    return {
      favorites,
      loading,
      fetchFavorites
    };
  },
  async mounted() {
    await this.loadFavorites();
  },
  methods: {
    async loadFavorites() {
      try {
        this.error = false;
        await this.fetchFavorites();
      } catch (error) {
        this.error = true;
        if (error.response?.status === 404) {
          this.errorMessage = 'A funcionalidade de favoritos ainda não está disponível no servidor.';
        } else if (error.code === 'ERR_NETWORK') {
          this.errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
        } else {
          this.errorMessage = 'Erro ao carregar favoritos. Tente novamente mais tarde.';
        }
      }
    },
    async retryLoadFavorites() {
      await this.loadFavorites();
    },
    goToRecipeList() {
      this.$router.push('/recipelist');
    },
    handleFavoriteChanged(event) {
      // Quando uma receita é removida dos favoritos, atualiza a lista
      if (!event.isFavorite) {
        this.loadFavorites();
      }
    }
  }
};
</script>

<style scoped>
.favorites-page {
  margin: 2rem 3rem;
  font-family: 'Jura', sans-serif;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  min-height: 80vh;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
  padding: 2rem 0;
}

.page-header h1 {
  color: #940D0D;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(148, 13, 13, 0.2);
  position: relative;
}

.page-header h1::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background: linear-gradient(90deg, #940D0D, #c0392b);
  border-radius: 2px;
}

.empty-message {
  color: #666;
  font-size: 1.1rem;
  max-width: 500px;
  margin: 0 auto;
  line-height: 1.5;
}

.loading {
  text-align: center;
  padding: 3rem;
  color: #666;
  font-size: 1.2rem;
}

.error-state {
  text-align: center;
  padding: 3rem;
}

.error-state h2 {
  color: #e74c3c;
  margin: 1rem 0;
}

.error-state p {
  color: #666;
  margin-bottom: 2rem;
  max-width: 500px;
  margin-left: auto;
  margin-right: auto;
}

.error-icon {
  margin-bottom: 1rem;
  opacity: 0.7;
}

.retry-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 0.3125rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.retry-button:hover {
  background-color: #c0392b;
}

.favorites-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin: 0 auto;
  max-width: 100%;
  padding: 1rem 0;
}

.empty-favorites {
  text-align: center;
  padding: 3rem;
}

.empty-icon {
  margin-bottom: 2rem;
  opacity: 0.3;
}

.explore-button {
  background: linear-gradient(135deg, #940D0D, #c0392b);
  color: white;
  border: none;
  padding: 1rem 2.5rem;
  border-radius: 0.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(148, 13, 13, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.explore-button:hover {
  background: linear-gradient(135deg, #c0392b, #940D0D);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(148, 13, 13, 0.4);
}

/* Responsividade */
@media (max-width: 1800px) {
  .favorites-container {
    justify-content: space-around;
  }
}

@media (max-width: 768px) {
  .favorites-page {
    margin: 1rem;
  }
  
  .page-header h1 {
    font-size: 2rem;
  }
  
  .favorites-container {
    justify-content: center;
  }
}
</style>
