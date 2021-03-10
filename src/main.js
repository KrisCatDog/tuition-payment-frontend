import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import VueAxios from "vue-axios";
import axios from "axios";
import ApiService from "./services/api";

ApiService.init(process.env.VUE_APP_API_ORIGIN);

createApp(App)
  .use(router)
  .use(VueAxios, axios)
  .mount("#app");
