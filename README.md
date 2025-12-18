# 智学伴侣 - AI 学习助手

类似于 Plaud Pin 的学习类产品演示 Demo。学生可以佩戴设备记录课堂内容，设备会将录音传输到学习平板进行智能分析。

## 功能特点

### 📱 学习平板端功能

- **今日课堂概览** - 显示当天所有课程录音的状态和摘要
- **音频播放器** - 支持播放课堂录音，显示标记时间点
- **智能转录** - AI 将语音转换为文字，支持分段显示
- **AI 笔记** - 自动生成课堂笔记，提取核心知识点和公式
- **强化练习** - 针对学生标记的不懂时间点，生成相关练习题
- **推荐内容** - 智能推荐相关教学视频和学习资料

### 🎯 Pin 设备功能（模拟）

- 录制课堂音频
- 一键标记"不懂"时间点
- 与平板无线同步

## 技术栈

- **React 18** - UI 框架
- **Vite** - 构建工具
- **Tailwind CSS** - 样式框架
- **Framer Motion** - 动画库
- **Lucide React** - 图标库

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 项目结构

```
talpin/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Sidebar.jsx      # 侧边栏导航
│   ├── data/
│   │   └── mockData.js      # 模拟数据
│   ├── pages/
│   │   ├── Dashboard.jsx    # 首页/今日学习
│   │   └── ClassDetail.jsx  # 课堂详情页
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 演示说明

这是一个前端演示 Demo，展示学习平板端的核心功能界面。数据为模拟数据，实际产品需要：

1. 后端 API 服务
2. 语音识别 (ASR) 服务
3. AI 笔记生成服务
4. 练习题库系统
5. 视频推荐算法

## 许可证

MIT

# talpin
