<script setup lang="ts">
import { ref } from 'vue';

// 课程分类
const categories = [
  { id: 'all', name: '全部课程' },
  { id: 'ip-building', name: 'IP打造' },
  { id: 'marketing', name: '营销策略' },
  { id: 'operation', name: '运营管理' },
  { id: 'design', name: '设计创意' }
];

// 模拟课程数据
const courses = [
  {
    id: 1,
    title: '品牌IP构建基础与实战',
    category: 'ip-building',
    cover: 'https://picsum.photos/id/26/800/450',
    teacher: '张老师',
    level: '入门',
    duration: '8小时',
    students: 1280,
    price: 0,
    tags: ['品牌建设', 'IP打造', '入门课程']
  },
  {
    id: 2,
    title: '内容营销策略与执行',
    category: 'marketing',
    cover: 'https://picsum.photos/id/42/800/450',
    teacher: '李老师',
    level: '中级',
    duration: '10小时',
    students: 890,
    price: 299,
    tags: ['内容营销', '策略规划', '案例分析']
  },
  {
    id: 3,
    title: '用户运营体系设计',
    category: 'operation',
    cover: 'https://picsum.photos/id/63/800/450',
    teacher: '王老师',
    level: '中级',
    duration: '12小时',
    students: 765,
    price: 399,
    tags: ['用户运营', '体系搭建', '数据分析']
  },
  {
    id: 4,
    title: '品牌视觉设计与应用',
    category: 'design',
    cover: 'https://picsum.photos/id/96/800/450',
    teacher: '陈老师',
    level: '进阶',
    duration: '15小时',
    students: 620,
    price: 499,
    tags: ['视觉设计', '品牌应用', '实战演练']
  },
  {
    id: 5,
    title: '社交媒体IP打造实战',
    category: 'ip-building',
    cover: 'https://picsum.photos/id/111/800/450',
    teacher: '刘老师',
    level: '中级',
    duration: '10小时',
    students: 950,
    price: 349,
    tags: ['社交媒体', 'IP打造', '实战技巧']
  },
  {
    id: 6,
    title: '品牌故事构建与传播',
    category: 'marketing',
    cover: 'https://picsum.photos/id/133/800/450',
    teacher: '赵老师',
    level: '入门',
    duration: '6小时',
    students: 1120,
    price: 199,
    tags: ['品牌故事', '内容创作', '传播策略']
  }
];

// 当前选中分类
const selectedCategory = ref('all');

// 搜索关键词
const searchKeyword = ref('');

// 根据分类和关键词筛选课程
const filteredCourses = computed(() => {
  let result = courses;
  
  // 根据分类筛选
  if (selectedCategory.value !== 'all') {
    result = result.filter(course => course.category === selectedCategory.value);
  }
  
  // 根据关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(course => 
      course.title.toLowerCase().includes(keyword) ||
      course.teacher.toLowerCase().includes(keyword) ||
      course.tags.some(tag => tag.toLowerCase().includes(keyword))
    );
  }
  
  return result;
});

// 切换分类
const changeCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
};

// 跳转到课程详情
const goToCourseDetail = (courseId: number) => {
  // 这里可以实现跳转到课程详情页的逻辑
  alert(`跳转到课程ID: ${courseId} 的详情页`);
};

// 从vue导入computed
import { computed } from 'vue';
</script>

