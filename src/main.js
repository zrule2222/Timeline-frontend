import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import services from './service/service.js'

Vue.config.productionTip = false;
Vue.use(services)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
