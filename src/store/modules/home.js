import ApiService from "@/services/api";

const state = {
  totalStudent: null,
  totalPaymentToday: null,
  totalPaymentAll: null,
  todayPayments: [],
  paginationMeta: {},
};

const getters = {
  getTotalStudent: (state) => state.totalStudent,
  getTotalPaymentToday: (state) => state.totalPaymentToday,
  getTotalPaymentAll: (state) => state.totalPaymentAll,
  getTodayPayments: (state) => state.todayPayments,
  getPaginationMeta: (state) => state.paginationMeta,
};

const actions = {
  async fetchHome({ commit }) {
    const res = await ApiService.get("/api/home");

    commit("setHome", res.data);
  },
  async fetchTodayPayment({ commit }, page) {
    const res = await ApiService.get(`/api/get-today-payments?page=${page}`);

    commit("setTodayPayments", res.data);
  },
};

const mutations = {
  setHome: (state, { data }) => {
    state.totalStudent = data.total_student;
    state.totalPaymentToday = data.total_payment_today;
    state.totalPaymentAll = data.total_payment_all;
  },
  setTodayPayments: (state, payload) => {
    let paginationMeta = payload.meta;

    paginationMeta.links.shift();
    paginationMeta.links.pop();

    state.todayPayments = payload.data;
    state.paginationMeta = paginationMeta;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
