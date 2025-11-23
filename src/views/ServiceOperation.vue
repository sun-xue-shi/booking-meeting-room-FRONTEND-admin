<template>
  <div class="service-operation-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">服务运营</h1>
      <p class="page-subtitle">专业的IP服务运营，助力您的内容创作与品牌推广</p>
    </div>

    <!-- 服务需求提交 -->
    <a-card class="section-card">
      <template #title>
        <div class="card-title-container">
          <span>提交服务需求</span>
          <a class="view-packages-link" @click="scrollToPackages"
            >查看所有套餐</a
          >
        </div>
      </template>
      <a-form
        v-if="!formReadOnly"
        :model="serviceForm"
        :rules="serviceFormRules"
        layout="vertical"
        @finish="submitService"
      >
        <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item label="选择服务套餐" name="package">
              <a-select
                v-model:value="serviceForm.package"
                placeholder="请选择服务套餐"
                :options="packageOptions"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="选择重点服务内容" name="services">
              <a-select
                v-model:value="serviceForm.services"
                mode="multiple"
                placeholder="请选择重点服务内容"
                :options="serviceOptions"
              />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item label="具体需求描述" name="description">
              <a-textarea
                v-model:value="serviceForm.description"
                placeholder="请详细描述您的具体需求..."
                :rows="4"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="联系人姓名" name="contactName">
              <a-input
                v-model:value="serviceForm.contactName"
                placeholder="请输入联系人姓名"
              />
            </a-form-item>
          </a-col>

          <a-col :span="12">
            <a-form-item label="联系电话" name="contactPhone">
              <a-input
                v-model:value="serviceForm.contactPhone"
                placeholder="请输入联系电话"
              />
            </a-form-item>
          </a-col>

          <a-col :span="24">
            <a-form-item>
              <a-button type="primary" html-type="submit" :loading="submitting">
                提交服务需求
              </a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <!-- 只读表单展示 -->
      <div v-else class="readonly-form">
        <a-row :gutter="24">
          <a-col :span="12">
            <div class="form-field">
              <label class="field-label">选择服务套餐:</label>
              <div class="field-value">
                {{ getPackageName(serviceForm.package) }}
              </div>
            </div>
          </a-col>

          <a-col :span="12">
            <div class="form-field">
              <label class="field-label">选择重点服务内容:</label>
              <div class="field-value">
                {{ getServiceNames(serviceForm.services) }}
              </div>
            </div>
          </a-col>

          <a-col :span="24">
            <div class="form-field">
              <label class="field-label">具体需求描述:</label>
              <div class="field-value textarea-value">
                {{ serviceForm.description }}
              </div>
            </div>
          </a-col>

          <a-col :span="12">
            <div class="form-field">
              <label class="field-label">联系人姓名:</label>
              <div class="field-value">{{ serviceForm.contactName }}</div>
            </div>
          </a-col>

          <a-col :span="12">
            <div class="form-field">
              <label class="field-label">联系电话:</label>
              <div class="field-value">{{ serviceForm.contactPhone }}</div>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>

    <!-- 进度跟踪 -->
    <a-card
      v-if="serviceRequestSubmitted"
      class="section-card"
      title="服务进度跟踪"
    >
      <div class="progress-tracker">
        <a-steps :current="currentProgress" direction="horizontal">
          <a-step title="已提交需求" description="您的服务需求已成功提交" />
          <a-step
            title="已对接运营团队"
            description="专属运营团队已与您取得联系"
          />
          <a-step title="孵化中" description="服务正在进行中，请耐心等待" />
          <a-step title="服务完成" description="服务已完成，期待您的评价" />
        </a-steps>
      </div>
    </a-card>

    <!-- 服务评价 -->
    <a-card v-if="currentProgress === 3" class="section-card" title="服务评价">
      <!-- 评价表单 (仅在未评价时显示) -->
      <a-form
        v-if="!reviewSubmitted"
        :model="reviewForm"
        :rules="reviewFormRules"
        layout="vertical"
        @finish="submitReview"
      >
        <a-form-item label="服务质量评分" name="rating">
          <a-rate
            v-model:value="reviewForm.rating"
            :tooltips="ratingTooltips"
          />
        </a-form-item>

        <a-form-item label="评价内容" name="content">
          <a-textarea
            v-model:value="reviewForm.content"
            placeholder="请分享您的服务体验..."
            :rows="4"
          />
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            :loading="reviewSubmitting"
          >
            提交评价
          </a-button>
        </a-form-item>
      </a-form>

      <!-- 评价展示 (仅在已评价时显示) -->
      <div v-else class="readonly-form">
        <a-row :gutter="24">
          <a-col :span="24">
            <div class="form-field">
              <label class="field-label">服务质量评分:</label>
              <div class="field-value">
                <a-rate
                  :value="submittedReview.rating"
                  :tooltips="ratingTooltips"
                  disabled
                />
              </div>
            </div>
          </a-col>

          <a-col :span="24">
            <div class="form-field">
              <label class="field-label">评价内容:</label>
              <div class="field-value textarea-value">
                {{ submittedReview.content }}
              </div>
            </div>
          </a-col>
        </a-row>
      </div>
    </a-card>

    <!-- 套餐选择 -->
    <a-card class="section-card" title="全部服务套餐" id="packages-section">
      <div class="packages-grid">
        <a-card
          v-for="pkg in servicePackages"
          :key="pkg.id"
          class="package-card"
        >
          <template #title>
            <div class="package-header">
              <span class="package-name">{{ pkg.name }}</span>
              <a-tag :color="getPackageTagColor(pkg.type)">{{ pkg.tag }}</a-tag>
            </div>
          </template>
          <div class="package-content">
            <div class="package-price">{{ pkg.price }}</div>
            <div class="package-audience">{{ pkg.audience }}</div>
            <div class="package-cost-info">{{ pkg.costInfo }}</div>
            <a-divider />
            <ul class="package-features">
              <li v-for="(feature, index) in pkg.features" :key="index">
                <check-circle-outlined class="feature-icon" />
                {{ feature }}
              </li>
            </ul>
          </div>
        </a-card>

        <!-- 通用服务保障卡片 -->
        <a-card class="package-card guarantee-card">
          <template #title>
            <div class="package-header">
              <span class="package-name">通用服务保障</span>
            </div>
          </template>
          <div class="package-content">
            <ul class="package-features guarantee-features">
              <li>
                <check-circle-outlined class="feature-icon" />
                风险兜底：未起号（按套餐约定标准）仅收设备租金，无任何隐性消费
              </li>
              <li>
                <check-circle-outlined class="feature-icon" />
                版权归属：所有内容、IP形象、账号权益均归客户所有，我方仅保留案例展示权（需提前征得同意）
              </li>
              <li>
                <check-circle-outlined class="feature-icon" />
                服务团队：启航套餐 1 人专属运营，成长套餐 3 人小组（策划 + 拍摄
                + 运营），变现套餐 5 人团队（含商务）
              </li>
              <li>
                <check-circle-outlined class="feature-icon" />
                灵活调整：支持中途更换套餐，设备租金多退少补，抽成规则可根据 IP
                成长进度协商调整
              </li>
              <li>
                <check-circle-outlined class="feature-icon" />
                售后支持：所有套餐均提供 1
                年免费售后咨询，包含内容优化、平台规则更新、变现技巧指导
              </li>
            </ul>
          </div>
        </a-card>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
