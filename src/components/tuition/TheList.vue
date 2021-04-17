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
        <button
          @click.prevent="showEditModal(tuition)"
          class="flex items-center justify-between px-1 py-1 text-sm font-medium leading-5 text-green-600 rounded-lg dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          aria-label="Edit"
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
        </button>
        <button
          @click.prevent="showDeleteModal(tuition)"
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

export default {
  components: {
    OutlineInput,
    InputError,
    FormModal,
    TheLabel,
    InputGroup,
    ClassicModal,
    AppModal,
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
