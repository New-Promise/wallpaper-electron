<template>
    <div class="contentCardPage" @mouseenter="mouseover" @mouseleave="mouseout">
        <Card class="contentCard" :bordered="false" >
            <div v-if="wallpaperProperty.type === 'image'">
                <img :src="wallpaperProperty.url">
            </div>
            <div v-if="wallpaperProperty.type === 'video'">
                <video ref="video" :src="wallpaperProperty.url" loop muted></video>
            </div>
            <div v-if="wallpaperProperty.type === 'html'">
                <iframe :src="wallpaperProperty.url"></iframe>
            </div>
            <div class="maskLayer" v-if="showMaskLayer">
                <div @click="videoClick" class="videoButBox" v-if="wallpaperProperty.type === 'video'">
                    <Icon class="videoBut" style="margin-left: 2px" v-if="!isPlay" custom="iconfont icon-bofang1" size="30" color="#ffffff"/>
                    <Icon class="videoBut" v-else custom="iconfont icon-24gf-pause2" size="30" color="#ffffff"/>
                </div>
                <div class="maskLayerButBox">
                    <Button type="error" @click="deleteFn" ghost>删除</Button>
                    <Button type="primary" @click="setting" ghost>应用</Button>
                </div>
            </div>
        </Card>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Emit} from "vue-property-decorator";
@Component({})
export default class ContentCard extends Vue {
  @Prop({type: Object}) wallpaperProperty!: { type: string; url: string };

  showMaskLayer = false;
  isPlay = false;

  mouseover () { this.showMaskLayer = true }

  mouseout () { this.showMaskLayer = false }

  videoClick () {
    this.isPlay = !this.isPlay;
    if (this.isPlay) (this.$refs as any).video.play();
    else (this.$refs as any).video.pause();
  }

  @Emit('setting')
  setting () { return this.wallpaperProperty }

  @Emit('deleteFn')
  deleteFn () { return this.wallpaperProperty }
}
</script>

<style scoped lang="less">
.size {
    width: 100%;
    height:100%;
}
.contentCardPage {
    width: calc(100% / 3 - 10px);
    height: calc(100% / 3 - 16px);
    margin: 5px;
    overflow: hidden;
    display: inline-block;
    .contentCard {
        .size;
        background-color: transparent;
        border: 1px dotted #ffffff;
        /deep/.ivu-card-body {
            .size;
            padding: 0;
            position: relative;
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
            .maskLayer {
                position: absolute;
                top: 0;
                /*background-color: rgba(0, 0, 0, .1);*/
                background-color: transparent;
                .maskLayerButBox {
                    width: 100%;
                    position: absolute;
                    bottom: 0;
                    padding: 5px;
                    background-color: rgba(0, 0, 0, .5);
                    display: flex;
                    justify-content: space-between;
                }
                .videoButBox {
                    width: 50px;
                    height: 50px;
                    position: absolute;
                    top: calc(50% - 25px);
                    left: calc(50% - 25px);
                    background-color: rgba(0, 0, 0, .7);
                    border-radius: 100%;
                    line-height: 50px;
                    text-align: center;
                    .videoBut {
                        position: absolute;
                        top: calc(50% - 15px);
                        left: calc(50% - 15px);
                    }
                }
            }
        }
    }
}
</style>
