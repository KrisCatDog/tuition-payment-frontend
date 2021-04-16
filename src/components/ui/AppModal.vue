<template>
  <transition name="backdrop-fade">
    <div
      v-show="modelValue"
      @click.self="$emit('update:modelValue', false)"
      class="fixed inset-0 z-30 flex bg-black bg-opacity-50 items-center justify-center"
    >
      <transition name="modal-popout">
        <div
          v-show="modelValue"
          class="w-11/12 px-6 py-4 overflow-hidden bg-white dark:bg-gray-800 rounded-lg sm:m-4 sm:max-w-xl"
        >
          <header class="flex justify-center -mx-6 -my-4 px-6 py-4 bg-gray-50">
            <h4 class="text-xl text-gray-800 font-extrabold">E-SPP</h4>
          </header>
          <div class="my-8 text-center flex flex-col items-center">
            <svg
              v-show="modalIcon == 'success'"
              class="stroke-current text-green-400 w-40 h-40 mb-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>

            <svg
              v-show="modalIcon == 'warning'"
              class="stroke-current text-yellow-400 w-40 h-40 mb-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <polygon
                points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"
              ></polygon>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>

            <svg
              v-show="modalIcon == 'error'"
              class="stroke-current text-red-400 w-40 h-40 mb-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="9" y1="9" x2="15" y2="15"></line>
              <line x1="15" y1="9" x2="9" y2="15"></line>
            </svg>

            <p class="mb-2 text-xl font-bold text-gray-700 dark:text-gray-300">
              {{ title }}
            </p>
            <p class="text-sm font-medium text-gray-700 dark:text-gray-400">
              {{ description }}
            </p>
          </div>
          <footer
            class="flex flex-row items-center justify-center px-6 py-3 -mx-6 -mb-4 space-y-4 sm:space-y-0 sm:space-x-3 bg-gray-50 dark:bg-gray-800"
          >
            <BasicButton type="button" @click.prevent="onConfirm">
              {{ buttonText }}
            </BasicButton>
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import BasicButton from "@/components/ui/BasicButton";

export default {
  components: { BasicButton },
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      required: true,
    },
    modalIcon: {
      type: String,
      required: true,
    },
    onConfirm: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style lang="postcss" scoped>
.backdrop-fade-enter-from,
.backdrop-fade-leave-to {
  @apply opacity-0;
}
.backdrop-fade-enter-active {
  @apply transition ease-out duration-150;
}
.backdrop-fade-enter-to {
  @apply opacity-100;
}
.backdrop-fade-leave-from {
  @apply opacity-100;
}
.backdrop-fade-leave-active {
  @apply transition ease-in duration-150;
}
.modal-popout-enter-from,
.modal-popout-leave-to {
  @apply opacity-0 transform translate-y-1/2;
}
.modal-popout-enter-active {
  @apply transition ease-out duration-150;
}
.modal-popout-enter-to {
  @apply opacity-100;
}
.modal-popout-leave-from {
  @apply opacity-100;
}
.modal-popout-leave-active {
  @apply transition ease-in duration-150;
}
</style>
