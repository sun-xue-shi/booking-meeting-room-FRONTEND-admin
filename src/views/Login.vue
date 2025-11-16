<template>
  <div class="login-overlay" @click="handleOverlayClick">
    <div class="login-modal" @click.stop>
      <div class="modal-header">
        <h2>用户登录</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      
      <div class="login-tabs">
        <button 
          :class="['tab-btn', { active: activeTab === 'password' }]"
          @click="switchTab('password')"
        >
          账密登录
        </button>
        <button 
          :class="['tab-btn', { active: activeTab === 'email' }]"
          @click="switchTab('email')"
        >
          邮箱登录
        </button>
      </div>
      
      <div class="login-form">
        <!-- 账密登录表单 -->
        <Form
          v-if="activeTab === 'password'"
          :model="passwordLoginData"
          @finish="handlePasswordLogin"
          layout="vertical"
        >
          <FormItem
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <Input
              v-model:value="passwordLoginData.username"
              placeholder="请输入用户名"
              size="large"
            />
          </FormItem>
          
          <FormItem
            label="密码"
            name="password"
            :rules="[
              { required: true, message: '请输入密码' },
              { min: 6, max: 12, message: '密码长度为6-12位' }
            ]"
          >
            <InputPassword
              v-model:value="passwordLoginData.password"
              placeholder="请输入6-12位密码"
              size="large"
            />
          </FormItem>
          
          <FormItem>
            <Button
              type="primary"
              html-type="submit"
              size="large"
              block
              :loading="loading"
            >
              登录
            </Button>
          </FormItem>
        </Form>
        
        <!-- 邮箱登录表单 -->
        <Form
          v-show="activeTab === 'email'"
          :model="emailLoginData"
          @finish="handleEmailLogin"
        >
          <FormItem
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <Input
              v-model:value="emailLoginData.username"
              placeholder="请输入用户名"
              size="large"
            />
          </FormItem>
          
          <FormItem
            label="邮箱"
            name="email"
            :rules="[
              { required: true, message: '请输入邮箱' },
              { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: '请输入正确的邮箱格式' }
            ]"
          >
            <Input
              v-model:value="emailLoginData.email"
              placeholder="请输入邮箱"
              size="large"
            />
          </FormItem>
          
          <FormItem
            label="验证码"
            name="captcha"
            :rules="[{ required: true, message: '请输入验证码' }]"
          >
            <div class="captcha-input">
              <Input
                v-model:value="emailLoginData.captcha"
                placeholder="请输入验证码"
                size="large"
              />
              <Button 
                type="primary" 
                size="large"
                :loading="captchaLoading"
                :disabled="captchaTimer > 0"
                @click="sendCaptcha"
              >
                <span :class="{ 'countdown-text': captchaTimer > 0 }">
                  {{ captchaTimer > 0 ? `${captchaTimer}秒后重发` : '获取验证码' }}
                </span>
              </Button>
            </div>
          </FormItem>
          
          <FormItem>
            <Button
              type="primary"
              html-type="submit"
              size="large"
              block
              :loading="loading"
            >
              登录
            </Button>
          </FormItem>
        </Form>
      </div>
      
      <div class="modal-footer">
        <a href="#" @click.prevent="showRegister">没有账号，去注册</a>
        <a href="#" @click.prevent="showForgotPassword">忘记密码</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { 
  Form, 
  FormItem, 
  Input, 
  InputPassword, 
  Button 
} from 'ant-design-vue'
import { passLogin, emailLogin } from '@/service/common/api'
import { loginCaptcha } from '@/service/email/captcha'

// 定义 emits
const emit = defineEmits(['close', 'show-register', 'show-forgot-password', 'login-success'])

// 路由实例
const router = useRouter()

// 状态管理
const activeTab = ref<'password' | 'email'>('password')
const loading = ref(false)
const captchaTimer = ref(0)
const captchaLoading = ref(false)

// 账密登录表单数据
const passwordLoginData = reactive({
  username: '',
  password: ''
})

// 邮箱登录表单数据
const emailLoginData = reactive({
  username: '',
  email: '',
  captcha: ''
})

// 切换登录方式
const switchTab = (tab: 'password' | 'email') => {
  activeTab.value = tab
}

// 关闭弹窗
const closeModal = () => {
  emit('close')
}

// 点击遮罩层关闭弹窗
const handleOverlayClick = () => {
  closeModal()
}

// 显示注册弹窗
const showRegister = () => {
  emit('show-register')
}

// 显示忘记密码弹窗
const showForgotPassword = () => {
  emit('show-forgot-password')
}

