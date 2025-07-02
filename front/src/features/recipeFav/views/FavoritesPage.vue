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
  margin: 1rem 2rem;
  font-family: 'Roboto', Arial, sans-serif;
  background: linear-gradient(45deg, #ff6b6b 0%, #ffa500 50%, #ff1744 100%);
  min-height: 95vh;
  border-radius: 25px;
  padding: 4rem;
  box-shadow: 0 12px 40px rgba(255, 107, 107, 0.4);
  border: 3px dashed #ff1744;
}

.page-header {
  text-align: right;
  margin-bottom: 5rem;
}

.page-header h1 {
  color: #ffffff;
  font-size: 4rem;
  font-weight: 900;
  margin-bottom: 3rem;
  text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.7);
  position: relative;
  text-transform: uppercase;
  font-family: 'Impact', sans-serif;
  letter-spacing: 5px;
}

.page-header h1::after {
  content: '🍽️';
  position: absolute;
  top: -30px;
  right: -60px;
  font-size: 3rem;
  animation: rotate 3s linear infinite;
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }



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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 4rem;
  margin: 3rem auto;
  max-width: 1600px;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);



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



  background: conic-gradient(from 0deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #ff6b6b);
  color: #2d3436;
  border: 4px solid #ff6b6b;
  padding: 2rem 4rem;
  border-radius: 100px;
  font-size: 1.4rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s ease-in-out;
  box-shadow: 0 15px 35px rgba(255, 107, 107, 0.6);
  text-transform: capitalize;
  letter-spacing: 3px;
  position: relative;
  animation: pulse 2s infinite;
}

.explore-button:hover {
  background: conic-gradient(from 180deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #ffeaa7, #ff6b6b);
  transform: scale(1.2) rotate(-5deg);
  box-shadow: 0 20px 50px rgba(255, 107, 107, 0.8);
  border-color: #4ecdc4;
}

@keyframes pulse {
  0% { box-shadow: 0 15px 35px rgba(255, 107, 107, 0.6); }
  50% { box-shadow: 0 15px 35px rgba(255, 107, 107, 0.9); }
  100% { box-shadow: 0 15px 35px rgba(255, 107, 107, 0.6); }



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
