<template>
  <header-component/>
  <main class="main-container">
    <section class="add-form-container">
      <div class="header-section">
        <button class="back-button" @click="goBack" title="Voltar">
          <img src="@/assets/arrow.png" alt="Voltar" class="back-icon" />
        </button>
        <h2>ADICIONAR RECEITA</h2>
      </div>
      <RecipeForm @submitForm="submitForm" :successMessage="successMessage" />
      <AlertBox v-if="successMessage" :message="successMessage" />
    </section>
  </main>
</template>

<script>
import { useRecipeAddViewModel } from '../viewmodels/RecipeAddViewModel';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    
    const {
      successMessage,
      submitForm,
    } = useRecipeAddViewModel();

    const goBack = () => {
      // Primeira opção: volta para a página anterior no histórico
      if (window.history.length > 1) {
        router.go(-1);
      } else {
        // Fallback: vai para a página de lista de receitas
        router.push('/recipelist');
      }
    };

    return {
      successMessage,
      submitForm,
      goBack,
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

.header-section {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0 2rem;
  margin-top: 6dvh;
}

.back-button {
  position: absolute;
  left: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.back-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.back-icon {
  width: 1.5rem;
  height: 1.5rem;
  transform: rotate(180deg); /* Rotaciona a seta para apontar para esquerda */
  filter: brightness(0.4); /* Deixa o ícone um pouco mais escuro */
}

h2 {
  color: #000;
  font-size: 1.5rem;
  margin: 0;
  text-align: center;
  font-family: "Jost";
  flex: 1; /* Faz o h2 ocupar o espaço restante para centralizar */
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

  .header-section {
    padding: 0 1rem;
    margin-top: 2rem;
  }

  .back-button {
    left: 1rem;
  }

  .back-icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  h2 {
    font-size: 1.3rem;
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