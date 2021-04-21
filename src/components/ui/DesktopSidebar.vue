<template>
  <aside
    id="sidebar-desktop"
    class="z-20 hidden w-68 overflow-y-auto bg-white dark:bg-gray-800 md:block flex-shrink-0"
  >
    <div class="py-4 text-gray-500 dark:text-gray-400">
      <a
        class="inline-block ml-6 mt-4 text-2xl font-extrabold text-gray-700 dark:text-gray-200"
      >
        E-SPP
      </a>
      <ul class="mt-8">
        <li class="relative my-1 mx-4">
          <router-link
            class="px-5 py-3 rounded-xl inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-400"
            :to="{ name: 'Home' }"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span class="ml-4">Home</span>
          </router-link>
        </li>
      </ul>
      <ul>
        <li
          v-if="authUser.role.name === 'administrator'"
          class="relative my-1 mx-4"
        >
          <button
            class="px-5 py-3 rounded-xl inline-flex justify-between items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
            :class="{
              'bg-green-50 dark:bg-green-500 text-green-500 dark:text-green-100':
                $route.name == 'Majors' ||
                $route.name == 'Classes' ||
                $route.name == 'Students' ||
                $route.name == 'Officers' ||
                $route.name == 'Tuitions',
            }"
            @click="isSchoolMenuOpen = !isSchoolMenuOpen"
            aria-haspopup="true"
          >
            <span class="inline-flex items-center">
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                ></path>
              </svg>
              <span class="ml-4">Managemen Sekolah</span>
            </span>
            <svg
              class="w-4 h-4 transform ease-out duration-100"
              :class="{
                'rotate-0': isSchoolMenuOpen,
                '-rotate-90': !isSchoolMenuOpen,
              }"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <transition name="submenu-popout">
            <ul
              v-show="isSchoolMenuOpen"
              class="mx-2 p-2 mt-2 mb-4 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
              aria-label="submenu"
            >
              <li
                class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <router-link class="w-full" :to="{ name: 'Majors' }">
                  Jurusan
                </router-link>
              </li>
              <li
                class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <router-link class="w-full" :to="{ name: 'Classes' }">
                  Kelas
                </router-link>
              </li>
              <li
                class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <router-link class="w-full" :to="{ name: 'Students' }">
                  Siswa
                </router-link>
              </li>
              <li
                class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <router-link class="w-full" :to="{ name: 'Officers' }">
                  Petugas
                </router-link>
              </li>
              <li
                class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <router-link class="w-full" :to="{ name: 'Tuitions' }">
                  Biaya SPP
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
        <li class="relative my-1 mx-4">
          <button
            class="px-5 py-3 rounded-xl inline-flex justify-between items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
            :class="{
              'bg-green-50 dark:bg-green-500 text-green-500 dark:text-green-100':
                $route.name == 'PayTuition' || $route.name == 'Payments',
            }"
            @click="isPaymentMenuOpen = !isPaymentMenuOpen"
            aria-haspopup="true"
          >
            <span class="inline-flex items-center">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span class="ml-4">Pembayaran</span>
            </span>
            <svg
              class="w-4 h-4 transform ease-out duration-100"
              :class="{
                'rotate-0': isPaymentMenuOpen,
                '-rotate-90': !isPaymentMenuOpen,
              }"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <transition name="submenu-popout">
            <ul
              v-show="isPaymentMenuOpen"
              class="mx-2 p-2 mt-2 mb-4 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
              aria-label="submenu"
            >
              <li
                v-if="
                  authUser.role.name === 'administrator' ||
                  authUser.role.name === 'petugas'
                "
                class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <router-link class="w-full" :to="{ name: 'PayTuition' }">
                  Pembayaran SPP
                </router-link>
              </li>
              <li
                class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <router-link class="w-full" :to="{ name: 'PaymentHistory' }">
                  Data Pembayaran
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
        <li
          v-if="authUser.role.name === 'administrator'"
          class="relative my-1 mx-4"
        >
          <button
            class="px-5 py-3 rounded-xl inline-flex justify-between items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
            :class="{
              'bg-green-50 dark:bg-green-500 text-green-500 dark:text-green-100':
                $route.name == 'PaymentReports',
            }"
            @click="isReportMenuOpen = !isReportMenuOpen"
            aria-haspopup="true"
          >
            <span class="inline-flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="21 8 21 21 3 21 3 8"></polyline>
                <rect x="1" y="3" width="22" height="5"></rect>
                <line x1="10" y1="12" x2="14" y2="12"></line>
              </svg>
              <span class="ml-4">Laporan</span>
            </span>
            <svg
              class="w-4 h-4 transform ease-out duration-100"
              :class="{
                'rotate-0': isReportMenuOpen,
                '-rotate-90': !isReportMenuOpen,
              }"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <transition name="submenu-popout">
            <ul
              v-show="isReportMenuOpen"
              class="mx-2 p-2 mt-2 mb-4 space-y-2 overflow-hidden text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900"
              aria-label="submenu"
            >
              <li
                class="px-2 py-1 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <router-link class="w-full" :to="{ name: 'PaymentReports' }">
                  Laporan Pembayaran
                </router-link>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import useAuth from "@/composables/useAuth";

export default {
  setup() {
    const route = useRoute();
    const isSchoolMenuOpen = ref(false);
    const isPaymentMenuOpen = ref(false);
    const isReportMenuOpen = ref(false);
    const path = computed(() => route.name);
    const { authUser } = useAuth();

    switch (path.value) {
      case "Majors":
        isSchoolMenuOpen.value = true;
        break;
      case "Classes":
        isSchoolMenuOpen.value = true;
        break;
      case "Students":
        isSchoolMenuOpen.value = true;
        break;
      case "Officers":
        isSchoolMenuOpen.value = true;
        break;
      case "Tuitions":
        isSchoolMenuOpen.value = true;
        break;
      default:
        isSchoolMenuOpen.value = false;
        break;
    }

    switch (path.value) {
      case "PayTuition":
        isPaymentMenuOpen.value = true;
        break;
      case "PaymentHistory":
        isPaymentMenuOpen.value = true;
        break;
      default:
        isPaymentMenuOpen.value = false;
        break;
    }

    switch (path.value) {
      case "PaymentReports":
        isReportMenuOpen.value = true;
        break;
      default:
        isReportMenuOpen.value = false;
        break;
    }

    return {
      isSchoolMenuOpen,
      isPaymentMenuOpen,
      isReportMenuOpen,
      authUser,
    };
  },
};
</script>

<style lang="postcss" scoped>
#sidebar-desktop ul > li > .router-link-exact-active {
  @apply bg-green-50 dark:bg-green-500 text-green-500 dark:text-green-100;
}
#sidebar-desktop ul > li > ul > li > .router-link-exact-active {
  @apply bg-transparent text-green-500 !important;
}
.submenu-popout-enter-from {
  @apply opacity-25 max-h-0;
}
.submenu-popout-enter-active {
  @apply transition-all ease-linear duration-300;
}
.submenu-popout-enter-to {
  @apply opacity-100 max-h-96;
}
.submenu-popout-leave-from {
  @apply opacity-100 max-h-96;
}
.submenu-popout-leave-active {
  @apply transition-all ease-linear duration-300;
}
.submenu-popout-leave-to {
  @apply opacity-0 max-h-0;
}
</style>