import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import ApiService from "./services/api";
import titleMixin from "./mixins/titleMixin";

ApiService.init(process.env.VUE_APP_API_ORIGIN);

createApp(App)
  .use(router)
  .mixin(titleMixin)
  .mount("#app");
