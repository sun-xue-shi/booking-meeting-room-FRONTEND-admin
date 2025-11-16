<script setup lang="ts">
import { ref } from "vue";

// 讨论话题分类
const categories = [
  { id: "all", name: "全部话题" },
  { id: "ip-building", name: "IP建设" },
  { id: "marketing", name: "营销策略" },
  { id: "design", name: "设计创意" },
  { id: "industry-news", name: "行业资讯" },
  { id: "experience-sharing", name: "经验分享" },
];

// 模拟讨论话题数据
const discussions = [
  {
    id: 1,
    title: "如何打造具有辨识度的个人IP？",
    category: "ip-building",
    author: "品牌顾问小李",
    avatar: "https://picsum.photos/id/64/100",
    content:
      "在当今竞争激烈的市场环境中，打造具有高辨识度的个人IP越来越重要。我认为个人IP的核心在于找到自己的独特定位和差异化价值主张。大家有什么成功案例或经验可以分享吗？",
    publishTime: "2024-01-15 14:30",
    views: 523,
    replies: 28,
    likes: 95,
    isLiked: false,
  },
  {
    id: 2,
    title: "2024年品牌营销策略趋势预测",
    category: "marketing",
    author: "营销专家老张",
    avatar: "https://picsum.photos/id/65/100",
    content:
      "随着市场环境的变化，2024年的品牌营销策略也在不断演变。我认为内容营销、社交媒体营销和数据驱动营销将继续发挥重要作用，但形式和方法会有新的变化。大家对今年的营销趋势有什么看法？",
    publishTime: "2024-01-14 09:15",
    views: 876,
    replies: 45,
    likes: 156,
    isLiked: true,
  },
  {
    id: 3,
    title: "分享我的品牌设计作品，求指导",
    category: "design",
    author: "设计师小王",
    avatar: "https://picsum.photos/id/66/100",
    content:
      "最近完成了一个品牌设计项目，包含了logo、VI系统等。这是我第一次独立完成的完整项目，希望能得到大家的指导和建议。特别是在色彩搭配和应用场景方面，我还需要提升。",
    publishTime: "2024-01-13 16:45",
    views: 432,
    replies: 32,
    likes: 89,
    isLiked: false,
  },
  {
    id: 4,
    title: "最新IP授权市场数据分析",
    category: "industry-news",
    author: "行业分析师小陈",
    avatar: "https://picsum.photos/id/67/100",
    content:
      "根据最新的数据显示，2023年IP授权市场规模达到了历史新高，但增速有所放缓。其中，文化娱乐和消费品领域的IP授权合作最为活跃。大家对这个数据有什么见解？",
    publishTime: "2024-01-12 11:20",
    views: 654,
    replies: 23,
    likes: 112,
    isLiked: false,
  },
  {
    id: 5,
    title: "从零开始做内容营销的经验分享",
    category: "experience-sharing",
    author: "内容运营小周",
    avatar: "https://picsum.photos/id/68/100",
    content:
      "作为一名刚入行的内容运营，我想分享一下这一年来从零开始做内容营销的经验和教训。从内容定位、选题策划到发布推广，每一步都有很多需要注意的地方...",
    publishTime: "2024-01-11 15:10",
    views: 732,
    replies: 38,
    likes: 145,
    isLiked: false,
  },
];

// 当前选中的分类
const selectedCategory = ref("all");

// 搜索关键词
const searchKeyword = ref("");

// 是否显示发布话题表单
const showPublishForm = ref(false);

// 发布表单数据
const publishForm = ref({
  title: "",
  category: "",
  content: "",
});

// 根据分类筛选讨论话题
const filteredDiscussions = computed(() => {
  let result = discussions;

  // 根据分类筛选
  if (selectedCategory.value !== "all") {
    result = result.filter(
      (discussion) => discussion.category === selectedCategory.value
    );
  }

  // 根据关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase();
    result = result.filter(
      (discussion) =>
        discussion.title.toLowerCase().includes(keyword) ||
        discussion.content.toLowerCase().includes(keyword) ||
        discussion.author.toLowerCase().includes(keyword)
    );
  }

  return result;
});

// 切换分类
const changeCategory = (categoryId: string) => {
  selectedCategory.value = categoryId;
};

// 打开发布话题表单
const openPublishForm = () => {
  showPublishForm.value = true;
};

