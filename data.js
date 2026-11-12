/* ══════════════════════════════════════════════════════════════
   data.js — all content lives here. Edit this file to update the site.
   No build step, no CMS, no network: just plain JS objects.
   Fields with { zh, en } are rendered in the active language.
   ══════════════════════════════════════════════════════════════ */
window.SITE = (function () {
  "use strict";

  /* ── static UI strings ───────────────────────────────────────── */
  const i18n = {
    zh: {
      "site.title": "杨文进 Wenjin Yang · 个人主页",
      "masthead.title": "个人主页 / Curriculum Vitae",
      "status.available": "算法研究 · AI for Science",
      "tagline": "CS 硕士 · 算法研究 · AI for Science",
      "greeting.hello": "你好，我是",
      "greeting.quote": "在少量样本里，寻找可解释的规律。",
      "meta.role": "宁德时代 21C 创新实验室 · 算法研发",
      "meta.location": "中国 · 上海",
      "meta.cv": "简历 (PDF)",
      "sidebar.foot": "built with vim & caffeine",
      "hero.lead": "上海科技大学计算机科学与技术硕士，现于宁德时代 21C 创新实验室从事算法研究。",
      "hero.body": "研究围绕 AI for Science 中「数据稀缺」与「物理约束」两大核心问题：把稀疏、早期的一维电池时序信号结构化为可供深度模型学习的表征，让极少量样本下的系统状态预测兼具跨工况泛化能力与物理可解释性。",
      "hero.pubBtn": "查看论文",
      "hero.contactBtn": "联系我",
      "sec.news": "动态", "sec.research": "研究方向", "sec.publications": "论文著作",
      "sec.experience": "经历", "sec.awards": "荣誉奖项", "sec.skills": "技能栈",
      "sec.terminal": "交互终端",
      "research.intro": "我的研究处于机器学习与电化学储能的交叉点，关注如何让深度模型在「小样本、强物理约束」的科学与工程数据上依然可靠。",
      "pub.note": "<b>*</b> 标记第一作者论文；加粗下划线的作者为本人。点 tag 可筛选，点 [PDF] 可看全文。",
      "pub.filter.all": "全部", "pub.filter.journal": "期刊", "pub.filter.conf": "会议", "pub.filter.first": "一作",
      "patents.title": "授权发明专利（节选） & 软件著作权",
      "term.hint": "输入 help 查看命令 · Tab 可补全",
      "footer.echo": "echo", "footer.note": "无追踪、无 Cookie，纯 HTML/CSS/JS",
      "awards.stat1": "论文", "awards.stat2": "引用", "awards.stat3": "专利", "awards.stat4": "h-index",
      "skills.lang": "语言能力",
      "term.welcome": "欢迎来到 wenjin@homepage 的交互式终端 👋",
      "term.help": "输入 help 查看可用命令，或点击下面的快捷按钮。",
      "term.unknown": "command not found:",
      "term.tip": "提示：试试 about / pubs / research / skills / contact / neofetch",
      "term.cleared": "终端已清空。",
      "term.sudo": "权限被拒绝 :) 这个玩笑从 1993 年就不好笑了。",
      "scheme.label": "配色",
      "scheme.red": "经典红", "scheme.blue": "国际蓝", "scheme.green": "松绿",
      "scheme.violet": "紫罗兰", "scheme.amber": "琥珀", "scheme.graphite": "石墨",
    },
    en: {
      "site.title": "Wenjin Yang · Personal Homepage",
      "masthead.title": "Personal Homepage / Curriculum Vitae",
      "status.available": "Algorithm Research · AI for Science",
      "tagline": "M.S. CS · Algorithm Research · AI for Science",
      "greeting.hello": "Hi, I'm",
      "greeting.quote": "Finding interpretable patterns in small samples.",
      "meta.role": "Algorithm Researcher @ CATL 21C Lab",
      "meta.location": "Shanghai, China",
      "meta.cv": "CV (PDF)",
      "sidebar.foot": "built with vim & caffeine",
      "hero.lead": "M.S. in Computer Science from ShanghaiTech, now doing algorithm research at CATL's 21C Innovation Lab.",
      "hero.body": "My work sits at the intersection of machine learning and energy storage, centered on two core challenges in AI for Science: data scarcity and physical constraints. I turn sparse, early-stage 1D battery signals into structured representations that deep models can learn from, so that system-state prediction under extremely limited samples retains both cross-condition generalization and physical interpretability.",
      "hero.pubBtn": "Publications",
      "hero.contactBtn": "Get in touch",
      "sec.news": "news", "sec.research": "research", "sec.publications": "publications",
      "sec.experience": "experience", "sec.awards": "awards", "sec.skills": "skills",
      "sec.terminal": "interactive shell",
      "research.intro": "My research lies at the intersection of ML and electrochemical energy storage: making deep models reliable on scientific & engineering data that is small-sample and physically constrained.",
      "pub.note": "<b>*</b> marks first-author papers; the bold, underlined author is me. Click a tag to filter, click [PDF] for the full text.",
      "pub.filter.all": "all", "pub.filter.journal": "journal", "pub.filter.conf": "conference", "pub.filter.first": "first-author",
      "patents.title": "Granted invention patents (selected) & software copyrights",
      "term.hint": "type help · Tab autocompletes",
      "footer.echo": "echo", "footer.note": "no trackers, no cookies, just HTML/CSS/JS",
      "awards.stat1": "papers", "awards.stat2": "citations", "awards.stat3": "patents", "awards.stat4": "h-index",
      "skills.lang": "Languages",
      "term.welcome": "Welcome to the wenjin@homepage interactive shell 👋",
      "term.help": "Type help for available commands, or click a shortcut below.",
      "term.unknown": "command not found:",
      "term.tip": "tip: try about / pubs / research / skills / contact / neofetch",
      "term.cleared": "terminal cleared.",
      "term.sudo": "Permission denied :) That joke stopped being funny in 1993.",
      "scheme.label": "ACCENT",
      "scheme.red": "Classic red", "scheme.blue": "International blue", "scheme.green": "Pine green",
      "scheme.violet": "Violet", "scheme.amber": "Amber", "scheme.graphite": "Graphite",
    },
  };

  /* ── news ────────────────────────────────────────────────────── */
  const news = [
    { date: "2026.08", tag: { zh: "metric", en: "metric" }, text: { zh: "Google Scholar <b>64 次引用</b>，h-index 5。", en: "Google Scholar: <b>64 citations</b>, h-index 5." } },
    { date: "2026", tag: { zh: "paper", en: "paper" }, text: { zh: "合作论文被 <b>Batteries &amp; Supercaps</b> 接收（容量退化轨迹超早期预测框架）。", en: "Co-authored paper accepted at <b>Batteries &amp; Supercaps</b> (ultra-early capacity-degradation trajectory prediction)." } },
    { date: "2025.07", tag: { zh: "work", en: "work" }, text: { zh: "加入 <b>宁德时代 21C 创新实验室</b>，从事工业时序预测与异常检测算法研发。", en: "Joined <b>CATL 21C Innovation Lab</b>, working on industrial time-series forecasting & anomaly detection." } },
    { date: "2025.06", tag: { zh: "award", en: "award" }, text: { zh: "获评 <b>上海科技大学优秀毕业生</b>，完成计算机科学与技术硕士学业。", en: "Named <b>Outstanding Graduate of ShanghaiTech</b>; completed M.S. in Computer Science." } },
    { date: "2025", tag: { zh: "paper", en: "paper" }, text: { zh: "两篇第一作者论文分别发表于 <b>JPS (Q1)</b> 与 <b>IEEE TPEL (中科院一区 Top)</b>。", en: "Two first-author papers published in <b>J. Power Sources (Q1)</b> and <b>IEEE TPEL (CAS Q1 Top)</b>." } },
  ];

  /* ── research cards ──────────────────────────────────────────── */
  const research = [
    {
      idx: "R01 / representation",
      title: { zh: "稀疏时序的结构化表征", en: "Structured Representation of Sparse Time Series" },
      en: "Assembled Capacity Curve → image regression",
      body: { zh: "针对电池循环测试周期长、早期数据稀疏的问题，提出组合容量曲线 Qₐ = Qc − Qd，把一维曲线变换为三通道 224×224 图像，将时序预测重构为图像回归任务，从极少样本中挖掘退化模式。", en: "Early-cycle battery data is scarce and long tests are costly. I proposed the Assembled Capacity Curve (Qₐ = Qc − Qd) and a 1D→3-channel 224×224 image pipeline, reformulating time-series forecasting as image regression to mine degradation patterns from very few samples." },
      tags: ["CNN", "Transfer Learning", "PyTorch", "Image Regression"],
      metric: { zh: "MAPE 7.86%–15.27% · 误差较特征工程降低约 2×", en: "MAPE 7.86%–15.27% · ~2× lower error than feature engineering" },
    },
    {
      idx: "R02 / global context",
      title: { zh: "时序图像化与全局建模", en: "Time-Series Visualization & Global Context" },
      en: "local detail + global trend, physics-preserving",
      body: { zh: "传统 CNN 只捕获卷积窗内的局部模式、丢失全局趋势。我设计时序可视化方法，将一维信号映射为二维结构化图像，使卷积同时看到局部细节与全局语境，并保留曲线的物理语义以保证可解释性。", en: "Vanilla CNNs only see local patterns within a kernel and lose global trends. I designed a time-series visualization that maps 1D signals into 2D structured images, letting convolutions capture local detail and global context together while preserving physical semantics for interpretability." },
      tags: ["CNN", "Interpretability", "MIT Dataset", "Visualization"],
      metric: { zh: "MIT 数据集平均预测误差 < 7.1% · 已授权发明专利", en: "MIT dataset avg. error < 7.1% · granted invention patent" },
    },
    {
      idx: "R03 / field data",
      title: { zh: "实车数据 SOH 与用户行为建模", en: "Field-Data SOH & User-Behavior Modeling" },
      en: "21 behavior features → LSTM → capacity degradation",
      body: { zh: "实车数据 SOC 分辨率低、电流瞬态波动大。通过充电过程筛选与稳态片段提取抑制噪声，系统构建 21 维用户行为特征刻画驾驶/充电模式，用 LSTM 建模行为与容量衰减的时序依赖。", en: "Field data suffers from low-resolution SOC and transient current noise. I screened charging processes and steady-current fragments to suppress noise, built 21 user-behavior features for driving/charging patterns, and used an LSTM to model temporal dependencies between behavior and capacity fade." },
      tags: ["LSTM", "XGBoost", "Clustering", "Feature Engineering"],
      metric: { zh: "200 辆实车验证 · MAE 0.91% / RMSE 1.12%", en: "Validated on 200 on-road EVs · MAE 0.91% / RMSE 1.12%" },
    },
    {
      idx: "R04 / AI4S vision",
      title: { zh: "面向 AI4S 的电池基础模型", en: "Toward a Battery Foundation Model" },
      en: "data scarcity × physical constraints",
      body: { zh: "更长期的问题：在极早期、小样本条件下，如何让系统状态预测兼具跨工况泛化能力与物理可解释性？围绕稀疏表征 + 物理先验嵌入展开，并进一步探索系统隐状态演化规律的学习与推演，迈向电池退化动力学的可推断、可外推建模。", en: "The bigger question: under extremely early, few-sample conditions, can system-state prediction be both cross-condition generalizable and physically interpretable? I work on sparse representations + embedding physical priors, and further toward learning latent state evolution for inferable, extrapolatable modeling of battery degradation dynamics." },
      tags: ["AI4S", "Physics-informed DL", "Foundation Model", "Bayesian Opt."],
      metric: { zh: "关注方向：AI4S / DS / AI / ML", en: "Focus: AI4S / DS / AI / ML" },
    },
  ];

  /* ── publications ────────────────────────────────────────────── */
  /* authors uses <span class="me">…</span> to highlight Wenjin Yang */
  const publications = [
    {
      type: "journal", first: true, year: 2025,
      title: "Ultra-early prediction of lithium-ion battery cycle life based on visualized single-cycle data",
      authors: '<span class="me">Wenjin Yang</span>, Fanqi Min, Jingying Xie, and Hengzhao Yang',
      venue: "IEEE Transactions on Power Electronics, 40(5): 7342–7353",
      badges: [{ t: "CAS Q1 Top", c: "q1" }, { t: "IF 6.6", c: "q1" }, { t: "first-author", c: "first" }],
      pdf: "assets/TPEL.pdf",
    },
    {
      type: "journal", first: true, year: 2025,
      title: "Ultra-early prediction of lithium-ion battery cycle life based on assembled capacity curve extracted from a single cycle",
      authors: '<span class="me">Wenjin Yang</span> and Hengzhao Yang',
      venue: "Journal of Power Sources, 640: 236620",
      badges: [{ t: "JCR Q1", c: "q1" }, { t: "IF 8.1", c: "q1" }, { t: "first-author", c: "first" }],
      pdf: "assets/JPS.pdf",
    },
    {
      type: "journal", first: false, year: 2026,
      title: "An ultra-early prediction framework for battery capacity degradation trajectories using visualized single-cycle data",
      authors: 'Pengyu Wang, <span class="me">Wenjin Yang</span>, and Hengzhao Yang',
      venue: "Batteries & Supercaps, 9(8): e70427",
      badges: [{ t: "journal", c: "" }],
    },
    {
      type: "conf", first: true, year: 2023,
      title: "Charging pricing incentives-enabled coordinated dispatching for improved overall benefits of electric vehicles and islanded photovoltaic charging stations",
      authors: '<span class="me">Wenjin Yang</span> and Hengzhao Yang',
      venue: "Proc. EPE (European Conference on Power Electronics and Applications), pp. 1–7",
      badges: [{ t: "first-author", c: "first" }, { t: "conference", c: "" }],
    },
    {
      type: "conf", first: false, year: 2024,
      title: "A battery state of health prediction framework considering user behavior for on-road electric vehicles",
      authors: 'Yifei Xu, Yingjie Zhang, <span class="me">Wenjin Yang</span>, Caiying Xu, Fuhao Wang, and Hengzhao Yang',
      venue: "Proc. IEEE ITEC, pp. 1–6",
      badges: [{ t: "conference", c: "" }],
      pdf: "assets/A_Battery_State_of_Health_Prediction_Framework_Considering_User_Behavior_for_On-road_Electric_Vehicles.pdf",
    },
    {
      type: "conf", first: false, year: 2024,
      title: "An online supercapacitor capacitance labeling method based on tram field data",
      authors: 'Can Zhang, Caiying Xu, <span class="me">Wenjin Yang</span>, Yifei Xu, Mingxia Wu, Zhongxun An, and Hengzhao Yang',
      venue: "Proc. IEEE ITEC, pp. 1–5",
      badges: [{ t: "conference", c: "" }],
    },
    {
      type: "conf", first: false, year: 2025,
      title: "A multi-fault diagnosis framework for electric vehicle batteries",
      authors: 'Jiaqi Zhao, Song Feng, Caiying Xu, Yifei Xu, <span class="me">Wenjin Yang</span>, and Hengzhao Yang',
      venue: "Proc. IEEE ITEC+EATS, pp. 1–7",
      badges: [{ t: "conference", c: "" }],
    },
    {
      type: "conf", first: false, year: 2025,
      title: "A self-discharge fault diagnosis method for electric vehicle batteries",
      authors: 'Yuhong Fan, Song Feng, Yifei Xu, Jiaqi Zhao, Caiying Xu, <span class="me">Wenjin Yang</span>, and Hengzhao Yang',
      venue: "Proc. IEEE PEDG, pp. 605–609",
      badges: [{ t: "conference", c: "" }],
    },
  ];

  /* ── patents & software copyrights ───────────────────────────── */
  const patents = [
    "ZL202510844074.1 — 异质不间断电源集群状态评估方法与装置 (2025)",
    "ZL202411882164.1 — 基于图像化单循环采样量的电池寿命预测方法 (2024)",
    "ZL202411634580.X — 基于分层识别的车辆动力电池故障诊断方法 (2024)",
    "ZL202410615364.4 — 车载超级电容供能系统容值标定方法 (2024)",
    "ZL202410615365.9 — 基于用户行为的动力电池 SOH 预测方法与系统 (2024)",
    "另：2 项发明专利审查中 · 3 项软件著作权已登记 · 合计 7 项专利",
  ];

  /* ── experience timeline ─────────────────────────────────────── */
  const experience = [
    {
      type: "work", date: { zh: "2025.07 – 至今", en: "Jul. 2025 – Present" },
      title: { zh: "算法研发 / 数据科学", en: "Algorithm Research / Data Science" },
      org: { zh: "宁德时代 · 21C 创新实验室 (CATL)", en: "CATL · 21C Innovation Lab" },
      body: {
        zh: "<ul><li>面向产线级复杂工业数据，负责时序预测与异常检测算法研发，覆盖数据清洗、特征工程、模型选型与离线验证全流程。</li><li>独立主导 AI 算法项目，完成从问题定义、方案设计到算法验证的全过程。</li><li>参与跨学科课题，推动深度学习与科学数据分析在实际场景中的技术转化。</li></ul>",
        en: "<ul><li>Develop time-series forecasting and anomaly detection algorithms for production-scale industrial data — data cleaning → feature engineering → model selection → offline validation.</li><li>Independently led an AI algorithm project from problem definition and solution design to validation.</li><li>Contributed to interdisciplinary work bridging deep learning and scientific data analysis for industrial deployment.</li></ul>",
      },
    },
    {
      type: "edu", date: { zh: "2022.09 – 2025.06", en: "Sep. 2022 – Jun. 2025" },
      title: { zh: "计算机科学与技术 · 硕士 (GPA 3.56/4.00)", en: "M.S. in Computer Science · GPA 3.56/4.00" },
      org: { zh: "上海科技大学（双一流）", en: "ShanghaiTech University" },
      body: {
        zh: "<ul><li>核心课程：算法设计与分析、矩阵计算、机器学习、深度学习、储能器件与系统。</li><li>研究方向：电池寿命早期预测、时序表征学习；2025 届优秀毕业生。</li></ul>",
        en: "<ul><li>Coursework: Algorithm Design & Analysis, Matrix Computations, Machine Learning, Deep Learning, Energy Storage Devices & Systems.</li><li>Research: ultra-early battery life prediction, time-series representation learning. Outstanding Graduate, 2025.</li></ul>",
      },
    },
    {
      type: "edu", date: { zh: "2018.09 – 2022.06", en: "Sep. 2018 – Jun. 2022" },
      title: { zh: "计算机科学与技术 · 本科 (GPA 3.01/4.00)", en: "B.S. in Computer Science · GPA 3.01/4.00" },
      org: { zh: "上海科技大学（双一流）", en: "ShanghaiTech University" },
      body: {
        zh: "<ul><li>核心课程：数据结构与算法、计算机视觉、操作系统、计算机组成原理、计算机编程。</li></ul>",
        en: "<ul><li>Coursework: Data Structures & Algorithms, Computer Vision, Operating Systems, Computer Organization, Programming.</li></ul>",
      },
    },
  ];

  /* ── awards ──────────────────────────────────────────────────── */
  const awards = [
    { icon: "🏆", title: { zh: "第十九届「挑战杯」「揭榜挂帅」专项赛 · 全国二等奖", en: "National Second Prize · 19th \"Challenge Cup\"" }, sub: { zh: "国家级竞赛获奖", en: "National-level competition" } },
    { icon: "🥉", title: { zh: "第三届能源电子产业创新大赛 · 三等奖", en: "Third Prize · Energy Electronics Innovation Competition" }, sub: { zh: "先进储能技术创新挑战赛 · 国家级", en: "Advanced Energy Storage Challenge · National" } },
    { icon: "📊", title: { zh: "2023 数字汽车大赛（动力电池寿命预测）入围复赛", en: "Digital Car Competition 2023 · Battery Life Prediction" }, sub: { zh: "排名 100 / 1252", en: "Top 100 / 1252" } },
    { icon: "🎓", title: { zh: "2025 届上海科技大学优秀毕业生", en: "Outstanding Graduate of ShanghaiTech University" }, sub: { zh: "2025", en: "2025" } },
    { icon: "💰", title: { zh: "上海科技大学二等奖学金 · 连续三年", en: "ShanghaiTech Second-Class Scholarship · 3 consecutive years" }, sub: { zh: "2022 – 2025", en: "2022 – 2025" } },
    { icon: "📈", title: { zh: "学术影响力", en: "Research Impact" }, sub: { zh: "8 篇论文 · 7 项专利 · 3 项软著 · 64 次引用 · h-index 5", en: "8 papers · 7 patents · 3 copyrights · 64 citations · h-index 5" } },
  ];

  /* ── skills ──────────────────────────────────────────────────── */
  const skills = [
    { k: { zh: "机器学习 / ML", en: "Machine Learning" }, chips: [
      { t: "Time-series", hl: true }, { t: "Representation Learning", hl: true }, { t: "Physics-informed DL" },
      { t: "CNN / RNN / Transformer" }, { t: "LSTM" }, { t: "XGBoost" }, { t: "Clustering" },
      { t: "Anomaly Detection" }, { t: "Bayesian Optimization" }, { t: "Transfer Learning" },
    ] },
    { k: { zh: "编程 / Tools", en: "Programming & Tools" }, chips: [
      { t: "Python", hl: true }, { t: "PyTorch", hl: true }, { t: "C / C++" }, { t: "MATLAB" },
      { t: "Git" }, { t: "LaTeX" }, { t: "Linux" },
    ] },
    { k: { zh: "领域 / Domain", en: "Domain" }, chips: [
      { t: "Battery Aging Mechanism" }, { t: "SOH Estimation" }, { t: "Cycle-Life Prediction" },
      { t: "Fault Diagnosis" }, { t: "Charging Dispatch" }, { t: "Feature Engineering" }, { t: "Experiment Design" },
    ] },
  ];

  const langs = [
    { l: "中文 Chinese", v: "Native / 母语" },
    { l: "English", v: "CET-6: 542 · academic writing" },
  ];

  /* ── terminal shortcuts shown as clickable hints ─────────────── */
  const shortcuts = ["help", "about", "pubs", "research", "skills", "contact", "neofetch", "clear"];

  return { i18n, news, research, publications, patents, experience, awards, skills, langs, shortcuts,
    contact: { email: "csyangwenjin@outlook.com", phone: "(+86) 153-9077-7338", location: "Shanghai, China" } };
})();
