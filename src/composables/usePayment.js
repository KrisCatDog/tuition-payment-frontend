import app from "@/main";
import ApiService from "@/services/api";
import { reactive, toRefs } from "vue";

const state = reactive({
  payments: [],
  payment: {},
  paginationMeta: {},
  errors: {},
  isPending: false,
});

const fetchPayment = async (page, perPage = 15, search = "") => {
  state.isPending = true;

  try {
    const res = await ApiService.get(
      `/api/payments?page=${page}&per_page=${perPage}&search=${search}`
    );
    console.log(res.data);
    state.payments = res.data.data;
    state.paginationMeta = res.data.meta;

    state.paginationMeta.links.shift();
    state.paginationMeta.links.pop();

    state.errors = null;
  } catch (e) {
    state.errors = e.response.data;
  }

  state.isPending = false;
};

const storePayment = async (data) => {
  state.isPending = true;

  try {
    await ApiService.post(`/api/payments`, data);

    await fetchPayment(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const showPayment = async (id) => {
  state.isPending = true;

  try {
    const res = await ApiService.get(`/api/payments/${id}`);

    state.payment = res.data.data;

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const usePayment = () => {
  return {
    fetchPayment,
    storePayment,
    showPayment,
    ...toRefs(state),
  };
};

export default usePayment;
