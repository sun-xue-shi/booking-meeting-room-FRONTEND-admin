<script setup lang="ts">
import { ref, reactive, computed, onMounted } from "vue";
import { getIpSuggest, getIpDiagnosis, getIpScore } from "@/service/ip";
import { message, Modal } from "ant-design-vue";

// 问卷数据结构
// 定义问卷数据结构类型
interface Question {
  id: string;
  text: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface Dimension {
  title: string;
  questions: Question[];
}

interface Questionnaire {
  dimension1: Dimension;
  dimension2: Dimension;
  dimension3: Dimension;
  dimension4: Dimension;
}

const questionnaire = reactive<Questionnaire>({
  // IP基础属性维度
  dimension1: {
    title: "IP基础属性维度",
    questions: [
      {
        id: "q1",
        text: "您的IP核心身份（与基层劳动关联度）",
        options: [
          {
            label:
              "A. 核心基层劳动者（如货车司机、猪肉铺老板、农资店主等，日常场景聚焦基层劳动）",
            value: "A",
          },
          {
            label:
              "B. 基层关联从业者（如物流分拣员、社区商贩，部分场景涉及基层劳动）",
            value: "B",
          },
          {
            label: "C. 非基层劳动者（工作场景与基层劳动无直接关联）",
            value: "C",
          },
          { label: "D. 身份模糊（未明确绑定具体基层劳动场景）", value: "D" },
        ],
      },
      {
        id: "q2",
        text: "您的IP账号定位清晰度",
        options: [
          {
            label:
              'A. 定位精准（如"货车司机三哥-分享跑货日常与沿途好物"，受众明确）',
            value: "A",
          },
          {
            label: "B. 定位较清晰（知道聚焦基层劳动，但未细化受众与内容方向）",
            value: "B",
          },
          {
            label: "C. 定位模糊（内容涵盖劳动、生活等多方面，无核心焦点）",
            value: "C",
          },
          {
            label: "D. 无定位（随机发布内容，未考虑账号核心方向）",
            value: "D",
          },
        ],
      },
      {
        id: "q3",
        text: "您的IP人设辨识度（目标用户感知度）",
        options: [
          {
            label:
              "A. 高辨识度（有专属口头禅、标志性动作，目标用户能快速记住）",
            value: "A",
          },
          {
            label: "B. 较高辨识度（有固定人设方向，部分用户能识别）",
            value: "B",
          },
          {
            label: "C. 低辨识度（人设不固定，用户难以形成统一认知）",
            value: "C",
          },
          { label: "D. 无人设（仅记录日常，未打造专属人设标签）", value: "D" },
        ],
      },
    ],
  },
  // 内容运营维度
  dimension2: {
    title: "内容运营维度",
    questions: [
      {
        id: "q4",
        text: "您的内容与基层劳动元素结合度",
        options: [
          {
            label:
              "A. 高结合度（内容核心围绕基层劳动场景、工作技巧、职业感悟等）",
            value: "A",
          },
          {
            label: "B. 较高结合度（多数内容涉及基层劳动元素，少数内容无关联）",
            value: "B",
          },
          {
            label:
              "C. 低结合度（偶尔提及基层劳动元素，核心内容与基层劳动无关）",
            value: "C",
          },
          {
            label: "D. 无结合度（内容未体现任何基层劳动相关元素）",
            value: "D",
          },
        ],
      },
      {
        id: "q5",
        text: "内容更新频率与稳定性",
        options: [
          {
            label: "A. 稳定高频（每周更新3次及以上，发布时间固定）",
            value: "A",
          },
          { label: "B. 稳定中频（每周更新1-2次，发布时间较固定）", value: "B" },
          { label: "C. 不稳定（每月更新3-5次，发布时间无规律）", value: "C" },
          { label: "D. 低频零散（每月更新2次及以下，无固定节奏）", value: "D" },
        ],
      },
      {
        id: "q6",
        text: "内容互动性（目标用户参与度）",
        options: [
          {
            label:
              "A. 高互动（每条内容点赞、评论、转发量较高，目标用户评论占比超60%）",
            value: "A",
          },
          {
            label:
              "B. 较高互动（多数内容有一定互动量，目标用户评论占比30%-60%）",
            value: "B",
          },
          {
            label: "C. 低互动（内容互动量少，目标用户评论占比低于30%）",
            value: "C",
          },
          {
            label: "D. 无互动（内容几乎无点赞、评论、转发，无目标用户参与）",
            value: "D",
          },
        ],
      },
    ],
  },
  // 变现潜力维度
  dimension3: {
    title: "变现潜力维度",
    questions: [
      {
        id: "q7",
        text: "您的IP与人设适配变现场景的契合度",
        options: [
          {
            label: "A. 高适配（IP人设与好物带货、行业服务推广等场景高度契合）",
            value: "A",
          },
          {
            label: "B. 较高适配（IP人设可适配部分变现场景，需轻微调整）",
            value: "B",
          },
          {
            label: "C. 低适配（IP人设与变现场景关联性弱，需大幅调整）",
            value: "C",
          },
          { label: "D. 无适配（IP人设无法对接任何变现场景）", value: "D" },
        ],
      },
      {
        id: "q8",
        text: "您对IP变现路径的认知清晰程度",
        options: [
          {
            label: "A. 清晰（明确知晓带货分成、广告植入等3种及以上变现方式）",
            value: "A",
          },
          {
            label: "B. 较清晰（了解1-2种变现方式，知道大致操作方向）",
            value: "B",
          },
          { label: "C. 模糊（听说过IP变现，但不清楚具体方式）", value: "C" },
          { label: "D. 无认知（未考虑过IP变现，仅作为兴趣记录）", value: "D" },
        ],
      },
      {
        id: "q9",
        text: "您的IP已有变现尝试",
        options: [
          {
            label:
              "A. 多次尝试（已开展好物带货、商家合作等2种及以上变现，有收益）",
            value: "A",
          },
          { label: "B. 单次尝试（开展过1种变现，有少量收益）", value: "B" },
          { label: "C. 未尝试（有变现想法，但未落地执行）", value: "C" },
          { label: "D. 无想法（无任何变现尝试及想法）", value: "D" },
        ],
      },
    ],
  },
  // 账号数据维度
  dimension4: {
    title: "账号数据维度",
    questions: [
      {
        id: "q10",
        text: "粉丝增长趋势（目标粉丝占比）",
        options: [
          {
            label: "A. 稳步增长（每月粉丝增长1000+，目标粉丝占比超70%）",
            value: "A",
          },
          {
            label: "B. 缓慢增长（每月粉丝增长300-1000，目标粉丝占比50%-70%）",
            value: "B",
          },
          {
            label: "C. 停滞波动（粉丝数量时增时减，目标粉丝占比30%-50%）",
            value: "C",
          },
          {
            label: "D. 持续下滑（粉丝数量逐月减少，目标粉丝占比低于30%）",
            value: "D",
          },
        ],
      },
      {
        id: "q11",
        text: "粉丝留存率（关注后30天内仍活跃的粉丝占比）",
        options: [
          {
            label: "A. 高留存（留存率超60%，多数粉丝持续关注账号动态）",
            value: "A",
          },
          {
            label: "B. 较高留存（留存率30%-60%，部分粉丝保持活跃）",
            value: "B",
          },
          {
            label: "C. 低留存（留存率10%-30%，多数粉丝关注后不再活跃）",
            value: "C",
          },
          {
            label: "D. 极低留存（留存率低于10%，粉丝关注后快速取关）",
            value: "D",
          },
        ],
      },
      {
        id: "q12",
        text: "数据转化效率（如内容引导粉丝点击好物链接的比例）",
        options: [
          {
            label: "A. 高转化（转化比例超10%，粉丝参与变现行为意愿强）",
            value: "A",
          },
          {
            label: "B. 较高转化（转化比例3%-10%，部分粉丝有参与意愿）",
            value: "B",
          },
          {
            label: "C. 低转化（转化比例1%-3%，少数粉丝有参与行为）",
            value: "C",
          },
          {
            label: "D. 无转化（转化比例低于1%，无粉丝参与变现行为）",
            value: "D",
          },
        ],
      },
    ],
  },
});

// 用户答案存储
const userAnswers = ref<Record<string, string>>({});

// 当前题目索引
const currentQuestionIndex = ref(0);

// 从localStorage恢复答题进度
const loadProgressFromStorage = () => {
  // 获取当前登录用户信息
  const currentUserInfo = localStorage.getItem("user_info");
  let currentUsername = "";

  if (currentUserInfo) {
    try {
      const user = JSON.parse(currentUserInfo);
      currentUsername = user.username || "";
    } catch (e) {
      console.error("Failed to parse user info", e);
    }
  }

  // 获取存储的答题进度和对应的用户名
  const savedAnswers = localStorage.getItem("ipDiagnosisAnswers");
  const savedIndex = localStorage.getItem("ipDiagnosisIndex");
  const savedUsername = localStorage.getItem("ipDiagnosisUsername"); // 新增：存储用户名

  // 检查用户名是否匹配
  if (savedUsername && currentUsername && savedUsername !== currentUsername) {
    // 用户名不匹配，清空现有的存储数据
    clearProgressStorage();
    return;
  }

  if (savedAnswers) {
    try {
      userAnswers.value = JSON.parse(savedAnswers);
    } catch (e) {
      console.error("Failed to parse saved answers", e);
      userAnswers.value = {};
    }
  }

  if (savedIndex) {
    const index = parseInt(savedIndex, 10);
    if (!isNaN(index) && index >= 0) {
      currentQuestionIndex.value = index;
    }
  }
};

// 保存答题进度到localStorage
const saveProgressToStorage = () => {
  // 保存答题进度
  localStorage.setItem("ipDiagnosisAnswers", JSON.stringify(userAnswers.value));
  localStorage.setItem(
    "ipDiagnosisIndex",
    currentQuestionIndex.value.toString()
  );

  // 新增：保存当前用户名，用于后续匹配检查
  const currentUserInfo = localStorage.getItem("user_info");
  if (currentUserInfo) {
    try {
      const user = JSON.parse(currentUserInfo);
      const username = user.username || "";
      if (username) {
        localStorage.setItem("ipDiagnosisUsername", username);
      }
    } catch (e) {
      console.error("Failed to parse user info when saving progress", e);
    }
  }
};

// 清除localStorage中的答题进度
const clearProgressStorage = () => {
  localStorage.removeItem("ipDiagnosisAnswers");
  localStorage.removeItem("ipDiagnosisIndex");
  localStorage.removeItem("ipDiagnosisUsername"); // 新增：清除用户名信息
};

// 检查用户已有的诊断结果
const checkExistingDiagnosis = async () => {
  try {
    // 从localStorage获取用户名
    const userInfo = localStorage.getItem("user_info");

    if (!userInfo) {
      // 如果没有用户信息，使用localStorage逻辑
      loadProgressFromStorage();
      return;
    }

    const user = JSON.parse(userInfo);
    const username = user.username;

    if (!username) {
      loadProgressFromStorage();
      return;
    }

    // 调用getIpDiagnosis接口
    const response = await getIpDiagnosis();

    // 检查返回的数据格式
    if (
      response.data &&
      response.data.code === 200 &&
      response.data.message === "success" &&
      response.data.data
    ) {
      // 如果返回了有效的诊断数据，直接展示诊断报告
      const diagnosisData = response.data.data;

      diagnosisResult.value = {
        level: diagnosisData.level,
        conclusion: diagnosisData.conclusion,
        suggestion: diagnosisData.suggestion,
        scores: null, // 从已有诊断中获取的没有得分信息
      };

      showResult.value = true;
      hasExistingDiagnosis.value = true;
      // 标记为已提交状态
      message.success("已获取您的历史诊断报告");
    } else {
      // 如果返回null或其他格式，使用localStorage逻辑
      loadProgressFromStorage();
    }
  } catch (error) {
    console.error("获取历史诊断失败:", error);
    // 出错时使用localStorage逻辑
    loadProgressFromStorage();
  }
};

// 页面加载时优先检查已有诊断
onMounted(() => {
  checkExistingDiagnosis();
});

// 诊断结果
const diagnosisResult = ref<any>(null);
const isDiagnosing = ref(false);
const showResult = ref(false);
const hasExistingDiagnosis = ref(false);

// 获取所有题目
const allQuestions = computed(() => {
  const questions: Question[] = [];
  const dimensionKeys = Object.keys(questionnaire) as (keyof Questionnaire)[];
  for (const dimensionKey of dimensionKeys) {
    const dimension = questionnaire[dimensionKey];
    questions.push(...dimension.questions);
  }
  return questions;
});

// 当前题目
const currentQuestion = computed(() => {
  return allQuestions.value[currentQuestionIndex.value];
});

// 当前题目所属的维度
const currentDimensionTitle = computed(() => {
  const currentIndex = currentQuestionIndex.value;
  if (currentIndex < 3) return questionnaire.dimension1.title; // q1-q3
  if (currentIndex < 6) return questionnaire.dimension2.title; // q4-q6
  if (currentIndex < 9) return questionnaire.dimension3.title; // q7-q9
  return questionnaire.dimension4.title; // q10-q12
});

// 进度百分比
const progressPercentage = computed(() => {
  const answeredCount = Object.keys(userAnswers.value).length;
  return Math.round((answeredCount / allQuestions.value.length) * 100);
});

// 处理选项选择
const handleOptionSelect = (questionId: string, optionValue: string) => {
  userAnswers.value[questionId] = optionValue;

  // 保存进度到localStorage
  saveProgressToStorage();

  // 延迟切换到下一题，给用户反馈时间
  setTimeout(() => {
    if (currentQuestionIndex.value < allQuestions.value.length - 1) {
      currentQuestionIndex.value++;
      // 切换题目后再次保存进度
      saveProgressToStorage();
    }
  }, 300);
};

// 计算得分
const calculateScores = () => {
  // 分数映射
  const scoreMap: Record<string, number> = {
    A: 4,
    B: 3,
    C: 2,
    D: 1,
  };

  // 各维度得分
  const dimensionScores = {
    dimension1: 0,
    dimension2: 0,
    dimension3: 0,
    dimension4: 0,
  };

  // 计算各维度得分
  // 维度1: IP基础属性维度 (q1, q2, q3)
  dimensionScores.dimension1 += scoreMap[userAnswers.value["q1"]] || 0;
  dimensionScores.dimension1 += scoreMap[userAnswers.value["q2"]] || 0;
  dimensionScores.dimension1 += scoreMap[userAnswers.value["q3"]] || 0;

  // 维度2: 内容运营维度 (q4, q5, q6)
  dimensionScores.dimension2 += scoreMap[userAnswers.value["q4"]] || 0;
  dimensionScores.dimension2 += scoreMap[userAnswers.value["q5"]] || 0;
  dimensionScores.dimension2 += scoreMap[userAnswers.value["q6"]] || 0;

  // 维度3: 变现潜力维度 (q7, q8, q9)
  dimensionScores.dimension3 += scoreMap[userAnswers.value["q7"]] || 0;
  dimensionScores.dimension3 += scoreMap[userAnswers.value["q8"]] || 0;
  dimensionScores.dimension3 += scoreMap[userAnswers.value["q9"]] || 0;

  // 维度4: 账号数据维度 (q10, q11, q12)
  dimensionScores.dimension4 += scoreMap[userAnswers.value["q10"]] || 0;
  dimensionScores.dimension4 += scoreMap[userAnswers.value["q11"]] || 0;
  dimensionScores.dimension4 += scoreMap[userAnswers.value["q12"]] || 0;

  // 总分
  const totalScore = Object.values(dimensionScores).reduce(
    (sum, score) => sum + score,
    0
  );

  return {
    dimensionScores,
    totalScore,
  };
};

// 处理诊断提交
const handleDiagnosis = async () => {
  // 验证是否所有问题都已回答
  const answeredQuestions = Object.keys(userAnswers.value).length;
  if (answeredQuestions < 12) {
    message.warning("请回答所有问题后再提交");
    return;
  }

  // 添加二次确认
  Modal.confirm({
    title: "提交诊断确认",
    content: "确定要提交诊断问卷吗？提交后将无法修改答案。",
    okText: "确认提交",
    cancelText: "取消",
    onOk: async () => {
      isDiagnosing.value = true;

      try {
        // 计算得分
        const scores = calculateScores();

        // 调用后端接口获取建议
        await getIpScore(scores.totalScore);
        const res = await getIpSuggest(scores.totalScore);

        const { suggestion, level, conclusion } = res.data.data;
        // 设置诊断结果
        diagnosisResult.value = {
          scores,
          suggestion,
          level,
          conclusion,
        };

        showResult.value = true;

        // 提交成功后清除localStorage内容
        clearProgressStorage();
      } catch (error) {
        console.error("获取诊断建议失败:", error);
        message.error("获取诊断建议失败，请稍后重试");
      } finally {
        isDiagnosing.value = false;
      }
    },
    onCancel() {
      // 用户取消操作，不执行任何操作
    },
  });
};

// 处理上一题
const handlePrevQuestion = () => {
  if (currentQuestionIndex.value > 0) {
    currentQuestionIndex.value--;
    // 注意：导航时不自动保存进度，只有在用户作答后才保存
    // saveProgressToStorage(); // 已注释掉自动保存
  }
};

// 跳转到指定题目
const jumpToQuestion = (index: number) => {
  currentQuestionIndex.value = index;
  // 注意：跳转时不自动保存进度，只有在用户作答后才保存
  // saveProgressToStorage(); // 已注释掉自动保存
};

// 重新开始诊断
const restartDiagnosis = () => {
  showResult.value = false;
  diagnosisResult.value = null;
  userAnswers.value = {};
  currentQuestionIndex.value = 0;
  hasExistingDiagnosis.value = false;
  // 清除保存的进度
  clearProgressStorage();
};

// 确认重新诊断
const confirmRestartDiagnosis = () => {
  Modal.confirm({
    title: "重新诊断确认",
    content: "确定要重新开始诊断吗？当前诊断结果将被清除。",
    okText: "确认",
    cancelText: "取消",
    onOk() {
      restartDiagnosis();
    },
    onCancel() {
      // 用户取消操作，不执行任何操作
    },
  });
};
</script>

<template>
  <div class="ip-diagnosis-container">
    <div class="page-header">
      <h1>基层劳动者IP诊断问卷</h1>
      <p class="page-description">
        通过四个维度全面评估您的IP现状，提供专业发展建议
      </p>
    </div>

