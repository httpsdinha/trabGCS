<template>
  <article class="recipe">
    <img :src="`http://localhost:3000/receita/imagem/${recipe.imagem}`" alt="fotoreceita" class="foto-receita">
    <section class="recipe-details">
      <h2 class="recipe-name">{{ recipe.nome }}</h2>
      <p>{{ recipe.custo }} | {{ recipe.tempo }} | {{ recipe.qtdPessoas > 6 ? '+6' : recipe.qtdPessoas }}</p>
    </section>
    <div class="card-actions">
      <favorite-button 
        :recipe-id="recipe.id" 
        class="favorite-btn"
        @favoriteChanged="$emit('favoriteChanged', $event)"
      />
      <button-base width="3rem" class="button-ver" @click="getRecipeData">
        Ver
      </button-base>
    </div>
  </article>
</template>

<script>
import { Recipe } from '@/features/recipePage/models/recipePageModels.js';
import FavoriteButton from '@/features/recipeFav/components/FavoriteButton.vue';

export default {
  name: 'RecipeCard',
  components: {
    FavoriteButton
  },
  emits: ['favoriteChanged'],
  props: {
    recipe: {
      type: Object,
      required: true
    }
  },
  methods: {
    goToPage() {
      localStorage.setItem('recipeId', this.recipe.id); 
      this.$router.push('/recipe'); 
    },
    async getRecipeData() {
      try {
        const recipeData = await Recipe.getRecipe(this.recipe.id);
        console.log(recipeData);
        this.goToPage();
      } catch (error) {
        console.error('Error getting recipe data:', error);
      }
    }
  }
}
</script>

<style scoped>
.recipe {
  background-color: #fff;
  border-radius: 0.3125rem;
  margin-top: 1.25rem;
  width: 100%;
  max-width: 31.625rem;
  height: auto;
  flex-shrink: 0;
  display: flex;
  width: calc(100% - 0.5rem);
  box-sizing: border-box;
  margin: 0 0.5rem 1rem 0.5rem;
  position: relative;
}

.button-ver {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 1rem;
}

.card-actions {
  position: absolute;
  right: 0;
  bottom: 0;
  margin: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.favorite-btn {
  position: absolute;
  margin: 0;
}

.foto-receita {
  width: 9.375rem;
  height: 9.375rem;
  flex-shrink: 0;
  margin: 1rem;
}

.recipe-details {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  padding: 1rem;
}

.recipe-details h2 {
  color: #000;
  font-family: Jura;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  margin-bottom: 0.5rem;
  text-align: left; 
}

p {
  color: #A12A09;
  font-family: Jura;
  font-size: 0.9375rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  width: 100%;
  max-width: 17.875rem;
  margin-top: 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
}
</style>
