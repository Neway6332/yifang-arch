# 深圳市异方建筑设计有限公司 — 官方网站

Yifang Architectural Design Co., Ltd. — Official Website

## 项目概述

深圳市异方建筑设计有限公司的品牌官网，采用深色高端设计风格，中英双语，以作品展示为核心。

## 技术栈

- **前端**：HTML5 + CSS3 + JavaScript（纯静态）
- **国际化**：前端 i18n 引擎，支持中英文切换
- **内容管理**：Decap CMS（原 Netlify CMS）
- **部署**：推荐部署到 Netlify / Vercel / GitHub Pages

## 页面结构

| 页面 | 说明 |
|------|------|
| `index.html` | 首页 — Hero + 精选项目 + 服务概览 + 关于我们 + 最新动态 |
| `about.html` | 关于我们 — 公司介绍 + 设计哲学 + 团队展示 |
| `services.html` | 服务范围 — 四大服务详细介绍 |
| `portfolio.html` | 项目案例 — 筛选画廊 + 弹窗详情 |
| `news.html` | 新闻动态 — 公司新闻列表 |
| `contact.html` | 联系我们 — 联系信息 + 表单 + 地图 |

## 目录结构

```
├── index.html
├── about.html
├── services.html
├── portfolio.html
├── news.html
├── contact.html
├── assets/
│   ├── css/style.css
│   ├── js/i18n.js
│   ├── js/main.js
│   └── images/
├── admin/
│   ├── index.html          # Decap CMS 入口
│   └── config.yml          # CMS 配置
├── content/
│   ├── projects/           # 项目案例内容 (CMS 管理)
│   └── news/               # 新闻内容 (CMS 管理)
└── README.md
```

## 开发说明

### 本地预览

直接用浏览器打开 HTML 文件即可查看。建议使用 VSCode 的 Live Server 或 Python HTTP 服务器：

```bash
# Python 3
python -m http.server 8000
```

### 语言切换

页面右上角有中/EN 切换按钮。语言偏好保存在 localStorage 中。

### 图片替换

所有图片目前使用占位符。将实际图片放入 `assets/images/` 目录，并更新对应 HTML 文件中的图片路径。

建议图片规格：
- Hero 背景图：1920×1080px 以上
- 项目图片：1600×1200px 以上
- 团队照片：800×800px 正方形

### 联系表单

联系表单当前为展示形态。如需实际发送功能，推荐配置 [Formspree](https://formspree.io) 或 [Netlify Forms](https://www.netlify.com/products/forms/)：

1. 在 `contact.html` 中将 `form` 的 `action` 改为你的表单端点
2. 如果使用 Netlify，添加 `netlify` 属性到 form 标签

### 部署到 Netlify (推荐)

1. 将代码推送到 GitHub 仓库
2. 在 Netlify 中导入该仓库
3. 构建命令：留空（纯静态文件）
4. 发布目录：`/`
5. 开启 Netlify Identity 和 Git Gateway 以启用 Decap CMS

### 启用 Decap CMS

1. 部署到支持 Git Gateway 的托管服务（如 Netlify）
2. 在 Netlify 中启用 Identity 服务
3. 启用 Git Gateway
4. 访问 `https://你的域名/admin/` 进入管理后台

## 自定义

### 修改主题色

在 `assets/css/style.css` 的 `:root` 中修改 CSS 变量：

```css
--color-gold: #c9a84c;      /* 主色调 */
--color-gold-light: #d4a853;
--color-bg: #0a0a0a;        /* 背景色 */
```

### 添加新页面

1. 创建新的 HTML 文件
2. 复制 header 和 footer 代码
3. 在 `i18n.js` 中添加对应翻译键值
4. 在所有页面的导航栏中添加链接

## License

© 2026 深圳市异方建筑设计有限公司
