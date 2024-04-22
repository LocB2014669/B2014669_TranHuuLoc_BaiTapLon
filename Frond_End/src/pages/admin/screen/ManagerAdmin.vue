<template>
  <main-lay-out>
    <div>
      <div
        class="flex overflow-x-auto text-nowrap text-lg font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
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
      <div class="tab-contents my-3">
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

import MainLayOut from "../../../components/MainLayOut.vue";
import ManagerSachVue from "../ManagerSach.vue";
import ManagerCategorySach from "../container/ManagerCategorySach.vue";
import ManagerTheMuonTra from "../container/ManagerTheMuonTra.vue";
import ManagerNhaXuatBanVue from "../container/ManagerNhaXuatBan.vue";
import ManagerUserVue from "../container/ManagerUser.vue";
import Tab from "../../../components/tabs/Tab.vue";
import TabContent from "../../../components/tabs/TabContent.vue";

export default {
  components: {
    Tab,
    TabContent,
    ManagerSachVue,
    ManagerCategorySach,
    ManagerTheMuonTra,
    ManagerNhaXuatBanVue,
    ManagerUserVue,
    MainLayOut,
  },
  setup() {
    const tabs = ref([
      { title: "Quản lý sách", component: ManagerSachVue, active: true },
      {
        title: "Quản lý tài khoản",
        component: ManagerUserVue,
        active: false,
      },
      {
        title: "Quản lý thẻ mượn",
        component: ManagerTheMuonTra,
        active: false,
      },
      {
        title: "Quản lý NXB",
        component: ManagerNhaXuatBanVue,
        active: false,
      },
      {
        title: "Quản lý thể loại",
        component: ManagerCategorySach,
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
