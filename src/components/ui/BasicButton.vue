<template>
  <button
    :disabled="isSubmitted"
    :type="type"
    class="inline-flex items-center bg-green-400 hover:bg-green-500 font-medium text-white py-2 px-8 transition duration-100 ease-in border border-green-400 hover:border-green-500 rounded-full focus:outline-none"
    :class="{ 'disabled:opacity-75 disabled:cursor-not-allowed': isSubmitted }"
  >
    <CircleLoading v-show="isSubmitted" />
    <slot />
  </button>
</template>

<script>
import CircleLoading from "@/components/ui/CircleLoading";
export default {
  components: {
    CircleLoading,
  },
  props: {
    type: {
      type: String,
      required: true,
    },
    isSubmitted: {
      type: Boolean,
      required: true,
    },
  },
};
</script>
