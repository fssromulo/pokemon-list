import Vue from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery";
import "bootstrap/dist/js/bootstrap.min.js";
import router from "./routes/routes";
import './registerServiceWorker'

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