// @ts-nocheck
import { ref, reactive, onMounted } from "vue";
import {
  Card as ACard,
  Form as AForm,
  FormItem as AFormItem,
  Input as AInput,
  Textarea as ATextarea,
  Button as AButton,
  CheckboxGroup as ACheckboxGroup,
  Checkbox as ACheckbox,
  Row as ARow,
  Col as ACol,
  Tag as ATag,
  Divider as ADivider,
  Steps as ASteps,
  Step as AStep,
  Rate as ARate,
  Select as ASelect,
  message,
} from "ant-design-vue";
import { CheckCircleOutlined } from "@ant-design/icons-vue";
import {
  submitServiceRequest,
  getServiceProgress,
  submitServiceReview,
} from "@/service/server";

// 套餐数据
const servicePackages = ref([
  {
    id: 0,
    name: "特色套餐",
    tag: "0押金孵化・起号再抽成",
    price: "¥0 起",
    audience: "适合人群：想尝试IP孵化但担心风险的所有人群",
    costInfo: "费用说明：零押金孵化，仅需支付设备租金，起号成功后再按收益抽成",
    features: [
      "零押金孵化：无需支付任何押金，降低试错成本",
      "仅付设备租金：未起号只需支付设备租金，无额外费用",
      "起号再抽成：起号成功后按实际收益分成，风险共担",
      "无号零额外费用：没有粉丝基础也不用担心，我们提供全套孵化服务",
      "专业团队支持：资深运营团队全程陪伴，从0到1打造个人IP",
      "全方位服务：人设定位、内容创作、账号运营、流量推广一站式服务",
      "灵活合作模式：可根据实际情况调整服务内容和合作方式",
    ],
    popular: true,
    type: "gold",
  },
  {
    id: 1,
    name: "素人启航套餐",
    tag: "0 基础・首次做 IP・低成本试错",
    price: "¥800-1500/月",
    audience:
      "适合人群：猪肉铺老板、货车司机、早餐店主等 0 基础素人，想尝试 IP 但担心风险，预算有限",
    costInfo:
      "费用说明：起号成功（粉丝≥1000 + 且单条视频平均播放≥5000）后，按 IP 后续商业收益的 15% 抽成（抽成期限 12 个月）",
    features: [
      "人设精准挖掘：提炼职业亮点（如 “足斤足两的实在肉铺老板”“懂路况的暖心货车师傅”），打造差异化标签",
      "账号基础搭建：全平台（抖音 / 快手 / 视频号）账号注册、头像 / 简介优化、蓝 V 认证代办",
      "入门内容产出：10 条定制化短视频脚本、5 条成品拍摄剪辑（含场地布景指导）、2 次口播技巧培训",
      "基础运营助推：账号日常维护、粉丝互动回复、平台流量规则适配优化",
      "未起号：仅支付对应周期设备租金，无任何额外加工费、运营费",
      "增值权益：1 次免费人设诊断、2 条内容免费修改、平台避坑手册、基础拍摄设备使用教学",
    ],
    popular: false,
    type: "silver",
  },
  {
    id: 2,
    name: "IP 成长套餐",
    tag: "有初步粉丝・想放大影响力",
    price: "¥1800-2800/月",
    audience:
      "适合人群：已有 1000 + 粉丝，内容有一定基础，想快速破圈、提升曝光的素人",
    costInfo:
      "费用说明：起号成功（粉丝≥1 万 + 且单月商业收益≥5000 元）后，按 IP 后续商业收益的 20% 抽成（抽成期限 10 个月）",
    features: [
      "人设升级强化：深化记忆点标签、优化内容赛道定位、竞品差异化分析",
      "批量内容产出：月度 20 条优质短视频（含拍摄剪辑）、4 场主题直播全策划（含话术、互动设计）、8 篇配套图文文案",
      "全平台运营：账号数据监测、粉丝分层互动、内容优化迭代、热门话题对接",
      "精准流量助推：垂类自然流量优化、小额付费投流（费用含在后续抽成中）、同城 / 行业流量池对接",
      "未起号：仅支付对应周期设备租金，无需支付运营费、投流费、内容加工费",
      "增值权益：月度数据复盘报告、3 次内容创意升级、直播全程陪跑、商业合作入门指导",
    ],
    popular: false,
    type: "gold",
  },
  {
    id: 3,
    name: "IP 变现套餐",
    tag: "粉丝稳定・聚焦收益转化",
    price: "¥2500-3800/月",
    audience:
      "适合人群：粉丝≥1 万 +，内容有影响力，想通过带货、广告、私域等方式实现稳定收益的素人 IP",
    costInfo:
      "费用说明：按 IP 月度商业收益的 25% 抽成（抽成期限 8 个月，收益越高抽成比例可协商降低）",
    features: [
      "变现路径定制：根据职业特性设计专属方案（如本地到店引流、垂类产品带货、行业广告对接、私域社群转化）",
      "爆款内容打造：月度 30 条高转化短视频、8 场带货 / 引流直播全执行（含选品、场控、售后对接）、爆款脚本库支持",
      "商业资源对接：专属商务团队对接品牌广告、供应链选品（无中间差价）、本地商家合作洽谈",
      "IP 矩阵搭建：多账号联动运营、内容二次分发、跨平台流量整合、IP 形象升级维护",
      "保障机制：若月度收益未达预期（低于 1 万元），可申请减免当月 50% 设备租金，或延长服务周期",
      "增值权益：无限次内容修改、成交转化话术培训、私域运营全方案、年度 IP 增长规划、行业资源整合支持",
    ],
    popular: false,
    type: "diamond",
  },
]);

