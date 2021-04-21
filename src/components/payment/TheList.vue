<template>
  <tr
    v-for="payment in payments"
    :key="payment.id"
    class="text-gray-700 dark:text-gray-400"
  >
    <td class="px-8 py-3 text-sm font-bold">{{ payment.id }}</td>
    <td class="px-8 py-3 text-sm font-medium">
      {{ payment.student.user.name }}
    </td>
    <td class="px-8 py-3 text-sm font-medium">
      {{ payment.officer.name }}
    </td>
    <td class="px-8 py-3 text-sm font-medium">{{ payment.bills_date }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ payment.amount_paid }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ payment.paid_on }}</td>
    <td class="px-8 py-3 text-sm font-medium">{{ payment.paid_at }}</td>
  </tr>

  <tr class="text-gray-700 dark:text-gray-400" v-if="payments.length == 0">
    <td colspan="99" class="px-8 py-3 text-sm font-medium">
      Data transaksi pembayaran spp tidak di temukan.
    </td>
  </tr>
</template>

<script>
import { reactive, ref } from "vue";
import usePayment from "@/composables/usePayment";

export default {
  async setup() {
    const { payments, fetchPayment, errors, isPending } = usePayment();
    const isDeleteModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const modalData = reactive({
      description: "",
      modalIcon: "",
    });

    await fetchPayment(1, 10);

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    return {
      errors,
      payments,
      isPending,
      isDeleteModalOpen,
      isModalAlertOpen,
      toggleModalAlert,
      modalData,
    };
  },
};
</script>