<template>
  <div class="learning-center-container">
    <div class="page-header">
      <h1>学习中心</h1>
      <p class="page-description">专业的品牌IP建设与营销课程，助力您的品牌成长</p>
    </div>
    
    <div class="learning-content">
      <!-- 搜索和分类区域 -->
      <div class="search-category-section">
        <div class="search-bar">
          <input 
            type="text" 
            v-model="searchKeyword"
            placeholder="搜索课程、讲师或标签..."
            class="search-input"
          />
          <button class="search-btn">🔍</button>
        </div>
        <div class="category-tabs">
          <button 
            v-for="category in categories" 
            :key="category.id"
            :class="['category-tab', { active: selectedCategory === category.id }]"
            @click="changeCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
      <!-- 课程列表区域 -->
      <div class="courses-section">
        <div class="section-header">
          <h2>课程列表</h2>
          <p class="course-count">共 {{ filteredCourses.length }} 门课程</p>
        </div>
        <div v-if="filteredCourses.length === 0" class="no-courses">
          <p>没有找到相关课程，请尝试其他关键词或分类。</p>
        </div>
        <div v-else class="courses-grid">
          <div 
            v-for="course in filteredCourses" 
            :key="course.id"
            class="course-card"
            @click="goToCourseDetail(course.id)"
          >
            <div class="course-cover">
              <img :src="course.cover" :alt="course.title" />
              <div v-if="course.price === 0" class="free-badge">免费</div>
            </div>
            <div class="course-info">
              <div class="course-tags">
                <span v-for="(tag, index) in course.tags.slice(0, 2)" :key="index" class="tag">
                  {{ tag }}
                </span>
              </div>
              <h3 class="course-title">{{ course.title }}</h3>
              <div class="course-meta">
                <span class="teacher">{{ course.teacher }}</span>
                <span class="level" :class="`level-${course.level}`">{{ course.level }}</span>
              </div>
              <div class="course-stats">
                <span class="stat-item">⏱ {{ course.duration }}</span>
                <span class="stat-item">👥 {{ course.students }}</span>
              </div>
              <div class="course-footer">
                <div class="course-price">
                  {{ course.price === 0 ? '免费' : `¥${course.price}` }}
                </div>
                <button class="course-btn">查看详情</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 学习路径推荐 -->
      <div class="learning-paths-section">
        <div class="section-header">
          <h2>推荐学习路径</h2>
          <p class="section-description">根据您的学习目标，我们推荐以下学习路径</p>
        </div>
        <div class="paths-grid">
          <div class="path-card">
            <div class="path-icon">🏆</div>
            <h3>IP打造专家</h3>
            <p>从零开始学习品牌IP建设，成为专业IP打造专家</p>
            <div class="path-info">
              <span>5门课程</span>
              <span>45小时学习时长</span>
            </div>
          </div>
          <div class="path-card">
            <div class="path-icon">📈</div>
            <h3>营销策划精英</h3>
            <p>掌握品牌营销策略，提升营销效果和转化能力</p>
            <div class="path-info">
              <span>4门课程</span>
              <span>36小时学习时长</span>
            </div>
          </div>
          <div class="path-card">
            <div class="path-icon">👥</div>
            <h3>用户运营大师</h3>
            <p>学习用户运营体系搭建，提升用户增长和忠诚度</p>
            <div class="path-info">
              <span>4门课程</span>
              <span>40小时学习时长</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.learning-center-container {
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

/* 搜索和分类区域 */
.search-category-section {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 40px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.search-bar {
  display: flex;
  margin-bottom: 24px;
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

.category-tabs {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding-bottom: 8px;
}

.category-tab {
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

.category-tab:hover {
  background-color: #e0e0e0;
  color: #333;
}

.category-tab.active {
  background-color: var(--primary-color);
  color: white;
}

/* 课程列表区域 */
.courses-section {
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

.course-count,
.section-description {
  font-size: 16px;
  color: #666;
}

.courses-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
}

.course-card {
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
}

.course-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.course-cover {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.course-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.course-card:hover .course-cover img {
  transform: scale(1.05);
}

.free-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: #4caf50;
  color: white;
  padding: 4px 12px;
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
}

.course-info {
  padding: 20px;
}

.course-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.tag {
  padding: 4px 12px;
  background-color: #f0f0f0;
  border-radius: 30px;
  font-size: 12px;
  color: #666;
}

.course-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 12px;
  line-height: 1.4;
  height: 50px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.course-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.teacher {
  font-size: 14px;
  color: #666;
}

.level {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.level-入门 {
  background-color: #e3f2fd;
  color: #1976d2;
}

.level-中级 {
  background-color: #fff3e0;
  color: #ff9800;
}

.level-进阶 {
  background-color: #fce4ec;
  color: #e91e63;
}

.course-stats {
  display: flex;
  gap: 20px;
  margin-bottom: 16px;
}

.stat-item {
  font-size: 14px;
  color: #666;
}

.course-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.course-price {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
}

.course-btn {
  padding: 8px 16px;
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.course-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

.no-courses {
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.no-courses p {
  font-size: 18px;
  color: #666;
}

/* 学习路径推荐 */
.learning-paths-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 40px;
}

.paths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
}

.path-card {
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
}

.path-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.path-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.path-card h3 {
  font-size: 20px;
  color: var(--text-color);
  margin-bottom: 12px;
}

.path-card p {
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
}

.path-info {
  display: flex;
  justify-content: center;
  gap: 30px;
  font-size: 14px;
  color: var(--primary-color);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .page-header h1 {
    font-size: 32px;
  }
  
  .courses-grid {
    grid-template-columns: 1fr;
  }
  
  .paths-grid {
    grid-template-columns: 1fr;
  }
  
  .learning-paths-section {
    padding: 30px 20px;
  }
  
  .search-category-section {
    padding: 20px;
  }
}
</style>