// 状态管理
const serviceRequestSubmitted = ref(false);
const currentProgress = ref(0); // 0: 已提交需求, 1: 已对接运营团队, 2: 孵化中, 3: 服务完成
const submitting = ref(false);
const reviewSubmitting = ref(false);
const formReadOnly = ref(false);
const reviewSubmitted = ref(false); // 是否已提交评价

// 表单数据
const serviceForm = reactive({
  package: undefined as number | undefined,
  services: [] as string[],
  description: "",
  contactName: "",
  contactPhone: "",
});

// 套餐选项
const packageOptions = [
  { label: "特色套餐", value: 0 },
  { label: "素人启航套餐", value: 1 },
  { label: "IP成长套餐", value: 2 },
  { label: "IP变现套餐", value: 3 },
];

// 服务选项
const serviceOptions = [
  { label: "内容策划", value: 0 },
  { label: "流量推广", value: 1 },
  { label: "账号运营", value: 2 },
  { label: "商业变现", value: 3 },
];

const reviewForm = reactive({
  rating: 0,
  content: "",
});

// 已提交的评价数据
const submittedReview = reactive({
  rating: 0,
  content: "",
});

// 表单规则
const serviceFormRules = {
  package: [{ required: true, message: "请选择服务套餐" }],
  services: [{ required: true, message: "请选择服务内容" }],
  description: [{ required: true, message: "请输入具体需求描述" }],
  contactName: [{ required: true, message: "请输入联系人姓名" }],
  contactPhone: [{ required: true, message: "请输入联系电话" }],
};

