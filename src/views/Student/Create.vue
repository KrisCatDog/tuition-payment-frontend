<template>
  <AppLayout>
    <div class="flex justify-between items-center">
      <h2
        class="font-mulish my-8 text-3xl font-extrabold text-gray-700 dark:text-gray-200"
      >
        Tambah Data Siswa
      </h2>
    </div>

    <AppModal
      v-model="isModalAlertOpen"
      title="Sukses!"
      description="Data Siswa berhasil di tambahkan."
      buttonText="OK"
      modalIcon="success"
      :onConfirm="toggleModalAlert"
    />

    <form
      @submit.prevent="handleSubmit"
      class="mb-8 px-8 py-5 rounded-3xl shadow-xl bg-white dark:bg-gray-700 overflow-x-hidden"
    >
      <div class="mt-2 flex space-x-8">
        <InputGroup class="w-1/2">
          <TheLabel target="name" label="Nama" />
          <OutlineInput id="name" type="text" v-model="formData.name" />
          <InputError
            v-if="errors && errors.errors && errors.errors.name"
            :label="errors.errors.name[0]"
          />
        </InputGroup>
        <InputGroup class="w-1/2">
          <TheLabel target="username" label="Username" />
          <OutlineInput id="username" type="text" v-model="formData.username" />
          <InputError
            v-if="errors && errors.errors && errors.errors.username"
            :label="errors.errors.username[0]"
          />
        </InputGroup>
      </div>
      <div class="mt-2 flex space-x-8">
        <InputGroup class="w-1/2">
          <TheLabel target="password" label="Password" />
          <OutlineInput
            id="password"
            type="password"
            v-model="formData.password"
          />
          <InputError
            v-if="errors && errors.errors && errors.errors.password"
            :label="errors.errors.password[0]"
          />
        </InputGroup>
        <InputGroup class="w-1/2">
          <TheLabel
            target="password_confirmation"
            label="Konfirmasi Password"
          />
          <OutlineInput
            id="password_confirmation"
            type="password"
            v-model="formData.password_confirmation"
          />
          <InputError
            v-if="
              errors && errors.errors && errors.errors.password_confirmation
            "
            :label="errors.errors.password_confirmation[0]"
          />
        </InputGroup>
      </div>
      <div class="mt-2 flex space-x-8">
        <InputGroup class="w-1/2">
          <TheLabel target="class_id" label="Pilih Kelas" />
          <Select2
            class="mt-2 font-medium"
            v-model="formData.class_id"
            :options="formattedClasses"
          />
          <InputError
            v-if="errors && errors.errors && errors.errors.class_id"
            :label="errors.errors.class_id[0]"
          />
        </InputGroup>
        <InputGroup class="w-1/2">
          <TheLabel target="tuition_id" label="Pilih Biaya SPP" />
          <Select2
            class="mt-2 font-medium"
            v-model="formData.tuition_id"
            :options="formattedTuitions"
          />
          <InputError
            v-if="errors && errors.errors && errors.errors.tuition_id"
            :label="errors.errors.tuition_id[0]"
          />
        </InputGroup>
      </div>
      <div class="mt-2 flex space-x-8">
        <InputGroup class="w-1/2">
          <TheLabel target="nisn" label="NISN" />
          <OutlineInput id="nisn" type="text" v-model="formData.nisn" />
          <InputError
            v-if="errors && errors.errors && errors.errors.nisn"
            :label="errors.errors.nisn[0]"
          />
        </InputGroup>
        <InputGroup class="w-1/2">
          <TheLabel target="nis" label="NIS" />
          <OutlineInput id="nis" type="text" v-model="formData.nis" />
          <InputError
            v-if="errors && errors.errors && errors.errors.nis"
            :label="errors.errors.nis[0]"
          />
        </InputGroup>
      </div>
      <div class="mt-2 flex space-x-8">
        <InputGroup class="w-1/2">
          <TheLabel target="alamat" label="Alamat" />
          <OutlineTextarea
            rows="4"
            id="alamat"
            type="text"
            v-model="formData.alamat"
          />
          <InputError
            v-if="errors && errors.errors && errors.errors.alamat"
            :label="errors.errors.alamat[0]"
          />
        </InputGroup>
        <InputGroup class="w-1/2">
          <TheLabel target="no_telp" label="No Telepon" />
          <OutlineInput id="no_telp" type="text" v-model="formData.no_telp" />
          <InputError
            v-if="errors && errors.errors && errors.errors.no_telp"
            :label="errors.errors.no_telp[0]"
          />
        </InputGroup>
      </div>
      <div class="flex justify-end">
        <BasicButton type="submit" :isSubmitted="isPending">
          Submit
        </BasicButton>
      </div>
    </form>
  </AppLayout>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import AppLayout from "@/components/layouts/AppLayout";
import BasicButton from "@/components/ui/BasicButton";
import useStudent from "@/composables/useStudent";
import OutlineInput from "@/components/ui/OutlineInput";
import TheLabel from "@/components/ui/TheLabel";
import InputError from "@/components/ui/InputError";
import InputGroup from "@/components/ui/InputGroup";
import OutlineTextarea from "@/components/ui/OutlineTextarea";
import useTuition from "@/composables/useTuition";
import useClass from "@/composables/useClass";

export default {
  title: "Tambah Data Siswa",
  components: {
    AppLayout,
    BasicButton,
    OutlineInput,
    TheLabel,
    InputError,
    InputGroup,
    OutlineTextarea,
  },
  setup() {
    const { fetchTuition, formattedTuitions } = useTuition();
    const { fetchClass, formattedClasses } = useClass();
    const { storeStudent, paginationMeta, errors, isPending } = useStudent();
    const isModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      name: "",
      username: "",
      password: "",
      password_confirmation: "",
      class_id: "",
      tuition_id: "",
      nisn: "",
      nis: "",
      no_telp: "",
      alamat: "",
    });

    onMounted(async () => {
      await fetchTuition(1, 10000);
      await fetchClass(1, 10000);
    });

    async function handleSubmit() {
      await storeStudent(formData);

      if (!errors.value) {
        isModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.name = "";
        formData.username = "";
        formData.password = "";
        formData.password_confirmation = "";
        formData.class_id = "";
        formData.tuition_id = "";
        formData.nisn = "";
        formData.nis = "";
        formData.no_telp = "";
        formData.alamat = "";
      }
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    return {
      paginationMeta,
      isModalOpen,
      formData,
      errors,
      handleSubmit,
      isPending,
      isModalAlertOpen,
      toggleModalAlert,
      formattedTuitions,
      formattedClasses,
    };
  },
};
</script>