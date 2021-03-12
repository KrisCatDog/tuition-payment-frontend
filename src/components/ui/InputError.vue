<template>
  <p class="mt-2 text-red-500 text-xs font-semibold">
    {{ label }}
  </p>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
