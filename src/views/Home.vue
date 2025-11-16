<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const router = useRouter();

// 示例数据 - 成功案例
const cases = [
  {
    id: 1,
    title: "猪肉铺老板 '铁秤哥'—— 从夫妻店到本地网红",
    description:
      "初始状态：开了8年社区猪肉铺，客源稳定但增长停滞，不懂线上运营。服务套餐：IP成长套餐（3个月）。核心操作：提炼'足斤足两、不掺水分'的实在人设，聚焦'日常切肉技巧+猪肉选购避坑+家常菜做法'内容，搭配接地气的方言口播。成果：3个月涨粉2.3万，本地到店客单量提升40%，接到3家生鲜品牌供货合作，月增收1.5万元。",
    category: "IP成长套餐",
    image: new URL("@/assets/pig.jpg", import.meta.url).href,
    initialState: "开了8年社区猪肉铺，客源稳定但增长停滞，不懂线上运营",
    servicePackage: "IP成长套餐（3个月）",
    coreOperations:
      "提炼'足斤足两、不掺水分'的实在人设，聚焦'日常切肉技巧+猪肉选购避坑+家常菜做法'内容，搭配接地气的方言口播",
    results:
      "3个月涨粉2.3万，本地到店客单量提升40%，接到3家生鲜品牌供货合作，月增收1.5万元",
  },
  {
    id: 2,
    title: "货车司机 '老杨跑全国'—— 从跑车谋生到旅行IP",
    description:
      "初始状态：货车司机10年，常年跑长途，想记录生活却不知如何下手，发布3条视频无流量。服务套餐：IP启蒙套餐（1个月）→升级IP变现套餐（6个月）。核心操作：打造'懂路况、爱分享的暖心货车师傅'人设，内容聚焦'全国路况播报+沿途风景打卡+跑车省钱技巧'，直播解答货运行业疑问。成果：6个月涨粉8.7万，成为货运垂类小有名气的IP，接到轮胎、车载用品等广告合作，私域积累5000+货运同行，开启货源对接中介服务，月增收2万元。",
    category: "IP变现套餐",
    image: new URL("@/assets/car.jpg", import.meta.url).href,
    initialState:
      "货车司机10年，常年跑长途，想记录生活却不知如何下手，发布3条视频无流量",
    servicePackage: "IP启蒙套餐（1个月）→升级IP变现套餐（6个月）",
    coreOperations:
      "打造'懂路况、爱分享的暖心货车师傅'人设，内容聚焦'全国路况播报+沿途风景打卡+跑车省钱技巧'，直播解答货运行业疑问",
    results:
      "6个月涨粉8.7万，成为货运垂类小有名气的IP，接到轮胎、车载用品等广告合作，私域积累5000+货运同行，开启货源对接中介服务，月增收2万元",
  },
];

// 示例数据 - 服务套餐
const services = [
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
];

// 示例数据 - 最新活动
const activities = [
  {
    id: 1,
    title: '"新媒体+文旅"',
    date: "2024-06-20",
    location: "全国",
    description: "货车司机目的地一日游/记录一日三餐",
  },
  {
    id: 2,
    title: "短视频知识问答大赛、街访",
    date: "2024-06-25",
    location: "线上线下",
    description: "你喜欢的猪肉做法/认识猪的品种",
  },
  {
    id: 3,
    title: "沉浸式体验活动",
    date: "2024-07-05",
    location: "上海",
    description: "参与素人沉浸式工作场景、和创作过程",
  },
  {
    id: 4,
    title: "素人专属招募孵化营",
    date: "2024-07-10",
    location: "线上",
    description:
      '"平凡人设出道计划——素人IP 21天孵化营"提供免费基础培训，涵盖人设定位、短视频拍摄剪辑等课程，优秀者直接签约，还能获得流量扶持和专属运营团队。',
  },
];

// Swiper配置选项
const swiperOptions = {
  modules: [Pagination, Autoplay],
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
};

