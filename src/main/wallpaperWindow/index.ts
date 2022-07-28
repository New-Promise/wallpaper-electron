import {BrowserWindow, screen} from "electron";
import { SetParent } from './setParent';
/**
 * type 选项的候选值和行为与平台相关。 可能的值有
 * 在 Linux 上, 可能的类型有 desktop、dock、toolbar、splash、notification。
 * 在 macOS 上，可能的类型是 desktop, textured。
 * textured 类型增加金属色泽的外观 (NSTexturedBackgroundWindowMask).
 * desktop 类型将窗口置于桌面背景级别 (kCGDesktopWindowLevel - 1). 注意，桌面窗口不会接收焦点、键盘或鼠标事件，但您可以使用< 0> globalShortcut < /0 >接收快捷键的消息
 * 在 Windows 上, 可能的类型为 toolbar.
 * */
interface Rectangle {
  height: number;
  width: number;
  x: number;
  y: number;
}
export class WallpaperWindow {
  wallpaperWindow: Array<any> = [];
  winURL = '';
  constructor (winURL: string) {
    this.winURL = winURL;
    this.getScreen()
  }

  getScreen () {
    const screenCount = screen.getAllDisplays();
    console.log('screenCount', screenCount);
    let y = 0;
    screenCount.forEach((item: { workArea: Rectangle }) => {
      if (item.workArea.y < 0) y = Math.abs(item.workArea.y)
    })
    screenCount.forEach((item: { workArea: Rectangle }) => {
      this.creationWindows(item.workArea, y)
    })
  }

  creationWindows (params: Rectangle, y: number) {
    const { x, width, height } = params;
    let YLine = params.y < 0 ? 0 : y;
    const wallpaperConfig: object = {
      // type: 'toolbar',
      title: '动态壁纸',
      // focusable: false,
      // show: false, // 创建时是否应显示窗口。默认为 true。
      width, // 窗口的宽度（以像素为单位）。默认为800。
      height, //  窗口的高度（以像素为单位）。默认为600
      x,
      y: YLine,
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
    const wallpaperWindow = new BrowserWindow(wallpaperConfig);
    wallpaperWindow.loadURL(this.winURL);
    this.wallpaperWindow.push(wallpaperWindow);
    new SetParent(wallpaperWindow);
  }
}
