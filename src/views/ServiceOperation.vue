<template>
  <div class="service-operation-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1 class="page-title">服务运营</h1>
      <p class="page-subtitle">专业的IP服务运营，助力您的内容创作与品牌推广</p>
    </div>

    <!-- 服务概览 -->
    <section class="service-overview">
      <div class="overview-cards">
        <div class="overview-card">
          <div class="card-icon">📊</div>
          <h3>数据分析</h3>
          <p>深度分析用户行为，优化内容策略</p>
        </div>
        <div class="overview-card">
          <div class="card-icon">🎯</div>
          <h3>精准投放</h3>
          <p>精准定位目标受众，提高转化率</p>
        </div>
        <div class="overview-card">
          <div class="card-icon">📈</div>
          <h3>增长优化</h3>
          <p>持续优化运营策略，实现快速增长</p>
        </div>
      </div>
    </section>

    <!-- 运营服务列表 -->
    <section class="operation-services">
      <h2 class="section-title">运营服务</h2>
      <div class="services-grid">
        <div class="service-item">
          <div class="service-header">
            <h3>内容策划</h3>
            <span class="service-tag">核心服务</span>
          </div>
          <p class="service-desc">专业的内容策划团队，为您量身定制内容策略，提升内容质量和用户粘性</p>
          <ul class="service-features">
            <li>内容主题规划</li>
            <li>发布时机优化</li>
            <li>互动策略制定</li>
          </ul>
        </div>
        
        <div class="service-item">
          <div class="service-header">
            <h3>账号运营</h3>
            <span class="service-tag">基础服务</span>
          </div>
          <p class="service-desc">全方位的账号运营管理，让您的账号保持活跃并持续增长</p>
          <ul class="service-features">
            <li>日常内容发布</li>
            <li>粉丝互动管理</li>
            <li>数据监控分析</li>
          </ul>
        </div>
        
        <div class="service-item">
          <div class="service-header">
            <h3>推广营销</h3>
            <span class="service-tag">增值服务</span>
          </div>
          <p class="service-desc">多渠道推广营销，扩大品牌影响力，提升商业价值</p>
          <ul class="service-features">
            <li>跨平台推广</li>
            <li>KOL合作</li>
            <li>活动策划执行</li>
          </ul>
        </div>
        
        <div class="service-item">
          <div class="service-header">
            <h3>商业变现</h3>
            <span class="service-tag">高阶服务</span>
          </div>
          <p class="service-desc">专业的商业变现策略，帮助您实现IP价值最大化</p>
          <ul class="service-features">
            <li>商业模式设计</li>
            <li>品牌合作对接</li>
            <li>收益优化策略</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- 运营案例 -->
    <section class="operation-cases">
      <h2 class="section-title">成功案例</h2>
      <div class="cases-container">
        <div class="case-card">
          <div class="case-image">
            <img src="@/assets/logo1.png" alt="案例图片" />
          </div>
          <div class="case-content">
            <h3>美食博主IP打造</h3>
            <p class="case-desc">通过精准的内容策划和运营策略，帮助美食博主在3个月内粉丝增长10万+</p>
            <div class="case-stats">
              <div class="stat-item">
                <span class="stat-number">10万+</span>
                <span class="stat-label">粉丝增长</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">300%</span>
                <span class="stat-label">互动提升</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="case-card">
          <div class="case-image">
            <img src="@/assets/logo2.png" alt="案例图片" />
          </div>
          <div class="case-content">
            <h3>旅游达人品牌合作</h3>
            <p class="case-desc">协助旅游达人与多个品牌建立合作关系，实现月收入翻倍</p>
            <div class="case-stats">
              <div class="stat-item">
                <span class="stat-number">50+</span>
                <span class="stat-label">品牌合作</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">200%</span>
                <span class="stat-label">收入增长</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 服务流程 -->
    <section class="service-process">
      <h2 class="section-title">服务流程</h2>
      <div class="process-steps">
        <div class="process-step">
          <div class="step-number">1</div>
          <h3>需求分析</h3>
          <p>深入了解您的IP定位和目标需求</p>
        </div>
        <div class="process-arrow">→</div>
        <div class="process-step">
          <div class="step-number">2</div>
          <h3>方案制定</h3>
          <p>量身定制专属的运营服务方案</p>
        </div>
        <div class="process-arrow">→</div>
        <div class="process-step">
          <div class="step-number">3</div>
          <h3>执行实施</h3>
          <p>专业团队按计划执行运营策略</p>
        </div>
        <div class="process-arrow">→</div>
        <div class="process-step">
          <div class="step-number">4</div>
          <h3>效果优化</h3>
          <p>持续监控数据并优化运营效果</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
</script>

<style scoped>
.service-operation-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: calc(100vh - 64px);
}

/* 页面头部 */
.page-header {
  text-align: center;
  margin-bottom: 60px;
}

.page-title {
  font-size: 48px;
  color: var(--primary-color);
  margin-bottom: 16px;
  font-weight: bold;
}

.page-subtitle {
  font-size: 18px;
  color: #666;
  line-height: 1.6;
}

/* 服务概览 */
.service-overview {
  margin-bottom: 80px;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.overview-card {
  background: white;
  padding: 40px 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease;
}

.overview-card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.overview-card h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 12px;
}

.overview-card p {
  color: #666;
  line-height: 1.6;
}

/* 运营服务 */
.operation-services {
  margin-bottom: 80px;
}

.section-title {
  font-size: 36px;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 50px;
  font-weight: bold;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.service-item {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px);
}

.service-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.service-header h3 {
  font-size: 20px;
  color: #333;
}

.service-tag {
  background: var(--primary-color);
  color: white;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
}

.service-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.service-features {
  list-style: none;
}

.service-features li {
  color: #555;
  margin-bottom: 8px;
  position: relative;
  padding-left: 20px;
}

.service-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--primary-color);
  font-weight: bold;
}

/* 运营案例 */
.operation-cases {
  margin-bottom: 80px;
}

.cases-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 40px;
}

.case-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
}

.case-card:hover {
  transform: translateY(-5px);
}

.case-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.case-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.case-content {
  padding: 30px;
}

.case-content h3 {
  font-size: 20px;
  color: #333;
  margin-bottom: 12px;
}

.case-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.case-stats {
  display: flex;
  gap: 30px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: var(--primary-color);
}

.stat-label {
  font-size: 14px;
  color: #666;
}

/* 服务流程 */
.service-process {
  margin-bottom: 60px;
}

.process-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.process-step {
  text-align: center;
  max-width: 200px;
}

.step-number {
  width: 60px;
  height: 60px;
  background: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  margin: 0 auto 20px;
}

.process-step h3 {
  font-size: 18px;
  color: #333;
  margin-bottom: 12px;
}

.process-step p {
  color: #666;
  line-height: 1.6;
}

.process-arrow {
  font-size: 24px;
  color: var(--primary-color);
  font-weight: bold;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-title {
    font-size: 36px;
  }
  
  .page-subtitle {
    font-size: 16px;
  }
  
  .overview-cards,
  .services-grid {
    grid-template-columns: 1fr;
  }
  
  .cases-container {
    grid-template-columns: 1fr;
  }
  
  .process-steps {
    flex-direction: column;
  }
  
  .process-arrow {
    transform: rotate(90deg);
  }
  
  .service-operation-container {
    padding: 20px 15px;
  }
}
</style>