const reviewFormRules = {
  rating: [{ required: true, message: "请评分" }],
  content: [{ required: true, message: "请输入评价内容" }],
};

// 评分提示
const ratingTooltips = ["极差", "失望", "一般", "满意", "惊喜"];

// 获取套餐标签颜色
const getPackageTagColor = (type: string) => {
  switch (type) {
    case "silver":
      return "default";
    case "gold":
      return "gold";
    case "diamond":
      return "blue";
    default:
      return "default";
  }
};

// 根据套餐ID获取套餐名称
const getPackageName = (packageId: number | undefined) => {
  if (packageId === undefined) return "";
  const pkg = servicePackages.value.find((p) => p.id === packageId);
  return pkg ? pkg.name : "";
};

// 根据服务ID数组获取服务名称
const getServiceNames = (serviceIds: string[]) => {
  if (!serviceIds || serviceIds.length === 0) return "";
  const names = serviceIds.map((id) => {
    const service = serviceOptions.find((s) => s.value === id);
    return service ? service.label : "";
  });
  return names.join(", ");
};

// 滚动到套餐展示区域
const scrollToPackages = () => {
  const packagesSection = document.getElementById("packages-section");
  if (packagesSection) {
    packagesSection.scrollIntoView({ behavior: "smooth" });
  }
};

