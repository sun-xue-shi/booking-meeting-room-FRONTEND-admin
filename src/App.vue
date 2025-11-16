<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import { Dropdown, Menu, MenuItem } from "ant-design-vue";
import type { MenuProps } from "ant-design-vue";

const router = useRouter();
const activeKey = ref("home");

// 用户信息状态
const isLoggedIn = ref(false);
const userInfo = ref({
  username: "",
  nickName: "",
});

// 弹窗控制状态
const showLoginModal = ref(false);
const showRegisterModal = ref(false);
const showForgotPasswordModal = ref(false);
const showUserDropdown = ref(false);

// 处理导航点击
const handleNavClick = (key: string) => {
  if (key === "login") {
    showLoginModal.value = true;
  } else {
    activeKey.value = key;
    router.push(`/${key}`);
  }
};

// 关闭登录弹窗
const closeLoginModal = () => {
  showLoginModal.value = false;
};

// 显示注册弹窗
const showRegister = () => {
  showLoginModal.value = false;
  showRegisterModal.value = true;
};

// 关闭注册弹窗
const closeRegisterModal = () => {
  showRegisterModal.value = false;
};

// 显示登录弹窗
const showLogin = () => {
  showRegisterModal.value = false;
  showLoginModal.value = true;
};

// 显示忘记密码弹窗
const showForgotPassword = () => {
  showLoginModal.value = false;
  showForgotPasswordModal.value = true;
};

// 关闭忘记密码弹窗
const closeForgotPasswordModal = () => {
  showForgotPasswordModal.value = false;
};

// 检查用户登录状态
const checkLoginStatus = () => {
  const token = localStorage.getItem("access_token");
  const userInfoStr = localStorage.getItem("user_info");

  if (token && userInfoStr) {
    isLoggedIn.value = true;
    try {
      const parsedUserInfo = JSON.parse(userInfoStr);
      userInfo.value.username = parsedUserInfo.username;
      userInfo.value.nickName =
        parsedUserInfo.nickName || parsedUserInfo.username;
    } catch (e) {
      // 解析失败时使用默认值
      userInfo.value.username = "用户";
      userInfo.value.nickName = "用户";
    }
  } else {
    isLoggedIn.value = false;
    userInfo.value.username = "";
    userInfo.value.nickName = "";
  }
};

// 退出登录
const logout = () => {
  // 清除本地存储的用户信息
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_info");

  // 更新登录状态
  isLoggedIn.value = false;
  userInfo.value.username = "";
  userInfo.value.nickName = "";

  // 跳转到首页
  activeKey.value = "home";
  router.push("/home");
};

// 处理登录成功事件
const handleLoginSuccess = (userInfo: any) => {
  isLoggedIn.value = true;
  userInfo.value = userInfo;
};

// 下拉菜单点击处理
const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
  if (key === "profile") {
    // 跳转到个人信息页面
    router.push("/update/info");
  } else if (key === "logout") {
    logout();
  }
};

// 组件挂载时检查登录状态
onMounted(() => {
  checkLoginStatus();

  // 监听路由变化，检查登录状态
  router.afterEach(() => {
    checkLoginStatus();
  });
});
</script>

