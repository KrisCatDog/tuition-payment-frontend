import app from "@/main";
import ApiService from "@/services/api";
import { reactive, toRefs } from "vue";

const state = reactive({
  officers: [],
  paginationMeta: {},
  errors: {},
  isPending: false,
});

const fetchOfficer = async (page, perPage = 15, search = "") => {
  state.isPending = true;

  try {
    const res = await ApiService.get(
      `/api/officers?page=${page}&per_page=${perPage}&search=${search}`
    );

    state.officers = res.data.data;
    state.paginationMeta = res.data.meta;

    state.paginationMeta.links.shift();
    state.paginationMeta.links.pop();

    state.errors = null;
  } catch (e) {
    state.errors = e.response.data;
  }

  state.isPending = false;
};

const storeOfficer = async (data) => {
  state.isPending = true;

  try {
    await ApiService.post(`/api/officers`, data);

    await fetchOfficer(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const updateOfficer = async (data) => {
  state.isPending = true;

  try {
    await ApiService.put(`/api/officers/${data.id}`, data);

    await fetchOfficer(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const destroyOfficer = async (id) => {
  state.isPending = true;

  try {
    await ApiService.delete(`/api/officers/${id}`);

    await fetchOfficer(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const useOfficer = () => {
  return {
    fetchOfficer,
    storeOfficer,
    updateOfficer,
    destroyOfficer,
    ...toRefs(state),
  };
};

export default useOfficer;
