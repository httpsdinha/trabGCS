<template>
  <header-component @search="handleSearch" />
  <nav class="filters">
    <div class="filters-left">
      <filters-base
        @valueChange="handleValueChange"
        @timeChange="handleTimeChange"
        @serveChange="handleServeChange"
      />
    </div>
    <div class="filters-right">
      <img src="@/assets/adicionar.png" class="button-adicionar" @click="goToPage('/add')" >
    </div>
  </nav>

  <main>
    <section class="recipes-container">
      <recipe-card v-for="recipe in filteredRecipes" :key="recipe.id" :recipe="recipe" />
    </section>
  </main>
</template>

<script>
import { useRecipeListViewModel } from '../viewmodels/RecipeListViewModel';
import RecipeCard from '../components/RecipeCard.vue';

export default {
  name: "HomePage",
  components: {
    RecipeCard
  },
  setup() {
    const {
      recipes,
      filteredRecipes,
      filters,
      fetchRecipes,
      handleValueChange,
      handleTimeChange,
      handleServeChange
    } = useRecipeListViewModel();

    fetchRecipes();

    const handleSearch = (searchTerm) => {
      filteredRecipes.value = recipes.value.filter(recipe =>
        recipe.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    };

    return {
      recipes,
      filteredRecipes,
      filters,
      handleValueChange,
      handleTimeChange,
      handleServeChange,
      handleSearch
    };
  },
  methods: {
    goToPage(route) {
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  width: 100%; 
  padding: 0.5rem 3rem;
}

.filters-left, .filters-right {
  display: flex;
  align-items: center;
}

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
  margin: 1rem;
}

.foto-receita {
  width: 9.375rem;
  height: 9.375rem;
  flex-shrink: 0;
  margin: 1rem;
}

.recipes-container {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 100%;
  overflow: hidden;

}

.button-adicionar {
  width: 25px;
  height: 25px;
  cursor: pointer;
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
  color: #000;
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

@media (max-width: 1800px) {
  .recipe {
    width: calc(33.33% - 3rem); 
  }
}

@media (max-width: 1500px) {
  .recipe {
    width: calc(100% - 1rem); 
  }
}

@media (max-width: 900px) {
  .recipe {
    width: calc(100% - 0.5rem);
  }

  .filters{
    padding: 0 1px;
  }
}
</style>