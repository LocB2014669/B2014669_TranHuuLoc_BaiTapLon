<template>
  <div class="flex items-center lg:justify-center">
    <button
      @click="handleShowModal"
      class="bg-black text-white rounded-xl px-2 py-3 font-bold hover:bg-white hover:text-black duration-200"
    >
      Tạo Tài Khoản Nhân Viên
    </button>
  </div>
  <div
    v-if="showModal"
    class="fixed inset-0 z-50 overflow-auto bg-gray-800 bg-opacity-50 flex justify-center items-center"
  >
    <div class="modal-container">
      <div class="modal-content bg-white shadow-md rounded-lg p-6">
        <!-- Modal header -->
        <div
          class="modal-header flex justify-between items-center border-b pb-3"
        >
          <h3 class="text-lg font-semibold">Tạo tài khoản nhân viên</h3>
          <button
            @click="closeModal"
            class="text-gray-400 hover:text-gray-700 focus:outline-none"
          ></button>
        </div>
        <!-- Modal body -->
        <div class="modal-body">
          <form>
            <div>
              <label
                for="category"
                class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >Email nhân viên</label
              >
              <input
                type="text"
                v-model="email"
                id="category"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập email..."
                required
              />
            </div>
            <div class="">
              <label for="password" class="block font-medium mb-1"
                >Password:</label
              >
              <input
                type="password"
                id="password"
                v-model="password"
                placeholder="Nhập mật khẩu..."
                required
                class="w-full border border-gray-300 rounded py-2 px-3"
              />
            </div>
            <div class="flex items-center justify-between gap-x-8 w-full my-3">
              <label for="chucVu" class="block text-lg font-medium text-nowrap"
                >Chức vụ</label
              >
              <select
                id="chucVu"
                v-model="chucVu"
                class="border border-gray-300 text-gray-900 text-lg rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled value="" class="text-lg mx-2 my-3">
                  Chọn chức Vụ
                </option>
                <option class="text-lg mx-2 my-3" value="Nhân viên">
                  Nhân viên
                </option>
                <option class="text-lg mx-2 my-3" value="Quản lý">
                  Nhân viên quản trị
                </option>
              </select>
            </div>
            <div>
              <label
                for="diaChi"
                class="block text-sm font-medium text-gray-900 dark:text-white mb-2"
                >Địa Chỉ</label
              >
              <input
                type="text"
                v-model="diaChi"
                id="diaChi"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Nhập địa chỉ..."
                required
              />
            </div>
            <button
              @click.prevent="handleCreateNhanVien"
              class="px-3 mt-2 py-2 border w-full border-violet-500 duration-200 hover:bg-black hover:text-violet-500 bg-violet-500 text-black rounded-lg"
            >
              Tạo
            </button>
          </form>
        </div>
        <!-- Modal footer -->
        <div class="modal-footer flex justify-end pt-4 border-t mt-4">
          <button
            @click="showModal = false"
            class="bg-red-500 font-bold px-3 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useMutation } from "vue-query";
import { createNhanVien } from "../../../services/user";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const diaChi = ref("");
    const chucVu = ref("Nhân viên");
    const showModal = ref(false);
    const handleShowModal = () => {
      showModal.value = !showModal.value;
    };
    console.log(email.value);

    const closeModal = () => {
      showModal.value = false;
    };

    const { mutate, isLoading } = useMutation(createNhanVien, {
      onSuccess: (data) => {
        toast.success("Tạo thành công");
        showModal.value = false;
      },
      onError: (error) => {
        toast.error("Tạo thất bại: " + error.message);
      },
    });

    const handleCreateNhanVien = () => {
      mutate({
        email: email.value,
        password: password.value,
        diaChi: diaChi.value,
        chucVu: chucVu.value,
      });
    };
    return {
      showModal,
      handleShowModal,
      closeModal,
      handleCreateNhanVien,
      email,
      password,
      diaChi,
      chucVu
    };
  },
};
</script>

<style></style>
