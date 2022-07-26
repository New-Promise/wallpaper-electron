import {Win32ffi, ffi, CPP, L, NULL } from 'win32-ffi';
const os = require("os");
export class SetParent {
  //壁纸句柄
  workView: any = null;
  Progman:any = null;
  winFns = new Win32ffi().winFns();
  childWindow: any = null;
  constructor (childWindow: any) {
    this.childWindow = childWindow;
    //寻找底层窗体句柄
    this.Progman = this.winFns.FindWindowExW(0, 0, L('Progman'), null);
    //使用 0x3e8 命令分割出两个 WorkerW
    this.winFns.SendMessageTimeoutW(this.Progman, 0x052c, 0, 0, 0, 0x3e8, L("ok"));
    //遍历窗体获得窗口句柄
    this.winFns.EnumWindows(this.createEnumWindowProc(), 0);
    this.close(childWindow);
  }
  //创建回调函数
  createEnumWindowProc () {
    return ffi.Callback(CPP.BOOL, [CPP.HWND, CPP.LPARAM], (tophandle: any) => {
      //寻找桌面句柄
      let defview = this.winFns.FindWindowExW(tophandle,0, L("SHELLDLL_DefView"), NULL);
      // 如果找到桌面句柄再找壁纸句柄
      if (defview != NULL) {
        this.workView = this.winFns.FindWindowExW(0, tophandle, L("WorkerW"), NULL);
        const isWin7 = os.platform() === 'win32' && os.release().startsWith('6.1');
        //获取electron的句柄
        const myAppHwnd = this.bufferCastInt32(this.childWindow.getNativeWindowHandle());
        const newParent = isWin7 ? this.Progman : this.workView;
        //将electron窗口设置在壁纸上层
        this.winFns.SetParent(myAppHwnd, newParent);
        this.winFns.ShowWindow(this.workView, 1);
        const isVisible = this.winFns.IsWindowVisible(this.workView);
        if (isVisible && isWin7) {
          // 设置窗口为未激活状态，否则这个窗口会遮挡视频
          this.winFns.ShowWindow(this.workView, 0);
        }
      }
      return true
    })
  }
  //将buffer类型的句柄进行转换
  bufferCastInt32(buf: any) {
    return os.endianness() == "LE" ? buf.readInt32LE() : buf.readInt32BE();
  }
  close (childWindow: any) {
    childWindow.on('close', () => {
      // 设置窗口为未激活状态，否则这个窗口会遮挡视频
      this.winFns.ShowWindow(this.workView, 0);
    })
  }
}