// 提交服务需求
const submitService = async () => {
  submitting.value = true;
  try {
    // 调用提交服务需求API
    const requestData = {
      packageOption: serviceForm.package || 0,
      serviceOption:
        serviceForm.services.length > 0 ? serviceForm.services : [],
      description: serviceForm.description,
      contactName: serviceForm.contactName,
      contactInfo: serviceForm.contactPhone,
    };

    const response = await submitServiceRequest(requestData);

    // 更新状态
    serviceRequestSubmitted.value = true;
    formReadOnly.value = true;
    // 从提交响应中直接获取进度信息
    if (response.data && response.data.progress !== undefined) {
      currentProgress.value = response.data.progress;
    } else {
      currentProgress.value = 0;
    }

    message.success("服务需求提交成功！");
  } catch (error: any) {
    console.error("提交失败:", error);
    message.error("提交失败，请重试: " + (error.message || "未知错误"));
  } finally {
    submitting.value = false;
  }
};

// 页面加载时获取用户的服务进度信息
onMounted(async () => {
  try {
    const response = await getServiceProgress();

    // 如果有历史数据，则回显数据并设置为只读状态
    if (response.data && response.data.data.length > 0) {
      const userData = response.data.data[0];

      // 填充表单数据
      serviceForm.package = userData.packageOption;

      if (userData.serviceOptionsString) {
        // 处理后端返回的字符串格式服务选项，如 "1,3"

        serviceForm.services = userData.serviceOptionsString
          .split(",")
          .map((item) => Number(item.trim()));
      } else {
        serviceForm.services = [];
      }

      serviceForm.description = userData.description;
      serviceForm.contactName = userData.contactName;
      serviceForm.contactPhone = userData.contactInfo;

      // 设置状态
      serviceRequestSubmitted.value = true;
      formReadOnly.value = true;
      currentProgress.value = userData.progress;

      // 如果有评价数据，则显示评价内容
      if (userData.reviewContent && userData.rating) {
        submittedReview.rating = userData.rating;
        submittedReview.content = userData.reviewContent;
        reviewSubmitted.value = true;
      }
    }
  } catch (error: any) {
    console.error("获取服务进度失败:", error);
    // 不显示错误消息，因为可能用户还没有提交过服务需求
  }
});

// 提交评价
const submitReview = async () => {
  reviewSubmitting.value = true;
  try {
    // 检查评分是否已填写
    if (reviewForm.rating === 0) {
      message.warning("请为服务质量评分");
      reviewSubmitting.value = false;
      return;
    }

    // 检查评价内容是否已填写
    if (!reviewForm.content.trim()) {
      message.error("请输入评价内容");
      reviewSubmitting.value = false;
      return;
    }

    // 调用提交服务评价API
    const reviewData = {
      rating: reviewForm.rating,
      content: reviewForm.content,
    };

    const response = await submitServiceReview(reviewData);

    // 提交成功后，显示评价内容
    message.success("评价提交成功，感谢您的反馈！");

    // 将评价数据保存到已提交评价中
    submittedReview.rating = reviewForm.rating;
    submittedReview.content = reviewForm.content;
    reviewSubmitted.value = true;

    // 清空表单
    reviewForm.rating = 0;
    reviewForm.content = "";
  } catch (error: any) {
    console.error("提交失败:", error);
    message.error("提交失败，请重试: " + (error.message || "未知错误"));
  } finally {
    reviewSubmitting.value = false;
  }
};
</script>

<style scoped>
.service-operation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 64px);
  background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 - 微光海效果 */
.service-operation-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 30% 30%,
      rgba(0, 46, 159, 0.05) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 70%,
      rgba(0, 46, 159, 0.08) 0%,
      transparent 60%
    );
  z-index: 0;
}

.service-operation-container > * {
  position: relative;
  z-index: 1;
}

/* 页面头部 */
.page-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 20px 0;
}

