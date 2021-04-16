<template>
  <AppLayout>
    <div class="flex justify-between items-center">
      <h2 class="my-8 text-3xl font-extrabold text-gray-700 dark:text-gray-200">
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
      class="mb-8 bg-white shadow overflow-hidden sm:rounded-lg"
    >
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Entri Transaksi Pembayaran
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">
          Halaman pembayaran SPP siswa.
        </p>
      </div>
      <div class="border-t border-gray-200">
        <dl>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Pilih Siswa</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <Select2
                class="font-medium"
                v-model="formData.student_id"
                :options="formattedStudents"
              />
              <InputError
                v-if="errors && errors.errors && errors.errors.student_id"
                :label="errors.errors.student_id[0]"
              />
            </dd>
          </div>
          <div
            class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Bulan Tagihan</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <select
                v-model="formData.bills_date"
                class="block w-full mt-1 text-sm rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              >
                <option selected value="" disabled>Pilih Bulan</option>
                <option
                  v-for="month in months"
                  :key="month.id"
                  :value="month.id"
                >
                  {{ month.name }}
                </option>
              </select>
              <InputError
                v-if="errors && errors.errors && errors.errors.bills_date"
                :label="errors.errors.bills_date[0]"
              />
            </dd>
          </div>
          <div
            class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Jumlah Bayar</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <OutlineInput
                id="amount_paid"
                type="text"
                v-model="formData.amount_paid"
              />
              <InputError
                v-if="errors && errors.errors && errors.errors.amount_paid"
                :label="errors.errors.amount_paid[0]"
              />
            </dd>
          </div>
        </dl>

        <div class="flex justify-end m-5">
          <BasicButton type="submit" :isSubmitted="isPending">
            Simpan
          </BasicButton>
        </div>
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
import InputError from "@/components/ui/InputError";
import AppModal from "@/components/ui/AppModal";
import usePayment from "@/composables/usePayment";

export default {
  title: "Tambah Data Siswa",
  components: {
    AppLayout,
    BasicButton,
    OutlineInput,
    InputError,
    AppModal,
  },
  setup() {
    const { fetchStudent, formattedStudents } = useStudent();
    const { storePayment, errors, isPending } = usePayment();
    const isModalAlertOpen = ref(false);
    const selectedMonth = ref("");
    const formData = reactive({
      student_id: "",
      amount_paid: "",
      bills_date: "",
    });
    const months = ref([
      { id: 1, name: "Januari" },
      { id: 2, name: "Februari" },
      { id: 3, name: "Maret" },
      { id: 4, name: "April" },
      { id: 5, name: "Mei" },
      { id: 6, name: "Juni" },
      { id: 7, name: "Juli" },
      { id: 8, name: "Agustus" },
      { id: 9, name: "September" },
      { id: 10, name: "Oktober" },
      { id: 11, name: "November" },
      { id: 12, name: "Desember" },
    ]);

    onMounted(async () => {
      await fetchStudent(1, 10000);
    });

    async function handleSubmit() {
      const data = {
        ...formData,
        bills_date:
          new Date().getFullYear() + "-" + formData.bills_date + "-" + "1",
      };

      console.log(data);

      await storePayment({
        ...formData,
        bills_date:
          new Date().getFullYear() + "-" + formData.bills_date + "-" + "1",
      });

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
      months,
      selectedMonth,
    };
  },
};
</script>