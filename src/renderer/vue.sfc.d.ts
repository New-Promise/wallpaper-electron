

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue
}

declare module "vue/types/vue" {
  import VueRouter, { Route } from 'vue-router';
  import { Store } from 'vuex'
  // 声明自己的 store state
  interface State {
    count: number
  }
  interface Vue {
    $router: VueRouter; // 这表示this下有这个东西
    $route: Route;
    $store: Store<State>;
    $http: any;
    $Message: any;
    $Modal: any;
  }
}