// 示例数据 - 行业资讯
const news = [
  {
    id: 1,
    title: "壹网壹创",
    description: "AI体验日、日常宣传",
    images: [
      new URL("@/assets/yichuang/yichuang1.png", import.meta.url).href,
      new URL("@/assets/yichuang/yichuang2.png", import.meta.url).href,
      new URL("@/assets/yichuang/yichuang3.png", import.meta.url).href,
      new URL("@/assets/yichuang/yichuang4.png", import.meta.url).href,
    ],
  },
  {
    id: 2,
    title: "构美",
    description: "60秒沉浸体验；短剧素人招募；主播特训营；招募外籍主播",
    images: [
      new URL("@/assets/goumei/goumei1.png", import.meta.url).href,
      new URL("@/assets/goumei/goumei2.png", import.meta.url).href,
      new URL("@/assets/goumei/goumei3.png", import.meta.url).href,
    ],
  },
  {
    id: 3,
    title: "无忧传媒",
    description: "无忧之夜、双十一宣传、特色主播、企业进军韩国、采访CEO",
    images: [
      new URL("@/assets/wuyou/wuyou1.png", import.meta.url).href,
      new URL("@/assets/wuyou/wuyou2.png", import.meta.url).href,
      new URL("@/assets/wuyou/wuyou3.png", import.meta.url).href,
      new URL("@/assets/wuyou/wuyou4.png", import.meta.url).href,
    ],
  },
  {
    id: 4,
    title: "遥望科技",
    description: "电商直播；招募达人；青年男团打造计划；宣传片",
    images: [
      new URL("@/assets/yaowang/yaowang1.png", import.meta.url).href,
      new URL("@/assets/yaowang/yaowang2.png", import.meta.url).href,
      new URL("@/assets/yaowang/yaowang3.png", import.meta.url).href,
    ],
  },
  {
    id: 5,
    title: "蜂群文化",
    description: "主播孵化计划；微博影响力大会",
    images: [
      new URL("@/assets/fengquun/fengqun1.png", import.meta.url).href,
      new URL("@/assets/fengquun/fengqun2.png", import.meta.url).href,
      new URL("@/assets/fengquun/fengqun3.png", import.meta.url).href,
    ],
  },
];
</script>

