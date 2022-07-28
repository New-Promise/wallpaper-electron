# wallpaper-electron

> 简易动态壁纸

#### 简介

``` bash
# 只适用Windows系统,有兴趣的可以自行修改代码兼容macOs,linux

# 项目内只有几个默认的壁纸, 其他的需要自己上传到应用内才可以设置为壁纸

# 可使用html, MP4, git, png等类型文件作为壁纸

# 项目内添加了win32-ffi依赖用来调用Windows API,开发时需要配置下系统环境(已有electron开发经验可略下面步骤)

# 1.首先全局安装windows-build-tools
npm install -g windows-build-tools 

# 2.安装成功后设置下vs版本
npm config set msvs_version 2017

# 3.指定python
npm config set python path（py所在的目录)

# 4.全局安装node-gyp 
npm install -g node-gyp

```

#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue)@[8d4ed60](https://github.com/SimulatedGREG/electron-vue/tree/8d4ed607d65300381a8f47d97923eb07832b1a9a) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
