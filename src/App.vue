<template>
  <router-view />
  <vue-progress-bar></vue-progress-bar>
</template>

<script>
export default {
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.$Progress.start();

    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        let meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },
};
</script>

<style lang="postcss">
#app {
  @apply min-h-screen font-sans antialiased;
}
.select2 {
  width: 100% !important;
  @apply focus:outline-none !important;
}
.select2-selection {
  @apply h-10 !important;
}
.select2-selection__rendered {
  @apply leading-9 !important;
}
.select2-selection__arrow {
  @apply h-10 !important;
}
</style>

