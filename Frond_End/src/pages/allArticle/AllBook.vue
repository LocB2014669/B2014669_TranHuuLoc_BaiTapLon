<template>
  <main-lay-out>
    <div>
      <breadcrumb :dataBreadCrumb="dataBreadCrumb" />
      <div class="flex lg:items-center gap-x-20 lg:flex-row flex-col">
        <div class="w-80 flex items-center gap-x-3">
          <label
            for="country_select"
            class="block text-base font-medium text-gray-900 dark:text-white text-nowrap"
            >Chọn Quốc Gia</label
          >
          <select
            id="country_select"
            v-model="country"
            class="block py-2.5 px-2 m-5 w-full text-lg text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="">Quốc gia...</option>
            <option
              v-for="country in countries"
              :key="country"
              :value="country"
            >
              {{ country }}
            </option>
          </select>
        </div>
        <div class="w-80 flex items-center gap-x-3">
          <label
            for="category_select"
            class="block text-base font-medium text-gray-900 dark:text-white text-nowrap"
            >Chọn Thể Loại</label
          >
          <select
            v-model="category"
            id="category_select"
            class="block py-2.5 px-2 w-full text-lg text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          >
            <option value="">Thể loại...</option>
            <option
              v-for="item in categoryData?.data"
              :key="item._id"
              :value="item._id"
            >
              {{ item.title }}
            </option>
          </select>
        </div>
        <button
          @click="clearFilter"
          class="bg-black px-2 py-3 rounded-xl text-nowrap text-white border-2 border-black duration-200 font-semibold hover:bg-white hover:text-black"
        >
          Bỏ Lọc
        </button>
      </div>

      <div
        class="flex justify-between lg:items-center mt-5 lg:flex-row flex-col gap-y-5"
      >
        <div class="flex item-center gap-x-3">
          <h1 class="text-lg font-semibold text-black">Lọc Theo</h1>
          <div class="border-l flex items-center gap-x-3">
            <div v-if="search" class="bg-black rounded-xl text-white px-2 py-3">
              <span>{{ search ? search : "" }}</span>
            </div>
            <div
              v-if="country"
              class="bg-black rounded-xl text-white px-2 py-3"
            >
              <span>{{ country ? country : "" }}</span>
            </div>
            <div
              v-if="category"
              class="bg-black rounded-xl text-white px-2 py-3"
            >
              <span>
                {{
                  categoryData?.data
                    .filter((item) => item._id === category)
                    .map((categoryItem) => categoryItem.title)
                    .join(",")
                }}
              </span>
            </div>
          </div>
        </div>

        <select
          v-model="sort"
          class="bg-gray-50 text-lg border border-gray-300 text-gray-900 rounded-lg focus:black focus:border-black block w-auto p-2.5"
        >
          <option selected value="tenSachAZ">Tên sách (A-Z)</option>
          <option value="tenSachZA">Tên sách (Z-A)</option>
          <option value="viewPlus">Luợt truy cập (Tăng dần)</option>
          <option value="viewDown">Lượt truy cập (Giảm dần)</option>
        </select>
      </div>
      <div v-if="status === 'loading'">Đang tải</div>
      <div v-else-if="status === 'error'">Error: {{ error }}</div>
      <div class="flex items-center gap-y-3 flex-wrap mt-6" v-else>
        <div
          class="lg:w-[25%] w-full p-1"
          v-for="item in sachData?.data"
          :key="item._id"
        >
          <article-card :sachData="item" />
        </div>
      </div>
      <div
        v-if="sachData?.data.length === 0"
        class="flex item-center text-xl text-red-500 font-bold justify-center my-auto"
      >
        <p>Không có sách phù hợp</p>
      </div>
    </div>
  </main-lay-out>
</template>

<script>
import { ref, watchEffect } from "vue";
import { useQuery } from "vue-query";
import { getAllSach } from "../../services/sach";
import MainLayOut from "../../components/MainLayOut.vue";
import ArticleCard from "../home/container/ArticleCard.vue";
import Breadcrumb from "../../components/Breadcrumb.vue";
import { useRoute } from "vue-router";
import { getAllCategory } from "../../services/sachCategory";

export default {
  components: { MainLayOut, ArticleCard, Breadcrumb },
  setup() {
    const dataBreadCrumb = [
      {
        name: "Trang Chủ",
        link: "/",
      },
      {
        name: "Sách",
        link: "/sach",
      },
    ];
    const route = useRoute();
    const search = ref(route.query.search || "");
    const namXuatBan = ref("");
    const country = ref("");
    const category = ref("");
    const sort = ref("tenSachAZ");

    const {
      data: sachData,
      refetch,
      error,
    } = useQuery(
      ["AllSach", search, , country, category, sort, route.query.search],
      () =>
        getAllSach({
          search: search.value,
          country: country.value,
          category: category.value,
          sort: sort.value,
        })
    );
    watchEffect(() => {
      (search.value = route.query.search), refetch.value();
    });
    const { data: categoryData } = useQuery(["categoryData"], () =>
      getAllCategory()
    );
    const clearFilter = () => {
      search.value = "";
      namXuatBan.value = "";
      country.value = "";
      category.value = "";
      sort.value = "tenSachAZ";
    };
    const countries = ["Việt Nam", "Mỹ", "Anh", "Pháp", "Nhật Bản"];

    return {
      search,
      namXuatBan,
      country,
      category,
      sort,
      sachData,
      status,
      error,
      clearFilter,
      countries,
      dataBreadCrumb,
      categoryData,
    };
  },
};
</script>

<style>
/* Styles here */
</style>
