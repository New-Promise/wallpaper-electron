<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import {ipcRenderer} from 'electron';
@Component({})
export default class App extends Vue {
  created(): void {
    ipcRenderer.on('log', (_e, data: any) => {
      console.log("log", data)
    })
  }
}
</script>
<style>
  /* CSS */
  * {
    margin: 0;
    padding: 0;
  }
  html,body,#app {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: transparent;
  }
  /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  ::-webkit-scrollbar{
    width: 5px;
    height: 5px;
    /* background-color: #F5F5F5; */
  }
  /*定义滚动条轨道 内阴影+圆角*/
  ::-webkit-scrollbar-track{
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    -moz-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    /* background-color: #F5F5F5; */
  }

  /*定义滑块 内阴影+圆角*/
  ::-webkit-scrollbar-thumb{
    border-radius: 2px;
    -webkit-border-radius: 2px;
    -moz-border-radius: 2px;
    box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    -moz-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #808080;
  }
</style>
