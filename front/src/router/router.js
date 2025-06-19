import { createRouter, createWebHistory } from 'vue-router';
import RecipeAdd from '@/features/recipeAdd/views/AddRecipePage.vue';
import RecipePage from '@/features/recipePage/views/RecipePage.vue';
import RecipeList from '@/features/recipeList/views/RecipeListPage.vue';
import LandingPage from '@/features/landing/views/LandingPage.vue';
import CadastroPage from '@/features/cadastro/views/CadastroPage.vue';
import RecipeEdit from '@/features/recipePage/views/RecipeEditPage.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/add',
    name: 'RecipeAdd',
    component: RecipeAdd
  },
  {
    path: '/recipe',
    name: 'RecipePage',
    component: RecipePage
  },
  {
    path: '/recipelist',
    name: 'RecipeList',
    component: RecipeList
  },
  {
    path: '/cadastro',
    name: 'CadastroPage',
    component: CadastroPage
  },
  {
    path: '/edit',
    name: 'RecipeEdit',
    component: RecipeEdit
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
