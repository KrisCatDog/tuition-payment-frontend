<template>
  <AppLayout>
    <h2 class="my-8 text-3xl font-extrabold text-gray-700 dark:text-gray-200">
      Laporan Pembayaran
    </h2>

    <div class="mb-8 p-5 rounded-3xl shadow-xl bg-white dark:bg-gray-700">
      <div class="flex space-x-4">
        <InputGroup class="w-1/2">
          <TheLabel label="Dari Tanggal" target="start-date" />
          <input
            v-model="formData.start_date"
            id="start-date"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </InputGroup>
        <InputGroup class="w-1/2">
          <TheLabel label="Sampai Tanggal" target="end-date" />
          <input
            v-model="formData.end_date"
            id="end-date"
            type="date"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-300 focus:ring focus:ring-green-200 focus:ring-opacity-50"
          />
        </InputGroup>
      </div>

      <div class="flex justify-end space-x-2">
        <a :href="exportURL">
          <BasicButton type="button">Export Excel</BasicButton>
        </a>
        <BasicButton type="button">Export PDF</BasicButton>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { computed, onMounted, reactive, ref } from "vue";
import AppLayout from "@/components/layouts/AppLayout";
import usePayment from "@/composables/usePayment";
import InputGroup from "@/components/ui/InputGroup";
import TheLabel from "@/components/ui/TheLabel";
import BasicButton from "@/components/ui/BasicButton.vue";

export default {
  title: "Laporan Pembayaran",
  components: {
    AppLayout,
    TheLabel,
    InputGroup,
    BasicButton,
  },
  setup() {
    const { fetchPayment, paginationMeta, errors, isPending } = usePayment();
    const perPage = ref(10);
    const isModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      start_date: null,
      end_date: null,
    });
    const exportURL = computed(
      () =>
        `${process.env.VUE_APP_API_ORIGIN}/api/payments/export?start_date=${formData.start_date}&end_date=${formData.end_date}`
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
      exportURL,
      formData,
    };
  },
};
</script>