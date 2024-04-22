<template>
  <main-lay-out>
    <div>
      <div
        class="flex flex-wrap text-lg font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
      >
        <Tab
          v-for="(tab, index) in tabs"
          :key="index"
          :title="tab.title"
          :index="index"
          :class="{ 'bg-black text-white ': tab.active }"
          @tab-selected="selectTab"
        ></Tab>
      </div>
      <div class="tab-contents">
        <TabContent
          v-for="(tab, index) in tabs"
          :key="index"
          :active="selectedTab === index"
        >
          <component :is="tab.component"></component>
        </TabContent>
      </div>
    </div>
  </main-lay-out>
</template>

<script>
import { ref } from "vue";

import Tab from "../../components/tabs/Tab.vue";
import TabContent from "../../components/tabs/TabContent.vue";
import InfoProfile from "./container/InfoProfile.vue";
import MuonSachProfile from "./container/MuonSachProfile.vue";
import MainLayOut from "../../components/MainLayOut.vue";
import ChangePass from "./container/ChangePass.vue";

export default {
  components: {
    Tab,
    TabContent,
    InfoProfile,
    MuonSachProfile,
    MainLayOut,
  },
  setup() {
    const tabs = ref([
      { title: "Thông tin cá nhân", component: InfoProfile, active: true },
      {
        title: "Thông tin mượn sách",
        component: MuonSachProfile,
        active: false,
      },
      {
        title: "Đổi mật khẩu",
        component: ChangePass,
        active: false,
      },
    ]);
    const selectedTab = ref(0);

    const selectTab = (index) => {
      tabs.value.forEach((tab, tabIndex) => {
        tab.active = tabIndex === index;
      });
      selectedTab.value = index;
    };

    return { tabs, selectedTab, selectTab };
  },
};
</script>

<style>
/* CSS cho tabs và tab contents */
</style>
