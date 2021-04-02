<template>
  <tr
    v-for="student in students"
    :key="student.id"
    class="text-gray-700 dark:text-gray-400"
  >
    <td class="px-8 py-3 text-sm font-bold">{{ student.id }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ student.user.name }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ student.user.username }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ student.nisn }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ student.nis }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ student.address }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ student.telp_number }}</td>
    <td class="px-8 py-3 text-sm font-medium">
      {{ student.class.nama_kelas }}
    </td>
    <td class="px-8 py-3 text-sm font-medium">
      {{ student.class.major.name }}
    </td>
    <td class="px-8 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <router-link
          :to="{ name: 'StudentsEdit', params: { id: student.id } }"
          class="flex items-center justify-between px-1 py-1 text-sm font-medium leading-5 text-green-600 rounded-lg dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
            ></path>
          </svg>
        </router-link>
        <button
          @click.prevent="showDeleteModal(student)"
          class="flex items-center justify-between px-1 py-1 text-sm font-medium leading-5 text-red-600 rounded-lg dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          aria-label="Delete"
        >
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </td>
  </tr>

  <ClassicModal
    v-model="isDeleteModalOpen"
    title="Apakah anda yakin?"
    :description="'Anda akan menghapus data siswa dengan nama ' + formData.name"
    buttonText="Hapus"
    :onConfirm="handleDestroy"
    :isPending="isPending"
  />

  <AppModal
    v-model="isModalAlertOpen"
    title="Sukses!"
    :description="modalData.description"
    buttonText="OK"
    :modalIcon="modalData.modalIcon"
    :onConfirm="toggleModalAlert"
  />
</template>

<script>
import { reactive, ref } from "vue";
import useStudent from "@/composables/useStudent";
import ClassicModal from "@/components/ui/ClassicModal";
import AppModal from "@/components/ui/AppModal";

export default {
  components: {
    ClassicModal,
    AppModal,
  },
  async setup() {
    const {
      students,
      fetchStudent,
      destroyStudent,
      errors,
      isPending,
    } = useStudent();
    const isDeleteModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      id: "",
      name: "",
    });
    const modalData = reactive({
      description: "",
      modalIcon: "",
    });

    await fetchStudent(1, 10);

    function showDeleteModal(student) {
      isDeleteModalOpen.value = true;

      formData.id = student.id;
      formData.name = student.user.name;
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    async function handleDestroy() {
      await destroyStudent(formData.id);

      if (!errors.value) {
        modalData.description = "Data Siswa berhasil dihapus.";
        modalData.modalIcon = "success";

        isDeleteModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.tahun = "";
        formData.nominal = "";
      }
    }

    return {
      errors,
      students,
      formData,
      isPending,
      isDeleteModalOpen,
      handleDestroy,
      showDeleteModal,
      isModalAlertOpen,
      toggleModalAlert,
      modalData,
    };
  },
};
</script>
