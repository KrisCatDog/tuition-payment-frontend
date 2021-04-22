<template>
  <tr
    v-for="payment in todayPayments"
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

  <tr class="text-gray-700 dark:text-gray-400" v-if="todayPayments.length == 0">
    <td colspan="99" class="px-8 py-3 text-sm font-medium">
      Data transaksi pembayaran spp tidak di temukan.
    </td>
  </tr>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  async setup() {
    const store = useStore();

    await store.dispatch("home/fetchTodayPayment");

    return {
      todayPayments: computed(() => store.getters["home/getTodayPayments"]),
    };
  },
};
</script>
