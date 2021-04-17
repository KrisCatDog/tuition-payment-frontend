<template>
  <div
    class="flex h-screen bg-gray-100 dark:bg-gray-900"
    :class="{ 'overflow-hidden': isSideMenuOpen }"
  >
    <DesktopSidebar />

    <TheBackdrop :isVisible="isSideMenuOpen" :clickAction="toggleSideMenu" />

    <MobileSidebar :isVisible="isSideMenuOpen" />

    <div class="flex flex-col flex-1 w-full">
      <AppHeader />

      <main class="h-full overflow-y-auto">
        <div class="container px-6 mx-auto grid">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import DesktopSidebar from "@/components/ui/DesktopSidebar";
import TheBackdrop from "@/components/ui/TheBackdrop";
import MobileSidebar from "@/components/ui/MobileSidebar";
import AppHeader from "@/components/ui/AppHeader";

export default {
  components: { DesktopSidebar, TheBackdrop, MobileSidebar, AppHeader },
  setup() {
    const isSideMenuOpen = ref(false);

    function toggleSideMenu() {
      isSideMenuOpen.value = !isSideMenuOpen.value;
    }

    return {
      isSideMenuOpen,
      toggleSideMenu,
    };
  },
};
</script>



