<template>
  <div class="container">
    <div class="menu">
      <Menu
        :items="menuItems"
        :theme="state.theme"
        @click="handleClick"
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
import { UnlockOutlined, UserOutlined } from "@ant-design/icons-vue";
import { Menu, type MenuProps, type MenuTheme } from "ant-design-vue";
import type {
  MenuClickEventHandler,
  MenuInfo,
} from "ant-design-vue/es/menu/src/interface";
import { h, ref } from "vue";
import { useRouter } from "vue-router";

const state = ref({
  theme: "light" as MenuTheme,
  selectedKeys: ["1"],
});

const menuItems: MenuProps["items"] = [
  {
    key: "1",
    label: "信息修改",
    icon: () => h(UserOutlined),
  },
  {
    key: "2",
    label: "密码修改",
    icon: () => h(UnlockOutlined),
  },
];

const router = useRouter();
const handleClick: MenuClickEventHandler = (info: MenuInfo) => {
  if (info.key === "1") {
    router.push("/update_menu/info");
    state.value.selectedKeys = ["1"];
  } else {
    router.push("/update_menu/password");
    state.value.selectedKeys = ["2"];
  }
};
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: row;

  .body {
    margin: 0 auto;
  }
}
</style>
