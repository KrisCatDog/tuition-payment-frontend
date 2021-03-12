import app from "@/main";
import axios from "axios";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
    axios.defaults.withCredentials = true;
    axios.interceptors.request.use((config) => {
      app.$Progress.start();
      return config;
    });
    axios.interceptors.response.use((response) => {
      app.$Progress.finish();
      return response;
    });

    this.setHeader();
  },
  setHeader() {
    axios.defaults.headers.common["Accept"] = "application/json";
    axios.defaults.headers.common["Content-Type"] = "application/json";
  },
  get(resource) {
    return axios.get(resource);
  },

  post(resource, data) {
    return axios.post(resource, data);
  },

  put(resource, data) {
    return axios.put(resource, data);
  },

  delete(resource) {
    return axios.delete(resource);
  },
};

export default ApiService;
