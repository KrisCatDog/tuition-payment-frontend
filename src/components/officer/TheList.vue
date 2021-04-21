<template>
  <tr
    v-for="officer in officers"
    :key="officer.id"
    class="text-gray-700 dark:text-gray-400"
  >
    <td class="px-8 py-3 text-sm font-bold">{{ officer.id }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ officer.name }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ officer.username }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ officer.role.name }}</td>
    <td class="px-8 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <EditButton :onClick="showEditModal.bind(this, officer)" />
        <DeleteButton :onClick="showDeleteModal.bind(this, officer)" />
      </div>
    </td>
  </tr>

  <tr class="text-gray-700 dark:text-gray-400" v-if="officers.length == 0">
    <td colspan="99" class="px-8 py-3 text-sm font-medium">
      Data petugas tidak di temukan.
    </td>
  </tr>

  <FormModal
    v-model="isEditModalOpen"
    title="Edit Data Petugas"
    buttonText="Simpan"
    :onConfirm="handleUpdate"
    :onCancel="handleCancelForm"
    :isPending="isPending"
  >
    <InputGroup>
      <TheLabel target="name" label="Nama" />
      <OutlineInput id="name" type="text" v-model="formData.name" />
      <InputError
        v-if="errors && errors.errors && errors.errors.name"
        :label="errors.errors.name[0]"
      />
    </InputGroup>

    <InputGroup>
      <TheLabel target="username" label="Username" />
      <OutlineInput id="username" type="text" v-model="formData.username" />
      <InputError
        v-if="errors && errors.errors && errors.errors.username"
        :label="errors.errors.username[0]"
      />
    </InputGroup>
  </FormModal>

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
import useOfficer from "@/composables/useOfficer";
import FormModal from "@/components/ui/FormModal";
import TheLabel from "@/components/ui/TheLabel";
import OutlineInput from "@/components/ui/OutlineInput";
import InputError from "@/components/ui/InputError";
import InputGroup from "@/components/ui/InputGroup";
import ClassicModal from "@/components/ui/ClassicModal";
import AppModal from "@/components/ui/AppModal";
import EditButton from "@/components/ui/EditButton";
import DeleteButton from "@/components/ui/DeleteButton";

export default {
  components: {
    OutlineInput,
    InputError,
    FormModal,
    TheLabel,
    InputGroup,
    ClassicModal,
    AppModal,
    EditButton,
    DeleteButton,
  },
  async setup() {
    const {
      officers,
      fetchOfficer,
      updateOfficer,
      destroyOfficer,
      errors,
      isPending,
    } = useOfficer();
    const isEditModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      id: "",
      name: "",
      username: "",
      password: "",
      password_confirmation: "",
    });
    const modalData = reactive({
      description: "",
      modalIcon: "",
    });

    await fetchOfficer(1, 10);

    function showEditModal(officer) {
      isEditModalOpen.value = true;

      formData.id = officer.id;
      formData.name = officer.name;
      formData.username = officer.username;
    }

    function showDeleteModal(officer) {
      isDeleteModalOpen.value = true;

      formData.id = officer.id;
      formData.name = officer.name;
      formData.username = officer.username;
      modalData.description = `Apakah anda yakin ingin menghapus data petugas ${officer.name}? Data terkait akan terhapus secara permanen. Tindakan ini tidak bisa dibatalkan.`;
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    async function handleUpdate() {
      await updateOfficer(formData);

      if (!errors.value) {
        modalData.description = "Data Petugas berhasil diedit.";
        modalData.modalIcon = "success";

        isEditModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.year = "";
        formData.amount = "";
      }
    }

    async function handleDestroy() {
      await destroyOfficer(formData.id);

      if (!errors.value) {
        modalData.description = "Data Petugas berhasil dihapus.";
        modalData.modalIcon = "success";

        isDeleteModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.year = "";
        formData.amount = "";
      }
    }

    function handleCancelForm() {
      errors.value = null;
    }

    return {
      errors,
      officers,
      formData,
      isEditModalOpen,
      showEditModal,
      handleUpdate,
      isPending,
      isDeleteModalOpen,
      handleDestroy,
      showDeleteModal,
      isModalAlertOpen,
      toggleModalAlert,
      modalData,
      handleCancelForm,
    };
  },
};
</script>
