<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg">
    <div class="">
      <router-link :to="`/sach/${sachData?.maSach}`" class="link w-full h-full">
        <img
          class="object-cover object-center border-b-violet-200 border-b-2 w-full h-[300px]"
          :src="
            sachData?.photo
              ? `${stable.UPLOAD_FOLDER_BASE_URL}${sachData?.photo}`
              : images.phoToOrigin
          "
          :alt="sachData?.tenSach"
        />
      </router-link>
    </div>

    <div class="px-2 h-24">
      <div class="font-bold text-xl mb-2 truncate">{{ sachData?.tenSach }}</div>
      <p class="text-gray-700 text-base line-clamp-3">
        {{ sachData?.caption }}
      </p>
    </div>
    <div class="px-2 pt-3 pb-2 w-full">
      <div class="flex items-center justify-evenly">
        <span
          class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >Số Lượng: {{ sachData?.soQuyen }}</span
        >
        <span
          class="inline-block bg-gray-200 rounded-lg px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >
          {{ sachData?.namXuatBan }}</span
        >
      </div>

      <div class="w-full">
        <button
          @click="handlerMuonSach(sachData?.maSach, sachData?.soQuyen)"
          :disabled="isLoading"
          type="button"
          class="text-white w-full font-semibold bg-gray-800 hover:bg-white duration-200 border-2 hover:text-black hover:border-black focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-base px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          {{ isLoading ? "Đang Mượn..." : "Mượn Sách" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useMutation } from "vue-query";
import { images, stable } from "../../../constants";
import { createMuonSach } from "../../../services/theoDoiMuonSach";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { useStore } from "vuex";

export default {
  props: {
    sachData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    // Use props parameter to access props
    const store = useStore();
    const { mutate, isLoading } = useMutation(createMuonSach, {
      onSuccess: (data) => {
        toast.success("Mượn Thành Công");
      },
      onError: (error) => {
        toast.error("Mượn Thất Bại " + error.message);
      },
    });
    const token = store.state.user?.data?.token;
    const maDocGia = store.state.user?.data?.userInfo.maDocGia;
    const handlerMuonSach = (maSach, soQuyen) => {
      if (!token) {
        toast.error("Bạn cần phải đăng nhập tài khoản");
      } else if (soQuyen === 0) {
        toast.error("Sách đã hết hàng");
      } else if (!maDocGia) {
        toast.error("Nhân viên chưa được mượn sách");
      } else {
        mutate({ maSach: maSach, maDocGia: maDocGia, soLuongMuon: 1, token });
      }
    };

    return {
      handlerMuonSach,
      isLoading,
    };
  },
  data() {
    return {
      images: images,
      stable: stable,
    };
  },
};
</script>
