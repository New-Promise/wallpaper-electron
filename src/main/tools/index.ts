import {ipcMain} from 'electron'
export class Tools {
  mainWin: any = null;
  constructor (mainWin: any) {
    this.mainWin = mainWin;
    this.minimize();
    this.maximize();
    this.unmaximize();
    this.quit();
  }

  minimize () { // 最小化
    ipcMain.on('minimize', () => this.mainWin.minimize())
  }

  maximize () { // 窗口最大化
    ipcMain.on('maximize', () => this.mainWin.maximize())
  }

  unmaximize () { // 从最大化退出
    ipcMain.on('unmaximize', () => this.mainWin.unmaximize())
  }

  quit () { // 隐藏主界面
    ipcMain.on('quit', () => this.mainWin.hide())
  }
}
