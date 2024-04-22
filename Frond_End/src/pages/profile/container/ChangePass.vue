<template>
  <div>
    <div class="my-5 flex items-center justify-center">
      <div class="max-w-md w-full p-6 bg-white rounded-xl shadow">
        <h2 class="text-xl font-semibold mb-6">Đổi mật khẩu</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label for="oldPassword" class="block font-medium mb-1"
              >Mật khẩu củ</label
            >
            <input
              type="password"
              id="oldPassword"
              v-model="oldPassword"
              class="w-full border border-gray-300 rounded py-2 px-3"
            />
          </div>

          <div class="mb-4">
            <label for="newPassword" class="block font-medium mb-1"
              >Mật khẩu mới</label
            >
            <input
              type="password"
              id="newPassword"
              v-model="newPassword"
              class="w-full border border-gray-300 rounded py-2 px-3"
            />
            <p
              v-if="newPassword.length < 6 && newPassword"
              class="text-red-500"
            >
              Mật khẩu phải có ít nhất 6 ký tự.
            </p>
          </div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-black hover:bg-white hover:text-black border-2 text-white font-semibold duration-200 rounded-lg px-2 py-3"
          >
            Đổi
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { useMutation } from "vue-query";
import { changePass } from "../../../services/user";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const token = store.state.user?.data?.token;
    const oldPassword = ref("");
    const newPassword = ref("");
    const { mutate, isLoading } = useMutation(changePass, {
      onSuccess: (data) => {
        toast.success(data.data.message);
        console.log(data);
        oldPassword.value = "";
        newPassword.value = "";
      },
      onError: (error) => {
        if (error.message === "Mật khẩu cũ không đúng") {
          toast.error("Mật khẩu cũ không đúng");
        } else {
          toast.error("Đã có lỗi xảy ra");
        }
      },
    });
    const submitForm = () => {
      if (!oldPassword.value || !newPassword.value) {
        toast.error("Vui lòng nhập đầy đủ thông tin");
      } else {
        mutate({
          token: token,
          oldPassword: oldPassword.value,
          newPassword: newPassword.value,
        });
      }
    };
    return {
      oldPassword,
      newPassword,
      submitForm,
      isLoading,
    };
  },
};
</script>
