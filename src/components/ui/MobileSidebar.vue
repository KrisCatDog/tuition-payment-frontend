<template>
  <transition name="sidebar-popout">
    <aside
      id="sidebar-mobile"
      class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 md:hidden"
      v-show="isVisible"
    >
      <div class="py-4 text-gray-500 dark:text-gray-400">
        <a
          class="font-mulish inline-block ml-6 mt-5 text-xl font-extrabold text-gray-800 dark:text-gray-200"
        >
          SPP App
        </a>
        <ul class="mt-8">
          <li class="relative my-1 mx-4">
            <router-link
              class="px-5 py-3 rounded-xl inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
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
              <span class="ml-4">Dashboard</span>
            </router-link>
          </li>
        </ul>
        <ul>
          <li class="relative my-1 mx-4">
            <router-link
              class="px-5 py-3 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              :to="{ name: 'Login' }"
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                ></path>
              </svg>
              <span class="ml-4">Data SPP</span>
            </router-link>
          </li>
          <li class="relative my-1 mx-4">
            <router-link
              class="px-5 py-3 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              :to="{ name: 'Login' }"
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                ></path>
              </svg>
              <span class="ml-4">Data Kelas</span>
            </router-link>
          </li>
        </ul>
        <div class="px-6 my-6">
          <button
            class="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
          >
            Administrator
            <span class="ml-2" aria-hidden="true">+</span>
          </button>
        </div>
      </div>
    </aside>
  </transition>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
#sidebar-mobile .router-link-exact-active {
  @apply bg-green-50 text-green-500;
}
.sidebar-popout-enter-from,
.sidebar-popout-leave-to {
  @apply opacity-0 transform -translate-x-20;
}
.sidebar-popout-enter-active {
  @apply transition ease-in-out duration-150;
}
.sidebar-popout-enter-to {
  @apply opacity-100;
}
.sidebar-popout-leave-from {
  @apply opacity-100;
}
.sidebar-popout-leave-active {
  @apply transition ease-in duration-150;
}
</style>