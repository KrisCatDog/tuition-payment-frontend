import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/css/tailwind.css";
import "./assets/css/fonts.css";
import ApiService from "./services/api";
import titleMixin from "./mixins/titleMixin";
import VueProgressBar from "@aacassandra/vue3-progressbar";
import Select2 from "vue3-select2-component";
import store from "./store";

ApiService.init(process.env.VUE_APP_API_ORIGIN);

const options = {
  color: "#34D399",
  failedColor: "#EF4444",
  thickness: "4px",
  transition: {
    speed: "0.2s",
    opacity: "0.6s",
    termination: 300,
  },
  autoRevert: true,
  location: "top",
  inverse: false,
};

const app = createApp(App)
  .use(router)
  .use(store)
  .mixin(titleMixin)
  .use(VueProgressBar, options)
  .component("Select2", Select2)
  .mount("#app");

export default app;