    <div class="diagnosis-content">
      <!-- 问卷区域 -->
      <div class="diagnosis-form-section">
        <div class="form-container">
          <!-- 进度条 -->
          <div
            v-if="!showResult && !hasExistingDiagnosis"
            class="progress-container"
          >
            <div class="progress-info">
              <span
                >第 {{ currentQuestionIndex + 1 }} 题 / 共
                {{ allQuestions.length }} 题</span
              >
              <span>{{ progressPercentage }}%</span>
            </div>
            <div class="progress-bar">
              <div
                class="progress-fill"
                :style="{ width: progressPercentage + '%' }"
              ></div>
            </div>
          </div>

          <!-- 题号跳转 -->
          <div
            v-if="!showResult && !hasExistingDiagnosis"
            class="question-navigation"
          >
            <div
              v-for="(question, index) in allQuestions"
              :key="question.id"
              class="question-number"
              :class="{
                active: index === currentQuestionIndex,
                answered: userAnswers[question.id],
              }"
              @click="jumpToQuestion(index)"
            >
              {{ index + 1 }}
            </div>
          </div>

          <form @submit.prevent="handleDiagnosis">
            <!-- 当前题目 -->
            <div v-if="currentQuestion && !showResult" class="question-section">
              <div class="question-block">
                <div class="dimension-title">{{ currentDimensionTitle }}</div>
                <p class="question-text">{{ currentQuestion.text }}</p>
                <div class="options">
                  <label
                    v-for="option in currentQuestion.options"
                    :key="option.value"
                    class="option-label"
                    :class="{
                      selected:
                        userAnswers[currentQuestion.id] === option.value,
                    }"
                  >
                    <input
                      type="radio"
                      :name="currentQuestion.id"
                      :value="option.value"
                      v-model="userAnswers[currentQuestion.id]"
                      @change="
                        handleOptionSelect(currentQuestion.id, option.value)
                      "
                    />
                    <span class="option-text">{{ option.label }}</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- 已提交状态 -->
            <div v-else-if="hasExistingDiagnosis" class="submitted-section">
              <div class="submitted-content">
                <div class="check-icon">✓</div>
                <h3>问卷已提交</h3>
                <p>诊断报告已生成，请在右侧查看结果</p>
              </div>
            </div>

            <!-- 默认已提交状态 -->
            <div v-else class="submitted-section">
              <div class="submitted-content">
                <div class="check-icon">✓</div>
                <h3>问卷已提交</h3>
                <p>正在生成诊断报告，请稍候...</p>
              </div>
            </div>

            <!-- 导航按钮 -->
            <div class="navigation-buttons">
              <!-- 提交按钮（在任何题目都显示） -->
              <button
                v-if="!showResult && !hasExistingDiagnosis"
                type="submit"
                class="diagnose-btn"
                :disabled="isDiagnosing || Object.keys(userAnswers).length < 12"
              >
                {{ isDiagnosing ? "诊断中..." : "提交诊断" }}
              </button>
            </div>
          </form>
        </div>

        <!-- 诊断说明/诊断报告区域 -->
        <div class="diagnosis-info">
          <!-- 诊断说明 -->
          <div v-if="!showResult && !hasExistingDiagnosis">
            <h3>诊断说明</h3>
            <ul>
              <li>
                本问卷包含IP基础属性，内容运营,变现潜力，账号数据四个维度，共12道题目
              </li>
              <li>请根据实际情况作答</li>
              <li>提交后将获得个性化发展建议</li>
            </ul>
          </div>

          <!-- 已有诊断时的说明 -->
          <div v-else-if="hasExistingDiagnosis && !showResult">
            <h3>诊断状态</h3>
            <ul>
              <li>您已完成IP诊断问卷</li>
              <li>诊断报告已生成</li>
              <li>请在右侧查看详细结果</li>
              <li>如需重新诊断，请点击"重新诊断"按钮</li>
            </ul>
          </div>

          <!-- 诊断报告 -->
          <div v-else>
            <!-- Loading状态 -->
            <div v-if="isDiagnosing" class="submitted-section">
              <div class="submitted-content">
                <div class="check-icon">↻</div>
                <h3>正在生成诊断报告</h3>
                <p>请稍候...</p>
              </div>
            </div>

            <!-- 诊断报告内容 -->
            <div v-else>
              <div class="result-header">
                <h2>IP诊断报告</h2>
                <button class="restart-btn" @click="confirmRestartDiagnosis">
                  重新诊断
                </button>
              </div>

              <!-- 诊断结论 -->
              <div class="diagnosis-conclusion">
                <h3>诊断结论</h3>
                <div class="conclusion-content">
                  <div class="level-tag">{{ diagnosisResult.level }}</div>
                  <p v-if="diagnosisResult.conclusion">
                    {{ diagnosisResult.conclusion }}
                  </p>
                  <p v-else>暂无具体结论</p>
                </div>
              </div>

              <!-- 诊断建议 -->
              <div class="professional-advice">
                <h3>发展建议</h3>
                <div class="suggestion-content">
                  <p v-if="diagnosisResult.suggestion">
                    {{ diagnosisResult.suggestion }}
                  </p>
                  <p v-else>暂无具体建议</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ip-diagnosis-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-header h1 {
  font-size: 42px;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.page-description {
  font-size: 18px;
  color: #666;
  max-width: 800px;
  margin: 0 auto;
}

/* 问卷区域 */
.diagnosis-form-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.form-container {
  background-color: #d3ddf0;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.form-container h2 {
  font-size: 28px;
  color: var(--primary-color);
  margin-bottom: 30px;
  text-align: center;
}

/* 进度条容器 */
.progress-container {
  margin-bottom: 30px;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.progress-bar {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #4caf50, #8bc34a);
  transition: width 0.3s ease;
}

/* 题号跳转 */
.question-navigation {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
  justify-content: center;
}

.question-number {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #f0f0f0;
  color: #666;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.question-number:hover {
  background-color: #e0e0e0;
  transform: scale(1.1);
}

.question-number.answered {
  background-color: #e8f5e9;
  color: #4caf50;
  border-color: #4caf50;
}

.question-number.active {
  background-color: var(--primary-color);
  color: white;
  border-color: var(--primary-color);
  transform: scale(1.1);
}

.dimension-section {
  margin-bottom: 30px;
}

.dimension-section h3 {
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0f0f0;
}

.question-block {
  margin-bottom: 20px;
  padding: 20px;
  background-color: #e6ebf5;
  border-radius: 8px;
}

.question-text {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 15px;
  line-height: 1.5;
}

.dimension-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 12px;
  padding: 8px 12px;
  background-color: rgba(0, 33, 159, 0.1);
  border-radius: 6px;
  border-left: 4px solid var(--primary-color);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.option-label {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  padding: 12px 15px;
  border-radius: 6px;
  transition: all 0.3s;
  border: 2px solid #e0e0e0;
}

.option-label:hover {
  border-color: var(--primary-color);
  background-color: rgba(0, 33, 159, 0.05);
}

.option-label.selected {
  border-color: var(--primary-color);
  background-color: rgba(0, 33, 159, 0.1);
}

.option-label input {
  margin-top: 3px;
  margin-right: 12px;
  flex-shrink: 0;
}

.option-text {
  font-size: 14px;
  color: var(--text-color);
  line-height: 1.5;
}

.diagnose-btn {
  width: 100%;
  padding: 14px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 16px;
}

.diagnose-btn:hover:not(:disabled) {
  background-color: #001a80;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 33, 159, 0.2);
}

.diagnose-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

/* 导航按钮 */
.navigation-buttons {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.nav-btn {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #f5f5f5;
  color: #666;
}

.nav-btn:not(:disabled):hover {
  background-color: #e0e0e0;
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 诊断信息 */
.diagnosis-info {
  background-color: #e6ebf5;
  border-radius: 12px;
  padding: 36px;
}

.diagnosis-info h3 {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 24px;
}

.diagnosis-info ul {
  list-style: none;
  padding: 0;
}

.diagnosis-info li {
  padding: 12px 0;
  padding-left: 30px;
  position: relative;
  color: var(--text-color);
  font-size: 16px;
  line-height: 1.6;
}

.diagnosis-info li::before {
  content: "-";
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
  font-size: 18px;
}

/* 诊断结果区域 */
.diagnosis-result-section {
  background-color: white;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  padding-bottom: 20px;
  border-bottom: 2px solid #f0f0f0;
}

.result-header h2 {
  font-size: 28px;
  color: var(--primary-color);
  margin: 0;
}

.restart-btn {
  padding: 10px 24px;
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.restart-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

/* 综合评分 */
.score-card {
  text-align: center;
  padding: 40px;
  background: linear-gradient(135deg, var(--primary-color) 0%, #0038b0 100%);
  color: white;
  border-radius: 12px;
  margin-bottom: 40px;
}

.score-card h3 {
  font-size: 24px;
  margin-bottom: 20px;
  opacity: 0.9;
}

.score-value {
  font-size: 72px;
  font-weight: bold;
  margin-bottom: 8px;
}

.score-label {
  font-size: 18px;
  opacity: 0.8;
}

/* 各维度得分 */
.dimension-scores {
  margin-bottom: 40px;
}

.dimension-scores h3 {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 24px;
  text-align: center;
}

.scores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.score-item {
  text-align: center;
  padding: 20px;
  background-color: var(--bg-color);
  border-radius: 12px;
}

.score-item h4 {
  font-size: 18px;
  color: var(--text-color);
  margin-bottom: 15px;
}

.score-item .score-value {
  font-size: 32px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.score-max {
  font-size: 14px;
  color: #666;
}

/* 诊断结论 */
.diagnosis-conclusion {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 36px;
  margin-bottom: 30px;
}

.diagnosis-conclusion h3 {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 16px;
  text-align: center;
}

.conclusion-content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  min-height: 100px;
  text-align: center;
}

.level-tag {
  display: inline-block;
  padding: 8px 20px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 30px;
  font-weight: bold;
  margin-bottom: 20px;
}

.conclusion-content p {
  color: var(--text-color);
  line-height: 1.6;
  font-size: 16px;
}

/* 诊断建议 */
.professional-advice {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 36px;
}

.professional-advice h3 {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 16px;
  text-align: center;
}

.suggestion-content {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  min-height: 100px;
}

.suggestion-content p {
  color: var(--text-color);
  line-height: 1.6;
  font-size: 16px;
}

/* 已提交状态 */
.submitted-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: #e6ebf5;
  border-radius: 12px;
}

.submitted-content {
  text-align: center;
  padding: 30px;
}

.check-icon {
  font-size: 48px;
  color: #4caf50;
  margin-bottom: 20px;
}

.submitted-content h3 {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 10px;
}

.submitted-content p {
  font-size: 16px;
  color: #666;
}

/* 简化版诊断报告 */
.diagnosis-info .result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid #f0f0f0;
}

.diagnosis-info .result-header h2 {
  font-size: 24px;
  color: var(--primary-color);
  margin: 0;
}

.diagnosis-info .restart-btn {
  padding: 8px 20px;
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.diagnosis-info .restart-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

.diagnosis-conclusion,
.professional-advice {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
}

.diagnosis-conclusion h3,
.professional-advice h3 {
  font-size: 20px;
  color: var(--primary-color);
  margin-bottom: 15px;
  text-align: center;
}

.conclusion-content,
.suggestion-content {
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  min-height: 80px;
}

.level-tag {
  display: inline-block;
  padding: 6px 16px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 30px;
  font-weight: bold;
  margin-bottom: 15px;
}

.conclusion-content p,
.suggestion-content p {
  color: var(--text-color);
  line-height: 1.6;
  font-size: 15px;
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .diagnosis-form-section {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .form-container,
  .diagnosis-info {
    padding: 30px 20px;
  }

  .page-header h1 {
    font-size: 32px;
  }

  .result-header {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }

  .score-value {
    font-size: 56px;
  }

  .scores-grid {
    grid-template-columns: 1fr 1fr;
  }

  .question-block {
    padding: 15px;
  }

  .option-text {
    font-size: 13px;
  }

  .navigation-buttons {
    margin-top: 20px;
  }

  .nav-btn {
    padding: 10px 20px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .scores-grid {
    grid-template-columns: 1fr;
  }

  .option-label {
    padding: 10px;
  }
}
</style>
