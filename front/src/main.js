import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js";
import "@/styles/global.css";
import GlobalComponents from "@/plugins/globalComponents";
import axiosInstance from "@/plugins/axios";

const vueApplication = createApp(App);
vueApplication.config.globalProperties.$axios = axiosInstance; //this.$axios para componentes vue
vueApplication.use(router);
vueApplication.use(GlobalComponents);
vueApplication.mount("#app");
