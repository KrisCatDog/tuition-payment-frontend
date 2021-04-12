<template>
  <AppLayout>
    <div class="flex justify-between items-center">
      <h2
        class="font-mulish my-8 text-3xl font-extrabold text-gray-700 dark:text-gray-200"
      >
        Pembayaran SPP
      </h2>
    </div>

    <AppModal
      v-model="isModalAlertOpen"
      title="Sukses!"
      description="SPP berhasil di bayar."
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
          <TheLabel target="student_id" label="Pilih Siswa" />
          <Select2
            class="mt-2 font-medium"
            v-model="formData.student_id"
            :options="formattedStudents"
          />
          <InputError
            v-if="errors && errors.errors && errors.errors.student_id"
            :label="errors.errors.student_id[0]"
          />
        </InputGroup>
        <InputGroup class="w-1/2">
          <TheLabel target="amount_paid" label="Jumlah Bayar" />
          <OutlineInput
            id="amount_paid"
            type="text"
            v-model="formData.amount_paid"
          />
          <InputError
            v-if="errors && errors.errors && errors.errors.amount_paid"
            :label="errors.errors.amount_paid[0]"
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
import AppModal from "@/components/ui/AppModal";
import usePayment from "@/composables/usePayment";

export default {
  title: "Tambah Data Siswa",
  components: {
    AppLayout,
    BasicButton,
    OutlineInput,
    TheLabel,
    InputError,
    InputGroup,
    AppModal,
  },
  setup() {
    const { fetchStudent, formattedStudents } = useStudent();
    const { storePayment, errors, isPending } = usePayment();
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      student_id: "",
      amount_paid: "",
    });

    onMounted(async () => {
      await fetchStudent(1, 10000);
    });

    async function handleSubmit() {
      await storePayment(formData);

      if (!errors.value) {
        isModalAlertOpen.value = true;

        formData.student_id = "";
        formData.amount_paid = "";
      }
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    return {
      formData,
      errors,
      handleSubmit,
      isPending,
      isModalAlertOpen,
      toggleModalAlert,
      formattedStudents,
    };
  },
};
</script>