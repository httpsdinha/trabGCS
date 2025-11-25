<template>
  <section class="right_main">
    <input v-model="localRecipe.nome" class="recipe-title" />
    <section class="info-container">
      <article class="select-container">
        <img src="@/assets/serve.png" alt="Serve Icon" class="select-icon" />
        <select v-model="localRecipe.qtd_pessoas" class="filters">
          <option value="none">Serve</option>
          <option value="1-2 pessoas">1-2 pessoas</option>
          <option value="3-5 pessoas">3-5 pessoas</option>
          <option value="+6 pessoas">+6 pessoas</option>
        </select>
      </article>
      <article class="select-container">
        <img src="@/assets/valor.png" alt="Valor Icon" class="select-icon" />
        <select v-model="localRecipe.custo" class="filters">
          <option value="none">Custo</option>
          <option value="Alto">Alto</option>
          <option value="Médio">Médio</option>
          <option value="Baixo">Baixo</option>
        </select>
      </article>
      <article class="select-container">
        <img src="@/assets/tempo.png" alt="Tempo Icon" class="select-icon" />
        <select v-model="localRecipe.tempo" class="filters">
          <option value="none">Tempo</option>
          <option value="10-30min">10-30min</option>
          <option value="30-60min">30-60min</option>
          <option value="+60min">+60min</option>
        </select>
      </article>
    </section>
    <section class="modo-preparo">
      <h2>Modo de Preparo</h2>
      <textarea v-model="localRecipe.modo_prep" class="modo_preparo"></textarea>
    </section>
    <button class="save-button" @click="$emit('save-recipe')">
      Salvar alterações
    </button>
  </section>
</template>

<script>
export default {
  name: "RecipeDetailsEdit",
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  emits: ["save-recipe"],
  computed: {
    localRecipe() {
      return this.recipe;
    },
  },
};
</script>

<style scoped>
.right_main {
  margin-left: 1rem;
  margin-right: 1rem;
  width: 100%;
}

.right_main h2 {
  text-align: left;
  margin-bottom: 0.5rem;
}

.info-container {
  justify-content: flex-start;
  align-items: center;
  margin-left: -0.5rem;
}

.info-container article {
  align-items: center;
  margin-right: 1rem;
}

.modo-preparo {
  margin-top: 1rem;
  flex-direction: column;
}

.select-container {
  display: inline-flex;
  align-items: center;
}

.recipe-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  font-family: "Jura";
  width: 29.2rem;
  border: 1px solid #940d0d; /* Base border */
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0; /* Reset radius for title if needed, or keep it */
}

.select-icon {
  margin: 5px;
  position: absolute;
  left: 10px;
  width: 16px;
  height: 16px;
  pointer-events: none;
}

.filters {
  font-family: "Jura";
  width: 9.0625rem;
  height: 1.5625rem;
  padding-left: 35px;
  border-radius: 0.3125rem;
  background: #fff;
  border: 1px solid #940d0d;
  margin: 0.5rem;
  appearance: none;
  -webkit-appearance: none;
}

.select-container::after {
  content: "";
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  background-image: url("@/assets/arrow.png");
  background-size: contain;
  background-repeat: no-repeat;
}

input,
textarea {
  border: 1px solid #940d0d;
  border-radius: 0.3125rem;
  height: 2rem;
}

textarea.modo_preparo {
  margin-bottom: 10px;
  box-sizing: border-box;
  word-wrap: break-word;
  max-width: 95%;
  padding: 5px;
  height: 12rem;
}

.save-button {
  background-color: #940d0d;
  color: white;
  border: none;
  border-radius: 0.3125rem;
  padding: 0.5rem 1rem;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

h2 {
  margin: 0px;
  color: #000;
  font-family: "Jura";
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}

@media (max-width: 768px) {
  .right_main {
    width: 100%;
    margin: 0;
    padding: 1rem;
  }

  .modo_preparo {
    width: 100%;
  }
}
</style>
