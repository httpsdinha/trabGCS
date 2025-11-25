<template>
  <section class="left_main">
    <img :src="fullImageUrl" :alt="recipeName" class="imagem_receita" />
    <h2 class="ingredientes">Ingredientes</h2>
    <ul>
      <li
        v-for="(ingredient, index) in ingredients"
        :key="index"
        class="ingredient-item"
      >
        <input
          :value="ingredient"
          @input="onInput(index, $event.target.value)"
        />
        <button
          @click="$emit('remove-ingredient', index)"
          class="remove-button"
        >
          X
        </button>
      </li>
    </ul>
    <button class="add-button" @click="$emit('add-ingredient')">
      Adicionar
    </button>
  </section>
</template>

<script>
export default {
  name: "RecipeIngredientsEdit",
  props: {
    ingredients: {
      type: Array,
      required: true,
    },
    imageName: {
      type: String,
      default: "",
    },
    recipeName: {
      type: String,
      default: "",
    },
  },
  emits: ["update-ingredient", "add-ingredient", "remove-ingredient"],
  computed: {
    fullImageUrl() {
      return `http://localhost:3000/receita/imagem/${this.imageName}`;
    },
  },
  methods: {
    onInput(index, value) {
      this.$emit("update-ingredient", index, value);
    },
  },
};
</script>

<style scoped>
.left_main {
  width: 250px;
  margin-left: 1.7rem;
  margin-right: 25px;
}

.left_main h2 {
  text-align: left;
}

.imagem_receita {
  border-radius: 10px;
  width: 250px;
  height: 250px;
  object-fit: cover;
}

.ingredientes {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding-left: 0px;
  margin-bottom: 30px;
  gap: 10px;
  flex-direction: column;
}

.ingredient-item input {
  width: 100%;
  padding-right: 2rem;
  border: 1px solid #940d0d;
  border-radius: 0.3125rem;
  height: 2rem;
  padding: 5px;
  box-sizing: border-box; /* Added to ensure padding doesn't break width */
}

.remove-button {
  position: absolute;
  right: -0.5rem;
  top: 50%; /* Centered vertically */
  transform: translateY(-50%);
  background-color: transparent;
  border: none;
  color: #5b5b5b;
  font-weight: bold;
}

.remove-button:hover {
  color: #940d0d;
}

.add-button {
  display: block;
  margin: 1rem auto;
  background-color: #940d0d;
  color: white;
  border: none;
  border-radius: 0.3125rem;
  padding: 0.5rem 1rem;
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
  .left_main {
    width: 100%;
    margin: 0;
    padding: 1rem;
  }

  .imagem_receita {
    width: 100%;
    height: auto;
  }
}
</style>
