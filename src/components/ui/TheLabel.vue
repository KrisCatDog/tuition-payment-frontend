<template>
  <label :for="target" class="text-xs font-bold tracking-wide uppercase">
    {{ label }}
  </label>
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
};
</script>

<style>
</style>