<template>
    <div class="configPage">
        <Card class="loginCard" v-show="!isLogin">
            <Form ref="login" class="loginForm" :model="formInline" :rules="formInlineRules">
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="请输入登录密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button class="but" type="primary" @click="login">登录</Button>
                    <Button class="but" type="primary" @click="close">关闭</Button>
                </FormItem>
            </Form>
        </Card>
        <Card class="configCard" v-show="isLogin">
            <div class="configFormBox">
                <Form ref="configForm" class="configForm" :model="formData">
                    <FormItem label="系统名称">
                        <Input v-model="formData.title" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="配置页登录密码">
                        <Input v-model="formData.password" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem label="系统地址">
                        <Input v-model="formData.url" placeholder="请输入..."></Input>
                    </FormItem>
                    <FormItem>
                        <Button type="success" @click="submit">保存</Button>
                        <Button type="info" style="margin-left: 8px" @click="close">关闭</Button>
                    </FormItem>
                </Form>
            </div>
        </Card>
    </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from "vue-property-decorator";
import { ipcRenderer } from "electron"
@Component({})
export default class Config extends Vue {
  private isLogin = false
  private formData: { [s: string ]: string } = {}
  private formInline = { user: 'admin', password: '' }
  formInlineRules = {}
  @Prop({ type: Object }) private configData: any

  created(): void {
    console.log(this.configData)
    this.formData = JSON.parse(JSON.stringify(this.configData))
  }

  keyupSubmit () {
    document.onkeydown = (e) => {
      if (e.keyCode === 13 && !this.isLogin) { // key=13即指示回车键
        this.login()
      }
    }
  }

  close () {
    this.$emit('close')
  }

  login (): void {
    (this as any).$refs.login.validate((valid: boolean) => {
      if (valid) {
        console.log(this.formInline, this.formData)
        if (this.formInline.password === this.formData.password) {
          this.isLogin = true
        } else {
          (this as any).$Message.warning('密码错误,请重新输入!')
        }
      }
    })
  }

  submit () {
    if (JSON.stringify(this.formData) !== JSON.stringify(this.configData)) {
      this.setData(this.formData)
    } else {
      (this as any).$Message.error(`当前未做任何修改`)
    }
  }

  setData (data: object) { // 事件请求 关闭弹窗以及上传配置
    localStorage.clear()
    ipcRenderer.send('setData', JSON.stringify(data))
  }

  reset () { // 重置事件
    this.$set(this, 'formData', JSON.parse(JSON.stringify(this.configData)))
  }
}
</script>

<style>
    .configCard .ivu-card-body {
        height: 100%;
    }
</style>
<style scoped>
    .configPage {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        background: url("./configback.jpg") no-repeat center center;
        background-size: 100% 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
    }
    .loginCard {
        /*position: absolute;
        top: calc(50% - 191px);
        left: calc(50% - 113px);
        background-color: #fefefe;*/
        margin: 0 auto;
    }
    .loginForm {
        width: 300px;
        margin: 24px 24px 0;
    }
    .but {
        margin: 0 44px;
    }
    .configCard {
        height: calc(70% + 20px);
        padding: 10px;
        overflow: hidden;
        margin: 0 auto;
    }
    .configFormBox {
        height: calc(100% - 51px);
        overflow-y: auto;
    }
    .configForm {
        width: 800px;
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
