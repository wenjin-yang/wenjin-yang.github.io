# 个人主页 · Wenjin Yang / 杨文进

> **Swiss Style / 瑞士国际主义排版版**：一页式个人主页，像一份结构清晰的简历，
> 纯粹向访问者展示自己（教育、研究、论文、经历、荣誉、技能），不含任何
> 求学、求职或对外招募一类的表述。
> 视觉取瑞士风格：严格的两栏网格、无衬线字体、齐左参差右、发丝分隔线、
> 单一红色点缀、极端的字号 / 字重对比，**零阴影、零圆角、零渐变、零装饰动效**。
> 中英双语、亮暗主题、交互终端、论文筛选全部保留；
> 字体借鉴自本 DSH 的「歸藏设计」插件瑞士体系（Inter / Inter Tight /
> Noto Sans SC / JetBrains Mono），名字另用一款草书 `Liu Jian Mao Cao`（刘建毛草），
> 均为 OFL-1.1，子集化后内联进 `fonts.css`；
> 无框架、无构建步骤、无外部请求（离线 / `file://` 双击可用）。

## 文件结构

```
website/
├── index.html          # 单页：左身份栏 + 右侧简历内容网格
├── style.css           # 设计系统（瑞士风格变量 + 网格 + 响应式）
├── fonts.css           # 5 款字体子集：瑞士体系 4 款 + 名字草书（base64 woff2，离线）
├── data.js             # ★ 简历内容与界面文案都在这里（window.SITE）
├── app.js              # 渲染、双语、论文筛选、终端命令、亮暗主题、导航
├── README.md           # 本说明
└── assets/
    ├── portrait.jpg                       # 头像
    ├── resume_phd_ai_en.pdf / ..._zh.pdf  # 中英文简历（PDF 下载）
    └── JPS.pdf / TPEL.pdf / ...           # 代表性论文全文
```

页面按 `fonts.css → style.css`（样式）、`data.js → app.js`（脚本）顺序加载；
没有任何特效 / 粒子 / 字体外链脚本。`fonts.css` 里的字体是本地内联数据，不发请求。
`app.js` 读取 `window.SITE` 后把内容渲染到 `index.html` 里对应的容器。
所有文案与内容都集中在 `data.js`，**改内容不用碰 HTML / CSS / JS**。

## 本地预览

直接双击 `index.html` 即可（无需服务器，`file://` 下也能跑）。
若想用 HTTP 方式：

```powershell
cd D:\yangwj\cv\杨文进简历\website
python -m http.server 8080
# 浏览器打开 http://localhost:8080
```

## 部署

