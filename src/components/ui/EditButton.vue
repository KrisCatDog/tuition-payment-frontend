<template>
  <div class="relative">
    <button
      @click="onClick"
      class="edit-button flex items-center justify-between px-1 py-1 text-sm font-medium leading-5 text-green-600 rounded-lg dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
      aria-label="Edit"
    >
      <svg
        class="w-5 h-5"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
        ></path>
      </svg>
    </button>

    <div class="absolute mx-2 -top-10 -left-5 z-10 hidden">
      <div
        class="bg-black text-white text-xs rounded py-2 px-4 right-0 bottom-full"
      >
        Edit
        <svg
          class="absolute text-black h-2 w-full left-0 top-full"
          x="0px"
          y="0px"
          viewBox="0 0 255 255"
          xml:space="preserve"
        >
          <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>

<style scoped lang="postcss">
.edit-button:hover + div {
  @apply block;
}
</style>