<script setup lang="ts">
import { ref, computed } from 'vue';

// 对接类型选项
const connectionTypes = [
  { id: 'all', name: '全部类型' },
  { id: 'brand-cooperation', name: '品牌合作' },
  { id: 'resource-exchange', name: '资源互换' },
  { id: 'project-collaboration', name: '项目协作' },
  { id: 'investment-funding', name: '投资融资' }
];

// 模拟对接需求数据
const connectionRequests = [
  {
    id: 1,
    title: '寻求品牌IP联合营销合作',
    type: 'brand-cooperation',
    company: '创新科技有限公司',
    industry: '科技互联网',
    description: '我们希望与有影响力的品牌进行联合营销活动，共同提升品牌曝光度和市场影响力。',
    contactPerson: '王先生',
    contactPhone: '138****6789',
    publishTime: '2024-01-15',
    views: 235,
    status: 'active'
  },
  {
    id: 2,
    title: '寻找内容创作资源互换',
    type: 'resource-exchange',
    company: '文化传媒工作室',
    industry: '文化娱乐',
    description: '我们拥有优质的内容创作团队，希望与拥有流量渠道的伙伴进行资源互换合作。',
    contactPerson: '李女士',
    contactPhone: '139****3456',
    publishTime: '2024-01-14',
    views: 189,
    status: 'active'
  },
  {
    id: 3,
    title: 'IP项目投资合作',
    type: 'investment-funding',
    company: '投资管理公司',
    industry: '金融财经',
    description: '我们正在寻找有潜力的IP项目进行投资，特别关注文化创意和科技领域的创新项目。',
    contactPerson: '张先生',
    contactPhone: '137****8901',
    publishTime: '2024-01-12',
    views: 320,
    status: 'active'
  },
  {
    id: 4,
    title: '寻找设计合作伙伴',
    type: 'project-collaboration',
    company: '品牌策划公司',
    industry: '设计创意',
    description: '我们正在为多个客户寻找专业的设计合作伙伴，包括品牌视觉设计、UI/UX设计等。',
    contactPerson: '陈女士',
    contactPhone: '136****2345',
    publishTime: '2024-01-10',
    views: 156,
    status: 'active'
  },
  {
    id: 5,
    title: '营销渠道资源互换',
    type: 'resource-exchange',
    company: '电商运营公司',
    industry: '电子商务',
    description: '我们拥有丰富的线上营销渠道，希望与拥有线下资源的伙伴进行渠道互补合作。',
    contactPerson: '赵先生',
    contactPhone: '135****7890',
    publishTime: '2024-01-08',
    views: 203,
    status: 'active'
  },
  {
    id: 6,
    title: '品牌授权合作',
    type: 'brand-cooperation',
    company: 'IP运营公司',
    industry: '文化娱乐',
    description: '我们拥有多个知名IP资源，寻求优质品牌进行授权合作，共同开发周边产品。',
    contactPerson: '刘女士',
    contactPhone: '134****3456',
    publishTime: '2024-01-05',
    views: 287,
    status: 'active'
  }
];

// 当前选中的对接类型
const selectedType = ref('all');

// 搜索关键词
const searchKeyword = ref('');

// 是否显示发布需求表单
const showPublishForm = ref(false);

// 发布表单数据
const publishForm = ref({
  title: '',
  type: '',
  company: '',
  industry: '',
  description: ''
});

// 根据类型和关键词筛选对接需求
const filteredRequests = computed(() => {
  let result = connectionRequests;
  
  // 根据类型筛选
  if (selectedType.value !== 'all') {
    result = result.filter(req => req.type === selectedType.value);
  }
  
  // 根据关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(req => 
      req.title.toLowerCase().includes(keyword) ||
      req.company.toLowerCase().includes(keyword) ||
      req.industry.toLowerCase().includes(keyword) ||
      req.description.toLowerCase().includes(keyword)
    );
  }
  
  return result;
});

// 切换对接类型
const changeType = (typeId: string) => {
  selectedType.value = typeId;
};

// 打开发布需求表单
const openPublishForm = () => {
  showPublishForm.value = true;
};

// 关闭发布需求表单
const closePublishForm = () => {
  showPublishForm.value = false;
  resetPublishForm();
};

