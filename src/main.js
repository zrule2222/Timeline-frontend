import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import services from './service/service.js'
import QRCode from 'qrcode'

Vue.config.productionTip = false;
Vue.use(services)
new Vue({
  router,
  store,
  QRCode,
  render: (h) => h(App),
}).$mount("#app");
