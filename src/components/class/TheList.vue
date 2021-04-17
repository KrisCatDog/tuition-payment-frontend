<template>
  <tr
    v-for="iclass in classes"
    :key="iclass.id"
    class="text-gray-700 dark:text-gray-400"
  >
    <td class="px-8 py-3 text-sm font-bold">{{ iclass.id }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ iclass.grade }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ iclass.code }}</td>
    <td class="px-8 py-3 text-sm font-medium">
      {{ iclass.major.name }}
    </td>
    <td class="px-8 py-3">
      <div class="flex items-center space-x-4 text-sm">
        <EditButton :onClick="showEditModal.bind(this, iclass)" />
        <DeleteButton :onClick="showDeleteModal.bind(this, iclass)" />
      </div>
    </td>
  </tr>

  <tr class="text-gray-700 dark:text-gray-400" v-if="classes.length == 0">
    <td colspan="99" class="px-8 py-3 text-sm font-medium">
      Data kelas tidak di temukan.
    </td>
  </tr>

  <FormModal
    v-model="isEditModalOpen"
    title="Edit Data Kelas"
    buttonText="Simpan"
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
      <TheLabel target="grade" label="Tingkatan Kelas" />
      <OutlineInput id="grade" type="text" v-model="formData.grade" />
      <InputError
        v-if="errors && errors.errors && errors.errors.grade"
        :label="errors.errors.grade[0]"
      />
    </InputGroup>

    <InputGroup>
      <TheLabel target="code" label="Nomor Kelas" />
      <OutlineInput id="code" type="text" v-model="formData.code" />
      <InputError
        v-if="errors && errors.errors && errors.errors.code"
        :label="errors.errors.code[0]"
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
import useClass from "@/composables/useClass";
import FormModal from "@/components/ui/FormModal";
import TheLabel from "@/components/ui/TheLabel";
import OutlineInput from "@/components/ui/OutlineInput";
import InputError from "@/components/ui/InputError";
import InputGroup from "@/components/ui/InputGroup";
import ClassicModal from "@/components/ui/ClassicModal";
import AppModal from "@/components/ui/AppModal";
import useMajor from "@/composables/useMajor";
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
      grade: "",
      code: "",
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
      formData.grade = iclass.grade;
      formData.code = iclass.code;
    }

    function showDeleteModal(iclass) {
      isDeleteModalOpen.value = true;

      formData.id = iclass.id;
      modalData.description = `Apakah anda yakin ingin menghapus data kelas ${iclass.grade} ${iclass.major.name} ${iclass.code}? Data terkait akan terhapus secara permanen. Tindakan ini tidak bisa dibatalkan.`;
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