.page-title {
  font-size: 48px;
  color: var(--primary-color);
  margin-bottom: 16px;
  font-weight: bold;
  text-shadow: 0 2px 4px rgba(0, 46, 159, 0.1);
  background: linear-gradient(90deg, var(--primary-color), #0040c1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}

.page-subtitle {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  max-width: 800px;
  margin: 0 auto;
}

/* 卡片样式 */
.section-card {
  margin-bottom: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 46, 159, 0.08);
  background: white;
  border: 1px solid rgba(0, 46, 159, 0.1);
  transition: all 0.3s ease;
  overflow: hidden;
}

/* .section-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 46, 159, 0.12);
} */

:deep(.ant-card-head) {
  border-bottom: 1px solid rgba(0, 46, 159, 0.1);
  padding: 0 24px;
  background: linear-gradient(90deg, rgba(0, 46, 159, 0.03), transparent);
}

:deep(.ant-card-head-title) {
  font-size: 24px;
  color: var(--primary-color);
  font-weight: bold;
  padding: 16px 0;
}

/* 主要按钮样式 */
:deep(.ant-btn-primary) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
  box-shadow: 0 4px 12px rgba(0, 46, 159, 0.3);
  transition: all 0.3s ease;
}

/* :deep(.ant-btn-primary:hover) {
  background-color: #003aa8;
  border-color: #003aa8;
  color: #fff;
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(0, 46, 159, 0.4);
} */

:deep(.ant-btn-primary:focus) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  color: #fff;
  box-shadow: 0 0 0 2px rgba(0, 46, 159, 0.2);
}

:deep(.ant-btn-primary:active) {
  background-color: #002a7c;
  border-color: #002a7c;
  color: #fff;
  transform: translateY(0);
}

/* 特色套餐核心承诺样式 */
.featured-commitment-card {
  text-align: center;
}

.featured-commitment-card :deep(.ant-card-head-title) {
  font-size: 28px;
  text-align: center;
}

.commitment-content h3 {
  color: var(--primary-color);
  font-size: 24px;
  margin-bottom: 15px;
}

.commitment-text {
  font-size: 20px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.commitment-details {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  text-align: left;
  max-width: 800px;
  margin: 0 auto;
}

.card-title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.view-packages-link {
  color: var(--primary-color);
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  margin-bottom: 0;
  padding: 6px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;
  background: rgba(0, 46, 159, 0.05);
  border: 1px solid rgba(0, 46, 159, 0.1);
}

/* .view-packages-link:hover {
  color: var(--primary-color);
  background: rgba(0, 46, 159, 0.1);
  text-decoration: none;
} */

/* 套餐选择 */
.packages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}

.package-card {
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  overflow: hidden;
  position: relative;
}

.package-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), #0040c1);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.package-card:hover::before {
  opacity: 1;
}

/* .package-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 30px rgba(0, 46, 159, 0.15);
} */

.package-card.selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(0, 46, 159, 0.2);
  background: linear-gradient(135deg, white, #f0f8ff);
}

.package-card.selected::before {
  opacity: 1;
}

.package-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.package-name {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
}

/* 为金色套餐添加特殊标识 */
.package-card:nth-child(1) :deep(.ant-card-head) {
  background: linear-gradient(90deg, rgba(255, 210, 113, 0.15), transparent);
  position: relative;
}

.package-card:nth-child(1) :deep(.ant-card-head)::after {
  content: "";
  position: absolute;
  top: -10px;
  right: 24px;
  background: var(--secondary-color);
  color: var(--primary-color);
  padding: 2px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
}

.package-content {
  padding: 16px 0;
}

.package-price {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 12px;
  text-shadow: 0 1px 2px rgba(0, 46, 159, 0.1);
}

.package-audience,
.package-cost-info {
  font-size: 14px;
  color: #666;
  margin-bottom: 12px;
  line-height: 1.5;
  background: rgba(255, 255, 255, 0.6);
  padding: 8px 12px;
  border-radius: 6px;
  border-left: 3px solid var(--primary-color);
}

.package-features {
  list-style: none;
  padding: 0;
  margin: 0;
}

