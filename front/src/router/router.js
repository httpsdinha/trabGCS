import { createRouter, createWebHistory } from 'vue-router';
import AuthService from '@/utils/AuthService';
import RecipeAdd from '@/features/recipeAdd/views/AddRecipePage.vue';
import RecipePage from '@/features/recipePage/views/RecipePage.vue';
import RecipeList from '@/features/recipeList/views/RecipeListPage.vue';
import LandingPage from '@/features/landing/views/LandingPage.vue';
import CadastroPage from '@/features/cadastro/views/CadastroPage.vue';
import RecipeEdit from '@/features/recipePage/views/RecipeEditPage.vue';
import FavoritesPage from '@/features/recipeFav/views/FavoritesPage.vue';

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: LandingPage
  },
  {
    path: '/cadastro',
    name: 'CadastroPage',
    component: CadastroPage
  },
  // Rotas protegidas - requerem autenticação
  {
    path: '/add',
    name: 'RecipeAdd',
    component: RecipeAdd,
    meta: { requiresAuth: true }
  },
  {
    path: '/recipe',
    name: 'RecipePage',
    component: RecipePage,
    meta: { requiresAuth: true }
  },
  {
    path: '/recipelist',
    name: 'RecipeList',
    component: RecipeList,
    meta: { requiresAuth: true }
  },
  {
    path: '/edit',
    name: 'RecipeEdit',
    component: RecipeEdit,
    meta: { requiresAuth: true }
  },
  {
    path: '/favorites',
    name: 'FavoritesPage',
    component: FavoritesPage,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Navigation Guard - executa antes de cada navegação
router.beforeEach((to, from, next) => {
  // Verifica se a rota requer autenticação
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Verifica se o usuário está autenticado
    if (!AuthService.isAuthenticated()) {
      // Se não estiver autenticado, redireciona para a landing page
      console.warn('Acesso negado: usuário não autenticado tentando acessar', to.path);
      next({
        path: '/',
        query: { redirect: to.fullPath } // Salva onde o usuário queria ir
      });
    } else {
      // Se estiver autenticado, permite o acesso
      next();
    }
  } else {
    // Para rotas que não requerem autenticação (landing page, cadastro)
    next();
  }
});

export default router;