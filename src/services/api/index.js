import axios from "axios";

const ApiService = {
  init(baseURL) {
    axios.defaults.baseURL = baseURL;
    axios.defaults.withCredentials = true;

    this.setHeader();
  },
  setHeader() {
    axios.defaults.headers.common["Accept"] = "application/json";
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
