<template>
  <AppLayout>
    <div class="flex justify-between items-center">
      <h2 class="my-8 text-3xl font-extrabold text-gray-700 dark:text-gray-200">
        Data Siswa
      </h2>

      <router-link :to="{ name: 'StudentsCreate' }">
        <BasicButton type="button"> Tambah </BasicButton>
      </router-link>
    </div>

    <FormModal
      v-model="isModalOpen"
      title="Tambah Data Siswa"
      buttonText="Simpan"
      :onConfirm="handleSubmit"
      :isPending="isPending"
    >
      <InputGroup>
        <TheLabel target="name" label="Nama" />
        <OutlineInput id="name" type="text" v-model="formData.name" />
        <InputError
          v-if="errors && errors.errors && errors.errors.name"
          :label="errors.errors.name[0]"
        />
      </InputGroup>

      <InputGroup>
        <TheLabel target="username" label="Username" />
        <OutlineInput id="username" type="text" v-model="formData.username" />
        <InputError
          v-if="errors && errors.errors && errors.errors.username"
          :label="errors.errors.username[0]"
        />
      </InputGroup>

      <InputGroup>
        <TheLabel target="password" label="Password" />
        <OutlineInput
          id="password"
          type="password"
          v-model="formData.password"
        />
        <InputError
          v-if="errors && errors.errors && errors.errors.password"
          :label="errors.errors.password[0]"
        />
      </InputGroup>

      <InputGroup>
        <TheLabel target="password_confirmation" label="Konfirmasi Password" />
        <OutlineInput
          id="password_confirmation"
          type="password"
          v-model="formData.password_confirmation"
        />
        <InputError
          v-if="errors && errors.errors && errors.errors.password_confirmation"
          :label="errors.errors.password_confirmation[0]"
        />
      </InputGroup>
    </FormModal>

    <AppModal
      v-model="isModalAlertOpen"
      title="Sukses!"
      description="Data Siswa berhasil di tambahkan."
      buttonText="OK"
      modalIcon="success"
      :onConfirm="toggleModalAlert"
    />

    <div
      class="mb-8 p-5 rounded-3xl shadow-xl bg-white dark:bg-gray-700 overflow-x-hidden"
    >
      <div class="w-1/2 mt-1 flex rounded-md shadow-sm">
        <span
          class="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="stroke-current w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </span>
        <input
          @input="handleFetch(paginationMeta.current_page, searchKeyword)"
          v-model="searchKeyword"
          type="text"
          class="font-medium focus:ring-green-500 focus:border-green-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
          placeholder="Search in students"
        />
      </div>

      <div
        class="mt-3 border dark:border-gray-700 w-full overflow-hidden rounded-lg"
      >
        <div class="w-full overflow-x-scroll">
          <table class="w-full whitespace-no-wrap">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-8 py-3">No</th>
                <th class="px-8 py-3">Nama Siswa</th>
                <th class="px-8 py-3">Username</th>
                <th class="px-8 py-3">NISN</th>
                <th class="px-8 py-3">NIS</th>
                <th class="px-8 py-3">Alamat</th>
                <th class="px-8 py-3">No Telepon</th>
                <th class="px-8 py-3">Tingkatan Kelas</th>
                <th class="px-8 py-3">Nomor Kelas</th>
                <th class="px-8 py-3">Jurusan</th>
                <th class="px-8 py-3">Actions</th>
              </tr>
            </thead>
            <tbody
              class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800"
            >
              <Suspense>
                <template #default> <TheList /> </template>

                <template #fallback>
                  <tr v-for="i in 5" :key="i" class="animate-pulse">
                    <td class="px-8 py-6 bg-white shadow-sm rounded-md mx-auto">
                      <div>
                        <div class="h-4 bg-green-400 rounded w-1/3"></div>
                      </div>
                    </td>
                    <td class="px-8 py-6 bg-white shadow-sm rounded-md mx-auto">
                      <div>
                        <div class="h-4 bg-green-400 rounded w-1/2"></div>
                      </div>
                    </td>
                    <td class="px-8 py-6 bg-white shadow-sm rounded-md mx-auto">
                      <div>
                        <div class="h-4 bg-green-400 rounded w-1/2"></div>
                      </div>
                    </td>
                    <td class="px-8 py-6 bg-white shadow-sm rounded-md mx-auto">
                      <div>
                        <div class="h-4 bg-green-400 rounded w-1/2"></div>
                      </div>
                    </td>
                  </tr>
                </template>
              </Suspense>
            </tbody>
          </table>
        </div>
        <div
          class="grid px-8 py-3 text-xs font-semibold tracking-wide text-gray-500 uppercase border-t dark:border-gray-700 bg-gray-50 sm:grid-cols-9 dark:text-gray-400 dark:bg-gray-800"
        >
          <span class="flex items-center col-span-3">
            Showing {{ paginationMeta.from }}-{{ paginationMeta.to }} of
            {{ paginationMeta.total }}
          </span>
          <span class="col-span-2"></span>
          <span class="flex col-span-4 mt-2 sm:mt-auto sm:justify-end">
            <nav aria-label="Table navigation">
              <ul class="inline-flex items-center">
                <li>
                  <button
                    @click.prevent="
                      handleFetch(paginationMeta.current_page - 1)
                    "
                    :disabled="paginationMeta.current_page == 1"
                    class="px-3 py-1 rounded-md rounded-l-lg focus:outline-none focus:shadow-outline-purple"
                    :class="{
                      'disabled:cursor-not-allowed':
                        paginationMeta.current_page == 1,
                    }"
                    aria-label="Previous"
                  >
                    <svg
                      class="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
                <li v-for="(link, i) in paginationMeta.links" :key="i">
                  <button
                    @click.prevent="handleFetch(link.label)"
                    class="px-3 py-1 font-medium transition-colors duration-150 rounded-md focus:outline-none hover:bg-green-100"
                    :class="{
                      'text-white bg-green-600 border border-r-0 border-green-600 hover:bg-green-600':
                        link.active,
                    }"
                  >
                    {{ link.label }}
                  </button>
                </li>
                <li>
                  <button
                    @click.prevent="
                      handleFetch(paginationMeta.current_page + 1)
                    "
                    :disabled="
                      paginationMeta.current_page == paginationMeta.last_page
                    "
                    class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple"
                    :class="{
                      'disabled:cursor-not-allowed':
                        paginationMeta.current_page == paginationMeta.last_page,
                    }"
                    aria-label="Next"
                  >
                    <svg
                      class="w-4 h-4 fill-current"
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </span>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script>
import { defineAsyncComponent, onMounted, reactive, ref } from "vue";
import AppLayout from "@/components/layouts/AppLayout";
import BasicButton from "@/components/ui/BasicButton";
import FormModal from "@/components/ui/FormModal";
import useStudent from "@/composables/useStudent";
import OutlineInput from "@/components/ui/OutlineInput";
import TheLabel from "@/components/ui/TheLabel";
import InputError from "@/components/ui/InputError";
import InputGroup from "@/components/ui/InputGroup";
import AppModal from "@/components/ui/AppModal";