<template>
  <div class="home-container">
    <!-- 行业资讯 - Swiper轮播图形式 -->
    <section class="section news-section">
      <div class="news-carousel-container">
        <div class="carousel-main-content">
          <div class="carousel-block">
            <div class="carousel-header">
              <h3>行业资讯</h3>
            </div>
            <Swiper
              class="news-swiper"
              :modules="swiperOptions.modules"
              :loop="swiperOptions.loop"
              :autoplay="swiperOptions.autoplay"
              :pagination="swiperOptions.pagination"
            >
              <SwiperSlide
                v-for="item in news"
                :key="item.id"
                class="carousel-slide"
              >
                <div class="carousel-content">
                  <div class="carousel-image">
                    <img
                      v-for="(image, index) in item.images"
                      :key="index"
                      :src="image"
                      alt="轮播图片"
                      class="carousel-img"
                    />
                  </div>
                  <div class="carousel-info">
                    <h3 class="carousel-title">{{ item.title }}</h3>
                    <p class="carousel-description">{{ item.description }}</p>
                  </div>
                </div>
              </SwiperSlide>
              <!-- Swiper分页指示器 -->
              <div class="swiper-pagination"></div>
            </Swiper>
          </div>

          <!-- 最新活动悬浮卡片 -->
          <div class="latest-activities-card">
            <h3 class="activities-title">最新活动</h3>
            <div class="activities-list">
              <div class="activity-item">
                <span class="activity-icon">📱</span>
                <span class="activity-text"
                  >"新媒体+文旅" （货车司机目的地一日游/记录一日三餐）</span
                >
              </div>
              <div class="activity-item">
                <span class="activity-icon">🎬</span>
                <span class="activity-text"
                  >短视频知识问答大赛、街访（你喜欢的猪肉做法/认识猪的品种）</span
                >
              </div>
              <div class="activity-item">
                <span class="activity-icon">🎭</span>
                <span class="activity-text"
                  >沉浸式体验活动 (参与素人沉浸式工作场景、和创作过程)</span
                >
              </div>
              <div class="activity-item">
                <span class="activity-icon">🚀</span>
                <span class="activity-text"
                  >素人专属招募孵化营 （"平凡人设出道计划——素人IP
                  21天孵化营"）</span
                >
              </div>
            </div>
            <div class="activities-footer">
              <p>
                提供免费基础培训，涵盖人设定位、短视频拍摄剪辑等课程，优秀者直接签约，还能获得流量扶持和专属运营团队。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 成功案例 -->
    <section class="section cases-section">
      <div class="section-header">
        <h2>成功案例</h2>
        <div class="section-divider"></div>
      </div>
      <div class="cases-grid">
        <div v-for="caseItem in cases" :key="caseItem.id" class="case-card">
          <div class="case-image">
            <img :src="caseItem.image" :alt="caseItem.title" />
          </div>
          <div class="case-content">
            <span class="case-category">{{ caseItem.category }}</span>
            <h3 class="case-title">{{ caseItem.title }}</h3>
            <div class="case-details">
              <div class="case-detail-item">
                <strong>初始状态：</strong>
                <span>{{ caseItem.initialState }}</span>
              </div>
              <div class="case-detail-item">
                <strong>服务套餐：</strong>
                <span>{{ caseItem.servicePackage }}</span>
              </div>
              <div class="case-detail-item">
                <strong>核心操作：</strong>
                <span>{{ caseItem.coreOperations }}</span>
              </div>
              <div class="case-detail-item">
                <strong>成果：</strong>
                <span>{{ caseItem.results }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="section-more">
        <button class="more-btn" @click="navigateToDetail('cases')">
          查看全部案例
        </button>
      </div> -->
    </section>

    <!-- 服务套餐 -->
    <section class="section services-section">
      <div class="section-header">
        <h2>服务套餐</h2>
        <div class="section-divider"></div>
      </div>

      <!-- 特色套餐核心承诺 -->
      <div class="core-commitment">
        <h3>特色套餐</h3>
        <p class="commitment-text">
          零押金孵化・仅付设备租金・起号再抽成・无号零额外费用
        </p>
        <p class="commitment-details">
          核心承诺：0 押金、0
          风险、轻投入启动！猪肉铺老板、货车司机等普通人，仅需支付基础设备租借费，我们全程负责
          IP
          打造，起号成功后再按约定抽成；若未起号（粉丝未达约定标准），无需支付任何加工费、运营费，真正降低素人创业门槛。
        </p>
      </div>

      <div class="services-grid">
        <div
          v-for="service in services"
          :key="service.id"
          :class="['service-card', service.type, { popular: service.popular }]"
        >
          <div v-if="service.popular" class="popular-badge">热门推荐</div>
          <h3 class="service-name">{{ service.name }}</h3>
          <div v-if="service.tag" class="service-tag">{{ service.tag }}</div>
          <div class="service-price">{{ service.price }}</div>
          <ul class="service-features">
            <li v-for="(feature, index) in service.features" :key="index">
              <span class="checkmark"></span> {{ feature }}
            </li>
          </ul>
          <div class="service-info">
            <p class="service-audience">{{ service.audience }}</p>
            <p class="service-cost-info">{{ service.costInfo }}</p>
          </div>
          <!-- <button class="service-btn" @click="navigateToDetail('services')">
            选择套餐
          </button> -->
        </div>
      </div>

      <!-- 通用服务保障 -->
      <div class="service-guarantee">
        <h3>通用服务保障</h3>
        <ul class="guarantee-list">
          <li>
            风险兜底：未起号（按套餐约定标准）仅收设备租金，无任何隐性消费
          </li>
          <li>
            版权归属：所有内容、IP
            形象、账号权益均归客户所有，我方仅保留案例展示权（需提前征得同意）
          </li>
          <li>
            服务团队：启航套餐 1 人专属运营，成长套餐 3 人小组（策划 + 拍摄 +
            运营），变现套餐 5 人团队（含商务）
          </li>
          <li>
            灵活调整：支持中途更换套餐，设备租金多退少补，抽成规则可根据 IP
            成长进度协商调整
          </li>
          <li>
            售后支持：所有套餐均提供 1
            年免费售后咨询，包含内容优化、平台规则更新、变现技巧指导
          </li>
        </ul>
      </div>
    </section>

    <!-- IP服务流程部分 -->
    <section class="section process-section">
      <div class="container">
        <div class="section-header">
          <h2>服务流程</h2>
          <div class="section-divider"></div>
        </div>
        <div class="process-container">
          <div class="process-steps">
            <div class="process-step">
              <div class="step-label">STEP 1</div>
              <div class="process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 18V15"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="step-title">咨询对接</h3>
              <p class="step-description">
                初步沟通需求，了解服务内容<br />制定个性化IP打造方案<br />明确双方合作目标
              </p>
            </div>
            <div class="process-step">
              <div class="step-label">STEP 2</div>
              <div class="process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20.59 13.41L17.76 10.59C17.37 10.2 16.73 10.2 16.34 10.59L8.34 18.59C7.95 18.98 7.95 19.62 8.34 20.01L9.17 20.84C9.56 21.23 10.2 21.23 10.59 20.84L13 18.41M13 18.41L22 9.41C22.53 8.88 22.53 8.01 22 7.47L20.59 6C20.05 5.47 19.18 5.47 18.65 6L13 11.65"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="step-title">职业亮点挖掘+人设定位</h3>
              <p class="step-description">
                深入分析个人优势与特点<br />挖掘核心竞争力<br />打造独特且一致的个人IP形象
              </p>
            </div>
            <div class="process-step">
              <div class="step-label">STEP 3</div>
              <div class="process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="step-title">账号基础搭建+内容规划</h3>
              <p class="step-description">
                多平台账号注册与优化<br />设计统一视觉识别系统<br />制定系统性内容发布策略
              </p>
            </div>
            <div class="process-step">
              <div class="step-label">STEP 4</div>
              <div class="process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 15C15.866 15 19 11.866 19 8C19 4.13401 15.866 1 12 1C8.13401 1 5 4.13401 5 8C5 11.866 8.13401 15 12 15Z"
                    stroke="#00219F"
                    stroke-width="2"
                  />
                  <path
                    d="M15 8L13 9L15 10"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="step-title">内容创作（拍摄/剪辑/脚本）</h3>
              <p class="step-description">
                专业脚本撰写<br />高质量拍摄与后期制作<br />内容审核与优化
              </p>
            </div>
            <div class="process-step">
              <div class="step-label">STEP 5</div>
              <div class="process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2H6C4.34315 2 3 3.34315 3 5C3 6.65685 4.34315 8 6 8H18Z"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 13L8 13"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 17L8 17"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 8V18C3 19.6569 4.34315 21 6 21H18C19.6569 21 21 19.6569 21 18V8"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="step-title">全平台发布+流量助推</h3>
              <p class="step-description">
                多平台内容同步发布<br />精准用户群体定向<br />专业流量投放与转化优化
              </p>
            </div>
          </div>
          <div class="process-steps">
            <div class="process-step">
              <div class="step-label">STEP 6</div>
              <div class="process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 10L22 6L18 2"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M2 12C2 16.4183 5.58172 20 10 20H14C18.4183 20 22 16.4183 22 12V6"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 3L2 12H12"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="step-title">数据监测+粉丝互动</h3>
              <p class="step-description">
                实时数据监控与分析<br />粉丝评论管理与互动<br />用户画像与需求洞察
              </p>
            </div>
            <div class="process-step">
              <div class="step-label">STEP 7</div>
              <div class="process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22Z"
                    stroke="#00219F"
                    stroke-width="2"
                  />
                  <path
                    d="M12 8V12"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 16H12.01"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="step-title">阶段复盘+内容优化</h3>
              <p class="step-description">
                阶段性效果评估<br />内容策略迭代优化<br />调整发布节奏与形式
              </p>
            </div>
            <div class="process-step">
              <div class="step-label">STEP 8</div>
              <div class="process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V17C22 18.6569 20.6569 20 19 20H5C3.34315 20 2 18.6569 2 17V14C2 12.4087 2.63214 10.8826 3.75736 9.75736C4.88258 8.63214 6.4087 8 8 8H16Z"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 10V13"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 17H12.01"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <h3 class="step-title">商业合作对接/变现转化</h3>
              <p class="step-description">
                潜在商业合作伙伴筛选<br />品牌合作谈判与执行<br />多元化变现渠道开发
              </p>
            </div>
            <div class="process-step">
              <div class="step-label">STEP 9</div>
              <div class="process-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M12 2V6"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M12 18V22"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4.93 4.93L7.76 7.76"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16.24 16.24L19.07 19.07"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M2 12H6"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M18 12H22"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M4.93 19.07L7.76 16.24"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M16.24 7.76L19.07 4.93"
                    stroke="#00219F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
              <h3 class="step-title">长期IP维护+矩阵拓展</h3>
              <p class="step-description">
                IP形象持续优化<br />多平台矩阵账号布局<br />品牌价值深度挖掘与提升
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* 通用部分样式 */
.home-container {
  padding-bottom: 60px;
}

.section {
  padding: 40px 0;
  position: relative;
}

.section:nth-child(even) {
  background-color: white;
}

.section:nth-child(odd) {
  background-color: white;
}

/* 通用标题样式 */
.section-header {
  text-align: center;
  margin-bottom: 30px;
}

.section-header h2 {
  font-size: 36px;
  color: var(--primary-color);
}

.section-header h2::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: var(--secondary-color);
}

