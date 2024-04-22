<template>
  <section>
    <div class="relative flex lg:flex-row flex-col gap-x-5 my-4">
      <form-craete-category-sach
        class="lg:w-1/3 w-full border-r p-3"
        v-if="!categoryId"
      />
      <div class="lg:w-full">
        <caption
          class="text-lg text-nowrap font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800"
        >
          Danh Sách - Thể Loại Sách
        </caption>
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table
            v-if="!categoryId"
            class="w-full min-w-max mt-4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="px-6 py-3">STT</th>
                <th scope="col" class="px-6 py-3">Tên</th>
                <th scope="col" class="px-6 py-3">Ngày Tạo</th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                :v-if="categoryData?.data.length > 0"
                v-for="(item, index) in categoryData?.data"
                :key="item._id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
              >
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center gap-x-2"
                >
                  {{ index + 1 }}
                </th>
                <td class="px-6 py-4">{{ item?.title }}</td>
                <td class="px-6 py-4">
                  {{
                    new Date(item.createdAt).toLocaleDateString("vi-VN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })
                  }}
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center gap-x-3">
                    <button
                      @click="editCategory(item._id)"
                      class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      @click="handlerDeleteCategory(item._id)"
                      class="font-medium text-red-600 dark:text-blue-500 hover:underline"
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>

              <tr
                v-if="categoryData?.data.length === 0"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 w-full"
              >
                <td :colspan="4" class="px-auto py-3 text-center text-red-500">
                  Chưa Tạo Thể Loại Nào
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <edit-category-sach v-if="categoryId" :categoryId="categoryId" />
    </div>
  </section>
</template>

<script>
import { useMutation, useQuery } from "vue-query";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref, watchEffect } from "vue";
import { images, stable } from "../../../constants";
import { deleteCategory, getAllCategory } from "../../../services/sachCategory";
import FormCraeteCategorySach from "./FormCreateCategorySach.vue";
import EditCategorySach from "./EditCategorySach.vue";

export default {
  components: { FormCraeteCategorySach, EditCategorySach },
  data() {
    return {
      images: images,
      stable: stable,
    };
  },

  setup() {
    const categoryId = ref(null);
    const { data: categoryData, refetch } = useQuery(
      "categorySach",
      getAllCategory
    );
    const { mutate, isLoading } = useMutation(deleteCategory, {
      onSuccess: (data) => {
        toast.success("Xóa Thành Công");
        refetch.value();
      },
      onError: (error) => {
        toast.error("Xóa thất bại: " + error.message);
      },
    });
    const editCategory = (id) => {
      categoryId.value = id;
      console.log(categoryId.value);
    };

    const handlerDeleteCategory = (categoryId) => {
      mutate({ categoryId: categoryId });
    };
    watchEffect(() => {
      refetch.value();
    });
    return {
      categoryData,
      handlerDeleteCategory,
      editCategory,
      categoryId,
      refetch,
    };
  },
};
</script>

<style></style>
