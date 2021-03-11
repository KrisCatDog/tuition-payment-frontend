<template>
  <transition name="backdrop-fade">
    <div
      v-show="isVisible"
      @click.prevent="clickAction"
      class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"
    ></div>
  </transition>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    clickAction: {
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
</style>