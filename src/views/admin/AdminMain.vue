<template>
  <div class="container">
    <div class="header">
      <h1 @click="$router.push('/show_menu/user_manage')" class="title">
        会议室预定-管理端
      </h1>
      <UserOutlined class="icon" @click="$router.push('/update_menu/info')" />
    </div>
    <div class="menu">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from "@ant-design/icons-vue";
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;

  .header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    line-height: 80px;
    border-bottom: 1px solid #aaa;
    padding: 0 20px;
    color: rgb(37, 42, 40);

    .title {
      margin: 0;
      padding: 0;
      cursor: pointer;
      color: #272525;
      text-decoration: none;
    }

    .icon {
      font-size: 40px;
      margin-top: 20px;
      color: rgb(45, 27, 144);
    }
  }

  .menu {
    margin-top: 20px;
  }
}
</style>
