import app from "@/main";
import ApiService from "@/services/api";
import { reactive, toRefs } from "vue";

const state = reactive({
  classes: [],
  paginationMeta: {},
  errors: {},
  isPending: false,
});

const fetchClass = async (page, perPage = 15) => {
  state.isPending = true;

  try {
    const res = await ApiService.get(
      `/api/classes?page=${page}&per_page=${perPage}`
    );

    state.classes = res.data.data;
    state.paginationMeta = res.data.meta;

    state.paginationMeta.links.shift();
    state.paginationMeta.links.pop();

    state.errors = null;
  } catch (e) {
    state.errors = e.response.data;
  }

  state.isPending = false;
};

const storeClass = async (data) => {
  state.isPending = true;

  try {
    await ApiService.post(`/api/classes`, data);

    await fetchClass(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const updateClass = async (data) => {
  state.isPending = true;

  try {
    await ApiService.put(`/api/classes/${data.id}`, data);

    await fetchClass(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const destroyClass = async (id) => {
  state.isPending = true;

  try {
    await ApiService.delete(`/api/classes/${id}`);

    await fetchClass(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const useClass = () => {
  return {
    fetchClass,
    storeClass,
    updateClass,
    destroyClass,
    ...toRefs(state),
  };
};

export default useClass;