.section-divider {
  width: 80px;
  height: 4px;
  background-color: var(--secondary-color);
  margin: 16px auto 0;
}

/* 查看更多按钮 */
.section-more {
  text-align: center;
  margin-top: 20px;
}

.more-btn {
  padding: 10px 30px;
  background-color: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.more-btn:hover {
  background-color: var(--primary-color);
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 33, 159, 0.2);
}

/* 成功案例样式 */
.cases-grid {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 5px;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}

.case-card {
  background-color: #f8fbff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  border: 1px solid #e1ecf4;
}

.case-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.case-image {
  width: 200px;
  height: 200px;
  overflow: hidden;
  background-color: #f0f0f0;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.case-image img {
  width: 160px;
  height: 160px;
  object-fit: cover;
  transition: transform 0.5s;
  border-radius: 50%;
  border: 4px solid var(--primary-color);
}

.case-card:hover .case-image img {
  transform: scale(1.05);
}

.case-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.case-category {
  display: inline-flex;
  align-items: center;
  padding: 6px 16px;
  background: linear-gradient(135deg, var(--primary-color), #0038b0);
  color: white;
  border-radius: 20px;
  font-size: 12px;
  margin-bottom: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 33, 159, 0.2);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.case-category::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.case-card:hover .case-category::before {
  left: 100%;
}

.case-title {
  font-size: 22px;
  color: var(--text-color);
  margin-bottom: 12px;
  line-height: 1.4;
}

.case-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.case-detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.case-detail-item strong {
  color: var(--primary-color);
  font-size: 14px;
  font-weight: 600;
}

.case-detail-item span {
  color: #555;
  line-height: 1.5;
  font-size: 15px;
}

.case-action {
  color: var(--primary-color);
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s;
}

.case-card:hover .case-action {
  transform: translateX(5px);
}

/* 服务套餐样式 */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.service-card {
  background-color: white;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

/* 白银主题样式 */
.service-card.silver {
  border-top: 4px solid #c0c0c0;
}

.service-card.silver .service-name {
  color: #666666;
}

.service-card.silver .service-tag {
  background-color: #f0f0f0;
  color: #666666;
}

/* 黄金主题样式 */
.service-card.gold {
  border-top: 4px solid #ffd700;
}

.service-card.gold .service-name {
  color: #d4af37;
}

.service-card.gold .service-tag {
  background-color: #fff8dc;
  color: #d4af37;
}

/* 钻石主题样式 */
.service-card.diamond {
  border-top: 4px solid #b9f2ff;
}

.service-card.diamond .service-name {
  color: #00bcd4;
}

.service-card.diamond .service-tag {
  background-color: #e0f7fa;
  color: #00bcd4;
}

.service-card.popular {
  transform: translateY(-10px);
  border: 2px solid var(--primary-color);
}

.popular-badge {
  position: absolute;
  top: 0;
  right: 0;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  padding: 8px 24px;
  font-weight: bold;
  font-size: 14px;
  transform: rotate(45deg) translate(30px, -10px);
  transform-origin: top right;
}

.service-name {
  font-size: 24px;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.service-tag {
  display: inline-block;
  background-color: #e6f0ff;
  color: var(--primary-color);
  font-size: 14px;
  padding: 4px 12px;
  border-radius: 20px;
  margin-bottom: 16px;
  line-height: 1.4;
}

.service-price {
  font-size: 32px;
  font-weight: bold;
  color: var(--text-color);
  margin-bottom: 30px;
}

.service-features {
  list-style: none;
  padding: 0;
  margin-bottom: 40px;
}

.service-features li {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  color: #666;
  position: relative;
}

.service-features li::before {
  content: "✓";
  color: var(--primary-color);
  margin-right: 10px;
  font-weight: bold;
}

.service-btn {
  padding: 12px 36px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
}

.service-btn:hover {
  background-color: #001a80;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 33, 159, 0.2);
}

.service-card.popular .service-btn {
  background-color: var(--secondary-color);
  color: var(--primary-color);
}

.service-card.popular .service-btn:hover {
  background-color: #ffda4d;
}

/* 最新活动样式 */
.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
  gap: 20px;
  margin-bottom: 10px;
}

.activity-card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  gap: 20px;
}

.activity-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}

