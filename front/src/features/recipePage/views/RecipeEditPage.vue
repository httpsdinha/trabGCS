/* eslint-disable */
<template>
  <header-component />
  <main>
    <button class="delete-button" @click="confirmDelete">
      <img src="@/assets/lixo.png" alt="Delete Icon" class="delete-icon" />
    </button>
    <section class="receita">
      <RecipeIngredientsEdit
        :ingredients="ingredients"
        :imageName="recipe.imagem"
        :recipeName="recipe.nome"
        @update-ingredient="updateIngredient"
        @add-ingredient="addIngredient"
        @remove-ingredient="removeIngredient"
      />
      <RecipeDetailsEdit :recipe="recipe" @save-recipe="saveRecipe" />
    </section>
  </main>
</template>

<script>
import { Recipe } from "@/features/recipePage/models/recipePageModels";
import recipeEditPageViewModels from "@/features/recipePage/viewmodels/recipeEditPageViewModels";
import RecipeIngredientsEdit from "../components/RecipeIngredientsEdit.vue";
import RecipeDetailsEdit from "../components/RecipeDetailsEdit.vue";

export default {
  components: {
    RecipeIngredientsEdit,
    RecipeDetailsEdit,
  },
  data() {
    return {
      recipe: new Recipe("", "", "", "", "", "", ""),
      ingredients: [],
    };
  },
  async created() {
    const recipeData = this.$route.query.recipe;
    if (recipeData) {
      const data = JSON.parse(recipeData);
      this.recipe = new Recipe(
        data.nome,
        data.modo_prep,
        data.ingredientes,
        data.tempo,
        data.qtd_pessoas,
        data.custo,
        data.imagem
      );
      this.ingredients = data.ingredientes.split(",");
    }
  },
  methods: {
    addIngredient() {
      recipeEditPageViewModels.addIngredient(this.ingredients);
    },
    removeIngredient(index) {
      recipeEditPageViewModels.removeIngredient(this.ingredients, index);
    },
    updateIngredient(index, value) {
      this.ingredients[index] = value;
    },
    async saveRecipe() {
      const success = await recipeEditPageViewModels.saveRecipe(
        this.recipe,
        this.ingredients
      );
      if (success) {
        this.$router.push("/recipe");
      }
    },
    async confirmDelete() {
      if (recipeEditPageViewModels.confirmDelete()) {
        const success = await recipeEditPageViewModels.deleteRecipe();
        if (success) {
          this.$router.push("/recipelist");
        }
      }
    },
  },
};
</script>

<style scoped>
main {
  margin: 5%;
  background-color: white;
  border-radius: 5px;
  font-family: "Jura";
  box-shadow: -7px 14px 16px 4px rgba(0, 0, 0, 0.25);
}

.receita {
  padding-top: 3rem;
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
}

.delete-icon {
  width: 24px;
  height: 24px;
}

.delete-button:hover .delete-icon {
  filter: brightness(0.8);
}

@media (max-width: 768px) {
  header {
    flex-direction: column;
  }

  .receita {
    flex-direction: column;
    align-items: center;
  }
}
</style>
