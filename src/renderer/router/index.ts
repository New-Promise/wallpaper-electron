import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter);
const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: require('@/views/home/home.vue').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/wallpaperPage',
      name: 'wallpaper',
      component: require('@/views/wallpaperPage/wallpaperPage.vue').default
    }
  ]
});
export default router
