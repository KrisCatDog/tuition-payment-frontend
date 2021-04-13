import app from "@/main";
import router from "@/router";
import ApiService from "@/services/api";
import { reactive, toRefs } from "vue";

const state = reactive({
  students: [],
  student: {},
  formattedStudents: [],
  paginationMeta: {},
  errors: {},
  isPending: false,
});

const fetchStudent = async (page, perPage = 15, search = "") => {
  state.isPending = true;

  try {
    const res = await ApiService.get(
      `/api/students?page=${page}&per_page=${perPage}&search=${search}`
    );

    state.students = res.data.data;
    state.formattedStudents = state.students.map((student) => {
      return { id: student.id, text: student.user.name };
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

const storeStudent = async (data) => {
  state.isPending = true;

  try {
    await ApiService.post(`/api/students`, data);

    await fetchStudent(1, 10);

    router.push({ name: "Students" });

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const showStudent = async (id) => {
  state.isPending = true;

  try {
    const res = await ApiService.get(`/api/students/${id}`);

    state.student = res.data.data;

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const updateStudent = async (data) => {
  state.isPending = true;

  try {
    await ApiService.put(`/api/students/${data.id}`, data);

    await fetchStudent(1, 10);

    router.push({ name: "Students" });

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const destroyStudent = async (id) => {
  state.isPending = true;

  try {
    await ApiService.delete(`/api/students/${id}`);

    await fetchStudent(1, 10);

    state.errors = null;
  } catch (e) {
    app.$Progress.fail();

    state.errors = e.response.data;
  }

  state.isPending = false;
};

const useStudent = () => {
  return {
    fetchStudent,
    storeStudent,
    updateStudent,
    destroyStudent,
    showStudent,
    ...toRefs(state),
  };
};

export default useStudent;