<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="navbar-content">
        <div class="logo" style="display: flex; align-items: center; gap: 8px">
          <img src="@/assets/logo3.png" alt="公司logo" style="height: 80px" />
          <span
            style="
              font-size: 28px;
              font-weight: bold;
              color: var(--primary-color);
              font-family: &quot;Ma Shan Zheng&quot;, cursive,
                &quot;STKaiti&quot;, &quot;KaiTi&quot;, serif;
              text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
              letter-spacing: 2px;
              transform: skew(-5deg);
              display: inline-block;
            "
            >微光海</span
          >
        </div>
        <nav class="nav-tabs">
          <div
            v-for="tab in tabs"
            :key="tab.key"
            :class="['nav-tab', { active: activeKey === tab.key }]"
            @click="handleNavClick(tab.key)"
          >
            {{ tab.name }}
          </div>
        </nav>
        <div class="nav-actions">
          <!-- 未登录时显示登录按钮 -->
          <button
            v-if="!isLoggedIn"
            class="login-btn"
            @click="handleNavClick('login')"
          >
            登录
          </button>

          <!-- 登录后显示用户信息和下拉菜单 -->
          <div v-else class="user-info-dropdown">
            <Dropdown placement="bottomRight">
              <div class="user-info">
                <span class="username">{{ userInfo.username }}</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <template #overlay>
                <Menu @click="handleUserMenuClick">
                  <MenuItem key="profile"> 修改/完善个人信息 </MenuItem>
                  <MenuItem key="logout"> 退出登录 </MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="main-content">
      <RouterView />
    </main>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-main">
          <div class="footer-logo">
            <img src="@/assets/logo3.png" alt="公司logo" class="logo-image" />
          </div>
          <div class="footer-info">
            <p>© 2025 微光海网络科技有限公司. 保留所有权利.</p>
            <p>联系电话: 123-4567-8910 | 邮箱: contact@company.com</p>
          </div>
          <div class="footer-qr">
            <img src="@/assets/wx.jpg" alt="微信公众号" class="qr-image" />
            <p class="qr-text">关注微信公众号</p>
          </div>
        </div>
        <div class="footer-links">
          <a href="#">关于我们</a>
          <a href="#">联系我们</a>
          <a href="#">隐私政策</a>
        </div>
      </div>
    </footer>

    <!-- 登录弹窗 -->
    <Login
      v-if="showLoginModal"
      @close="closeLoginModal"
      @show-register="showRegister"
      @show-forgot-password="showForgotPassword"
      @login-success="handleLoginSuccess"
    />

    <!-- 注册弹窗 -->
    <Register
      v-if="showRegisterModal"
      @close="closeRegisterModal"
      @show-login="showLogin"
    />

    <!-- 忘记密码弹窗 -->
    <ForgotPassword
      v-if="showForgotPasswordModal"
      @close="closeForgotPasswordModal"
    />
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tabs: [
        { key: "home", name: "首页" },
        { key: "ip-diagnosis", name: "IP诊断" },
        { key: "learning-center", name: "学习中心" },
        { key: "service-operation", name: "服务运营" },
        { key: "business-connection", name: "商业对接" },
        { key: "community", name: "社群互动" },
      ],
    };
  },
};
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 主题色变量 */
:root {
  --primary-color: #00219f;
  --secondary-color: #FFD27;
  --text-color: #333;
  --bg-color: #f5f5f5;
  --white: #fff;
}

/* 应用容器 */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 导航栏样式 */
.navbar {
  background-color: var(--white);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.navbar-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
}

.nav-tabs {
  display: flex;
  gap: 10px;
}

.nav-tab {
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s;
  color: var(--text-color);
}

.nav-tab:hover {
  color: var(--primary-color);
}

.nav-tab.active {
  color: var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  font-weight: 500;
}

.login-btn {
  padding: 8px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-btn:hover {
  background-color: #001a80;
}

/* 用户信息下拉菜单样式 */
.user-info-dropdown {
  position: relative;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.user-info:hover {
  background-color: #001a80;
}

.username {
  font-weight: 500;
}

/* 下拉菜单样式覆盖 */
.user-info-dropdown :deep(.ant-dropdown) {
  top: 50px !important;
}

.user-info-dropdown :deep(.ant-dropdown-menu) {
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  padding: 4px 0;
}

.user-info-dropdown :deep(.ant-dropdown-menu-item) {
  padding: 8px 16px;
  transition: background-color 0.3s;
}

.user-info-dropdown :deep(.ant-dropdown-menu-item:hover) {
  background-color: #f5f5f5;
}

/* 主要内容区域 */
.main-content {
  flex: 1;
  background-color: white;
  width: 100%;
  margin: 0 auto;
  /* padding: 40px 20px; */
}

/* 页脚样式 */
.footer {
  background-color: #f5f5f5;
  color: #333;
  padding: 40px 0;
  /* margin-top: 60px; */
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.footer-main {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 30px;
}

.footer-info {
  text-align: center;
  line-height: 1.6;
}

.footer-links {
  display: flex;
  gap: 20px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  transition: opacity 0.3s;
}

.footer-links a:hover {
  opacity: 0.8;
}

/* 公众号二维码区域 */
.footer-logo {
  flex-shrink: 0;
}

.logo-image {
  width: 160px;
  object-fit: contain;
}

.footer-qr {
  text-align: center;
  flex-shrink: 0;
}

.qr-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.qr-text {
  margin-top: 8px;
  font-size: 14px;
  color: #666;
}
</style>
