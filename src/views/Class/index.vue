<template>
  <AppLayout>
    <div class="flex justify-between items-center">
      <h2
        class="font-mulish my-8 text-3xl font-extrabold text-gray-700 dark:text-gray-200"
      >
        Data Kelas
      </h2>

      <BasicButton type="button" @click.prevent="isModalOpen = true">
        Tambah
      </BasicButton>
    </div>
  </AppLayout>
</template>

<script>
import AppLayout from "@/components/layouts/AppLayout";
import BasicButton from "@/components/ui/BasicButton";

export default {
  components: { AppLayout, BasicButton },
};
</script>

<style>
</style>