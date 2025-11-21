<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Login from "./views/Login.vue";
import Register from "./views/Register.vue";
import ForgotPassword from "./views/ForgotPassword.vue";
import UpdateInfo from "./views/UpdateInfo.vue";
import Feedback from "./views/Feedback.vue";
import { Dropdown, Menu, MenuItem } from "ant-design-vue";
import type { MenuProps } from "ant-design-vue";
import { getUserInfo } from "@/service/common/api";

const router = useRouter();
const route = useRoute();
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
const showUpdateInfoModal = ref(false);
const showFeedbackModal = ref(false);
const showUserDropdown = ref(false);

// 处理导航点击
const handleNavClick = (key: string) => {
  if (key === "login") {
    showLoginModal.value = true;
  } else if (key === "home") {
    // 首页可以直接访问
    activeKey.value = key;
    router.push(`/${key}`);
  } else {
    // 非首页需要检查登录状态
    if (!isLoggedIn.value) {
      // 未登录，显示登录弹窗并阻止跳转
      showLoginModal.value = true;
    } else {
      // 已登录，允许跳转
      activeKey.value = key;
      router.push(`/${key}`);
    }
  }
};

// 根据当前路由路径设置激活的tab
const setActiveTab = () => {
  const path = route.path;
  if (path === "/" || path === "/home") {
    activeKey.value = "home";
  } else {
    // 移除路径中的斜杠，得到tab key
    activeKey.value = path.substring(1);
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

// 显示个人信息弹窗
const showUpdateInfo = () => {
  showUpdateInfoModal.value = true;
};

// 关闭个人信息弹窗
const closeUpdateInfoModal = () => {
  showUpdateInfoModal.value = false;
};

// 显示问题反馈弹窗
const showFeedback = () => {
  // 检查用户是否已登录
  if (!isLoggedIn.value) {
    // 未登录，显示登录弹窗
    showLoginModal.value = true;
  } else {
    // 已登录，显示反馈弹窗
    showFeedbackModal.value = true;
  }
};

// 显示登录弹窗函数
const showLoginModalFunction = () => {
  showLoginModal.value = true;
};

// 关闭问题反馈弹窗
const closeFeedbackModal = () => {
  showFeedbackModal.value = false;
};

// 检查登录状态
const checkLoginStatus = async () => {
  const token = localStorage.getItem("access_token");
  if (token) {
    isLoggedIn.value = true;

    // 获取用户信息并打印
    try {
      const res = await getUserInfo();
      if (res.data.code === 200 || res.data.code === 201) {
        const userData = res.data.data;

        // 更新用户信息
        userInfo.value.username = userData.username || "用户";
        userInfo.value.nickName = userData.nickName || "昵称";
      } else {
        // 使用localStorage中的用户信息作为备选
        const localUserInfo = localStorage.getItem("user_info");
        if (localUserInfo) {
          const parsedInfo = JSON.parse(localUserInfo);
          userInfo.value.username = parsedInfo.username || "用户";
          userInfo.value.nickName = parsedInfo.nickName || "昵称";
        }
      }
    } catch (error) {
      // 使用localStorage中的用户信息作为备选
      const localUserInfo = localStorage.getItem("user_info");
      if (localUserInfo) {
        const parsedInfo = JSON.parse(localUserInfo);
        userInfo.value.username = parsedInfo.username || "用户";
        userInfo.value.nickName = parsedInfo.nickName || "昵称";
      }
    }
  } else {
    isLoggedIn.value = false;
    userInfo.value.username = "";
    userInfo.value.nickName = "";
  }
};

// 退出登录
const logout = () => {
  // 清除本地存储的token
  localStorage.removeItem("access_token");

  // 更新登录状态
  isLoggedIn.value = false;
  userInfo.value.username = "";
  userInfo.value.nickName = "";

  // 跳转到首页
  activeKey.value = "home";
  router.push("/home");
};

// 处理登录成功事件
const handleLoginSuccess = async (loginUserInfo: any) => {
  isLoggedIn.value = true;
  userInfo.value = loginUserInfo;

  // 登录成功后立即获取并打印最新的用户信息
  try {
    const res = await getUserInfo();
    if (res.data.code === 200 || res.data.code === 201) {
      const userData = res.data.data;

      // 更新用户信息为最新数据
      userInfo.value.username =
        userData.username || loginUserInfo.username || "用户";
      userInfo.value.nickName =
        userData.nickName || loginUserInfo.nickName || "昵称";
    } else {
    }
  } catch (error) {
    console.log("登录成功后获取用户信息出错:", error);
  }
};

// 下拉菜单点击处理
const handleUserMenuClick: MenuProps["onClick"] = ({ key }) => {
  if (key === "profile") {
    // 显示个人信息弹窗
    showUpdateInfo();
  } else if (key === "logout") {
    logout();
  }
};

// 组件挂载时检查登录状态并设置当前激活的tab
onMounted(() => {
  checkLoginStatus();
  setActiveTab();

  // 监听路由变化，检查登录状态并同步tab状态
  router.afterEach(() => {
    checkLoginStatus();
    setActiveTab();
  });
});
</script>

<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="navbar-content">
        <div class="logo" style="display: flex; align-items: center; gap: 8px" @click="handleNavClick('home')">
          <img src="@/assets/logo.png" alt="公司logo" style="height: 150px; cursor: pointer;" />
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
            <img
              src="@/assets/logo.png"
              alt="公司logo"
              class="logo-image"
            />
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

    <!-- 个人信息弹窗 -->
    <UpdateInfo
      v-if="showUpdateInfoModal"
      :is-modal="true"
      @close="closeUpdateInfoModal"
    />

    <!-- 回到顶部和问题反馈按钮 -->
    <div class="floating-buttons">
      <button 
        class="floating-button feedback-button" 
        @click="showFeedback"
        title="问题反馈"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 16V12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 8H12.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button 
        class="floating-button top-button" 
        @click="scrollToTop"
        :class="{ 'show': showBackToTop }"
        title="回到顶部"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 19V5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 12L12 5L19 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- 问题反馈弹窗 -->
    <Feedback
      v-if="showFeedbackModal"
      :is-modal="true"
      :is-logged-in="isLoggedIn"
      :show-login-modal="showLoginModalFunction"
      @close="closeFeedbackModal"
    />
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue';

export default {
  data() {
    return {
      tabs: [
        { key: "home", name: "首页" },
        { key: "ip-diagnosis", name: "IP诊断" },
        { key: "learning-center", name: "学习中心" },
        { key: "service-operation", name: "服务运营" },
        { key: "business-connection", name: "商业对接" },
      ],
      // 悬浮按钮相关数据
      showBackToTop: false,
      showFeedbackModal: false
    };
  },
  mounted() {
    // 监听滚动事件，控制回到顶部按钮显示
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    // 清理事件监听器
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    // 处理滚动事件
    handleScroll() {
      this.showBackToTop = window.scrollY > 300;
    },
    
    // 回到顶部
    scrollToTop() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
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
  --primary-color: #002e9f;
  --secondary-color: #ffd271;
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
  background-color: var(--secondary-color);
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
  color: var(--primary-color);
  font-weight: 500;
}

.nav-tab:hover {
  color: var(--primary-color);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
}

.nav-tab.active {
  color: var(--primary-color);
  background-color: rgba(239, 228, 161, 0.9);
  border-radius: 4px;
  font-weight: 600;
}

.login-btn {
  padding: 8px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-btn:hover {
  background-color: #001a80;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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
  transition: all 0.3s;
  font-weight: 500;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-info:hover {
  background-color: #001a80;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
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
  background-color: var(--secondary-color);
  width: 100%;
  margin: 0 auto;
}

/* 页脚样式 */
.footer {
  background-color: #f5f5f5;
  color: #333;
  padding: 40px 0;
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
  width: 200px;
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

/* 悬浮按钮样式 */
.floating-buttons {
  position: fixed;
  right: 30px;
  bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  z-index: 1000;
}

.floating-button {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  outline: none;
}

.floating-button:hover {
  background-color: #001a80;
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}

.floating-button.feedback-button {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.floating-button.feedback-button:hover {
  background-color: #ffda4d;
}

/* 回到顶部按钮显示/隐藏动画 */
.floating-button.top-button {
  opacity: 0;
  transform: translateY(20px);
  visibility: hidden;
}

.floating-button.top-button.show {
  opacity: 1;
  transform: translateY(0);
  visibility: visible;
}



/* 响应式设计 */
@media (max-width: 768px) {
  .floating-buttons {
    right: 20px;
    bottom: 20px;
  }
  
  .floating-button {
    width: 45px;
    height: 45px;
  }
  
  .feedback-modal {
    margin: 10px;
    max-height: calc(100vh - 20px);
  }
  
  .feedback-modal-header,
  .feedback-modal-body,
  .feedback-modal-footer {
    padding: 15px;
  }
}
</style>
