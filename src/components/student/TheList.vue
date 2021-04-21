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
    <td class="px-8 py-3 text-sm font-medium">{{ student.class.grade }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ student.class.code }}</td>
    <td class="px-8 py-3 text-sm font-medium">
      {{ student.class.major.name }}
    </td>
    <td class="px-8 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <EditButton :onClick="navigateToEdit.bind(this, student)" />
        <DeleteButton :onClick="showDeleteModal.bind(this, student)" />
      </div>
    </td>
  </tr>

  <tr class="text-gray-700 dark:text-gray-400" v-if="students.length == 0">
    <td colspan="99" class="px-8 py-3 text-sm font-medium">
      Data siswa tidak di temukan.
    </td>
  </tr>

  <ClassicModal
    v-model="isDeleteModalOpen"
    title="Apakah anda yakin?"
    :description="modalData.description"
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
import EditButton from "@/components/ui/EditButton";
import DeleteButton from "@/components/ui/DeleteButton";
import { useRouter } from "vue-router";

export default {
  components: {
    ClassicModal,
    AppModal,
    EditButton,
    DeleteButton,
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
    const router = useRouter();

    await fetchStudent(1, 10);

    function showDeleteModal(student) {
      isDeleteModalOpen.value = true;

      formData.id = student.id;
      formData.name = student.user.name;
      modalData.description = `Apakah anda yakin ingin menghapus data siswa ${student.user.name}? Data terkait akan terhapus secara permanen. Tindakan ini tidak bisa dibatalkan.`;
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
        formData.year = "";
        formData.amount = "";
      }
    }

    function navigateToEdit(student) {
      router.push({ name: "StudentsEdit", params: { id: student.id } });
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
      navigateToEdit,
    };
  },
};
</script>
