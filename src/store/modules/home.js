import ApiService from "@/services/api";

const state = {
  totalStudent: null,
  totalPaymentToday: null,
  totalPaymentAll: null,
};

const getters = {
  getTotalStudent: (state) => state.totalStudent,
  getTotalPaymentToday: (state) => state.totalPaymentToday,
  getTotalPaymentAll: (state) => state.totalPaymentAll,
};

const actions = {
  async fetchHome({ commit }) {
    const res = await ApiService.get("/api/home");

    commit("setHome", res.data);
  },
};

const mutations = {
  setHome: (state, { data }) => {
    state.totalStudent = data.total_student;
    state.totalPaymentToday = data.total_payment_today;
    state.totalPaymentAll = data.total_payment_all;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
