import { ipcMain, app } from 'electron';
const fs = require('fs');
const path = require('path');
const exePath = app.getPath('exe');
const indexS = exePath.indexOf('wallpaper-electron');
const programPath = exePath.substring(0, indexS - 1);
const staticPath = process.env.NODE_ENV !== 'development'
  ? path.join(__dirname, 'static/wallpaper')
  : path.join(__dirname, '../../../static/wallpaper');
const wallpaperPath  = process.env.NODE_ENV === 'development'
  ? path.join(programPath + '/wallpaper-electron', staticPath)
  : staticPath;
export class GetWallpaperFile {
  constructor () {
    this.getFileList();
    this.upLoadWallpaper();
    this.deleteWallpaper();
  }

  getFileList () {
    ipcMain.on('getFileList', (event: any) => {
      fs.readdir(staticPath, (err: any, fileList: any) => {
        if (!err) {
          const newFileList = fileList.map((item: string) => {
            return {
              type: this.getFileType(item),
              url: path.join(wallpaperPath, item)
            }
          });
          event.sender.send('returnFileList', newFileList);
        }
      })
    })
  }

  getFileType (fileName: string) {
    const imagesType = [ 'avif', 'bmp', 'gif', 'cur', 'jpg', 'jpeg', 'jfif', 'pjpeg', 'pjp', 'png', 'svg', 'tif', 'tiff', 'webp' ];
    const videoType = [ 'mp4', 'WebM', 'Ogg' ];
    const index: number = fileName.lastIndexOf('.');
    const fileSuffix: string = fileName.substr(index + 1);
    if (fileSuffix === 'html') return 'html';
    else if (imagesType.indexOf(fileSuffix) !== -1) return 'image';
    else if (videoType.indexOf(fileSuffix) !== -1) return 'video';
  }

  upLoadWallpaper () {
    ipcMain.on('upLoadWallpaper', (event, fileName: string, filePath: string) => {
      const wallpaperFile = {
        type: this.getFileType(fileName),
        url: path.join(wallpaperPath, fileName)
      };
      fs.readFile(filePath, (err: Error, file: any) => {
        if (err) event.sender.send('upLoadWallpaperError', err);
        else {
          fs.writeFile(wallpaperFile.url, file, (err: Error) => {
            if (err) event.sender.send('upLoadWallpaperError', err);
            else event.sender.send('upLoadWallpaperSuccess', wallpaperFile);
          })
        }
      });
    })
  }

  deleteWallpaper () {
    ipcMain.on('deleteWallpaper', (event, filePath: string) => {
      fs.unlink(filePath, (err: Error) => {
        if (err) event.sender.send('deleteWallpaperError', err);
        else event.sender.send('deleteWallpaperSuccess', filePath);
      })
    })
  }

}
