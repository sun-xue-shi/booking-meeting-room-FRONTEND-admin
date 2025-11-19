<template>
  <div class="update-info-overlay" @click="handleOverlayClick">
    <div class="update-info-modal" @click.stop>
      <div class="modal-header">
        <h2>修改/完善个人信息</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </div>

      <div class="update-info-form">
        <Form :model="updateInfoData" @finish="handleUpdateInfo" layout="vertical">
          <FormItem label="行业" name="industry">
            <Input v-model:value="updateInfoData.industry" placeholder="请输入所在行业" size="large" />
          </FormItem>

          <FormItem label="抖音账号" name="douyinAccount">
            <Input v-model:value="updateInfoData.douyinAccount" placeholder="请输入抖音账号" size="large" />
          </FormItem>

          <FormItem
            label="联系方式（手机号）"
            name="phone"
            :rules="[
              { required: true, message: '请输入手机号' },
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号格式' }
            ]"
          >
            <Input v-model:value="updateInfoData.phone" placeholder="请输入手机号" size="large" />
          </FormItem>

          <FormItem
            label="邮箱"
            name="email"
            :rules="[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' }
            ]"
          >
            <Input v-model:value="updateInfoData.email" placeholder="请输入邮箱" size="large" />
          </FormItem>

          <FormItem label="目标需求" name="targetNeeds">
            <Select
              v-model:value="updateInfoData.targetNeeds"
              mode="multiple"
              placeholder="请选择目标需求（可多选）"
              :options="targetNeedOptions"
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
                v-model:value="updateInfoData.captcha"
                placeholder="请输入验证码"
                size="large"
              />
              <Button
                type="primary"
                @click="sendCaptcha"
                :disabled="captchaTimer > 0 || isSend"
                :loading="captchaLoading"
              >
                <span :class="captchaTimer > 0 ? 'countdown-text' : ''">
                  {{ captchaTimer > 0 ? `${captchaTimer}秒后重发` : '发送验证码' }}
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
              确认修改
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { 
  Form, 
  FormItem, 
  Input, 
  Select, 
  Button 
} from 'ant-design-vue'
import { useInfoStore } from '@/stores/info'
import { updateInfo } from '@/service/common/api'
import { updateInfoCaptcha } from '@/service/email/captcha'

// 定义 props
const props = defineProps<{
  isModal?: boolean
}>()

// 定义 emits
const emit = defineEmits(['close'])

// 使用 router
const router = useRouter()

// 使用 store
const infoStore = useInfoStore()

// 状态管理
const loading = ref(false)
const captchaTimer = ref(0)
const captchaLoading = ref(false)
const isSend = ref(false)

// 目标需求选项
const targetNeedOptions = [
  { label: 'IP诊断', value: 'ip-diagnosis' },
  { label: '商业对接', value: 'business-connection' },
  { label: '课程学习', value: 'learning-center' },
  { label: '服务运营', value: 'service-operation' }
]

// 修改信息表单数据
const updateInfoData = reactive({
  industry: '',
  douyinAccount: '',
  phone: '',
  email: '',
  targetNeeds: [] as string[],
  captcha: ''
})

// 关闭功能
const closeModal = () => {
  if (props.isModal) {
    // 作为弹窗使用时，emit关闭事件
    emit('close')
  } else {
    // 作为路由页面使用时，返回上一页
    router.back()
  }
}

// 点击遮罩层关闭弹窗
const handleOverlayClick = () => {
  closeModal()
}

// 发送验证码
const sendCaptcha = async () => {
  if (!updateInfoData.email) {
    message.error('请输入邮箱')
    return
  }
  
  // 邮箱格式校验
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(updateInfoData.email)) {
    message.error('请输入正确的邮箱格式')
    return
  }
  
  // 设置loading状态
  captchaLoading.value = true
  
  try {
    const res = await updateInfoCaptcha()
    if (res.data.code === 200 || res.data.code === 201) {
      message.success('验证码已发送')
      
      // 启动倒计时
      captchaLoading.value = false
      isSend.value = true
      captchaTimer.value = 30
      const timer = setInterval(() => {
        captchaTimer.value--
        if (captchaTimer.value <= 0) {
          clearInterval(timer)
          isSend.value = false
        }
      }, 1000)
    } else {
      message.error(res.data.data || '发送验证码失败')
      captchaLoading.value = false
    }
  } catch (error) {
    message.error('发送验证码失败')
    captchaLoading.value = false
  }
}

// 处理信息更新
const handleUpdateInfo = async (values: any) => {
  loading.value = true
  try {
    // 构造请求参数
    const updateParams = {
      industry: updateInfoData.industry,
      douyinAccount: updateInfoData.douyinAccount,
      phone: updateInfoData.phone,
      email: updateInfoData.email,
      targetNeeds: updateInfoData.targetNeeds.join(','),
      captcha: updateInfoData.captcha
    }
    
    const res = await updateInfo(updateParams)
    if (res.data.code === 200 || res.data.code === 201) {
      message.success('信息更新成功')
      closeModal()
    } else {
      message.error(res.data.data || '信息更新失败')
    }
  } catch (error) {
    message.error('信息更新失败')
  } finally {
    loading.value = false
  }
}

// 获取用户信息并填充表单
const loadUserInfo = async () => {
  try {
    await infoStore.getLoginInfo()
    const userInfo = infoStore.updateUserInfo
    
    // 填充表单数据
    updateInfoData.email = userInfo.email || ''
    updateInfoData.industry = userInfo.industry || ''
    updateInfoData.douyinAccount = userInfo.douyinAccount || ''
    updateInfoData.phone = userInfo.phone || ''
    updateInfoData.targetNeeds = userInfo.targetNeeds || []
  } catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

// 组件挂载时加载用户信息
onMounted(() => {
  loadUserInfo()
})
</script>

<style scoped lang="less">
.update-info-overlay {
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

.update-info-modal {
  background: linear-gradient(145deg, #ffffff, #f0f2f5);
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
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

.update-info-form {
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

:deep(.ant-select) {
  border-radius: 8px;
  
  .ant-select-selector {
    border-radius: 8px !important;
    border: 1px solid #ddd !important;
    transition: all 0.3s;
    
    &:hover {
      border-color: var(--primary-color) !important;
    }
  }
  
  &.ant-select-focused {
    .ant-select-selector {
      border-color: var(--primary-color) !important;
      box-shadow: 0 0 0 2px rgba(0, 0, 128, 0.1) !important;
    }
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

@media (max-width: 576px) {
  .update-info-modal {
    margin: 16px;
    max-width: calc(100% - 32px);
  }
  
  .modal-header {
    padding: 16px 20px;
  }
  
  .update-info-form {
    padding: 0 16px 16px;
  }
  
  .captcha-input {
    flex-direction: column;
  }
}
</style>