.activity-date {
  background-color: var(--primary-color);
  color: white;
  border-radius: 8px;
  padding: 16px 12px;
  text-align: center;
  min-width: 80px;
}

.date-day {
  display: block;
  font-size: 28px;
  font-weight: bold;
  line-height: 1;
}

.date-month {
  display: block;
  font-size: 14px;
  margin-top: 4px;
}

.activity-content {
  flex: 1;
}

.activity-title {
  font-size: 18px;
  color: var(--text-color);
  margin-bottom: 12px;
  line-height: 1.4;
}

.activity-info {
  margin-bottom: 12px;
}

.activity-location {
  display: inline-block;
  padding: 4px 12px;
  background-color: #f0f0f0;
  border-radius: 15px;
  font-size: 12px;
  color: #666;
}

.activity-description {
  color: #666;
  line-height: 1.6;
}

/* 行业资讯轮播图样式 - Swiper适配 */
.news-carousel-container {
  position: relative;
  width: 100%;
  /* max-width: 1200px; */
  margin: 0 auto;
  overflow: hidden;
  /* border-radius: 12px; */
  /* box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12); */
}

.carousel-main-content {
  display: flex;
  gap: 30px;
  align-items: stretch;
}

.carousel-block {
  width: 70%;
  display: flex;
  flex-direction: column;
}

