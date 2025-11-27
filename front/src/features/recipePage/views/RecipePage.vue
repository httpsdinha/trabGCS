<template>
  <header-component />
  <main>
    <!-- Loading state -->
    <div v-if="loading" class="loading-container flex-center">
      <p>Carregando receita...</p>
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="error-container flex-center">
      <p>{{ error }}</p>
      <button @click="$router.push('/list')" class="btn-voltar">
        Voltar à Lista
      </button>
    </div>

    <!-- Recipe content -->
    <div v-else>
      <div class="action-buttons">
        <favorite-button :recipe-id="recipe.id" class="favorite-btn-page" />
        <button class="edit-icon" @click="goToEditPage">
          <img
            src="@/assets/editar-documento.png"
            alt="editar_icon"
            class="editar_icon"
          />
        </button>
      </div>
      <section class="receita">
        <section class="left_main">
          <RecipeImage
            :image-name="recipe.imagem"
            :alt-text="recipe.nome"
            width="100%"
            height="auto"
            class="imagem_receita"
            placeholder-text="Imagem da receita não disponível"
          />
          <h2 class="ingredientes">Ingredientes</h2>
          <ul>
            <li
              v-for="(ingredient, index) in recipe.ingredientes.split(',')"
              :key="index"
            >
              {{ ingredient }}
            </li>
          </ul>
        </section>
        <section class="right_main">
          <h2>{{ recipe.nome }}</h2>
          <section class="info-container">
            <article>
              <img
                src="@/assets/serve.png"
                alt="talheres"
                class="icon_info_prato"
              />
              <p class="info_prato">{{ recipe.qtd_pessoas }}</p>
            </article>
            <article>
              <img
                src="@/assets/valor.png"
                alt="custo"
                class="icon_info_prato"
              />
              <p class="info_prato">{{ recipe.custo }}</p>
            </article>
            <article>
              <img
                src="@/assets/tempo.png"
                alt="tempo_preparo"
                class="icon_info_prato"
              />
              <p class="info_prato">{{ recipe.tempo }}</p>
            </article>
          </section>
          <section class="modo-preparo">
            <h2>Modo de Preparo</h2>
            <p class="modo_preparo">{{ recipe.modo_prep }}</p>
          </section>
        </section>
      </section>
    </div>
  </main>
</template>

<script>
import { Recipe } from "@/features/recipePage/models/recipePageModels";
import FavoriteButton from "@/features/recipeFav/components/FavoriteButton.vue";

export default {
  components: {
    FavoriteButton,
  },
  data() {
    return {
      recipe: new Recipe("", "", "", "", "", "", ""),
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchRecipeData();
  },
  methods: {
    async fetchRecipeData() {
      try {
        this.loading = true;
        this.error = null;

        const recipeId = localStorage.getItem("recipeId");
        if (!recipeId) {
          this.error = "ID da receita não encontrado";
          return;
        }

        const data = await Recipe.getRecipe(recipeId);
        if (data) {
          this.recipe = new Recipe(
            data.nome,
            data.modo_prep,
            data.ingredientes,
            data.tempo,
            data.qtdPessoas,
            data.custo,
            data.imagem
          );
          this.recipe.id = data.id;
        } else {
          this.error = "Receita não encontrada";
        }
      } catch (error) {
        console.error("Erro ao carregar receita:", error);
        this.error = error.message || "Erro ao carregar receita";
      } finally {
        this.loading = false;
      }
    },
    goToPage(path) {
      this.$router.push(path);
    },
    goToEditPage() {
      this.$router.push({
        path: "/edit",
        query: { recipe: JSON.stringify(this.recipe) },
      });
    },
  },
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
  padding-top: 3rem;
}

.left_main {
  width: 250px;
  margin-left: 1.7rem;
  margin-right: 25px;
}

.left_main h2 {
  text-align: left;
}

.right_main {
  margin-left: 1rem;
  margin-right: 1rem;
  width: 100%;
}

.right_main h2 {
  text-align: left;
  margin-bottom: 0.5rem;
}

.editar_icon {
  width: 25px;
}

.action-buttons {
  position: absolute;
  top: 10px;
  right: 10px;
  align-items: center;
  gap: 0.5rem;
}

.edit-icon {
  background: none;
  border: none;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.edit-icon:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.favorite-btn-page {
  position: static;
}

.icon_info_prato {
  width: 1rem;
  height: 1rem;
}

.info_prato {
  font-size: 15px;
  margin-left: 5px;
  margin-right: 12px;
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
  justify-content: flex-start;
  align-items: center;
}

.info-container article {
  align-items: center;
  margin-right: 1rem;
}

.modo-preparo {
  margin-top: 1rem;
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

  .left_main,
  .right_main {
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

.loading-container,
.error-container {
  flex-direction: column;
  padding: 2rem;
  text-align: center;
  min-height: 200px;
}

.error-container p {
  color: #a12a09;
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.btn-voltar {
  background-color: #a12a09;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.3125rem;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-voltar:hover {
  background-color: #8a2308;
}
</style>
