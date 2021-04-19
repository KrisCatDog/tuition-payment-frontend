<template>
  <tr
    v-for="tuition in tuitions"
    :key="tuition.id"
    class="text-gray-700 dark:text-gray-400"
  >
    <td class="px-8 py-3 text-sm font-bold">{{ tuition.id }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ tuition.year }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ tuition.amount }}</td>
    <td class="px-8 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <EditButton :onClick="showEditModal.bind(this, tuition)" />
        <DeleteButton :onClick="showDeleteModal.bind(this, tuition)" />
      </div>
    </td>
  </tr>

  <tr class="text-gray-700 dark:text-gray-400" v-if="tuitions.length == 0">
    <td colspan="99" class="px-8 py-3 text-sm font-medium">
      Data biaya spp tidak di temukan.
    </td>
  </tr>

  <FormModal
    v-model="isEditModalOpen"
    title="Edit Data SPP"
    buttonText="Simpan"
    :onConfirm="handleUpdate"
    :onCancel="handleCancelForm"
    :isPending="isPending"
  >
    <InputGroup>
      <TheLabel target="year" label="Tahun" />
      <OutlineInput id="year" type="text" v-model="formData.year" />
      <InputError
        v-if="errors && errors.errors && errors.errors.year"
        :label="errors.errors.year[0]"
      />
    </InputGroup>

    <InputGroup>
      <TheLabel target="amount" label="Nominal" />
      <OutlineInput id="amount" type="text" v-model="formData.amount" />
      <InputError
        v-if="errors && errors.errors && errors.errors.amount"
        :label="errors.errors.amount[0]"
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
import useTuition from "@/composables/useTuition";
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
      tuitions,
      fetchTuition,
      updateTuition,
      destroyTuition,
      errors,
      isPending,
    } = useTuition();
    const isEditModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      id: "",
      year: "",
      amount: "",
    });
    const modalData = reactive({
      description: "",
      modalIcon: "",
    });

    await fetchTuition(1, 10);

    function showEditModal(tuition) {
      isEditModalOpen.value = true;

      formData.id = tuition.id;
      formData.year = tuition.year;
      formData.amount = tuition.amount;
    }

    function showDeleteModal(tuition) {
      isDeleteModalOpen.value = true;

      formData.id = tuition.id;
      formData.year = tuition.year;
      formData.amount = tuition.amount;
      modalData.description = `Apakah anda yakin ingin menghapus data spp tahun ${tuition.year} dengan nominal ${tuition.amount}? Data terkait akan terhapus secara permanen. Tindakan ini tidak bisa dibatalkan.`;
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    async function handleUpdate() {
      await updateTuition(formData);

      if (!errors.value) {
        modalData.description = "Data SPP berhasil diedit.";
        modalData.modalIcon = "success";

        isEditModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.year = "";
        formData.amount = "";
      }
    }

    async function handleDestroy() {
      await destroyTuition(formData.id);

      if (!errors.value) {
        modalData.description = "Data SPP berhasil dihapus.";
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
      tuitions,
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
