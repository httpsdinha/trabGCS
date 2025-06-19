/* eslint-disable */
<template>
  <header-component />
  <main>
      <button class="delete-button" @click="confirmDelete">
          <img src="@/assets/lixo.png" alt="Delete Icon" class="delete-icon" />
      </button>
      <section class="receita">
          <section class="left_main">
              <img :src="`http://localhost:3000/receita/imagem/${recipe.imagem}`" :alt="recipe.nome" class="imagem_receita">
              <h2 class="ingredientes">Ingredientes</h2>
              <ul>
                  <li v-for="(ingredient, index) in ingredients" :key="index" class="ingredient-item">
                      <input v-model="ingredients[index]" />
                      <button @click="removeIngredient(index)" class="remove-button">X</button>
                  </li>
              </ul>
              <button class="add-button" @click="addIngredient">Adicionar</button>
          </section>
          <section class="right_main">
              <input v-model="recipe.nome" class="recipe-title" />
              <section class="info-container">
                <articles class="select-container">
                  <img src="@/assets/serve.png" alt="Serve Icon" class="select-icon" />
                  <select v-model="recipe.qtd_pessoas" class="filters">
                    <option value="none">Serve</option>
                    <option value="1-2 pessoas">1-2 pessoas</option>
                    <option value="3-5 pessoas">3-5 pessoas</option>
                    <option value="+6 pessoas">+6 pessoas</option>
                  </select>
                </articles>
                <articles class="select-container">
                  <img src="@/assets/valor.png" alt="Valor Icon" class="select-icon" />
                  <select v-model="recipe.custo" class="filters">
                    <option value="none">Custo</option>
                    <option value="Alto">Alto</option>
                    <option value="Médio">Médio</option>
                    <option value="Baixo">Baixo</option>
                  </select>
                </articles>
                <articles class="select-container">
                  <img src="@/assets/tempo.png" alt="Tempo Icon" class="select-icon" />
                  <select v-model="recipe.tempo" class="filters">
                    <option value="none">Tempo</option>
                    <option value="10-30min">10-30min</option>
                    <option value="30-60min">30-60min</option>
                    <option value="+60min">+60min</option>
                  </select>
                </articles>
              </section>
              <section class="modo-preparo">
                  <h2>Modo de Preparo</h2>
                  <textarea v-model="recipe.modo_prep" class="modo_preparo"></textarea>
              </section>
              <button class="save-button" @click="saveRecipe">Salvar alterações</button>
          </section>
      </section>
  </main>
</template>

<script>
import { Recipe } from '@/features/recipePage/models/recipePageModels';
import recipeEditPageViewModels from '@/features/recipePage/viewmodels/recipeEditPageViewModels';

export default {
  data() {
      return {
          recipe: new Recipe('', '', '', '', '', '', ''),
          ingredients: []
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
          this.ingredients = data.ingredientes.split(',');
      }
  },
  methods: {
      addIngredient() {
          recipeEditPageViewModels.addIngredient(this.ingredients);
      },
      removeIngredient(index) {
          recipeEditPageViewModels.removeIngredient(this.ingredients, index);
      },
      async saveRecipe() {
          const success = await recipeEditPageViewModels.saveRecipe(this.recipe, this.ingredients);
          if (success) {
              this.$router.push('/recipe');
          }
      },
      async confirmDelete() {
          if (recipeEditPageViewModels.confirmDelete()) {
              const success = await recipeEditPageViewModels.deleteRecipe();
              if (success) {
                  this.$router.push('/recipelist');
              }
          }
      }
  }
};
</script>

<style scoped>
h2 {
  margin: 0px;
  color: #000;
  font-family: "Jura";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

ul {
  list-style-type: none;
  padding-left: 0px;
  margin-bottom: 30px;
  gap: 10px; 
  display: flex;
  flex-direction: column;
}

button{
  background-color: #940D0D;
  color: white;
  border: none;
  border-radius: 0.3125rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.add-button {
  display: block;
  margin: 1rem auto; 
}

main {
  margin: 5%;
  background-color: white;
  border-radius: 5px;
  position: relative;
  font-family: "Jura";
  box-shadow: -7px 14px 16px 4px rgba(0, 0, 0, 0.25);
}

.imagem_receita {
  border-radius: 10px;
  width: 250px;
  height: 250px;
  object-fit: cover;
}

.receita {
  display: flex;
  padding-top: 3rem;
}

.left_main {
  width: 250px;
  margin-left: 1.7rem;
  margin-right: 25px;
}

.left_main h2{
  text-align: left;
}

.ingredientes{
  margin-bottom: 1rem;
}

.right_main {
  margin-left: 1rem;
  margin-right: 1rem;
  width: 100%;
}

.right_main h2{
  text-align: left;
  margin-bottom: 0.5rem;
}

.editar_icon {
  width: 25px;
}

.edit-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.icon_info_prato {
  width: 1rem;
  height: 1rem;
}

.info_prato {
  font-size: 15px;
  margin-left: 5px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  margin-top: auto;
  margin-bottom: auto;
}

.modo_preparo {
  margin-bottom: 10px;
  box-sizing: border-box;
  word-wrap: break-word;
  max-width: 95%;
  padding: 5px;
  height: 12rem;
}

.info-container {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: -0.5rem;
}

.info-container article {
  display: flex;
  align-items: center;
  margin-right: 1rem;
}

.modo-preparo{
  margin-top: 1rem;
  display: flex; 
  flex-direction: column; 
}

.select-container {
  position: relative;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}

.recipe-title{
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: 'Jura';
  width: 29.2rem;
  border-bottom: 1px solid #940D0D;
}

.select-icon {
  margin: 5px;
  position: absolute;
  left: 10px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  cursor: pointer;
}

.filters {
  font-family: 'Jura';
  width: 9.0625rem;
  height: 1.5625rem;
  padding-left: 35px;
  border-radius: 0.3125rem;
  background: #fff;
  border: 1px solid #940D0D;
  margin: 0.5rem;
  appearance: none;
  -webkit-appearance: none;
  cursor: pointer;
}

.select-container::after {
  content: '';
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-image: url('@/assets/arrow.png');
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;

}

input, textarea {
  border: 1px solid #940D0D;
  border-radius: 0.3125rem;
  height: 2rem; 
}

ul input {
  width: 250px; 
  padding: 5px;
}
.ingredient-item {
  position: relative;
}

.ingredient-item input {
  width: 100%;
  padding-right: 2rem;
}

.remove-button {
  position: absolute;
  right: -0.5rem;
  top: 5%;
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: #5b5b5b;
  cursor: pointer;
}

.remove-button:hover {
  color: #940D0D;
}

.delete-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
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

  .recipe-search {
    margin-left: 0;
    width: 100%;
  }

  .receita {
    flex-direction: column;
    align-items: center;
  }

  .left_main, .right_main {
    width: 100%;
    margin: 0;
    padding: 1rem;
  }

  .imagem_receita {
    width: 100%;
    height: auto;
  }

  .modo_preparo {
    width: 100%;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.5rem;
  }

  .recipe-search-input {
    font-size: 0.875rem;
    height: 1.5rem;
  }

  .info_prato {
    font-size: 0.875rem;
  }

  .icon_info_prato {
    width: 0.875rem;
    height: 0.875rem;
  }
}

</style>