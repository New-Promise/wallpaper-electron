<template>
    <div class="wallpaperPage">
        <div v-if="wallpaperFile.type === 'image'">
            <img :src="wallpaperFile.url">
        </div>
        <div v-if="wallpaperFile.type === 'video'">
            <video ref="video" :src="wallpaperFile.url" loop autoplay muted></video>
        </div>
        <div v-if="wallpaperFile.type === 'html'">
            <iframe :src="wallpaperFile.url"></iframe>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { ipcRenderer } from 'electron';
@Component({})
export default class WallpaperPage extends Vue {
  wallpaperFile = {};
  created(): void {
    console.log(123123123213213123, window.location.href)
    this.getAtWallpaper()
  }

  getAtWallpaper () {
    ipcRenderer.on('getAtWallpaper', (_e, params: object) => {
      console.log('params -->', params);
      this.wallpaperFile = params
    })
  }
}
</script>

<style scoped lang="less">
.size {
    width: 100%;
    height:100%;
}
.wallpaperPage {
    .size;
    background-color: black;
    > div {
        .size;
        background-color: black;
        img {
            .size;
            object-fit: fill;
        }
        video {
            .size;
            object-fit: fill;
        }
        iframe {
            .size;
            border: 0;
        }
    }
}
</style>
