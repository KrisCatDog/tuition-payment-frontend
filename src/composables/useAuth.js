import { ref } from "vue";
import ApiService from "@/services/api";

const errors = ref({});

const isLoggedIn = async () => {
  try {
    await ApiService.get("/api/user");

    errors.value = null;

    return true;
  } catch (e) {
    errors.value = e.response.data;

    if (e.response.status === 401) {
      return false;
    }
  }
};

const useAuth = () => {
  return { isLoggedIn, errors };
};

export default useAuth;
