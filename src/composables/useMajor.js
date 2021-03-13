import app from "@/main";
import ApiService from "@/services/api";
import { reactive, toRefs } from "vue";

const state = reactive({
  majors: [],
  formattedMajors: [],
  paginationMeta: {},
  errors: {},
  isPending: false,
});

const fetchMajor = async (page, perPage = 15) => {
  state.isPending = true;

  try {
    const res = await ApiService.get(
      `/api/majors?page=${page}&per_page=${perPage}`
    );

    state.majors = res.data.data;
    state.formattedMajors = state.majors.map((major) => {
      return { id: major.id, text: major.kompetensi_keahlian };
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

const storeMajor = async (data) => {
  state.isPending = true;

  try {
    await ApiService.post(`/api/majors`, data);

    await fetchMajor(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const updateMajor = async (data) => {
  state.isPending = true;

  try {
    await ApiService.put(`/api/majors/${data.id}`, data);

    await fetchMajor(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const destroyMajor = async (id) => {
  state.isPending = true;

  try {
    await ApiService.delete(`/api/majors/${id}`);

    await fetchMajor(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const useMajor = () => {
  return {
    fetchMajor,
    storeMajor,
    updateMajor,
    destroyMajor,
    ...toRefs(state),
  };
};

export default useMajor;
