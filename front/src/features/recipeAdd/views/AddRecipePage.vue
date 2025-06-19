<template>
  <header-component/>
  <main class="main-container">
    <section class="add-form-container">
      <h2>ADICIONAR RECEITA</h2>
      <RecipeForm @submitForm="submitForm" :successMessage="successMessage" />
      <AlertBox v-if="successMessage" :message="successMessage" />
    </section>
  </main>
</template>

<script>
import { useRecipeAddViewModel } from '../viewmodels/RecipeAddViewModel';
export default {

  setup() {
    const {
      successMessage,
      submitForm,
    } = useRecipeAddViewModel();

    return {
      successMessage,
      submitForm,
    };
  },
};
</script>

<style scoped>
.main-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 85dvh; 
}

.add-form-container {
  display: flex; 
  flex-direction: column; 
  width: 70%;
  max-width: 60rem;
  height: 95%;
  max-height: 45rem;
  border-radius: 1.25rem;
  background: #FFF;
  box-shadow: -11px 11px 16.1px 3px rgba(0, 0, 0, 0.25);
}

h2 {
  color: #000;
  font-size: 1.5rem;
  margin-bottom: 1rem; 
  margin-top: 6dvh;
  text-align: center;
  font-family: "Jost";
}

@media (max-width: 768px) {
  .main-container {
    height: auto;
    padding: 1rem;
  }

  .add-form-container {
    width: 100%;
    height: auto;
    padding: 1rem;
  }

  .add-input-nome, .add-input-ingrediente, .add-input-preparo {
    width: 100%;
  }

  .add-button-adicionar {
    width: 100%;
    position: static;
    transform: none;
    margin-top: 1rem;
  }
}
</style>