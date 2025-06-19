/* eslint-disable */
import axiosInstance from '@/plugins/axios';

async function fetchRecipeData(recipeId) {
    // ...existing code...
}

async function printRecipeData(recipeId) {
    try {
        const response = await fetchRecipeData(recipeId);
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching recipe data:', error);
    }
}

export { fetchRecipeData, printRecipeData };