.package-features li {
  margin-bottom: 12px;
  display: flex;
  align-items: flex-start;
  line-height: 1.5;
  background: rgba(255, 255, 255, 0.5);
  padding: 10px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

/* .package-features li:hover {
  background: rgba(0, 46, 159, 0.05);
  transform: translateX(5px);
} */

.feature-icon {
  color: var(--primary-color);
  margin-right: 8px;
  font-size: 16px;
  flex-shrink: 0;
  margin-top: 3px;
}

/* 通用服务保障卡片特殊样式 - 微光海主题 */
.guarantee-card {
  background: linear-gradient(
    135deg,
    rgba(0, 46, 159, 0.05),
    rgba(0, 64, 193, 0.08)
  );
  border: 1px solid rgba(0, 46, 159, 0.1);
  grid-column: span 2;
  position: relative;
  overflow: hidden;
}

.guarantee-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--primary-color), #0040c1, #66b3ff);
}

.guarantee-card .package-header {
  justify-content: center;
}

.guarantee-card .package-content {
  font-size: 16px;
}

.guarantee-features {
  font-size: 15px;
}

.guarantee-features li {
  margin-bottom: 15px;
  line-height: 1.6;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  padding: 12px 16px;
  border-left: 4px solid var(--primary-color);
  transition: all 0.3s ease;
}

/* .guarantee-features li:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(0, 46, 159, 0.1);
} */

/* 进度跟踪 - 微光海风格 */
.progress-tracker {
  padding: 24px 0;
}

:deep(.ant-steps-item-title) {
  font-size: 16px;
  font-weight: 500;
  color: var(--primary-color);
}

:deep(.ant-steps-item-description) {
  font-size: 14px;
  color: #666;
}

:deep(.ant-steps-item-active .ant-steps-item-icon) {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

:deep(.ant-steps-item-finish .ant-steps-item-icon) {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: var(--primary-color);
}

:deep(.ant-steps-item-finish .ant-steps-item-icon > .anticon) {
  color: var(--primary-color);
}

/* 只读表单样式 */
.readonly-form {
  padding: 20px 0;
}

.form-field {
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

/* .form-field:hover {
  transform: translateX(5px);
} */

.field-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: var(--primary-color);
}

.field-value {
  padding: 10px 14px;
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  min-height: 20px;
  border: 1px solid rgba(0, 46, 159, 0.1);
  box-shadow: 0 2px 4px rgba(0, 46, 159, 0.05);
}

.textarea-value {
  white-space: pre-wrap;
  line-height: 1.6;
}

/* 表单样式优化 */
:deep(.ant-input),
:deep(.ant-textarea),
:deep(.ant-select-selector) {
  border-radius: 6px;
  border: 1px solid rgba(0, 46, 159, 0.2);
  transition: all 0.3s ease;
}

/* :deep(.ant-input:focus),
:deep(.ant-textarea:focus),
:deep(.ant-select-selector:focus),
:deep(.ant-select-selector:hover) {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(0, 46, 159, 0.1);
} */

/* 评分组件样式 */
:deep(.ant-rate-star-first) {
  color: var(--secondary-color);
}

/* 标签样式 */
:deep(.ant-tag) {
  border-radius: 12px;
  padding: 2px 8px;
  font-size: 12px;
}

:deep(.ant-tag-blue) {
  background-color: rgba(0, 46, 159, 0.1);
  color: var(--primary-color);
  border-color: rgba(0, 46, 159, 0.2);
}

:deep(.ant-tag-gold) {
  background-color: rgba(255, 210, 113, 0.1);
  color: #8a6d3b;
  border-color: rgba(255, 210, 113, 0.3);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 36px;
  }

  .page-subtitle {
    font-size: 16px;
  }

  .packages-grid {
    grid-template-columns: 1fr;
  }

  .package-card {
    margin-bottom: 20px;
  }

  :deep(.ant-col) {
    flex: 0 0 100%;
    max-width: 100%;
  }
}
</style>
