<template>
  <button 
    class="favorite-button" 
    @click="handleToggleFavorite"
    :disabled="loading"
    :title="isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
  >
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      :class="{ 'favorite-filled': isFavorite, 'favorite-empty': !isFavorite }"
    >
      <path 
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        :fill="isFavorite ? '#e74c3c' : 'none'"
        :stroke="isFavorite ? '#e74c3c' : '#666'"
        stroke-width="2"
      />
    </svg>
  </button>
</template>

<script>
import { useFavoriteViewModel } from '../viewmodels/FavoriteViewModel';

export default {
  name: 'FavoriteButton',
  props: {
    recipeId: {
      type: [Number, String],
      required: true
    },
    initialFavoriteStatus: {
      type: Boolean,
      default: false
    }
  },
  emits: ['favoriteChanged'],
  data() {
    return {
      isFavorite: this.initialFavoriteStatus,
      loading: false
    };
  },
  async mounted() {
    await this.checkFavoriteStatus();
  },
  methods: {
    async checkFavoriteStatus() {
      const { checkIsFavorite } = useFavoriteViewModel();
      try {
        this.isFavorite = await checkIsFavorite(this.recipeId);
      } catch (error) {
        console.error('Erro ao verificar status de favorito:', error);
      }
    },
    async handleToggleFavorite() {
      if (this.loading) return;
      
      const { toggleFavorite } = useFavoriteViewModel();
      this.loading = true;
      
      try {
        const newStatus = await toggleFavorite(this.recipeId);
        this.isFavorite = newStatus;
        this.$emit('favoriteChanged', { recipeId: this.recipeId, isFavorite: newStatus });
      } catch (error) {
        console.error('Erro ao alterar favorito:', error);
        // Mostrar feedback de erro para o usuário
        if (error.response?.status === 404) {
          alert('Funcionalidade de favoritos ainda não está disponível no servidor.');
        } else if (error.code === 'ERR_NETWORK') {
          alert('Erro de conexão. Verifique sua internet e tente novamente.');
        } else {
          alert('Erro ao processar favorito. Tente novamente.');
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.favorite-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.favorite-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: scale(1.1);
}

.favorite-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

.favorite-filled {
  animation: favoriteAdded 0.3s ease;
}

.favorite-empty {
  transition: all 0.2s ease;
}

@keyframes favoriteAdded {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}
</style>