// 关闭发布话题表单
const closePublishForm = () => {
  showPublishForm.value = false;
  resetPublishForm();
};

// 重置发布表单
const resetPublishForm = () => {
  publishForm.value = {
    title: "",
    category: "",
    content: "",
  };
};

// 发布新话题
const publishNewDiscussion = () => {
  // 简单验证
  if (
    !publishForm.value.title ||
    !publishForm.value.category ||
    !publishForm.value.content
  ) {
    alert("请填写完整的话题信息");
    return;
  }

  // 这里可以实现发布新话题的逻辑
  alert("话题发布成功！");
  closePublishForm();
};

// 点赞/取消点赞
const toggleLike = (index: number) => {
  const discussion = filteredDiscussions.value[index];
  if (discussion.isLiked) {
    discussion.likes--;
  } else {
    discussion.likes++;
  }
  discussion.isLiked = !discussion.isLiked;
};

// 查看话题详情
const viewDiscussionDetail = (discussionId: number) => {
  alert(`查看话题ID: ${discussionId} 的详情`);
};

// 从vue导入computed
import { computed } from "vue";
</script>

<template>
  <div class="community-container">
    <div class="page-header">
      <h1>社群互动</h1>
      <p class="page-description">与行业专家和同行交流，分享经验，共同成长</p>
    </div>

    <div class="community-content">
      <!-- 搜索和分类区域 -->
      <div class="search-category-section">
        <div class="search-and-publish">
          <div class="search-bar">
            <input
              type="text"
              v-model="searchKeyword"
              placeholder="搜索话题、作者或内容..."
              class="search-input"
            />
            <button class="search-btn">🔍</button>
          </div>
          <button class="publish-btn" @click="openPublishForm">
            + 发布话题
          </button>
        </div>
        <div class="category-tabs">
          <button
            v-for="category in categories"
            :key="category.id"
            :class="[
              'category-tab',
              { active: selectedCategory === category.id },
            ]"
            @click="changeCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
      </div>
      <!-- 讨论话题列表 -->
      <div class="discussions-section">
        <div class="section-header">
          <h2>热门讨论</h2>
          <p class="discussion-count">
            共 {{ filteredDiscussions.length }} 个话题
          </p>
        </div>
        <div v-if="filteredDiscussions.length === 0" class="no-discussions">
          <p>暂无相关讨论话题，请尝试其他搜索条件或发布新话题。</p>
        </div>
        <div v-else class="discussions-list">
          <div
            v-for="(discussion, index) in filteredDiscussions"
            :key="discussion.id"
            class="discussion-card"
          >
            <div class="author-info">
              <img
                :src="discussion.avatar"
                :alt="discussion.author"
                class="author-avatar"
              />
              <div class="author-details">
                <div class="author-name">{{ discussion.author }}</div>
                <div class="publish-time">{{ discussion.publishTime }}</div>
              </div>
              <span class="category-badge">
                {{
                  categories.find((c) => c.id === discussion.category)?.name
                }}</span
              >
            </div>
            <div
              class="discussion-content"
              @click="viewDiscussionDetail(discussion.id)"
            >
              <h3 class="discussion-title">{{ discussion.title }}</h3>
              <p class="discussion-text">{{ discussion.content }}</p>
            </div>
            <div class="discussion-actions">
              <button
                class="action-btn view-btn"
                @click="viewDiscussionDetail(discussion.id)"
              >
                👁 {{ discussion.views }}
              </button>
              <button
                class="action-btn reply-btn"
                @click="viewDiscussionDetail(discussion.id)"
              >
                💬 {{ discussion.replies }}
              </button>
              <button
                class="action-btn like-btn"
                :class="{ liked: discussion.isLiked }"
                @click="toggleLike(index)"
              >
                👍 {{ discussion.likes }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- 社群活跃用户 -->
      <div class="active-users-section">
        <div class="section-header">
          <h2>活跃用户榜</h2>
        </div>
        <div class="active-users-list">
          <div class="user-card">
            <div class="rank-badge gold">1</div>
            <img
              src="https://picsum.photos/id/64/100"
              alt="用户头像"
              class="user-avatar"
            />
            <div class="user-info">
              <div class="user-name">品牌顾问小李</div>
              <div class="user-stats">发布 45 篇 · 获赞 2341 次</div>
            </div>
          </div>
          <div class="user-card">
            <div class="rank-badge silver">2</div>
            <img
              src="https://picsum.photos/id/65/100"
              alt="用户头像"
              class="user-avatar"
            />
            <div class="user-info">
              <div class="user-name">营销专家老张</div>
              <div class="user-stats">发布 38 篇 · 获赞 1956 次</div>
            </div>
          </div>
          <div class="user-card">
            <div class="rank-badge bronze">3</div>
            <img
              src="https://picsum.photos/id/66/100"
              alt="用户头像"
              class="user-avatar"
            />
            <div class="user-info">
              <div class="user-name">设计师小王</div>
              <div class="user-stats">发布 32 篇 · 获赞 1687 次</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 发布话题弹窗 -->
    <div
      v-if="showPublishForm"
      class="publish-modal-overlay"
      @click.self="closePublishForm"
    >
      <div class="publish-modal">
        <div class="modal-header">
          <h2>发布新话题</h2>
          <button class="close-btn" @click="closePublishForm">×</button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="publishNewDiscussion">
            <div class="form-group">
              <label for="title">话题标题 *</label>
              <input
                id="title"
                v-model="publishForm.title"
                type="text"
                placeholder="请输入话题标题"
                required
              />
            </div>
            <div class="form-group">
              <label for="category">话题分类 *</label>
              <select id="category" v-model="publishForm.category" required>
                <option value="">请选择话题分类</option>
                <option
                  v-for="category in categories.filter((c) => c.id !== 'all')"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="content">话题内容 *</label>
              <textarea
                id="content"
                v-model="publishForm.content"
                rows="8"
                placeholder="请详细描述您的话题内容"
                required
              ></textarea>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="cancel-btn"
                @click="closePublishForm"
              >
                取消
              </button>
              <button type="submit" class="submit-btn">发布话题</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.community-container {
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

/* 讨论话题列表 */
.discussions-section {
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

.discussion-count {
  font-size: 16px;
  color: #666;
}

.discussions-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.discussion-card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.discussion-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
}

.author-info {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}

.author-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin-right: 16px;
}

.author-details {
  flex: 1;
}

.author-name {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 4px;
}

.publish-time {
  font-size: 14px;
  color: #666;
}

.category-badge {
  padding: 4px 12px;
  background-color: #e3f2fd;
  color: var(--primary-color);
  border-radius: 30px;
  font-size: 14px;
  font-weight: 500;
}

.discussion-content {
  margin-bottom: 20px;
  cursor: pointer;
}

.discussion-title {
  font-size: 20px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 12px;
}

.discussion-text {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.discussion-actions {
  display: flex;
  gap: 24px;
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
}

.action-btn {
  background: none;
  border: none;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 6px;
}

.action-btn:hover {
  color: var(--primary-color);
}

.like-btn.liked {
  color: #e91e63;
}

.no-discussions {
  text-align: center;
  padding: 60px 20px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.no-discussions p {
  font-size: 18px;
  color: #666;
}

/* 活跃用户榜 */
.active-users-section {
  background-color: var(--bg-color);
  border-radius: 12px;
  padding: 40px;
}

.active-users-list {
  display: flex;
  gap: 30px;
  justify-content: center;
  flex-wrap: wrap;
}

.user-card {
  position: relative;
  background-color: white;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  width: 250px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
}

.user-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.rank-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-badge.gold {
  background-color: #ffd700;
}

.rank-badge.silver {
  background-color: #c0c0c0;
}

.rank-badge.bronze {
  background-color: #cd7f32;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 20px;
  margin-top: 10px;
}

.user-name {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-color);
  margin-bottom: 8px;
}

.user-stats {
  font-size: 14px;
  color: #666;
}

/* 发布话题弹窗 */
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
  max-width: 700px;
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
  min-height: 200px;
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

  .author-info {
    flex-wrap: wrap;
  }

  .category-badge {
    margin-top: 12px;
  }

  .discussion-actions {
    flex-wrap: wrap;
    gap: 16px;
  }

  .active-users-section {
    padding: 30px 20px;
  }

  .active-users-list {
    flex-direction: column;
    align-items: center;
  }

  .user-card {
    width: 100%;
    max-width: 300px;
  }
}
</style>
