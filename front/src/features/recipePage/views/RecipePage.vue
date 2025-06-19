<template>
    <header-component />
    <main>
        <button class="edit-icon" @click="goToEditPage">
            <img src="@/assets/editar-documento.png" alt="editar_icon" class="editar_icon">
        </button>
        <section class="receita">
            <section class="left_main">
                <img :src="`http://localhost:3000/receita/imagem/${recipe.imagem}`" :alt="recipe.nome" class="imagem_receita">
                <h2 class="ingredientes">Ingredientes</h2>
                <ul>
                    <li v-for="(ingredient, index) in recipe.ingredientes.split(',')" :key="index">{{ ingredient }}</li>
                </ul>
            </section>
            <section class="right_main">
                <h2>{{ recipe.nome }}</h2>
                <section class="info-container">
                    <article>
                        <img src="@/assets/serve.png" alt="talheres" class="icon_info_prato">
                        <p class="info_prato">{{ recipe.qtd_pessoas }}</p>
                    </article>
                    <article>
                        <img src="@/assets/valor.png" alt="custo" class="icon_info_prato">
                        <p class="info_prato">{{ recipe.custo }}</p>
                    </article>
                    <article>
                        <img src="@/assets/tempo.png" alt="tempo_preparo" class="icon_info_prato">
                        <p class="info_prato">{{ recipe.tempo }}</p>
                    </article>
                </section>
                <section class="modo-preparo">
                    <h2>Modo de Preparo</h2>
                    <p class="modo_preparo">{{ recipe.modo_prep }}</p>
                </section>
            </section>
        </section>
    </main>
</template>

<script>
import { Recipe } from '@/features/recipePage/models/recipePageModels';

export default {
    data() {
        return {
            recipe: new Recipe('', '', '', '', '', '', '')
        };
    },
    async created() {
        await this.fetchRecipeData();
    },
    methods: {
        async fetchRecipeData() {
            const recipeId = localStorage.getItem('recipeId'); // Get the recipe ID from local storage
            const data = await Recipe.getRecipe(recipeId);
            if (data) {
                this.recipe = new Recipe(
                    data.nome,
                    data.modo_prep,
                    data.ingredientes,
                    data.tempo,
                    data.qtdPessoas, // Ensure this matches the API response
                    data.custo,
                    data.imagem
                );
            }
        },
        goToPage(path) {
            this.$router.push(path);
        },
        goToEditPage() {
            this.$router.push({ path: '/edit', query: { recipe: JSON.stringify(this.recipe) } });
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
    margin-bottom: 30px;
    box-sizing: border-box;
    word-wrap: break-word;
    max-width: 100%;
  }
  
  .info-container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
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

  .edit-icon:hover .editar_icon {
    filter: brightness(0.8);
  }
  
</style>