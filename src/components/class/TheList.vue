<template>
  <tr
    v-for="iclass in classes"
    :key="iclass.id"
    class="text-gray-700 dark:text-gray-400"
  >
    <td class="px-8 py-3 text-sm font-bold">{{ iclass.id }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ iclass.nama_kelas }}</td>
    <td class="px-8 py-3 text-sm font-medium">
      {{ iclass.major.kompetensi_keahlian }}
    </td>
    <td class="px-8 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <button
          @click.prevent="showEditModal(iclass)"
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
          @click.prevent="showDeleteModal(iclass)"
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

  <FormModal
    v-model="isEditModalOpen"
    title="Edit Data Kelas"
    buttonText="Submit"
    :onConfirm="handleUpdate"
    :isPending="isPending"
  >
    <InputGroup>
      <TheLabel target="major" label="Pilih Jurusan" />
      <Select2
        class="mt-2 font-medium"
        v-model="formData.major_id"
        :options="formattedMajors"
      />
      <InputError
        v-if="errors && errors.errors && errors.errors.major_id"
        :label="errors.errors.major_id[0]"
      />
    </InputGroup>

    <InputGroup>
      <TheLabel target="nama-kelas" label="Nama Kelas" />
      <OutlineInput id="nama-kelas" type="text" v-model="formData.nama_kelas" />
      <InputError
        v-if="errors && errors.errors && errors.errors.nama_kelas"
        :label="errors.errors.nama_kelas[0]"
      />
    </InputGroup>
  </FormModal>

  <ClassicModal
    v-model="isDeleteModalOpen"
    title="Apakah anda yakin?"
    :description="'Anda akan menghapus data kelas ' + formData.nama_kelas"
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
import useClass from "@/composables/useClass";
import FormModal from "@/components/ui/FormModal";
import TheLabel from "@/components/ui/TheLabel";
import OutlineInput from "@/components/ui/OutlineInput";
import InputError from "@/components/ui/InputError";
import InputGroup from "@/components/ui/InputGroup";
import ClassicModal from "@/components/ui/ClassicModal";
import AppModal from "@/components/ui/AppModal";
import useMajor from "@/composables/useMajor";

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
      classes,
      fetchClass,
      updateClass,
      destroyClass,
      errors,
      isPending,
    } = useClass();
    const { formattedMajors } = useMajor();
    const isEditModalOpen = ref(false);
    const isDeleteModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      id: "",
      major_id: "",
      nama_kelas: "",
    });
    const modalData = reactive({
      description: "",
      modalIcon: "",
    });

    await fetchClass(1, 10);

    function showEditModal(iclass) {
      isEditModalOpen.value = true;

      formData.id = iclass.id;
      formData.major_id = iclass.major.id;
      formData.nama_kelas = iclass.nama_kelas;
    }

    function showDeleteModal(iclass) {
      isDeleteModalOpen.value = true;

      formData.id = iclass.id;
      formData.major_id = iclass.major.id;
      formData.nama_kelas = iclass.nama_kelas;
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    async function handleUpdate() {
      await updateClass(formData);

      if (!errors.value) {
        modalData.description = "Data Kelas berhasil diedit.";
        modalData.modalIcon = "success";

        isEditModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.major_id = "";
        formData.nama_kelas = "";
      }
    }

    async function handleDestroy() {
      await destroyClass(formData.id);

      if (!errors.value) {
        modalData.description = "Data Kelas berhasil dihapus.";
        modalData.modalIcon = "success";

        isDeleteModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.id = "";
        formData.major_id = "";
        formData.nama_kelas = "";
      }
    }

    return {
      errors,
      classes,
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
      formattedMajors,
    };
  },
};
</script>
