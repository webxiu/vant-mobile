## 简介

基于 Vue 3 + TypeScript + Vite 开发的移动端。使用了最新的`vue3`,`vite4`,`vant`等主流技术开发，[postcss-px2vp](https://github.com/sexyHuang/postcss-px2vp)的移动端解决方案，本项目中参照 750px 的设计稿宽度布局。

# Vue 3 + TypeScript + Vite

这个模板应该有助于您开始在 Vite 中使用 Vue 3 和 TypeScript 进行开发。该模板使用 Vue 3`<script setup>`SFC，请查看[脚本设置文档](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)了解更多信息。

## 准备

- [Vite](https://cn.vitejs.dev/) - vite 特性
- [Vue3](https://v3.cn.vuejs.org/) - Vue3 基础语法
- [Vue-Router](https://router.vuejs.org/zh/) - vue-router 4.x 文档
- [Pinia](https://pinia.web3doc.top/) - 状态管理
- [Axios](https://www.axios-http.cn/docs/instance) - 接口请求工具
- [Vant](https://vant-contrib.gitee.io/vant/v3/#/zh-CN) - Vant UI 组件

## 开发

```bash

# 安装依赖
npm install

# 启动服务
npm run dev

# 预览发布环境
npm run preview
```

## 发布

```bash
# 构建生产环境
npm run build   # 需先在.env.production中修改生产环境打包的部署域名和目录
```

## 提取工具方法

```bash
# 工具方法写到src/utils目录中
npm run method:readme
```

## 规范

- **通用工具方法写到 src/utils 目录中**
- **开发中的需求写到对应的目录结构中**
- **函数命名采用驼峰书写格式命名,单词拼写正确**
- **CSS 样式命名参考 [BEM](https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83) 的风格**
- **通用工具方法写到 src/utils 目录中定义**

## 目录结构

```
    ├── scripts                    // 脚本目录
    ├── src                        // 源代码
    │   ├── api                    // 请求相关文件
    │   ├── assets                 // 静态资源
    │   ├── components             // 全局公用组件
    │   ├── directive              // 全局指令
    │   ├── icons                  // svg资源
    │   ├── layout                 // layout
    │   ├── plugins                // plugins
    │   ├── router                 // 路由
    │   ├── store                  // 全局 store管理
    │   ├── styles                 // 全局样式
    │   ├── utils                  // 工具函数
    │   ├── vendor                 // 公用vendor
    │   ├── views                  // 页面集合
    │   ├── App.vue                // 入口页面
    │   ├── main.js                // 入口 加载组件 初始化等
    │   └── permission.js          // 权限管理
    ├── public                     // 公用文件目录
    │   ├── index.html             // html模板
    │   ├── favicon.ico            // favicon图标(png)
    ├── .gitignore                 // git 忽略项
    ├── .env.development           // 开发环境遍历
    ├── .env.production            // 生产环境遍历
    ├── postcss.config.cjs         // 响应式vw配置文件
    └── package.json               // package.json
```

## 建议的 IDE 设置

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## 特性

- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发
- **Mock 数据** 内置 Mock 数据方案

## 全局函数

<!-- 以下是脚本自动生成 -->

- **src\utils\common.ts**

```bash
# 方法名称  方法描述
getPageTitle:  设置网页标题
```

- **src\utils\storage.ts**

```bash
# 方法名称  方法描述
getCookie:  获取Cookie
setCookie:  设置Cookie
removeCookie:  移除Cookie
```

- **src\utils\validate.ts**

```bash
# 方法名称  方法描述
isExternal:  验证网址
validPhone:  验证手机号码
validURL:  验证网址是否有效
validEmail:  验证邮箱账号
validID:  验证身份证号码
```
