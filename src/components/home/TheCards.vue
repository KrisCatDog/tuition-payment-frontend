<template>
  <div class="grid gap-4 mb-8 md:grid-cols-2 xl:grid-cols-3">
    <div
      class="flex items-center p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800"
    >
      <div
        class="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full dark:text-yellow-100 dark:bg-yellow-500"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"
          ></path>
        </svg>
      </div>
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          Total Siswa/i
        </p>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {{ totalStudent }}
        </p>
      </div>
    </div>

    <div
      class="flex items-center p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800"
    >
      <div
        class="p-3 mr-4 text-green-500 bg-green-100 rounded-full dark:text-green-100 dark:bg-green-500"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          Total Pembayaran Hari Ini
        </p>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {{ totalPaymentToday }}
        </p>
      </div>
    </div>

    <div
      class="flex items-center p-4 bg-white rounded-lg shadow-sm dark:bg-gray-800"
    >
      <div
        class="p-3 mr-4 text-blue-500 bg-blue-100 rounded-full dark:text-blue-100 dark:bg-blue-500"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <div>
        <p class="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          Total Pembayaran Keseluruhan
        </p>
        <p class="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {{ totalPaymentAll }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  async setup() {
    const store = useStore();

    await store.dispatch("home/fetchHome");

    return {
      totalStudent: computed(() => store.getters["home/getTotalStudent"]),
      totalPaymentToday: computed(
        () => store.getters["home/getTotalPaymentToday"]
      ),
      totalPaymentAll: computed(() => store.getters["home/getTotalPaymentAll"]),
    };
  },
};
</script>

<style>
</style>