<template>
    <div class="headerPage app-drag">
        <div class="title">
            <img src="../../assets/image/trayImage.png" fit="fill" width="30px" height="30px"/>
            简易动态壁纸
        </div>
        <div class="operateBox">
            <Icon @click="minimize" class="no-app-drag" custom="iconfont icon-2zuixiaohua-2" size="16" color="#ffffff"/>
            <Icon @click="maximize" v-if="!isMaximize" class="no-app-drag" custom="iconfont icon-fangkuang" size="16" color="#ffffff"/>
            <Icon @click="unmaximize" v-if="isMaximize" class="no-app-drag" custom="iconfont icon-zuidahua" size="16" color="#ffffff"/>
            <Icon @click="quit" class="no-app-drag" custom="iconfont icon-guanbi" size="16" color="#ffffff"/>
        </div>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import { ipcRenderer } from 'electron';
@Component({})
export default class Header extends Vue {
  isMaximize = false;
  minimize () {
    ipcRenderer.send('minimize')
  }

  maximize () {
    ipcRenderer.send('maximize');
    this.isMaximize = true
  }

  unmaximize () {
    ipcRenderer.send('unmaximize');
    this.isMaximize = false
  }

  quit () {
    ipcRenderer.send('quit')
  }
}
</script>

<style scoped lang="less">
.app-drag {
    -webkit-app-region: drag;
}
.no-app-drag {
    -webkit-app-region: no-drag;
}
.headerPage {
    width: 100%;
    height: 40px;
    display: flex;
    background-color: #34495E;
    padding: 0 20px;
    justify-content: space-between;
    color: #ffffff;
    .title {
        line-height: 40px;
        font-weight: 600;
        font-size: 18px;
        display: flex;
        align-items: center;
        img {
            margin-right: 10px;
        }
    }
    .operateBox {
        display: flex;
        align-items: center;
        height: 100%;
        >i {
            margin-left: 20px;
            cursor: pointer;
        }
    }
}
</style>
