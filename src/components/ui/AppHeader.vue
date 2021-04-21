<template>
  <header class="z-10 py-4 bg-white shadow-md dark:bg-gray-800">
    <div
      class="container flex items-center justify-between md:justify-end h-full px-6 mx-auto text-green-600 dark:text-green-300"
    >
      <button
        class="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-green"
        @click="toggleSideMenu"
        aria-label="Menu"
      >
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <ul class="flex items-center flex-shrink-0 space-x-6">
        <li class="flex">
          <button
            class="rounded-md focus:outline-none focus:shadow-outline-green"
            @click="toggleTheme"
            aria-label="Toggle color mode"
          >
            <svg
              v-show="!isDark"
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"
              ></path>
            </svg>

            <svg
              v-show="isDark"
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </li>
        <li class="relative">
          <button
            class="align-middle rounded-full focus:shadow-outline-green focus:outline-none"
            @click="toggleProfileMenu"
            @keydown.escape="closeProfileMenu"
            aria-label="Account"
            aria-haspopup="true"
          >
            <img
              class="object-cover w-8 h-8 rounded-full"
              src="@/assets/img/user-hero-blue.png"
              alt=""
              aria-hidden="true"
            />
          </button>
          <transition name="menu">
            <ul
              v-show="isProfileMenuOpen"
              @click.prevent="closeProfileMenu"
              @keydown.escape="closeProfileMenu"
              class="absolute right-0 w-56 p-2 mt-2 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md dark:border-gray-700 dark:text-gray-300 dark:bg-gray-700"
              aria-label="submenu"
            >
              <li>
                <div class="w-full px-2 py-1 font-semibold rounded-md">
                  {{ authUser.name }}
                </div>
              </li>
              <hr />
              <li class="flex">
                <button
                  class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200 focus:outline-none"
                  @click="logout"
                >
                  <svg
                    class="w-4 h-4 mr-3"
                    aria-hidden="true"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                    ></path>
                  </svg>
                  <span>Log out</span>
                </button>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";
import useLogin from "@/composables/useLogin";
import useAuth from "@/composables/useAuth";
export default {
  props: {
    toggleSideMenu: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const isProfileMenuOpen = ref(false);
    const isDark = ref(false);
    const { logout } = useLogin();
    const { authUser } = useAuth();

    return {
      isProfileMenuOpen,
      isDark,
      logout,
      authUser,
      toggleProfileMenu() {
        isProfileMenuOpen.value = !isProfileMenuOpen.value;
      },
      closeProfileMenu() {
        isProfileMenuOpen.value = false;
      },
      toggleTheme() {
        isDark.value = !isDark.value;
        document.getElementsByTagName("html")[0].classList.toggle("dark");
      },
    };
  },
};
</script>

<style lang="postcss" scoped>
.menu-enter-from {
  @apply opacity-25;
}
.menu-enter-active {
  @apply transition-all ease-linear duration-150;
}
.menu-enter-to {
  @apply opacity-100;
}
.menu-leave-from {
  @apply opacity-100;
}
.menu-leave-active {
  @apply transition ease-in duration-150;
}
.menu-leave-to {
  @apply opacity-0;
}
</style>