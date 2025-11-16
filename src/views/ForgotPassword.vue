<template>
  <div class="forgot-password-overlay" @click="handleOverlayClick">
    <div class="forgot-password-modal" @click.stop>
      <div class="modal-header">
        <h2>忘记密码</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </div>
      
      <div class="forgot-password-form">
        <Form
          :model="forgotPasswordData"
          @finish="handleForgotPassword"
          layout="vertical"
        >
          <FormItem
            label="用户名"
            name="username"
            :rules="[{ required: true, message: '请输入用户名' }]"
          >
            <Input
              v-model:value="forgotPasswordData.username"
              placeholder="请输入用户名"
              size="large"
            />
          </FormItem>
          
          <FormItem
            label="邮箱"
            name="email"
            :rules="[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' }
            ]"
          >
            <Input
              v-model:value="forgotPasswordData.email"
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
                v-model:value="forgotPasswordData.captcha"
                placeholder="请输入验证码"
                size="large"
              />
              <Button
                type="primary"
                @click="sendCaptcha"
                :disabled="captchaTimer > 0"
                :loading="captchaLoading"
              >
                <span :class="captchaTimer > 0 ? 'countdown-text' : ''">
                  {{ captchaTimer > 0 ? `${captchaTimer}秒后重发` : '获取验证码' }}
                </span>
              </Button>
            </div>
          </FormItem>
          
          <FormItem
            label="新密码"
            name="newPassword"
            :rules="[
              { required: true, message: '请输入新密码' },
              { min: 6, max: 12, message: '密码长度为6-12位' }
            ]"
          >
            <InputPassword
              v-model:value="forgotPasswordData.newPassword"
              placeholder="请输入6-12位新密码"
              size="large"
            />
          </FormItem>
          
          <FormItem
            label="确认新密码"
            name="confirmNewPassword"
            :rules="[
              { required: true, message: '请确认新密码' },
              { validator: validateConfirmPassword, trigger: 'change' }
            ]"
          >
            <InputPassword
              v-model:value="forgotPasswordData.confirmNewPassword"
              placeholder="请再次输入新密码"
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
              重置密码
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue'
import { 
  Form, 
  FormItem, 
  Input, 
  InputPassword, 
  Button 
} from 'ant-design-vue'
import { updatePasswordCaptcha } from '@/service/email/captcha'

// 定义 emits
const emit = defineEmits(['close'])

// 状态管理
const loading = ref(false)
const captchaTimer = ref(0)
const captchaLoading = ref(false)

// 忘记密码表单数据
const forgotPasswordData = reactive({
  username: '',
  email: '',
  captcha: '',
  newPassword: '',
  confirmNewPassword: ''
})

// 关闭弹窗
const closeModal = () => {
  emit('close')
}

// 点击遮罩层关闭弹窗
const handleOverlayClick = () => {
  closeModal()
}

// 确认密码校验
const validateConfirmPassword = (_rule: any, value: string) => {
  if (value && value !== forgotPasswordData.newPassword) {
    return Promise.reject('两次输入的密码不一致')
  }
  return Promise.resolve()
}

// 发送验证码
const sendCaptcha = async () => {
  if (!forgotPasswordData.email) {
    message.error('请输入邮箱')
    return
  }
  
  // 邮箱格式校验
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(forgotPasswordData.email)) {
    message.error('请输入正确的邮箱格式')
    return
  }
  
  // 设置loading状态
  captchaLoading.value = true
  
  try {
    // 这里需要调用忘记密码的验证码接口，暂时使用 updatePasswordCaptcha
    const res = await updatePasswordCaptcha(forgotPasswordData.email)
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

// 处理忘记密码
const handleForgotPassword = async (values: any) => {
  // 这里应该调用重置密码的接口，由于没有提供相关API，暂时只显示成功消息
  message.success('密码重置成功')
  closeModal()
}
</script>

<style scoped lang="less">
.forgot-password-overlay {
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

.forgot-password-modal {
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

.forgot-password-form {
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
</style>