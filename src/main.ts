import "vant/lib/index.css";
import "@/styles/index.scss";
import "@/permission";
import "~/types/global.d";
import "vant-sku/dist/index.css";
import "./assets/fonts/iconfont.js";

import App from "@/App.vue";
import VanSku from "vant-sku";
import { createApp } from "vue";
import { registerStore } from "@/store";
import router from "@/router";
import { setupVant } from "@/plugins/setupVant";
import { useSvgIcon } from "@/icons";
import vueEsign from "vue-esign";
import "../mock";

const app = createApp(App);

// 使用电子签名
app.use(vueEsign);
// 使用sku组件
app.use(VanSku);

const initApp = async () => {
  app.use(router);
  setupVant(app);
  useSvgIcon(app);
  registerStore(app);
  app.mount("#app");
};
initApp();
