<template>
  <section class="sticky top-0 left-0 right-0 z-50 bg-white border-b">
    <header
      class="mx-auto flex max-w-7xl items-center justify-between py-4 px-2"
    >
      <nav class="container mx-auto flex items-center justify-between">
        <div class="flex">
          <a href="#" class="-m-1.5 p-1.5">
            <router-link to="/">
              <img class="h-8 w-auto" :src="images.Logo" alt="" />
            </router-link>
          </a>
        </div>
        <div class="block lg:hidden">
          <button
            @click="menuHandle"
            class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-60"
          >
            <Icon v-if="!setCheckMenu" icon="material-symbols:menu" />
            <Icon v-else icon="material-symbols:close" />
          </button>
        </div>
        <div
          :class="setCheckMenu ? 'right-0' : '-right-full'"
          class="flex-col-reverse w-full lg:w-auto transition-all duration-500 bg-purple-500 lg:bg-transparent mt-[62px] lg:mt-0 z-[40] fixed lg:static justify-end lg:justify-between top-0 bottom-0 flex lg:flex-row gap-x-5 items-center"
        >
          <div
            class="flex justify-between text-center gap-x-3 lg:flex-row flex-col items-center gap-y-6 flex-shrink-0"
          >
            <router-link to="/" class="">Trang chủ</router-link>
            <router-link to="/sach" class="">Sách</router-link>
            <div
              class="relative inline-block"
              @mouseover="showDropdown = true"
              @mouseleave="showDropdown = false"
            ></div>
            <router-link to="/about">About</router-link>
          </div>
          <InputSearch />
          <div class="flex-shrink-0">
            <div v-if="!user || !user.data" class="w-[126px]">
              <router-link
                to="/login"
                class="px-3 py-2 border-2 border-black rounded-full hover:bg-black duration-200 hover:text-white font-medium text-lg"
              >
                Đăng Nhập
              </router-link>
            </div>

            <div
              v-else
              class="relative inline-block w-[126px] text-end"
              @mouseover="showProfile = true"
              @mouseleave="showProfile = false"
            >
              <router-link
                to="/"
                class="text-lg font-medium text-black flex-shrink-0 text-end"
                >{{
                  user?.data?.userInfo.ten || user?.data?.userInfo.hoTenNV
                }}</router-link
              >
              <div
                v-if="showProfile"
                class="absolute right-0 mt-0 w-48 bg-white rounded-md shadow-lg text-start"
              >
                <div
                  class="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <router-link
                    to="/profile"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Profile
                  </router-link>
                </div>
                <div
                  class="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <router-link
                    v-if="user?.data?.userInfo?.MSNV"
                    to="/manager"
                    class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    role="menuitem"
                  >
                    Quản lý admin
                  </router-link>
                </div>
                <div
                  class="py-1 hover:bg-gray-100"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <button
                    @click="logout"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                  >
                    Đăng Xuất
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!-- <pre>{{ user }}</pre> -->
    </header>
  </section>
</template>

<script>
import { images, stable } from "../constants";
import { ref, defineComponent } from "vue";
import { mapMutations } from "vuex";
import InputSearch from "./container/InputSearch.vue";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: { InputSearch, Icon },
  data() {
    return {
      images: images,
      stable: stable,
      showDropdown: false,
      showProfile: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    ...mapMutations(["logout"]),
  },
  setup() {
    const setCheckMenu = ref(false);
    const menuHandle = () => {
      setCheckMenu.value = !setCheckMenu.value;
    };

    return {
      menuHandle,
      setCheckMenu,
    };
  },
});
</script>
