<template>
  <header-component />
  <main class="main-container flex-center">
    <section class="add-form-container">
      <div class="header-section">
        <button class="back-button flex-center" @click="goBack" title="Voltar">
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
import { useRecipeAddViewModel } from "../viewmodels/RecipeAddViewModel";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();

    const { successMessage, submitForm } = useRecipeAddViewModel();

    const goBack = () => {
      // Primeira opção: volta para a página anterior no histórico
      if (window.history.length > 1) {
        router.go(-1);
      } else {
        // Fallback: vai para a página de lista de receitas
        router.push("/recipelist");
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
  height: 85dvh;
}

.add-form-container {
  flex-direction: column;
  width: 70%;
  max-width: 60rem;
  height: 95%;
  max-height: 45rem;
  border-radius: 1.25rem;
  background: #fff;
  box-shadow: -11px 11px 16.1px 3px rgba(0, 0, 0, 0.25);
}

.header-section {
  align-items: center;
  padding: 0 2rem;
  margin-top: 6dvh;
}

.back-button {
  position: absolute;
  left: 2rem;

  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0.75rem;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(10px);
}

.back-button:hover {
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-color: rgba(0, 0, 0, 0.15);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.back-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.back-icon {
  width: 1.5rem;
  height: 1.5rem;
  transform: rotate(90deg);
  filter: brightness(0.3) contrast(1.2);
  transition: all 0.3s ease;
}

.back-button:hover .back-icon {
  filter: brightness(0.1) contrast(1.4);
  transform: rotate(90deg) scale(1.05);
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
    padding: 0.6rem;
    border-radius: 10px;
  }

  .back-icon {
    width: 1.2rem;
    height: 1.2rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  .add-input-nome,
  .add-input-ingrediente,
  .add-input-preparo {
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
