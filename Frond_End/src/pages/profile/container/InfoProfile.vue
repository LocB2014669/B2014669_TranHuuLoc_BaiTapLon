<template>
  <div class="container mx-auto">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold mb-4"></h1>
      <button @click="hanlderCheckEdit">
        <Icon class="text-xl" icon="iconamoon:edit-light" />
      </button>
    </div>

    <div class="max-w-md mx-auto border border-black rounded-xl px-2 py-3 duration-200">
      <div class="mb-4 flex items-center text-center gap-x-4 justify-between">
        <label
          class="block text-gray-700 text-sm font-bold text-nowrap"
          for="email"
        >
          Email
        </label>
        <p v-if="!isCheckEdit" class="text-xl">{{ profileData?.data.email }}</p>
        <input
          v-if="isCheckEdit"
          v-model="email"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5"
          id="email"
          type="email"
          :placeholder="profileData?.data.email"
        />
      </div>

      <div
        v-if="profileData?.data.maDocGia"
        class="mb-4 flex items-center text-center gap-x-4 justify-between"
      >
        <label
          class="block text-gray-700 text-sm font-bold text-nowrap"
          for="hoLot"
        >
          Tên Lót
        </label>
        <p v-if="!isCheckEdit" class="text-xl">{{ profileData?.data.hoLot }}</p>
        <input
          v-if="isCheckEdit"
          v-model="hoLot"
          class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="hoLot"
          type="text"
          :placeholder="profileData?.data.hoLot"
        />
      </div>
      <div
        v-if="profileData?.data.maDocGia"
        class="mb-4 flex items-center text-center gap-x-4 justify-between"
      >
        <label
          class="block text-gray-700 text-sm font-bold text-nowrap"
          for="ten"
        >
          Tên
        </label>
        <p v-if="!isCheckEdit" class="text-xl">{{ profileData?.data.ten }}</p>
        <input
          v-if="isCheckEdit"
          v-model="ten"
          class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ten"
          type="text"
          :placeholder="profileData?.data.ten"
        />
      </div>
      <div
        v-if="profileData?.data.MSNV"
        class="mb-4 flex items-center text-center gap-x-4 justify-between"
      >
        <label
          class="block text-gray-700 text-sm font-bold text-nowrap"
          for="ten"
        >
          Tên
        </label>
        <p v-if="!isCheckEdit" class="text-xl">
          {{ profileData?.data.hoTenNV }}
        </p>
        <input
          v-if="isCheckEdit"
          v-model="hoTenNV"
          class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ten"
          type="text"
          :placeholder="profileData?.data.hoTenNV"
        />
      </div>
      <div
        v-if="profileData?.data.maDocGia"
        class="mb-4 flex items-center text-center gap-x-4 justify-between"
      >
        <label
          class="block text-gray-700 text-sm font-bold text-nowrap"
          for="ngaySinh"
        >
          Ngày sinh
        </label>
        <p v-if="!isCheckEdit" class="text-xl">
          {{
            new Date(profileData?.data.ngaySinh).toLocaleDateString("vi-VN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          }}
        </p>
        <input
          v-if="isCheckEdit"
          v-model="ngaySinh"
          class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="ngaySinh"
          type="date"
        />
      </div>
      <div class="mb-4 flex items-center text-center gap-x-4 justify-between">
        <label
          class="block text-gray-700 text-sm font-bold text-nowrap"
          for="diaChi"
        >
          Địa Chỉ
        </label>
        <p v-if="!isCheckEdit" class="text-xl">
          {{ profileData?.data.diaChi }}
        </p>
        <input
          v-if="isCheckEdit"
          v-model="diaChi"
          class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="diaChi"
          type="text"
          :placeholder="profileData?.data.diaChi"
        />
      </div>
      <div class="mb-4 flex items-center text-center gap-x-4 justify-between">
        <label
          class="block text-gray-700 text-sm font-bold text-nowrap"
          for="soDienThoai"
        >
          Số Điện Thoại
        </label>
        <p v-if="!isCheckEdit" class="text-xl">
          {{ profileData?.data.soDienThoai }}
        </p>
        <input
          v-if="isCheckEdit"
          v-model="soDienThoai"
          class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="soDienThoai"
          type="tel"
          :placeholder="profileData?.data.soDienThoai"
        />
      </div>
      <div
        v-if="profileData?.data.maDocGia"
        class="mb-4 flex items-center text-center gap-x-4 justify-between"
      >
        <label
          class="block text-gray-700 text-sm font-bold text-nowrap"
          for="phai"
        >
          Phái
        </label>
        <p v-if="!isCheckEdit" class="text-xl">{{ profileData?.data.phai }}</p>
        <select
          v-if="isCheckEdit"
          v-model="phai"
          class="shadow appearance-none border rounded w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="phai"
        >
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      <div class="flex items-center justify-between">
        <button
          v-if="isCheckEdit"
          @click="handlerUpdateProfile"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Submit
        </button>
        <span v-if="loading" class="text-sm italic text-gray-600"
          >Loading...</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { updateProfile, userProfile } from "../../../services/user";
import { useMutation, useQuery } from "vue-query";
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import axios from "axios";
import { Icon } from "@iconify/vue";

export default defineComponent({
  components: { Icon },
  setup() {
    const email = ref("");
    const hoLot = ref("");
    const ten = ref("");
    const hoTenNV = ref("");
    const diaChi = ref("");
    const soDienThoai = ref("");
    const phai = ref("");
    const ngaySinh = ref("");
    const store = useStore();
    const token = store.state.user?.data?.token;
    const isCheckEdit = ref(false);

    const { data: profileData, refetch } = useQuery(["profile", token], () =>
      userProfile({ token: token })
    );

    watchEffect(() => {
      email.value = profileData?.value?.email;
      hoLot.value = profileData?.value?.hoLot;
      ten.value = profileData?.value?.ten;
      diaChi.value = profileData?.value?.diaChi;
      soDienThoai.value = profileData?.value?.soDienThoai;
      phai.value = profileData?.value?.phai;
      ngaySinh.value = profileData?.value?.ngaySinh;
      hoTenNV.value = profileData?.value?.hoTenNV;
    });

    const { mutate, isLoading } = useMutation(updateProfile, {
      onSuccess: (data) => {
        toast.success("Cập nhật thành công");
        localStorage.setItem("user", JSON.stringify(data));
        store.commit("setUser", data);
        isCheckEdit.value = false;
        refetch.value();
      },
      onError: (error) => {
        toast.error(error.messenger);
      },
    });

    const handlerUpdateProfile = () => {
      mutate({
        token: token,
        email: email.value,
        hoLot: hoLot.value,
        ten: ten.value,
        diaChi: diaChi.value,
        soDienThoai: soDienThoai.value,
        phai: phai.value,
        ngaySinh: ngaySinh.value,
        hoTenNV: hoTenNV.value,
      });
    };
    const hanlderCheckEdit = () => {
      isCheckEdit.value = !isCheckEdit.value;
    };

    return {
      email,
      hoLot,
      ten,
      soDienThoai,
      diaChi,
      ngaySinh,
      phai,
      hoTenNV,
      profileData,
      handlerUpdateProfile,
      hanlderCheckEdit,
      isCheckEdit,
    };
  },
});
</script>

<style scoped></style>
