import { ref } from "vue";
import ApiService from "@/services/api";

const errors = ref({});
const authUser = ref({});

const isLoggedIn = async () => {
  try {
    const res = await ApiService.get("/api/user");

    errors.value = null;
    authUser.value = res.data.data;

    return true;
  } catch (e) {
    errors.value = e.response.data;

    if (e.response.status === 401) {
      return false;
    }
  }
};

const useAuth = () => {
  return { isLoggedIn, errors, authUser };
};

export default useAuth;
