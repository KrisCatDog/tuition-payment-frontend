<template>
  <tr
    v-for="major in majors"
    :key="major.id"
    class="text-gray-700 dark:text-gray-400"
  >
    <td class="px-8 py-3 text-sm font-bold">{{ major.id }}</td>
    <td class="px-8 py-3 text-sm font-medium">
      {{ major.name }}
    </td>
    <td class="px-8 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <EditButton :onClick="showEditModal.bind(this, major)" />
        <DeleteButton :onClick="showDeleteModal.bind(this, major)" />
      </div>
    </td>
  </tr>

  <tr class="text-gray-700 dark:text-gray-400" v-if="majors.length == 0">
    <td colspan="99" class="px-8 py-3 text-sm font-medium">
      Data jurusan tidak di temukan.
    </td>
  </tr>

  <FormModal
    v-model="isEditModalOpen"
    title="Edit Data Jurusan"
    buttonText="Simpan"
    :onConfirm="handleUpdate"
    :isPending="isPending"
  >
    <InputGroup>
      <TheLabel target="kompetensi-keahlian" label="Kompetensi Keahlian" />
      <OutlineInput
        id="kompetensi-keahlian"
        type="text"
        v-model="formData.name"
      />
      <InputError
        v-if="errors && errors.errors && errors.errors.name"
        :label="errors.errors.name[0]"
      />
    </InputGroup>
  </FormModal>

  <ClassicModal
    title="Apakah anda yakin?"
    :description="'Anda akan menghapus data jurusan ' + formData.name"
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

  <ClassicModal
    v-model="isDeleteModalOpen"
    title="Apakah anda yakin?"
    :description="modalData.description"
    buttonText="Hapus"
    :onConfirm="handleDestroy"
    :isPending="isPending"
  />
</template>

<script>
import { reactive, ref } from "vue";
import useMajor from "@/composables/useMajor";
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
      majors,
      fetchMajor,
      updateMajor,
      destroyMajor,
      errors,
      isPending,
    } = useMajor();
    const isEditModalOpen = ref(false);
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

    await fetchMajor(1, 10);

    function showEditModal(major) {
      isEditModalOpen.value = true;

      formData.id = major.id;
      formData.name = major.name;
    }

    function showDeleteModal(major) {
      isDeleteModalOpen.value = true;

      formData.id = major.id;
      formData.name = major.name;
      modalData.description = `Apakah anda yakin ingin menghapus data jurusan ${major.name}? Data terkait akan terhapus secara permanen. Tindakan ini tidak bisa dibatalkan.`;
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    async function handleUpdate() {
      await updateMajor(formData);

      if (!errors.value) {
        modalData.description = "Data SPP berhasil diedit.";
        modalData.modalIcon = "success";

        isEditModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.name = "";
      }
    }

    async function handleDestroy() {
      await destroyMajor(formData.id);

      if (!errors.value) {
        modalData.description = "Data SPP berhasil dihapus.";
        modalData.modalIcon = "success";

        isDeleteModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.name = "";
      }
    }

    return {
      errors,
      majors,
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
    };
  },
};
</script>