const TheList = defineAsyncComponent(() =>
  import("@/components/student/TheList")
);

export default {
  title: "Data Siswa",
  components: {
    AppLayout,
    BasicButton,
    TheList,
    FormModal,
    OutlineInput,
    TheLabel,
    InputError,
    InputGroup,
    AppModal,
  },
  setup() {
    const {
      fetchStudent,
      storeStudent,
      paginationMeta,
      errors,
      isPending,
    } = useStudent();
    const perPage = ref(10);
    const isModalOpen = ref(false);
    const isModalAlertOpen = ref(false);
    const formData = reactive({
      name: "",
      username: "",
      password: "",
      password_confirmation: "",
    });

    onMounted(async () => {
      await fetchStudent(1, perPage.value);
    });

    async function handleFetch(page, search = "") {
      await fetchStudent(page, perPage.value, search);
    }

    async function handleSubmit() {
      await storeStudent(formData);

      if (!errors.value) {
        isModalOpen.value = false;
        isModalAlertOpen.value = true;

        formData.name = "";
        formData.username = "";
        formData.password = "";
        formData.password_confirmation = "";
      }
    }

    function toggleModalAlert() {
      isModalAlertOpen.value = !isModalAlertOpen.value;
    }

    return {
      paginationMeta,
      handleFetch,
      isModalOpen,
      formData,
      errors,
      handleSubmit,
      isPending,
      isModalAlertOpen,
      toggleModalAlert,
    };
  },
};
</script>