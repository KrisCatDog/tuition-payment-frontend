import ApiService from "@/services/api";
import { reactive, toRefs } from "@vue/reactivity";

const state = reactive({
  tuitions: [],
  paginationMeta: {},
  errors: {},
  isPending: false,
});

const fetchTuition = async (page, perPage = 15) => {
  state.isPending = true;

  try {
    const res = await ApiService.get(
      `/api/tuitions?page=${page}&per_page=${perPage}`
    );

    state.tuitions = res.data.data;
    state.paginationMeta = res.data.meta;

    state.paginationMeta.links.shift();
    state.paginationMeta.links.pop();

    state.errors = null;
  } catch (e) {
    state.errors = e.response.data;
  }

  state.isPending = false;
};

const storeTuition = async (data) => {
  state.isPending = true;

  try {
    await ApiService.post(`/api/tuitions`, data);

    await fetchTuition(1, 10);

    state.errors = null;
  } catch (e) {
    state.errors = e.response.data;
  }

  state.isPending = false;
};

const useTuition = () => {
  return { fetchTuition, storeTuition, ...toRefs(state) };
};

export default useTuition;
