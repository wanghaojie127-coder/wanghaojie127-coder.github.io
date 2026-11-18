/* ============================================================
 * 网站的全部文字内容都在这个文件里，用任意文本编辑器修改即可。
 * 规则：
 *   1. 只改引号 "..." 里面的文字；每一项后面的逗号不要删。
 *   2. 任何以「待补充」开头的文字，网页上会显示成灰色斜体虚线，
 *      提醒你这里还没填。写好后直接把整段「待补充：……」替换掉即可。
 *   3. 链接字段如果写的是「待补充」，网页上不会变成可点击链接。
 *   4. 换行用 \n。
 * ============================================================ */
window.SITE = {
  // 浏览器标签页标题与搜索摘要
  meta: {
    title: "王豪杰 Jerry · 从游戏数值到 AI 产品",
    description: "王豪杰（Jerry）的个人作品集：4 年互联网产品经验，擅长活动数值设计与用户增长，正在转向 AI 产品经理。"
  },

  // 左上角 Logo 文字
  brand: "Jerry · 王豪杰",

  // 首屏
  hero: {
    eyebrow: "Game Product → AI Product",          // 顶部小字
    name: "王豪杰 Jerry",                          // 名字
    wordmark: "jerry",                              // 超大字标（建议英文小写）
    headline: ["做过一年半 200万→700万 的增长活动数值，", "现在想把这套方法带进 AI 产品。"], // 主句，每项一行
    meta: [                                         // 标签 + 值
      { label: "求职方向", value: "AI 产品经理" },
      { label: "擅长", value: "活动数值设计 · 用户增长 · 商业化" },
      { label: "正在做", value: "公众号写作 · AI 工具实战" }
    ],
    primary: { text: "看项目案例", href: "#cases" }, // 主按钮
    resume: { text: "下载简历", href: "待补充" }     // 简历 PDF 链接，例如 "resume.pdf"
  },

  // 板块：顺序即页面顺序；visible:false 可隐藏；nav 为导航文字
  sections: [
    { type: "overview", visible: true, nav: "速览",   title: "30 秒了解我", subtitle: "" },
    { type: "cases",    visible: true, nav: "案例",      title: "做成过的事", subtitle: "每个案例按 背景 → 我负责什么 → 关键动作 → 结果 → 复盘 来写。点开卡片看详情。" },
    { type: "ai",       visible: true, nav: "AI 能力",       title: "我怎么用 AI 干活", subtitle: "" },
    { type: "lab",      visible: true, nav: "实验",        title: "动手算一算", subtitle: "我最擅长的是活动数值。下面这个小沙盘用来演示一个抽奖活动的账怎么算。参数为演示用的假设值，不代表任何真实业务数据。" },
    { type: "writing",  visible: true, nav: "写作",    title: "写下来的思考", subtitle: "我一直在写公众号，记录对 AI 产品的观察。" },
    { type: "timeline", visible: true, nav: "经历",    title: "一路走来", subtitle: "" }
  ],

  // 30 秒速览
  overview: {
    // value：卡片上显示的文字；num：计数动画的目标数字（不想要动画就删掉 num）
    stats: [
      { value: "4", num: 4, unit: "年", label: "互联网产品经验" },
      { value: "200万 → 700万", label: "所负责平台一年半注册用户增长（网赚游戏平台）", highlight: true },
      { value: "3000", num: 3000, unit: "万", label: "所负责平台一年半广告收入", highlight: true },
      { value: "5", num: 5, unit: "+", label: "日常使用的 AI 工具" }
    ],
    // 为什么是我
    why: [
      { title: "懂数值", text: "抽奖、积分、消耗这类活动系统，我习惯先算清楚账再上线。" },
      { title: "懂商业化", text: "做过直接对广告收入负责的产品，也做过 AI 广告系统。" },
      { title: "真的在用 AI", text: "日常用 Claude Code、Codex 等工具做事，这个网站就是我策划、AI 执行做出来的。" }
    ]
  },

  // 项目案例：点开卡片显示五个小节
  cases: [
    {
      id: "game",
      company: "深圳市一群科技有限公司",       // 公司
      period: "2025.03 – 2026.10",            // 时间
      role: "游戏产品经理",                    // 角色
      title: "网赚类游戏平台 · 活动与数值体系", // 案例名
      oneLiner: "负责平台的活动设定与数值设计；任职一年半期间，平台注册用户从 200 万增长到 700 万。",
      tags: ["平台注册用户 200万→700万（一年半）", "平台广告收入 3000万（一年半）"],
      background: "网赚类游戏平台，收入主要来自广告。",
      responsibility: "游戏内活动的设定，包括抽奖活动、积分的获取与消耗指标设计。",
      actions: "待补充：建议写 2–3 个最关键的设计决策，例如某个抽奖活动的概率/奖池怎么定、积分产出与消耗怎么平衡。",
      result: "任职一年半期间，平台注册用户由 200 万增长到 700 万，广告收入 3000 万。\n待补充：你个人负责部分对结果的贡献（如某活动的参与率、留存、ARPU 提升）。",
      review: "待补充：这件事如果用 AI 重做，你会怎么做。"
    },
    {
      id: "sports",
      company: "深圳市怒浪体育科技有限公司",
      period: "2022.11 – 2024.11",
      role: "产品经理",
      title: "运动电商 + 线下活动社交 + AI 广告系统",
      oneLiner: "负责运动电商平台、线下活动社交交友平台，以及配套的 AI 广告系统。",
      tags: ["AI 广告系统", "电商 + 社交双平台"],
      background: "待补充：公司与业务背景。",
      responsibility: "运动电商平台、线下活动社交交友平台，以及配套的 AI 广告系统的产品工作。",
      actions: "待补充：AI 广告系统建议重点写——AI 在里面具体做什么（素材生成？人群定向？出价？），你怎么定义它的效果指标。",
      result: "待补充：可量化的结果。",
      review: "待补充：复盘与反思。"
    }
  ],

  // AI 能力
  ai: {
    tools: [
      { name: "Claude Code", use: "待补充：我用它来…" },
      { name: "Codex", use: "待补充：我用它来…" },
      { name: "Grok Bot", use: "待补充：我用它来…" },
      { name: "DeepSeek", use: "待补充：我用它来…" },
      { name: "WorkBuddy", use: "待补充：我用它来…" }
    ],
    // “案例中的案例”横幅
    story: {
      title: "这个网站是怎么做出来的",
      text: "我负责定位和需求，Claude 负责策划、写代码与验收，Codex 负责代码审查与发布。从需求到上线的分工，就是我理解的 AI 时代产品经理的工作方式。"
    }
  },

  // 抽奖活动数值沙盘（默认值可改；改完记得保持 min ≤ value ≤ max）
  lab: {
    title: "抽奖活动数值沙盘",
    params: [
      { key: "dau",    label: "日活用户数 DAU",          value: 100000, min: 1000, max: 1000000, step: 1000, unit: "人" },
      { key: "join",   label: "活动参与率",              value: 30,     min: 1,    max: 100,     step: 1,    unit: "%" },
      { key: "draws",  label: "人均每日抽奖次数",         value: 3,      min: 1,    max: 20,      step: 1,    unit: "次" },
      { key: "points", label: "每次抽奖消耗积分",         value: 100,    min: 10,   max: 1000,    step: 10,   unit: "积分" },
      { key: "cost",   label: "每次抽奖平均奖品成本",     value: 0.02,   min: 0,    max: 0.5,     step: 0.01, unit: "元" },
      { key: "adRate", label: "每次抽奖附带激励视频概率", value: 60,     min: 0,    max: 100,     step: 1,    unit: "%" },
      { key: "ecpm",   label: "广告 eCPM（每千次）",      value: 40,     min: 1,    max: 200,     step: 1,    unit: "元" }
    ],
    positive: "这个配置能赚钱，可以考虑提高奖品吸引力，换取更高的参与率。",
    negative: "奖品成本超过了广告收入，需要降低奖品成本或提高广告触达。",
    next: { title: "下一个实验", text: "待补充：下一个想动手做的小实验。" }
  },

  // 写作
  writing: {
    articles: [
      { date: "待补充", title: "待补充：文章标题", summary: "待补充：一句话摘要", link: "待补充" },
      { date: "待补充", title: "待补充：文章标题", summary: "待补充：一句话摘要", link: "待补充" },
      { date: "待补充", title: "待补充：文章标题", summary: "待补充：一句话摘要", link: "待补充" }
    ],
    account: { label: "关注我的公众号", name: "待补充：公众号名称" }
  },

  // 经历时间线（最新的写在最上面）
  timeline: [
    { date: "现在", title: "转向 AI 产品经理", desc: "持续写公众号，用 AI 工具做实际项目，这个网站就是其中之一。" },
    { date: "2025.03 – 2026.10", title: "深圳市一群科技有限公司 · 游戏产品经理", desc: "网赚类游戏平台的活动与数值设计；一年半内平台注册用户 200万→700万，广告收入 3000万。" },
    { date: "2022.11 – 2024.11", title: "深圳市怒浪体育科技有限公司 · 产品经理", desc: "运动电商平台、线下活动社交交友平台、AI 广告系统。" },
    { date: "2023", title: "毕业于武汉华夏理工学院（本科）", desc: "" }
  ],

  // 页脚联系
  contact: {
    headline: "想聊聊 AI 产品，\n或者一起算一笔账？",
    email: "待补充",
    wechat: "待补充",
    account: "待补充",
    copyright: "© 2026 王豪杰 Jerry · 本站由 Claude 策划与实现、Codex 审查"
  }
};
