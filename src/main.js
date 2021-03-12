import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/tailwind.css";
import ApiService from "./services/api";
import titleMixin from "./mixins/titleMixin";
import VueProgressBar from "@aacassandra/vue3-progressbar";

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
  .mixin(titleMixin)
  .use(VueProgressBar, options)
  .mount("#app");

export default app;