**本站点已上线**：<https://wenjin-yang.github.io/>（GitHub Pages，仓库
[`wenjin-yang/wenjin-yang.github.io`](https://github.com/wenjin-yang/wenjin-yang.github.io)，
分支 `main`、目录 `/`）。根目录的 `.nojekyll` 用于跳过 Jekyll、保证文件按原样发布。

站点是**纯静态**的，把整个 `website/` 目录传上去即可：

- **更新线上内容**：在 `website/` 目录 `git add -A && git commit -m "..." && git push`，
  约半分钟后自动生效（无需构建）。本机 git 走 Windows 凭据管理器：
  `git -c credential.helper=wincred push`。
- **换到别的账号 / 平台**：新建 `<username>.github.io` 仓库，把 `website/` 内容推到根目录，
  Settings → Pages 选择 `main` + `/`；或 Vercel / Netlify / Cloudflare Pages 导入仓库，
  构建命令留空、输出目录设为 `website`；或把目录拷进 nginx / Apache 的 web root。

无需构建、无需生成器，改完刷新即生效。

## 怎么改内容

**全部内容与界面文案集中在 [`data.js`](data.js)**：

| 对象 | 作用 |
|------|------|
| `i18n.zh / i18n.en` | 界面固定文案（页头、标签、区块标题、按钮、终端提示等） |
| `news` | 动态 / News 列表 |
| `research` | 研究方向卡片（标题、正文、标签、指标） |
| `publications` | 论文列表；`type: journal\|conf`、`first`、`badges`、`pdf` |
| `patents` | 专利与软著清单 |
| `experience` | 时间线（工作 / 教育） |
| `awards` | 荣誉卡片 |
| `skills` / `langs` | 技能栈与语言能力 |
| `shortcuts` | 终端里可点击的快捷命令 |
| `contact` | 邮箱 / 电话 / 所在地 |

带 `{ zh: "...", en: "..." }` 的字段会随 **EN / 中** 按钮切换；
普通字符串（论文标题、作者、标签）双语文案一致，不翻译。
论文里 `<span class="me">Wenjin Yang</span>` 用来高亮本人姓名。

> 文案定位是「展示自己」，请继续保持纯展示口吻，不要写回求学、求职或对外招募类字眼。

## 交互说明

- 右上角 `EN / 中` 切换语言（记住选择）、`◐` 切换亮 / 暗主题（记住选择，默认亮色）。
- 论文区：点 `all / journal / conference / first-author` 筛选；点 `[PDF]` 看全文。
- 顶部快速导航点击平滑滚动到对应区块，滚动时用 `IntersectionObserver` 高亮当前区块；
  窄屏点左上角 `☰` 展开身份栏抽屉，右下角 `↑` 回到顶部。
- 底部交互终端：输入 `help` 查看命令，支持
  `about / pubs / research / skills / contact / neofetch / date / lang [zh|en] / theme /
  clear / sudo / whoami / ls / echo`，`Tab` 补全命令，也可直接点快捷按钮。
- 终端里的 `uptime`、页脚年份等为纯本地计算，不发起任何网络请求。

## 设计说明（瑞士风格）

采用 **International Typographic Style（瑞士国际主义排版）** 的核心语言：

| 原则 | 落地方式 |
|------|----------|
| 网格 | `.page` 严格两栏（`--side-w` 身份栏 + `minmax(0,1fr)` 内容区），卡片网格只用 column-gap 对齐 |
| 无衬线 | 歸藏设计瑞士体系：`Inter`（正文 / 拉丁）、`Inter Tight`（大标题 / 统计数字）、`Noto Sans SC`（中文）、`JetBrains Mono`（编号 / 日期 / 终端）；名字单独用草书 `Liu Jian Mao Cao`，均已内联到 `fonts.css` |
| 齐左参差右 | 全文 `text-align:left`，不做两端对齐、不做居中标题 |
| 发丝分隔线 | 1px `var(--rule)` 横线 / 竖线贯穿页面，粗线仅用于刊头与统计数字 |
| 单一红色点缀 | `--accent:#d81e28` 只用在刊头句点、编号、数字、筛选选中态、当前导航（红底反白） |
| 极端对比 | 刊头大字 `--fs-display:clamp(46,6.2vw,84)` + 800 字重 vs 12–13px 说明文字 |
| 零装饰 | `--radius:0`、`--shadow:none`、无渐变、无动画（`prefers-reduced-motion` 亦关闭光标闪烁） |

**名字**：`.wordmark` 用一款真正的书法字体 `Liu Jian Mao Cao`（刘建毛草）写「杨文进」——
草书笔画连绵，所以三个字是一整行连续书写，不用方框切字；唯一的红色点缀改成落款末尾的
一枚小钤印 `WY`（红底反白，暗色下随 `--accent` 反相）。上下用发丝线框住，
配 `01 / NAME`、`TYPE SPECIMEN` 等极小的等宽规格标签与字距拉开的 `WENJIN YANG`。
仍然零渐变、零发光、零圆角；窄屏收紧拉丁字距、隐藏拼音行。

- 头像为 132px 圆形裁切（保留原片色彩）——这是全站「零圆角」里唯一一处例外，用于柔化身份栏；
  荣誉区用 CSS counter 生成 `01…` 编号，去掉 emoji 图标。
- 亮色为默认（`data-theme="light"`），暗色通过 `html[data-theme="dark"]` 反相整套变量。
- 响应式：`@1080` 收窄身份栏、`@980` 身份栏变 off-canvas 抽屉、`@620` 单栏化。
- 打印样式：变量反相、隐藏交互按钮、身份栏横向铺开。
- 排版统一字号阶梯（12 / 13 / 15 / 20 + 两档流式展示字号），正文限制行宽、点击区不小于 44px；
  已通过 `check_design` 在 390px / 1280px 两种尺寸实测无问题。

灵感来自 [ZYYO666/homepage](https://github.com/ZYYO666/homepage) 的「左侧身份栏 + 右侧卡片」极简个人主页布局语言，
但按其结构重做为瑞士排版，未引入任何模板代码或依赖——全部手写，方便长期维护。

### 关于字体

字体角色借鉴本 DSH 插件 **歸藏设计**（`dsh-guizang-design`）的瑞士设计系统
`skills/guizang-page-skill/assets/gz-swiss.css` 的 `--font-display / --font-sans / --font-mono` 分配：

| 角色 | 字体 | 用在 |
|------|------|------|
| 正文 / 拉丁 | `Inter` | 全部正文、说明、按钮 |
| 展示大标题 | `Inter Tight` | 刊头 `WY.`、侧栏姓名、统计数字 |
| 中文 | `Noto Sans SC` | 所有汉字（与 Inter 同一栈，作为 CJK 回退） |
| 等宽 | `JetBrains Mono` | 编号、日期、标签、终端 |
| 名字（特殊字体） | `Liu Jian Mao Cao` 刘建毛草 | 仅 `.wordmark__cn`，一整行草书 + 落款钤印 |

五款均为 **SIL Open Font License 1.1**。用插件自带的 `gz-fonts.mjs` 的 `embedCss()`
按本站实际用到的字符做子集化，生成 `fonts.css` 里的 5 条 `@font-face`（base64 woff2，
合计约 450 KB，`font-display:swap`）。因此**完全离线**，`file://` 下不请求任何 CDN；
若以后往 `data.js` 加了大量新汉字，个别字形会回退到系统 CJK，可重新子集化补进去。
名字草书是从 [Google Fonts](https://fonts.google.com/specimen/Liu+Jian+Mao+Cao) 的 OFL 字体中
挑定的（先用 5 款中文展示字体做真实渲染样张比较后选 E），其余 4 款沿用歸藏瑞士体系。

## 隐私

无统计脚本、无 Cookie、无字体 / CDN 外链、无网络请求。字体为本地内联子集，不回退到联网字体。
