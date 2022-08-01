'use strict';
import { app, BrowserWindow, Menu, Tray, protocol, screen } from 'electron';
import { WallpaperWindow } from './wallpaperWindow';
import { GetWallpaperFile } from './getWallpaperFile'
import { Tools } from './tools'
import { SetJsonFile } from './setJsonFile'
const path = require('path');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  // @ts-ignore
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow: any; // 主界面
let wallpaperWindow: any; // 壁纸窗口
let systemTray: any; // 系统托盘
let setJsonFile: any; //
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`;
const trayImagePath = process.env.NODE_ENV !== 'development'
  ? path.join(__dirname, 'static/trayImage/trayImage.png')
  : path.join(__dirname, '../../static/trayImage/trayImage.png');
function createWindow () {
  /**
   * Initial window options
   */
  // 关闭顶部导航菜单栏
  Menu.setApplicationMenu(null);
  const config: object = {
    // type: 'toolbar',
    title: '简易动态壁纸',
    // focusable: false,
    // show: false, // 创建时是否应显示窗口。默认为 true。
    width: 1200, // 窗口的宽度（以像素为单位）。默认为800。
    height: 800, //  窗口的高度（以像素为单位）。默认为600
    // x: 1900,
    // y: 0,
    useContentSize: false, // width和height将用作网页的大小，这意味着实际窗口的大小将包括窗口框架的大小并稍大。默认为false。
    // center: true, // 在屏幕中央显示窗口。
    resizable: false, // 窗口大小是否可改变
    maximizable: true, // 窗口是否可以最大化
    frame: false, // 是否显示顶部导航栏
    // transparent:true, // 使窗口 透明。 默认值为 false. 在Windows上，仅在无边框窗口下起作用。
    webPreferences: { // 网页功能的设置
      // nodeIntegrationInSubFrames: true,
      nodeIntegration: true, // 是否启用node集成。默认为false。
      contextIsolation: false, // 官网似乎说是默认false，但是这里必须设置contextIsolation
      // experimentalFeatures: true, // 启用 Chromium 的实验性功能。默认为false。
      webSecurity: false, // 当false，将禁用同源策略（通常被人们使用测试网站）
    }
  };
  mainWindow = new BrowserWindow(config);
  mainWindow.loadURL(winURL);
  // 设置壁纸窗口
  wallpaperWindow = new WallpaperWindow(winURL + '#/wallpaperPage');
  // 获取壁纸文件
  new GetWallpaperFile();
  // 一些工具
  new Tools(mainWindow);
  // 获取文件JSON数据
  setJsonFile = new SetJsonFile(mainWindow, wallpaperWindow.wallpaperWindow);
  // 设置系统托盘
  systemTray = new Tray(trayImagePath);
  app.whenReady().then(() => {
    const contextMenu = Menu.buildFromTemplate([
      { label: '显示界面', type: 'normal', click: () => { mainWindow.show() } },
      { label: '退出', type: 'normal', click: () => { app.quit() } }
    ]);
    systemTray.setToolTip('简易动态壁纸');
    systemTray.setContextMenu(contextMenu)
  });
  //===========自定义file:///协议的解析=======================
  if (process.env.NODE_ENV === 'development') {
    protocol.interceptFileProtocol('file', (req, callback) => {
      const url = req.url.substr(8);
      callback(decodeURI(url));
    }, (error) => {
      if (error) {
        console.error('Failed to register protocol');
      }
    });
  }
  mainWindow.on('closed', () => {
    mainWindow = null
  });

  screen.on('display-metrics-changed', () => {
    wallpaperWindow.forEach((item: any) => item.close());
    // 设置壁纸窗口
    wallpaperWindow = new WallpaperWindow(winURL + '#/wallpaperPage');
    setJsonFile.updateWallpaperWindow(wallpaperWindow.wallpaperWindow)
  })
  // globalShortcut.register('Ctrl+F12', () => { // 打开主程序开发者工具
  //   mainWindow.openDevTools();
  // });
}
function init () {
  if (app.isReady()) createWindow()
}
app.on('ready', init);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
});
//设置开机启动
app.setLoginItemSettings({
  openAtLogin: true
});

