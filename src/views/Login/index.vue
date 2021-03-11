<template>
  <GuestLayout>
    <div class="shape flex justify-center items-center">
      <div class="transform -translate-x-12">
        <img src="@/assets/svg/login-draw.svg" alt="login-draw" />

        <div class="mt-16">
          <h1 class="font-mulish text-white text-3xl font-extrabold">
            Aplikasi Pembayaran SPP
          </h1>
          <h2 class="font-mulish text-white text-2xl">SMKN 13 Bandung</h2>
        </div>
      </div>
    </div>
    <div class="w-1/2 flex justify-center items-center">
      <form
        @submit.prevent="handleSubmit"
        class="w-full sm:w-96 2xl:w-2/5 flex flex-col"
        autocomplete="off"
      >
        <h3 class="font-mulish text-3xl font-bold">Login</h3>
        <div class="flex flex-col mt-12 mb-6">
          <label
            for="username"
            class="text-xs font-bold tracking-wide uppercase"
          >
            Username
          </label>
          <input
            v-model="formData.username"
            type="text"
            id="username"
            class="mt-1 block w-full font-medium px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-green-400"
            placeholder="Your username"
          />
          <p
            v-if="errors && errors.errors && errors.errors.username"
            class="mt-2 text-red-500 text-xs font-semibold"
          >
            {{ errors.errors.username[0] }}
          </p>
        </div>
        <div class="flex flex-col mb-6">
          <label
            for="password"
            class="text-xs font-bold tracking-wide uppercase"
            >Password
          </label>
          <input
            v-model="formData.password"
            type="password"
            id="password"
            class="mt-1 block w-full font-medium px-0.5 border-0 border-b-2 border-gray-400 focus:ring-0 focus:border-green-400"
            placeholder="Your password"
          />
          <p
            v-if="errors && errors.errors && errors.errors.password"
            class="mt-2 text-red-500 text-xs font-semibold"
          >
            {{ errors.errors.password[0] }}
          </p>
        </div>
        <BasicButton type="submit" class="self-end" :isSubmitted="isPending">
          <span>Sign in</span>
        </BasicButton>
      </form>
    </div>
  </GuestLayout>
</template>

<script>
import { reactive } from "vue";
import useLogin from "@/composables/useLogin";
import GuestLayout from "@/components/layouts/GuestLayout";
import BasicButton from "@/components/ui/BasicButton";

export default {
  title: "Login",
  components: { GuestLayout, BasicButton },
  setup() {
    const formData = reactive({
      username: "",
      password: "",
    });
    const { login, isPending, errors } = useLogin();

    async function handleSubmit() {
      await login(formData);
    }

    return {
      formData,
      handleSubmit,
      isPending,
      errors,
    };
  },
};
</script>

<style lang="postcss" scoped>
.shape {
  clip-path: polygon(0 0, 100% 0, 80% 100%, 0 100%);
  @apply bg-green-400 w-1/2;
}
</style>
