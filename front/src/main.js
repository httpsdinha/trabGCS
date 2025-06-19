import { createApp } from 'vue';
import App from './App.vue';
import router from './router/router.js';
import '@/styles/global.css';
import GlobalComponents from '@/plugins/globalComponents';
import axiosInstance from '@/plugins/axios';

const app = createApp(App);
app.config.globalProperties.$axios = axiosInstance; //this.$axios para componentes vue
app.use(router);
app.use(GlobalComponents);
app.mount('#app');
