import { ref, computed } from 'vue';
import Recipe from '../models/RecipeAdd';
import axiosInstance from '@/plugins/axios';
import ImageService from '@/services/ImageService';

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
    return !nome.value || 
           !ingredientes.value || 
           !modo_prep.value || 
           custo.value === '0' || 
           tempo.value === '0' || 
           qtd_pessoas.value === '0' ||
           !image.value;
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Usar o ImageService para validação
      if (!ImageService.validateImageFile(file)) {
        const errorMessage = ImageService.getValidationErrorMessage(file);
        alert(errorMessage);
        return;
      }
      image.value = file;
      imageName.value = `${file.name} (${file.type})`;
      console.log('Imagem válida selecionada:', file);
    } else {
      image.value = null;
      imageName.value = '';
    }
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
    // Validação detalhada dos campos
    const missingFields = [];
    
    if (!nome.value) missingFields.push('Nome da Receita');
    if (!ingredientes.value) missingFields.push('Ingredientes');
    if (!modo_prep.value) missingFields.push('Modo de Preparo');
    if (custo.value === '0') missingFields.push('Custo');
    if (tempo.value === '0') missingFields.push('Tempo');
    if (qtd_pessoas.value === '0') missingFields.push('Quantidade de Pessoas');
    if (!image.value) missingFields.push('Imagem');
    
    if (missingFields.length > 0) {
      alert(`Por favor, preencha os seguintes campos obrigatórios:\n\n• ${missingFields.join('\n• ')}`);
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
