<template>
  <div class="feedback-overlay" @click="handleOverlayClick">
    <div class="feedback-modal" @click.stop>
      <div class="modal-header">
        <h2>问题反馈</h2>
        <button class="close-btn" @click="closeModal">×</button>
      </div>

      <div class="feedback-form">
        <Form
          :model="feedbackData"
          :rules="feedbackRules"
          @finish="handleFeedbackSubmit"
          @finishFailed="handleFeedbackFailed"
          layout="vertical"
        >
          <FormItem label="遇到的问题" name="content">
            <Textarea
              v-model:value="feedbackData.content"
              placeholder="请详细描述您遇到的问题..."
              :rows="4"
              size="large"
            />
          </FormItem>

          <FormItem label="改进建议" name="suggestion">
            <Textarea
              v-model:value="feedbackData.suggestion"
              placeholder="您有什么好的建议吗？"
              :rows="4"
              size="large"
            />
          </FormItem>

          <FormItem
            label="联系方式（可选）"
            name="contact"
            :rules="[
              {
                pattern: /^(\+\d{1,3})?1[3-9]\d{9}$|^[\w._%+-]+@[\w.-]+\.[a-zA-Z]{2,}$/,
                message: '请输入正确的手机号或邮箱格式',
                trigger: 'blur'
              }
            ]"
          >
            <Input
              v-model:value="feedbackData.contact"
              placeholder="邮箱或手机号，方便我们联系您"
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
              提交反馈
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { message } from "ant-design-vue";
import { Form, FormItem, Input, Textarea, Button } from "ant-design-vue";
import { submitFeedback } from "@/service/feedback";

// 定义 props
const props = defineProps<{
  isModal?: boolean;
  isLoggedIn?: boolean;
  showLoginModal?: () => void;
}>();

// 定义 emits
const emit = defineEmits(["close"]);

// 使用 router
const router = useRouter();

// 状态管理
const loading = ref(false);

// 反馈表单数据
const feedbackData = reactive({
  content: "",
  suggestion: "",
  contact: ""
});

// 表单校验规则
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const feedbackRules: { [key: string]: any[] } = {
  content: [
    { 
      required: true, 
      message: '请输入您遇到的问题', 
      trigger: 'blur' 
    }
  ]
};

// 关闭功能
const closeModal = () => {
  if (props.isModal) {
    // 作为弹窗使用时，emit关闭事件
    emit("close");
  } else {
    // 作为路由页面使用时，返回上一页
    router.back();
  }
};

// 点击遮罩层关闭弹窗
const handleOverlayClick = () => {
  closeModal();
};

// 处理反馈提交
const handleFeedbackSubmit = async (values: any) => {
  // 检查用户是否已登录
  if (!props.isLoggedIn) {
    // 未登录，显示登录弹窗
    if (props.showLoginModal) {
      props.showLoginModal();
      closeModal(); // 关闭当前反馈弹窗
    }
    return;
  }

  loading.value = true;
  try {
    // 调用后端接口提交反馈
    const feedbackData = {
      issue: values.content,
      suggestion: values.suggestion,
      contact: values.contact
    };
    
    await submitFeedback(feedbackData);
    
    // 显示提交成功消息
    message.success('感谢您的反馈！我们会尽快处理您的建议。');
    
    // 关闭弹窗并重置表单
    closeModal();
  } catch (error) {
    message.error("提交反馈失败");
  } finally {
    loading.value = false;
  }
};

// 表单提交失败处理
const handleFeedbackFailed = (errors: any) => {
  console.log('表单校验失败:', errors);
};
</script>

<style scoped>
.feedback-overlay {
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

.feedback-modal {
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

.feedback-form {
  padding: 0 16px 16px;
}

.feedback-form :deep(.ant-form-item) {
  margin-bottom: 16px;
}

.feedback-form :deep(.ant-form-item-label > label) {
  font-size: 13px;
  color: #555;
}

.feedback-form :deep(.ant-input),
.feedback-form :deep(.ant-input-textarea) {
  border-radius: 8px;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ddd;
  transition: all 0.3s;

  &:focus,
  &:hover {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 0, 128, 0.1);
  }
}

.feedback-form :deep(.ant-btn) {
  border-radius: 8px;
  font-size: 14px;
  height: 36px;
  transition: all 0.3s;
}

.feedback-form :deep(.ant-btn-primary) {
  background: var(--primary-color);
  border-color: var(--primary-color);

  &:hover,
  &:focus {
    background: #001a80;
    border-color: #001a80;
    transform: translateY(-1px);
    box-shadow: 0 4px 8px rgba(0, 0, 128, 0.2);
  }
}

/* 响应式设计 */
@media (max-width: 576px) {
  .feedback-modal {
    margin: 16px;
    max-width: calc(100% - 32px);
  }

  .modal-header {
    padding: 16px 20px;
  }

  .feedback-form {
    padding: 0 16px 16px;
  }
}
</style>