// 重置发布表单
const resetPublishForm = () => {
  publishForm.value = {
    title: '',
    type: '',
    company: '',
    industry: '',
    description: ''
  };
};

// 发布新需求
const publishNewRequest = () => {
  // 简单验证
  if (!publishForm.value.title || !publishForm.value.type || !publishForm.value.company) {
    alert('请填写必填项');
    return;
  }
  
  // 这里可以实现发布新需求的逻辑
  alert('需求发布成功！');
  closePublishForm();
};

// 联系对接方
const contactRequest = (reqId: number) => {
  alert(`正在联系需求ID: ${reqId} 的发布者...`);
};
</script>

<template>
  <div class="business-connection-container">
    <div class="page-header">
      <h1>商业对接</h1>
      <p class="page-description">连接品牌与资源，促成商业合作机会</p>
    </div>
    
    <div class="connection-content">
      <!-- 搜索和类型选择区域 -->
      <div class="search-type-section">
        <div class="search-and-publish">
          <div class="search-bar">
            <input 
              type="text" 
              v-model="searchKeyword"
              placeholder="搜索合作需求、公司或行业..."
              class="search-input"
            />
            <button class="search-btn">🔍</button>
          </div>
          <button class="publish-btn" @click="openPublishForm">
            + 发布合作需求
          </button>
        </div>
        <div class="type-tabs">
          <button 
            v-for="type in connectionTypes" 
            :key="type.id"
            :class="['type-tab', { active: selectedType === type.id }]"
            @click="changeType(type.id)"
          >
            {{ type.name }}
          </button>
        </div>
      </div>
      <!-- 对接需求列表 -->
      <div class="requests-section">
        <div class="section-header">
          <h2>合作需求列表</h2>
          <p class="request-count">共 {{ filteredRequests.length }} 条需求</p>
        </div>
        <div v-if="filteredRequests.length === 0" class="no-requests">
          <p>暂无相关合作需求，请尝试其他搜索条件。</p>
        </div>
        <div v-else class="requests-list">
          <div 
            v-for="request in filteredRequests" 
            :key="request.id"
            class="request-card"
          >
            <div class="request-header">
              <h3 class="request-title">{{ request.title }}</h3>
              <span class="request-type">
                {{ connectionTypes.find(t => t.id === request.type)?.name }}</span>
            </div>
            <div class="request-company">
              {{ request.company }} | {{ request.industry }}
            </div>
            <p class="request-description">{{ request.description }}</p>
            <div class="request-footer">
              <div class="request-meta">
                <span class="contact-person">联系人: {{ request.contactPerson }}</span>
                <span class="contact-phone">电话: {{ request.contactPhone }}</span>
                <span class="publish-time">发布时间: {{ request.publishTime }}</span>
                <span class="views">浏览: {{ request.views }}</span>
              </div>
              <button class="contact-btn" @click="contactRequest(request.id)">
                立即联系
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 合作优势介绍 -->
      <div class="advantages-section">
        <div class="section-header">
          <h2>为什么选择我们的商业对接平台</h2>
        </div>
        <div class="advantages-grid">
          <div class="advantage-card">
            <div class="advantage-icon">🔗</div>
            <h3>精准匹配</h3>
            <p>基于行业、需求类型等多维度精准匹配合作资源，提高对接成功率</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🛡️</div>
            <h3>安全保障</h3>
            <p>对发布需求的企业进行严格审核，确保信息真实性和合作安全性</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">🚀</div>
            <h3>高效对接</h3>
            <p>简化对接流程，快速建立联系，加速合作进程，降低沟通成本</p>
          </div>
          <div class="advantage-card">
            <div class="advantage-icon">📊</div>
            <h3>资源丰富</h3>
            <p>汇聚各行业优质资源，提供多样化的合作选择和商业机会</p>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 发布需求弹窗 -->
    <div v-if="showPublishForm" class="publish-modal-overlay" @click.self="closePublishForm">
      <div class="publish-modal">
        <div class="modal-header">
          <h2>发布合作需求</h2>
          <button class="close-btn" @click="closePublishForm">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="publishNewRequest">
            <div class="form-group">
              <label for="title">需求标题 *</label>
              <input 
                id="title"
                v-model="publishForm.title"
                type="text"
                placeholder="请输入需求标题"
                required
              />
            </div>
            <div class="form-group">
              <label for="type">需求类型 *</label>
              <select 
                id="type"
                v-model="publishForm.type"
                required
              >
                <option value="">请选择需求类型</option>
                <option v-for="type in connectionTypes.filter(t => t.id !== 'all')" :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="company">公司名称 *</label>
              <input 
                id="company"
                v-model="publishForm.company"
                type="text"
                placeholder="请输入公司名称"
                required
              />
            </div>
            <div class="form-group">
              <label for="industry">所属行业</label>
              <input 
                id="industry"
                v-model="publishForm.industry"
                type="text"
                placeholder="请输入所属行业"
              />
            </div>
            <div class="form-group">
              <label for="description">需求描述 *</label>
              <textarea 
                id="description"
                v-model="publishForm.description"
                rows="5"
                placeholder="请详细描述您的合作需求"
                required
              ></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="cancel-btn" @click="closePublishForm">
                取消
              </button>
              <button type="submit" class="submit-btn">
                发布需求
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.business-connection-container {
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

/* 搜索和类型选择区域 */
.search-type-section {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 40px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.search-and-publish {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  gap: 20px;
}

.search-bar {
  flex: 1;
  display: flex;
  max-width: 600px;
}

.search-input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.search-input:focus {
  outline: none;
  border-color: var(--primary-color);
}

.search-btn {
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0 8px 8px 0;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.search-btn:hover {
  background-color: #001a80;
}

.publish-btn {
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.publish-btn:hover {
  background-color: #001a80;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 33, 159, 0.2);
}

.type-tabs {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.type-tab {
  padding: 8px 20px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  white-space: nowrap;
}

.type-tab:hover {
  background-color: #e0e0e0;
  color: #333;
}

.type-tab.active {
  background-color: var(--primary-color);
  color: white;
}

/* 对接需求列表 */
.requests-section {
  margin-bottom: 60px;
}

.section-header {
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 28px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.request-count {
  font-size: 16px;
  color: #666;
}

.requests-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.request-card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.request-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.request-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.request-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-color);
  margin: 0;
  flex: 1;
  margin-right: 20px;
}

.request-type {
  padding: 4px 12px;
  background-color: #e3f2fd;
  color: var(--primary-color);
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
}

.request-company {
  font-size: 16px;
  color: #666;
  margin-bottom: 16px;
}

.request-description {
  font-size: 16px;
  color: var(--text-color);
  line-height: 1.6;
  margin-bottom: 20px;
}

.request-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.request-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  font-size: 14px;
  color: #666;
}

.contact-btn {
  padding: 10px 24px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.contact-btn:hover {
  background-color: #001a80;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 33, 159, 0.2);
}

.no-requests {
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.no-requests p {
  font-size: 18px;
  color: #666;
}

/* 合作优势介绍 */
.advantages-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 40px;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.advantage-card {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.advantage-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.advantage-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.advantage-card h3 {
  font-size: 20px;
  color: var(--text-color);
  margin-bottom: 12px;
}

.advantage-card p {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* 发布需求弹窗 */
.publish-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.publish-modal {
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.modal-header h2 {
  font-size: 24px;
  color: var(--primary-color);
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  font-size: 30px;
  color: #666;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.close-btn:hover {
  color: var(--primary-color);
  transform: scale(1.1);
}

.modal-body {
  padding: 24px;
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

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 24px;
  border-top: 1px solid #f0f0f0;
}

.cancel-btn {
  padding: 12px 24px;
  background-color: #f5f5f5;
  color: #666;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.cancel-btn:hover {
  background-color: #e0e0e0;
}

.submit-btn {
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background-color: #001a80;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }
  
  .search-and-publish {
    flex-direction: column;
  }
  
  .search-bar {
    max-width: 100%;
  }
  
  .publish-btn {
    width: 100%;
  }
  
  .request-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .request-type {
    margin-top: 12px;
  }
  
  .request-footer {
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
  }
  
  .contact-btn {
    width: 100%;
  }
  
  .advantages-section {
    padding: 30px 20px;
  }
  
  .advantages-grid {
    grid-template-columns: 1fr;
  }
}
</style>