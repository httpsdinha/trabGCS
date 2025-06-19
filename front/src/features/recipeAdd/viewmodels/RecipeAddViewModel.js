import { ref, computed } from 'vue';
import Recipe from '../models/RecipeAdd';
import axiosInstance from '@/plugins/axios';

export function useRecipeAddViewModel() {
  const nome = ref('');
  const ingredientes = ref('');
  const modo_prep = ref('');
  const custo = ref('0');
  const tempo = ref('0');
  const qtd_pessoas = ref('0');
  const image = ref(null);
  const imageName = ref('');
  const successMessage = ref('');
  const showAlert = ref(false);
  const userEmail = ref(localStorage.getItem('userEmail') || '');

  const isFormIncomplete = computed(() => {
    return !nome.value || !ingredientes.value || !modo_prep.value || custo.value === '0' || tempo.value === '0' || qtd_pessoas.value === '0';
  });

  const handleImageUpload = (event) => {
    image.value = event.target.files[0];
    imageName.value = image.value ? `${image.value.name} (${image.value.type})` : '';
  };

  const addRecipe = async (recipeData) => {
    try {
      const response = await axiosInstance.post('/receita/adicionar', recipeData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Garantir o header correto
        },
      });
      return response.data;
    } catch (error) {
      console.error('Erro ao enviar receita:', error);
      throw error;
    }
  };

  const submitForm = async () => {
    if (isFormIncomplete.value) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const recipe = new Recipe({
      nome: nome.value,
      ingredientes: ingredientes.value.split(',').map((ingrediente) => ingrediente.trim()),
      modo_prep: modo_prep.value,
      custo: custo.value,
      tempo: tempo.value,
      qtd_pessoas: qtd_pessoas.value,
      imagem: image.value, // Define a imagem capturada no formulário
      email: userEmail.value,
    });

    try {
      await addRecipe(recipe.toFormData()); // Envia os dados em FormData
      successMessage.value = 'Receita enviada com sucesso!';
      showAlert.value = true;
    } catch (error) {
      console.error('Erro ao enviar a receita:', error);
    }
  };

  const closeAlert = () => {
    showAlert.value = false;
  };

  return {
    nome,
    ingredientes,
    modo_prep,
    custo,
    tempo,
    qtd_pessoas,
    imageName,
    successMessage,
    isFormIncomplete,
    handleImageUpload,
    submitForm,
    showAlert,
    closeAlert,
    userEmail,
  };
}
