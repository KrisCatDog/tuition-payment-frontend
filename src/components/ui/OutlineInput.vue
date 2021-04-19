<template>
  <input
    :type="type"
    class="mt-1 block w-full font-medium px-2 border-0 border-b-2 rounded-tl rounded-tr border-gray-400 focus:bg-green-50 focus:ring-0 focus:border-green-400 dark:bg-gray-700 dark:text-white"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: {
    modelValue: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
  },
};
</script>
