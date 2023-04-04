import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import services from './service/service.js'
import QRCode from 'qrcode'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueDragscroll from "vue-dragscroll";
import '../index.css'


Vue.config.productionTip = false;
Vue.use(services)
Vue.use(VueMaterial)
Vue.use(VueDragscroll)
new Vue({
  router,
  store,
  QRCode,
  render: (h) => h(App),
}).$mount("#app");
