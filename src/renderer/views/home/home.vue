<template>
    <div class="homePage">
        <headerPage></headerPage>
        <div class="content">
            <div class="contentTitle">
                <div class="sort">
                    <Button :type="classify === 'all' ? 'primary' : 'dashed'" ghost @click="butClick('all')">全部</Button>
                    <Divider type="vertical" />
                    <Button :type="classify === 'image' ? 'primary' : 'dashed'" ghost @click="butClick('image')">图片</Button>
                    <Divider type="vertical" />
                    <Button :type="classify === 'video' ? 'primary' : 'dashed'" ghost @click="butClick('video')">视频</Button>
                    <Divider type="vertical" />
                    <Button :type="classify === 'html' ? 'primary' : 'dashed'" ghost @click="butClick('html')">HTML</Button>
                </div>
                <div>
                    <Upload action="upload" :accept="upLoadAccept" :before-upload="beforeUpload" :show-upload-list="false">
                        <Button type="dashed" ghost>上传</Button>
                    </Upload>
                </div>
            </div>
            <div class="contentList">
                <contentCard @setting="setting" @deleteFn="deleteFn" v-for="(item, index) in fileCardList" :wallpaperProperty="item" :key="index"></contentCard>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ipcRenderer } from "electron";
interface Type {
  type: string;
  url: string;
}
@Component({
  components: {
    headerPage: require('@/components/header/header.vue').default,
    contentCard: require('@/components/contentCard/contentCard.vue').default
  }
})
export default class Home extends Vue {
  classify = 'all';
  wallpaperJson: {
    atWallpaper: Type;
    wallpaperFile: Array<Type>;
  } = {
    atWallpaper: {
      type: '',
      url: ''
    },
    wallpaperFile: []
  };

  fileCardList: Array<Type> = [];

  upLoadAccept = '.avif, .bmp, .gif, .cur, .jpg, .jpeg, .jfif, .pjpeg, .pjp, .png, .svg, .tif, .tiff, .webp, .html, .mp4, .WebM, .Ogg';

  created(): void {
    ipcRenderer.send('getJsonFile');
    this.returnFileList();
    this.getJsonFileSuccess();
    this.upLoadWallpaperSuccess();
    this.upLoadWallpaperError();
    this.deleteWallpaperError();
    this.deleteWallpaperSuccess();
  }

  getJsonFileSuccess () {
    ipcRenderer.on('getJsonFileSuccess', (_e, jsonData: {
        atWallpaper: Type;
        wallpaperFile: Array<Type>;
      }) => {
      console.log('jsonData', jsonData);
      this.wallpaperJson = jsonData;
      if (!jsonData.atWallpaper.type) ipcRenderer.send('getFileList');
      else this.classification();
    });
  }

  returnFileList () {
    ipcRenderer.on('returnFileList', (_e, fileList: Array<Type>) => {
      this.wallpaperJson.wallpaperFile = fileList;
      this.classification();
      if (!this.wallpaperJson.atWallpaper.type) {
        this.wallpaperJson.atWallpaper = fileList[0];
        ipcRenderer.send('setJsonFile', this.wallpaperJson)
      }
    })
  }

  butClick (params: string) {
    this.classify = params;
    this.classification()
  }

  classification () {
    if (this.classify === 'all') this.fileCardList = this.wallpaperJson.wallpaperFile;
    else {
      this.fileCardList = [];
      this.wallpaperJson.wallpaperFile.forEach((item: Type) => {
        if (item.type === this.classify) this.fileCardList.push(item)
      })
    }
  }

  setting (params: Type) {
    console.log(params);
    this.wallpaperJson.atWallpaper = params;
    ipcRenderer.send('setJsonFile', this.wallpaperJson);
  }

  beforeUpload (file: File) {
    const { name, path } = file;
    ipcRenderer.send('upLoadWallpaper', name, path);
    return false
  }

  upLoadWallpaperSuccess () {
    ipcRenderer.on('upLoadWallpaperSuccess', (_e, params: Type) => {
      this.wallpaperJson.wallpaperFile.push(params);
      this.classification();
      ipcRenderer.send('setJsonFile', this.wallpaperJson)
    })
  }

  upLoadWallpaperError () {
    ipcRenderer.on('upLoadWallpaperError', (_e, err: Error) => {
      console.log('写入失败', err)
    })
  }

  deleteFn (params: { url: string }) {
    console.log(params);
    ipcRenderer.send('deleteWallpaper', params.url)
  }

  deleteWallpaperError () {
    ipcRenderer.on('deleteWallpaperError', (_e, err: Error) => {
      console.log(err)
    })
  }

  deleteWallpaperSuccess () {
    ipcRenderer.on('deleteWallpaperSuccess', (_e, filePath: string) => {
      const newArr: Array<Type> = [];
      this.wallpaperJson.wallpaperFile.forEach((item: Type) => {
        if (item.url !== filePath) newArr.push(item)
      });
      this.wallpaperJson.wallpaperFile = newArr;
      console.log('删除后的数据', this.wallpaperJson);
      this.classification();
      ipcRenderer.send('setJsonFile', this.wallpaperJson);
    })
  }
}
</script>

<style scoped lang="less">
.homePage {
    width: 100%;
    height: 100%;
    border-radius: 10px;
    .content {
        height: calc(100% - 40px);
        background-color: #2C3E50;
        padding: 10px;
        .contentTitle {
            display: flex;
            justify-content: space-between;
            padding: 0 5px 5px 5px;
        }
        .contentList {
            height: calc(100% - 42px);
            overflow-y: auto;
        }
    }
}
</style>
