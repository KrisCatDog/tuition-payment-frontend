<template>
  <textarea
    class="mt-1 block w-full font-medium px-2 border-0 border-b-2 rounded-tl rounded-tr border-gray-400 focus:bg-green-50 focus:ring-0 focus:border-green-400"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  ></textarea>
</template>

<script>
export default {
  name: "AppInput",
  props: {
    modelValue: String,
  },
};
</script>
