
import axiosInstance from '@/plugins/axios';

export default {
    addIngredient(ingredients) {
        ingredients.push('');
    },
    removeIngredient(ingredients, index) {
        ingredients.splice(index, 1);
    },
    async saveRecipe(recipe, ingredients) {
        recipe.ingredientes = ingredients.join(',');
        const formData = new FormData();
        formData.append('id', localStorage.getItem('recipeId'));
        formData.append('nome', recipe.nome);
        formData.append('modo_prep', recipe.modo_prep);
        formData.append('ingredientes', recipe.ingredientes);
        formData.append('tempo', recipe.tempo);
        formData.append('qtd_pessoas', recipe.qtd_pessoas);
        formData.append('custo', recipe.custo);
        if (recipe.imagem) {
            formData.append('imagem', recipe.imagem);
        }

        try {
            await axiosInstance.put('/receita/atualizar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            return true;
        } catch (error) {
            console.error('Erro ao atualizar receita:', error);
            return false;
        }
    },
    confirmDelete() {
        return confirm('Tem certeza que deseja deletar esta receita?');
    },
    async deleteRecipe() {
        const recipeId = localStorage.getItem('recipeId');
        try {
            await axiosInstance.delete(`/receita/deletar/${recipeId}`);
            return true;
        } catch (error) {
            console.error('Erro ao deletar receita:', error);
            return false;
        }
    }
};