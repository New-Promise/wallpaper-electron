import {ipcMain} from 'electron';
const path = require('path');
const fs = require('fs');
const wallpaperJsonPath = process.env.NODE_ENV !== 'development'
  ? path.join(__dirname, 'static/json/wallpaper.json') : path.join(__dirname, '../../../static/json/wallpaper.json');
interface jsonDataType {
  atWallpaper: {
    type: string;
    url: string;
  },
  wallpaperFile: Array<{}>
}
export class SetJsonFile {
  mainWindow;
  wallpaperWindow;
  constructor (mainWindow: any, wallpaperWindow: any) {
    this.mainWindow = mainWindow;
    this.wallpaperWindow = wallpaperWindow;
    this.setJsonFile();
    this.getJsonFile();
  }

  updateWallpaperWindow (params: Array<any>) { // 外部调用,更新壁纸窗口对象
    this.wallpaperWindow = params
  }

  readJsonFile () {
    return new Promise((resolve, reject) => {
      fs.readFile(wallpaperJsonPath, (err: Error, json: any ) => {
        if (err) reject(err);
        else resolve(JSON.parse(json) as jsonDataType)
      })
    })
  }

  setJsonFile () {
    ipcMain.on('setJsonFile', (event, jsonData: jsonDataType) => {
      fs.writeFile(wallpaperJsonPath, JSON.stringify(jsonData), 'utf-8', (err: Error) => {
        if (err) event.sender.send('setJsonFileSuccessError');
        else {
          this.mainWindow.webContents.send('setJsonFileSuccess', jsonData);
          this.wallpaperWindow.forEach((item: any) => {
            item.webContents.send('getAtWallpaper', jsonData.atWallpaper);
          })
        }
      })
    })
  }

  getJsonFile () {
    ipcMain.on('getJsonFile', (event) => {
      this.readJsonFile().then((jsonData: any) => {
        this.mainWindow.webContents.send('getJsonFileSuccess', jsonData);
        this.wallpaperWindow.forEach((item: any) => {
          item.webContents.send('getAtWallpaper', jsonData.atWallpaper);
        })
      }).catch((err) => {
        event.sender.send('getJsonFileError', err)
      })
    })
  }
}
