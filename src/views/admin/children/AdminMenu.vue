<template>
  <div class="container">
    <div class="menu">
      <Menu
        :items="menuItems"
        :selected-keys="state.selectedKeys"
        :theme="state.theme"
      ></Menu>
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
import { h, reactive } from "vue";

const state = reactive({
  theme: "light" as MenuTheme,
  selectedKeys: ["1"],
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
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: row;
  margin-top: 20px;

  .menu {
    width: 200px;
  }
}
</style>
