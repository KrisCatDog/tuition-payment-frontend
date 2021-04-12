<template>
  <AppLayout>
    <h2
      class="font-mulish my-8 text-3xl font-extrabold text-gray-700 dark:text-gray-200"
    >
      History Pembayaran
    </h2>

    <div class="mb-8 p-5 rounded-3xl shadow-xl bg-white dark:bg-gray-700">
      <div
        class="border dark:border-gray-700 w-full overflow-hidden rounded-lg"
      >
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-8 py-3">No</th>
                <th class="px-8 py-3">Nama Siswa</th>
                <th class="px-8 py-3">Nama Petugas</th>
                <th class="px-8 py-3">Jumlah Bayar</th>
                <th class="px-8 py-3">Di Bayar Tanggal</th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              <Suspense>
                <template #default> <TheList /> </template>

                <template #fallback>
                  <tr v-for="i in 5" :key="i" class="animate-pulse">
                    <td class="px-8 py-6 bg-white shadow-sm rounded-md mx-auto">
                      <div>
                        <div class="h-4 bg-green-400 rounded w-1/4"></div>
                      </div>
                    </td>
                    <td class="px-8 py-6 bg-white shadow-sm rounded-md mx-auto">
                      <div>
                        <div class="h-4 bg-green-400 rounded w-5/12"></div>
                      </div>
                    </td>
                    <td class="px-8 py-6 bg-white shadow-sm rounded-md mx-auto">
                      <div>
                        <div class="h-4 bg-green-400 rounded w-1/2"></div>
                      </div>
                    </td>
                    <td class="px-8 py-6 bg-white shadow-sm rounded-md mx-auto">
                      <div>
                        <div class="h-4 bg-green-400 rounded w-5/12"></div>
                      </div>
                    </td>
                  </tr>
                </template>
              </Suspense>
            </tbody>
          </table>
        </div>
        <div
          class="grid px-8 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
        >
          <span class="flex items-center col-span-3">
            Showing {{ paginationMeta.from }}-{{ paginationMeta.to }} of
            {{ paginationMeta.total }}
          </span>
          <span class="col-span-2"></span>
          <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul class="inline-flex items-center">
                <li>
                  <button
                    @click.prevent="
                      handleFetch(paginationMeta.current_page - 1)
                    "
                    :disabled="paginationMeta.current_page == 1"
                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    :class="{
                      'disabled:cursor-not-allowed':
                        paginationMeta.current_page == 1,
                    }"
                    aria-label="Previous"
                  >
                    <svg
                      class="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li v-for="(link, i) in paginationMeta.links" :key="i">
                  <button
                    @click.prevent="handleFetch(link.label)"
                    class="px-3 py-1 font-medium transition-colors duration-150 rounded-md focus:outline-none hover:bg-green-100"
                    :class="{
                      'text-white bg-green-600 border border-r-0 border-green-600 hover:bg-green-600':
                        link.active,
                    }"
                  >
                    {{ link.label }}
                  </button>
                </li>
                <li>
                  <button
                    @click.prevent="
                      handleFetch(paginationMeta.current_page + 1)
                    "
                    :disabled="
                      paginationMeta.current_page == paginationMeta.last_page
                    "
                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    :class="{
                      'disabled:cursor-not-allowed':
                        paginationMeta.current_page == paginationMeta.last_page,
                    }"
                    aria-label="Next"
                  >
                    <svg
                      class="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { defineAsyncComponent, onMounted, ref } from "vue";
import AppLayout from "@/components/layouts/AppLayout";
import usePayment from "@/composables/usePayment";

const TheList = defineAsyncComponent(() =>
  import("@/components/payment/TheList")
);

export default {
  title: "History Pembayaran",
  components: {
    AppLayout,
    TheList,
  },
  setup() {
    const { fetchPayment, paginationMeta, errors, isPending } = usePayment();
    const perPage = ref(10);
    const isModalOpen = ref(false);
    const isModalAlertOpen = ref(false);

    onMounted(async () => {
      await fetchPayment(1, perPage.value);
    });

    async function handleFetch(page) {
      await fetchPayment(page, perPage.value);
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
    };
  },
};
</script>