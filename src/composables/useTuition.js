import app from "@/main";
import ApiService from "@/services/api";
import { reactive, toRefs } from "vue";

const state = reactive({
  tuitions: [],
  formattedTuitions: [],
  paginationMeta: {},
  errors: {},
  isPending: false,
});

const fetchTuition = async (page, perPage = 15, search = "") => {
  state.isPending = true;

  try {
    const res = await ApiService.get(
      `/api/tuitions?page=${page}&per_page=${perPage}&search=${search}`
    );

    state.tuitions = res.data.data;
    state.formattedTuitions = state.tuitions.map((tuition) => {
      return { id: tuition.id, text: tuition.amount };
    });
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
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const updateTuition = async (data) => {
  state.isPending = true;

  try {
    await ApiService.put(`/api/tuitions/${data.id}`, data);

    await fetchTuition(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const destroyTuition = async (id) => {
  state.isPending = true;

  try {
    await ApiService.delete(`/api/tuitions/${id}`);

    await fetchTuition(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const useTuition = () => {
  return {
    fetchTuition,
    storeTuition,
    updateTuition,
    destroyTuition,
    ...toRefs(state),
  };
};

export default useTuition;
