<template>
  <div class="container">
    <div class="menu">
      <Menu
        :items="menuItems"
        :theme="state.theme"
        @click="handleMenuClick"
        :selected-keys="state.selectedKeys"
      >
      </Menu>
    </div>
    <div class="body">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CarryOutOutlined,
  PieChartOutlined,
  SplitCellsOutlined,
  UserOutlined,
} from "@ant-design/icons-vue";
import { Menu, type MenuProps, type MenuTheme } from "ant-design-vue";
import type {
  MenuClickEventHandler,
  MenuInfo,
} from "ant-design-vue/es/menu/src/interface";
import { h, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const routes = useRoute();

const state = reactive({
  theme: "light" as MenuTheme,
  selectedKeys: getSelectedKeys(),
});

const menuItems: MenuProps["items"] = [
  {
    key: "1",
    label: "用户管理",
    icon: () => h(UserOutlined),
  },
  {
    key: "2",
    label: "会议室管理",
    icon: () => h(SplitCellsOutlined),
  },
  {
    key: "3",
    label: "预定管理",
    icon: () => h(CarryOutOutlined),
  },
  {
    key: "4",
    label: "统计",
    icon: () => h(PieChartOutlined),
  },
];

const router = useRouter();
const handleMenuClick: MenuClickEventHandler = (info: MenuInfo) => {
  let path = "";
  switch (info.key) {
    case "1":
      path = "/show_menu/user_manage";
      state.selectedKeys = ["1"];
      break;
    case "2":
      path = "/show_menu/meetingroom_manage";
      state.selectedKeys = ["2"];
      break;
    case "3":
      path = "/show_menu/booking_manage";
      state.selectedKeys = ["3"];
      break;
    case "4":
      path = "/show_menu/statistics";
      state.selectedKeys = ["4"];
      break;
  }
  router.push(path);
};

function getSelectedKeys() {
  if (routes.path === "/show_menu/user_manage") {
    return ["1"];
  } else if (routes.path === "/show_menu/booking_manage") {
    return ["3"];
  } else if (routes.path === "/show_menu/meetingroom_manage") {
    return ["2"];
  } else if (routes.path === "/show_menu/statistics") {
    return ["4"];
  } else {
    return ["1"];
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: row;

  .body {
    width: 100%;
  }
}
</style>
