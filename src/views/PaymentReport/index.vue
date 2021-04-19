<template>
  <AppLayout>
    <h2 class="my-8 text-3xl font-extrabold text-gray-700 dark:text-gray-200">
      Laporan Pembayaran
    </h2>

    <div
      class="mb-8 bg-white dark:bg-gray-700 shadow overflow-hidden sm:rounded-lg"
    >
      <div class="px-4 py-5 sm:px-6">
        <h3
          class="text-lg leading-6 font-medium text-gray-900 dark:text-gray-100"
        >
          Generate Laporan
        </h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-300">
          Halaman generate laporan pembayaran SPP.
        </p>
      </div>
      <div class="border-t border-gray-200 dark:border-gray-600">
        <dl>
          <div
            class="bg-gray-50 dark:bg-gray-800 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-100">
              Dari Tanggal
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                v-model="formData.start_date"
                id="start-date"
                type="date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 dark:text-white dark:bg-gray-600 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </dd>
          </div>
          <div
            class="bg-white dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500 dark:text-gray-100">
              Sampai Tanggal
            </dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <input
                v-model="formData.end_date"
                id="end-date"
                type="date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 dark:text-white dark:bg-gray-600 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              />
            </dd>
          </div>
        </dl>

        <div class="flex justify-end m-5 space-x-2">
          <a :href="exportExcelURL">
            <BasicButton type="button">Export Excel</BasicButton>
          </a>
          <a :href="exportPDFURL">
            <BasicButton type="button">Export PDF</BasicButton>
          </a>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import AppLayout from "@/components/layouts/AppLayout";
import usePayment from "@/composables/usePayment";
import BasicButton from "@/components/ui/BasicButton.vue";

export default {
  title: "Laporan Pembayaran",
  components: {
    AppLayout,
    BasicButton,
  },
  setup() {
    const { fetchPayment, paginationMeta, errors, isPending } = usePayment();
    const perPage = ref(10);
    const isModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      start_date: "",
      end_date: "",
    });
    const exportExcelURL = computed(
      () =>
        `${process.env.VUE_APP_API_ORIGIN}/api/payments/export?start_date=${formData.start_date}&end_date=${formData.end_date}`
    );
    const exportPDFURL = computed(
      () =>
        `${process.env.VUE_APP_API_ORIGIN}/api/payments/exportpdf?start_date=${formData.start_date}&end_date=${formData.end_date}`
    );

    onMounted(async () => {
      await fetchPayment(1, perPage.value);
    });

    async function handleFetch(page, search = "") {
      await fetchPayment(page, perPage.value, search);
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    return {
      paginationMeta,
      handleFetch,
      isModalOpen,
      errors,
      isPending,
      isModalAlertOpen,
      toggleModalAlert,
      exportExcelURL,
      formData,
      exportPDFURL,
    };
  },
};
</script>