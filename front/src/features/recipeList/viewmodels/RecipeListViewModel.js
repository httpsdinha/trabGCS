import { ref } from 'vue';
import axiosInstance from '@/plugins/axios';
import Recipe from '../models/Recipe';

export function useRecipeListViewModel() {
  const recipes = ref([]);
  const filteredRecipes = ref([]);
  const filters = ref({
    custo: 'none',
    tempo: 'none',
    qtdPessoas: 'none'
  });

  const fetchRecipes = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail'); // Retrieve user's email
      const response = await axiosInstance.get('/receita/listar', {
        params: { email: userEmail }
      });
      console.log('Data from backend:', response.data); // Print data from backend
      recipes.value = response.data.map(recipeData => new Recipe(recipeData));
      filteredRecipes.value = recipes.value;
    } catch (error) {
      console.error('Erro ao buscar receitas:', error);
    }
  };

  const applyFilters = () => {
    filteredRecipes.value = recipes.value.filter(recipe => {
      return (filters.value.custo === 'none' || recipe.custo === filters.value.custo) &&
             (filters.value.tempo === 'none' || recipe.tempo === filters.value.tempo) &&
             (filters.value.qtdPessoas === 'none' || 
              (filters.value.qtdPessoas === '+6' ? recipe.qtdPessoas > 6 : recipe.qtdPessoas == filters.value.qtdPessoas));
    });
  };

  const handleValueChange = (custo) => {
    filters.value.custo = custo;
    applyFilters();
  };

  const handleTimeChange = (tempo) => {
    filters.value.tempo = tempo;
    applyFilters();
  };

  const handleServeChange = (qtdPessoas) => {
    filters.value.qtdPessoas = qtdPessoas;
    applyFilters();
  };

  return {
    recipes,
    filteredRecipes,
    filters,
    fetchRecipes,
    handleValueChange,
    handleTimeChange,
    handleServeChange
  };
}
