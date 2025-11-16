<script setup lang="ts">
import { ref } from 'vue';

// 诊断表单数据
const formData = ref({
  brandName: '',
  industry: '',
  currentSituation: '',
  goals: ''
});

// 诊断结果
const diagnosisResult = ref<any>(null);
const isDiagnosing = ref(false);
const showResult = ref(false);

// 行业选项
const industries = [
  '科技互联网',
  '金融财经',
  '教育培训',
  '医疗健康',
  '电子商务',
  '文化娱乐',
  '旅游出行',
  '制造业',
  '其他'
];

// 处理诊断提交
const handleDiagnosis = () => {
  // 简单验证
  if (!formData.value.brandName || !formData.value.industry) {
    alert('请填写品牌名称和行业信息');
    return;
  }
  
  isDiagnosing.value = true;
  
  // 模拟诊断过程
  setTimeout(() => {
    // 生成模拟诊断结果
    diagnosisResult.value = {
      brandScore: Math.floor(Math.random() * 30) + 60, // 60-90的随机分数
      strengths: [
        '品牌定位清晰',
        '视觉识别系统完整',
        '社交媒体活跃度高'
      ],
      weaknesses: [
        '品牌差异化不够明显',
        '内容传播策略单一',
        '用户忠诚度有待提升'
      ],
      suggestions: [
        '深入挖掘品牌独特价值主张',
        '丰富内容形式，增加互动性',
        '建立会员体系，提升用户粘性'
      ]
    };
    
    isDiagnosing.value = false;
    showResult.value = true;
  }, 2000);
};

// 重新开始诊断
const restartDiagnosis = () => {
  showResult.value = false;
  diagnosisResult.value = null;
  formData.value = {
    brandName: '',
    industry: '',
    currentSituation: '',
    goals: ''
  };
};
</script>

<template>
  <div class="ip-diagnosis-container">
    <div class="page-header">
      <h1>IP诊断工具</h1>
      <p class="page-description">全面分析您的品牌IP现状，提供专业改进建议</p>
    </div>
    
    <div class="diagnosis-content">
      <!-- 诊断表单区域 -->
      <div v-if="!showResult" class="diagnosis-form-section">
        <div class="form-container">
          <h2>填写品牌信息</h2>
          <form @submit.prevent="handleDiagnosis">
            <div class="form-group">
              <label for="brandName">品牌名称</label>
              <input 
                id="brandName"
                v-model="formData.brandName"
                type="text"
                placeholder="请输入您的品牌名称"
                required
              />
            </div>
            
            <div class="form-group">
              <label for="industry">所属行业</label>
              <select 
                id="industry"
                v-model="formData.industry"
                required
              >
                <option value="">请选择行业</option>
                <option v-for="industry in industries" :key="industry" :value="industry">
                  {{ industry }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="currentSituation">当前品牌状况</label>
              <textarea 
                id="currentSituation"
                v-model="formData.currentSituation"
                rows="4"
                placeholder="请简要描述您品牌的当前状况（如品牌知名度、用户群体、市场表现等）"
              ></textarea>
            </div>
            
            <div class="form-group">
              <label for="goals">品牌发展目标</label>
              <textarea 
                id="goals"
                v-model="formData.goals"
                rows="4"
                placeholder="您希望通过品牌IP建设达到什么目标？"
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              class="diagnose-btn"
              :disabled="isDiagnosing"
            >
              {{ isDiagnosing ? '诊断中...' : '开始诊断' }}
            </button>
          </form>
        </div>
        
        <div class="diagnosis-info">
          <h3>诊断内容包括</h3>
          <ul>
            <li>品牌定位清晰度评估</li>
            <li>视觉识别系统分析</li>
            <li>内容传播效果评估</li>
            <li>用户认知度与忠诚度分析</li>
            <li>市场竞争力对比分析</li>
            <li>定制化改进建议</li>
          </ul>
        </div>
      </div>
      
      <!-- 诊断结果区域 -->
      <div v-else class="diagnosis-result-section">
        <div class="result-header">
          <h2>{{ formData.brandName }} - IP诊断报告</h2>
          <button class="restart-btn" @click="restartDiagnosis">
            重新诊断
          </button>
        </div>
        
        <div class="result-content">
          <!-- 品牌评分 -->
          <div class="score-card">
            <h3>品牌综合评分</h3>
            <div class="score-value">{{ diagnosisResult.brandScore }}</div>
            <div class="score-label">满分100</div>
          </div>
          
          <!-- 诊断详情 -->
          <div class="result-details">
            <!-- 优势 -->
            <div class="detail-section strengths">
              <h4>品牌优势</h4>
              <ul>
                <li v-for="(strength, index) in diagnosisResult.strengths" :key="index">
                  {{ strength }}
                </li>
              </ul>
            </div>
            
            <!-- 不足 -->
            <div class="detail-section weaknesses">
              <h4>需要改进</h4>
              <ul>
                <li v-for="(weakness, index) in diagnosisResult.weaknesses" :key="index">
                  {{ weakness }}
                </li>
              </ul>
            </div>
            
            <!-- 建议 -->
            <div class="detail-section suggestions">
              <h4>改进建议</h4>
              <ul>
                <li v-for="(suggestion, index) in diagnosisResult.suggestions" :key="index">
                  {{ suggestion }}
                </li>
              </ul>
            </div>
          </div>
          
          <!-- 专业建议 -->
          <div class="professional-advice">
            <h3>专业建议</h3>
            <p>基于您的诊断结果，我们建议您考虑以下服务：</p>
            <div class="suggested-services">
              <div class="service-item">
                <h4>品牌定位优化</h4>
                <p>重新梳理品牌核心价值，打造差异化竞争优势</p>
              </div>
              <div class="service-item">
                <h4>内容策略升级</h4>
                <p>制定全方位内容传播计划，提升品牌影响力</p>
              </div>
              <div class="service-item">
                <h4>用户运营体系</h4>
                <p>建立完善的用户管理体系，提升用户忠诚度</p>
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

/* 诊断表单区域 */
.diagnosis-form-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.form-container {
  background-color: white;
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

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 8px;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(0, 33, 159, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
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

/* 诊断信息 */
.diagnosis-info {
  background-color: var(--bg-color);
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
  content: '✓';
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

/* 品牌评分 */
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

/* 诊断详情 */
.result-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.detail-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 24px;
}

.detail-section h4 {
  font-size: 18px;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.detail-section ul {
  list-style: none;
  padding: 0;
}

.detail-section li {
  padding: 8px 0;
  padding-left: 24px;
  position: relative;
  color: var(--text-color);
  font-size: 14px;
  line-height: 1.6;
}

.strengths li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #4caf50;
  font-weight: bold;
}

.weaknesses li::before {
  content: '!';
  position: absolute;
  left: 0;
  color: #ff9800;
  font-weight: bold;
}

.suggestions li::before {
  content: '💡';
  position: absolute;
  left: 0;
}

/* 专业建议 */
.professional-advice {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 36px;
}

.professional-advice h3 {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.professional-advice p {
  color: var(--text-color);
  margin-bottom: 24px;
  line-height: 1.6;
}

.suggested-services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.service-item {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.service-item h4 {
  font-size: 16px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.service-item p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
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
  
  .result-details {
    grid-template-columns: 1fr;
  }
}
</style>