.carousel-header {
  /* margin-bottom: 20px; */
  background: linear-gradient(135deg, #fff9c4 0%, #ffe082 100%);
  padding: 24px 20px;
  /* border-radius: 8px; */
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-header h3 {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 auto;
}

.news-swiper {
  width: 100%;
  height: 400px;
  background: #fff;
  overflow: hidden;
  flex: 1;
}

.carousel-slide {
  width: 100%;
  height: 100%;
}

.carousel-content {
  display: flex;
  height: 100%;
  background: linear-gradient(135deg, #fff9c4 0%, #ffe082 100%);
}

.carousel-image {
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  gap: 40px;
  align-items: center;
  justify-content: center;
}

.carousel-img {
  width: 200px;
  height: auto;
  /* object-fit: cover; */
}

.carousel-info {
  width: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  text-align: center;
}

.carousel-title {
  font-size: 32px;
  color: var(--primary-color);
  margin-bottom: 20px;
  font-weight: bold;
}

.carousel-description {
  font-size: 18px;
  color: #333;
  line-height: 1.6;
}

/* Swiper分页指示器样式 */
.swiper-pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
}

.swiper-pagination-bullet {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid var(--primary-color);
  background-color: transparent;
  opacity: 1;
  transition: all 0.3s;
}

.swiper-pagination-bullet:hover {
  background-color: rgba(255, 255, 255, 0.5);
}

.swiper-pagination-bullet-active {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
  transform: scale(1.2);
}

/* 最新活动悬浮卡片样式 */
.latest-activities-card {
  width: 30%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 24px;
  /* box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); */
  position: sticky;
  top: 20px;
  color: white;
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.activities-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;
}

.activities-list {
  margin-bottom: 20px;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 16px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.activity-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.15);
}

.activity-icon {
  font-size: 18px;
  margin-right: 12px;
  flex-shrink: 0;
  margin-top: 2px;
}

.activity-text {
  font-size: 14px;
  line-height: 1.5;
  color: #fff;
}

.activities-footer {
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.activities-footer p {
  font-size: 13px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .section {
    padding: 35px 30px;
  }

  /* 行业资讯轮播图响应式 - Swiper适配 */
  .news-swiper {
    height: 350px;
  }

  .carousel-content {
    flex-direction: column;
  }

  .carousel-image {
    width: 100%;
    height: 50%;
  }

  .carousel-info {
    width: 100%;
    height: 50%;
    padding: 20px;
  }

  /* 响应式布局调整 */
  .carousel-main-content {
    flex-direction: column;
  }

  .carousel-block {
    width: 100%;
  }

  .news-swiper {
    width: 100%;
    margin-bottom: 20px;
  }

  .latest-activities-card {
    width: 100%;
    position: relative;
    margin-top: 0;
  }

  .carousel-title {
    font-size: 20px;
    color: var(--primary-color);
  }

  .carousel-description {
    font-size: 14px;
    color: #333;
  }

  /* Swiper分页指示器响应式 */
  .swiper-pagination {
    margin-bottom: 10px;
  }

  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }

  .swiper-pagination-bullet-active {
    background-color: var(--primary-color);
    width: 12px;
    height: 12px;
  }

  /* 响应式步骤布局 - 每行4个 */
  .process-steps {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 15px;
  }

  .process-step {
    width: auto;
    margin: 0;
    flex: none;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 25px 20px;
  }

  .section-header h2 {
    font-size: 24px;
  }

  /* 行业资讯轮播图响应式 - Swiper适配 */
  .news-swiper {
    height: 300px;
  }

  .carousel-image {
    height: 40%;
  }

  .carousel-info {
    height: 60%;
    padding: 15px;
  }

  /* 移动端活动卡片样式 */
  .latest-activities-card {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .carousel-header {
    padding: 20px 16px;
  }

  .carousel-header h3 {
    font-size: 20px;
  }

  .activities-title {
    font-size: 18px;
  }

  .activity-text {
    font-size: 13px;
  }

  .carousel-title {
    font-size: 18px;
  }

  .carousel-description {
    font-size: 13px;
  }

  /* 成功案例响应式 */
  .cases-grid {
    flex-direction: column;
    gap: 20px;
  }

  .case-card {
    flex-direction: column;
  }

  .case-image {
    width: 100%;
    height: 180px;
  }

  .case-image img {
    width: 140px;
    height: 140px;
  }

  /* 服务套餐响应式 */
  .services-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  /* 最新活动响应式 */
  .activities-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  /* 响应式步骤布局 - 每行3个 */
  .process-steps {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .section {
    padding: 20px 15px;
  }

  .section-header h2 {
    font-size: 20px;
  }

  /* 行业资讯轮播图响应式 - Swiper适配 */
  .news-swiper {
    height: 250px;
  }

  .carousel-image {
    height: 35%;
  }

  .carousel-info {
    height: 65%;
    padding: 12px;
  }

  .carousel-title {
    font-size: 16px;
    margin-bottom: 8px;
    color: var(--primary-color);
  }

  .carousel-description {
    font-size: 12px;
    line-height: 1.4;
    color: #333;
  }

  /* 超小屏幕活动卡片样式 */
  .latest-activities-card {
    padding: 16px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .carousel-header {
    padding: 16px 12px;
  }

  .carousel-header h3 {
    font-size: 18px;
  }

  .activities-title {
    font-size: 16px;
    margin-bottom: 15px;
  }

  .activity-item {
    padding: 10px;
    margin-bottom: 12px;
  }

  .activity-icon {
    font-size: 16px;
    margin-right: 10px;
  }

  .activity-text {
    font-size: 12px;
  }

  /* 超小屏幕案例卡片样式 */
  .case-card {
    flex-direction: column;
  }

  .case-image {
    width: 100%;
    height: 160px;
    padding: 20px 0;
  }

  .case-image img {
    width: 120px;
    height: 120px;
  }

  .case-content {
    padding: 20px;
  }

  .case-title {
    font-size: 18px;
  }

  .case-detail-item span {
    font-size: 14px;
  }

  /* Swiper分页指示器响应式 - 移动端优化 */
  .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    margin: 0 3px;
  }

  .swiper-pagination-bullet-active {
    background-color: var(--primary-color);
    width: 10px;
    height: 10px;
  }

  /* 响应式步骤布局 - 每行2个 */
  .process-steps {
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }
}

/* IP服务流程样式 */
.process-container {
  background-color: #f9f9ff;
  padding: 30px 40px 0px 150px;
  border-radius: 16px;
  /* margin-left: 20px; */
  overflow: hidden;
  margin-bottom: 0;
}

.process-section {
  padding-bottom: 0;
  margin-bottom: 0;
}

.process-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(
    90deg,
    var(--primary-color),
    var(--secondary-color)
  );
}

.process-steps {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 0;
  flex-wrap: wrap;
  padding-bottom: 0;
}

.process-step {
  flex: 0 0 calc(20% - 30px);
  text-align: center;
  padding: 0 15px;
  margin-bottom: 0px;
}

.step-label {
  font-size: 14px;
  color: #666;
  font-weight: 500;
  margin-bottom: 15px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.process-icon {
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.process-icon::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(0, 33, 159, 0.1) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  transform: translate(-50%, -50%);
}

.step-title {
  font-size: 18px;
  color: #333;
  margin-bottom: 15px;
  font-weight: 600;
  line-height: 1.3;
}

.step-description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  white-space: pre-line;
}

.step-description br {
  margin-bottom: 8px;
}

/* 响应式调整 */
@media (max-width: 1200px) {
  .process-step {
    flex: 0 0 calc(25% - 30px);
  }

  .process-icon {
    width: 70px;
    height: 70px;
  }

  .step-title {
    font-size: 16px;
  }
}

@media (max-width: 992px) {
  .process-steps {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
  }

  .process-step {
    flex: 0 0 calc(33.333% - 30px);
    margin-bottom: 30px;
  }

  .process-icon {
    width: 80px;
    height: 80px;
  }
}

/* 特色套餐核心承诺样式 */
.core-commitment {
  text-align: center;
  margin: 30px auto;
  padding: 20px;
  background: linear-gradient(135deg, #f9f9ff, #e6f0ff);
  border-radius: 12px;
  max-width: 900px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.core-commitment h3 {
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
}

/* 通用服务保障样式 */
.service-guarantee {
  margin: 40px auto;
  padding: 30px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  max-width: 1200px;
}

/* 服务套餐中的对钩样式 */
.checkmark {
  color: var(--primary-color);
  font-weight: bold;
  margin-right: 8px;
}

/* 服务套餐信息样式 */
.service-info {
  margin-top: 20px;
  padding-top: 15px;
  border-top: 1px dashed #eee;
}

.service-audience,
.service-cost-info {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin-bottom: 8px;
}

.service-audience:last-child,
.service-cost-info:last-child {
  margin-bottom: 0;
}

.service-guarantee h3 {
  text-align: center;
  color: var(--primary-color);
  font-size: 28px;
  margin-bottom: 25px;
}

.guarantee-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.guarantee-list li {
  padding: 20px;
  border-radius: 8px;
  background-color: #f9f9ff;
  position: relative;
  padding-left: 50px;
  transition: all 0.3s;
}

.guarantee-list li:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.guarantee-list li::before {
  content: "✓";
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background-color: var(--primary-color);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  z-index: 1;
}

/* 确保不会出现重复的对钩 */
.guarantee-list li span.checkmark {
  display: none;
}

.guarantee-list li {
  color: #555;
  line-height: 1.6;
}
</style>
