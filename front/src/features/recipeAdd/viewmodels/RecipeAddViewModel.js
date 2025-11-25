import { ref, computed } from "vue";
import Recipe from "../models/RecipeAdd";
import axiosInstance from "@/plugins/axios";
import ImageService from "@/services/ImageService";

// Helpers puros para reduzir o tamanho da função principal e melhorar legibilidade
const collectMissingFields = (recipeData) => {
  const { nome, ingredientes, modo_prep, custo, tempo, qtd_pessoas, image } =
    recipeData;
  const missing = [];
  if (!nome) {
    missing.push("Nome da Receita");
  }
  if (!ingredientes) {
    missing.push("Ingredientes");
  }
  if (!modo_prep) {
    missing.push("Modo de Preparo");
  }
  if (custo === "0") {
    missing.push("Custo");
  }
  if (tempo === "0") {
    missing.push("Tempo");
  }
  if (qtd_pessoas === "0") {
    missing.push("Quantidade de Pessoas");
  }
  if (!image) {
    missing.push("Imagem");
  }
  return missing;
};

const buildRecipeFromState = (recipeData) => {
  const {
    nome,
    ingredientes,
    modo_prep,
    custo,
    tempo,
    qtd_pessoas,
    image,
    userEmail,
  } = recipeData;
  return new Recipe({
    nome,
    ingredientes: ingredientes
      .split(",")
      .map((ingredient) => ingredient.trim()),
    modo_prep,
    custo,
    tempo,
    qtd_pessoas,
    imagem: image,
    email: userEmail,
  });
};

const postRecipe = async (formData) => {
  try {
    const response = await axiosInstance.post("/receita/adicionar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar receita:", error);
    throw error;
  }
};

const createFormState = () => {
  return {
    nome: ref(""),
    ingredientes: ref(""),
    modo_prep: ref(""),
    custo: ref("0"),
    tempo: ref("0"),
    qtd_pessoas: ref("0"),
    image: ref(null),
    imageName: ref(""),
    successMessage: ref(""),
    showAlert: ref(false),
    userEmail: ref(localStorage.getItem("userEmail") || ""),
  };
};

const createFormComputed = (state) => {
  return {
    isFormIncomplete: computed(() => {
      return (
        collectMissingFields({
          nome: state.nome.value,
          ingredientes: state.ingredientes.value,
          modo_prep: state.modo_prep.value,
          custo: state.custo.value,
          tempo: state.tempo.value,
          qtd_pessoas: state.qtd_pessoas.value,
          image: state.image.value,
        }).length > 0
      );
    }),
  };
};

const createFormHandlers = (state) => {
  const handleImageUpload = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) {
      state.image.value = null;
      state.imageName.value = "";
      return;
    }

    if (!ImageService.validateImageFile(file)) {
      const errorMessage = ImageService.getValidationErrorMessage(file);
      alert(errorMessage);
      return;
    }

    state.image.value = file;
    state.imageName.value = `${file.name} (${file.type})`;
    console.log("Imagem válida selecionada:", file);
  };

  const submitForm = async () => {
    const missing = collectMissingFields({
      nome: state.nome.value,
      ingredientes: state.ingredientes.value,
      modo_prep: state.modo_prep.value,
      custo: state.custo.value,
      tempo: state.tempo.value,
      qtd_pessoas: state.qtd_pessoas.value,
      image: state.image.value,
    });

    if (missing.length > 0) {
      alert(
        `Por favor, preencha os seguintes campos obrigatórios:\n\n• ${missing.join(
          "\n• "
        )}`
      );
      return;
    }

    const recipe = buildRecipeFromState({
      nome: state.nome.value,
      ingredientes: state.ingredientes.value,
      modo_prep: state.modo_prep.value,
      custo: state.custo.value,
      tempo: state.tempo.value,
      qtd_pessoas: state.qtd_pessoas.value,
      image: state.image.value,
      userEmail: state.userEmail.value,
    });

    try {
      await postRecipe(recipe.toFormData());
      state.successMessage.value = "Receita enviada com sucesso!";
      state.showAlert.value = true;
    } catch (error) {
      console.error("Erro ao enviar a receita:", error);
    }
  };

  const closeAlert = () => {
    state.showAlert.value = false;
  };

  return {
    handleImageUpload,
    submitForm,
    closeAlert,
  };
};

export function useRecipeAddViewModel() {
  const state = createFormState();
  const computedState = createFormComputed(state);
  const handlers = createFormHandlers(state);

  return {
    ...state,
    ...computedState,
    ...handlers,
  };
}