// 发送验证码
const sendCaptcha = async () => {
  if (!emailLoginData.email) {
    message.error('请输入邮箱')
    return
  }
  
  // 邮箱格式校验
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(emailLoginData.email)) {
    message.error('请输入正确的邮箱格式')
    return
  }
  
  // 设置loading状态
  captchaLoading.value = true
  
  try {
    const res = await loginCaptcha(emailLoginData.email)
    if (res.data.code === 200 || res.data.code === 201) {
      message.success('验证码已发送')
      
      // 启动倒计时（倒计时期间不显示loading）
      captchaLoading.value = false
      captchaTimer.value = 60
      const timer = setInterval(() => {
        captchaTimer.value--
        if (captchaTimer.value <= 0) {
          clearInterval(timer)
        }
      }, 1000)
    } else {
      message.error(res.data.data || '发送验证码失败')
      // 重置loading状态
      captchaLoading.value = false
    }
  } catch (error) {
    message.error('发送验证码失败')
    // 重置loading状态
    captchaLoading.value = false
  }
}

// 账密登录
const handlePasswordLogin = async (values: any) => {
  loading.value = true
  try {
    const res = await passLogin(values.username, values.password)
    if (res.data.code === 200 || res.data.code === 201) {
      message.success('登录成功')
      
      // 保存信息
      localStorage.setItem('refresh_token', res.data.data.refreshToken)
      localStorage.setItem('access_token', res.data.data.accessToken)
      localStorage.setItem('user_info', JSON.stringify(res.data.data.userInfo))
      
      // 通知父组件更新用户状态
      emit('login-success', res.data.data.userInfo)
      
      // 关闭弹窗并跳转
      closeModal()
      router.push('/home')
    } else {
      message.error(res.data.data || '登录失败')
    }
  } catch (error) {
    message.error('登录失败')
  } finally {
    loading.value = false
  }
}

// 邮箱登录
const handleEmailLogin = async (values: any) => {
  loading.value = true
  try {
    const res = await emailLogin(values.username, values.email, values.captcha)
    if (res.data.code === 200 || res.data.code === 201) {
      message.success('登录成功')
      
      // 保存信息
      localStorage.setItem('refresh_token', res.data.data.refreshToken)
      localStorage.setItem('access_token', res.data.data.accessToken)
      localStorage.setItem('user_info', JSON.stringify(res.data.data.userInfo))
      
      // 通知父组件更新用户状态
      emit('login-success', res.data.data.userInfo)
      
      // 关闭弹窗并跳转
      closeModal()
      router.push('/home')
    } else {
      message.error(res.data.data || '登录失败')
    }
  } catch (error) {
    message.error('登录失败')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="less">
.login-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.login-modal {
  background: linear-gradient(145deg, #ffffff, #f0f2f5);
  border-radius: 12px;
  width: 360px;
  max-width: 90%;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
  border: 1px solid rgba(0, 0, 0, 0.05);
  animation: popIn 0.3s ease-out;
}

@keyframes popIn {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 16px 0;
  
  h2 {
    margin: 0;
    color: var(--primary-color);
    font-size: 20px;
    font-weight: 600;
  }
  
  .close-btn {
    background: none;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #999;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
    
    &:hover {
      color: #333;
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
}

.login-tabs {
  display: flex;
  border-bottom: 1px solid #e8e8e8;
  margin: 16px;
  border-radius: 8px;
  background-color: #f5f5f5;
  padding: 4px;
  
  .tab-btn {
    flex: 1;
    padding: 8px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    transition: all 0.2s ease;
    
    &.active {
      color: white;
      background: var(--primary-color);
      font-weight: 500;
      box-shadow: 0 2px 4px rgba(0, 0, 128, 0.2);
    }
  }
}

.login-form {
  padding: 0 16px 16px;
}

:deep(.ant-form-item) {
  margin-bottom: 16px;
}

:deep(.ant-form-item-label > label) {
  font-size: 13px;
  color: #555;
}

:deep(.ant-input), :deep(.ant-input-password) {
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  transition: all 0.3s;
  
  &:focus, &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 0, 128, 0.1);
  }
}

:deep(.ant-btn) {
  border-radius: 8px;
  font-size: 14px;
  height: 36px;
  transition: all 0.3s;
}

:deep(.ant-btn-primary) {
  background: var(--primary-color);
  border-color: var(--primary-color);
  
  &:hover, &:focus {
    background: #001a80;
    border-color: #001a80;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 128, 0.2);
  }
}

.captcha-input {
  display: flex;
  gap: 8px;
  
  :deep(.ant-input) {
    flex: 1;
  }
  
  :deep(.ant-btn) {
    flex-shrink: 0;
    padding: 0 12px;
  }
}

.countdown-text {
  color: white;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 0 16px 16px;
  
  a {
    color: var(--primary-color);
    text-decoration: none;
    font-size: 13px;
    transition: all 0.2s;
    
    &:hover {
      text-decoration: underline;
      color: #001a80;
    }
  }
}
</style>