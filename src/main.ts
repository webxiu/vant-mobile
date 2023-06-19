import "vant/lib/index.css";
import "@/styles/index.scss";
import "@/permission";
import "~/types/global.d";
import "vant-sku/dist/index.css";
import "./assets/fonts/iconfont.js";

import App from "@/App.vue";
import VanSku from "vant-sku";
import { createApp } from "vue";
import drag from "v-drag";
import { registerStore } from "@/store";
import router from "@/router";
import { setupVant } from "@/plugins/setupVant";
import { useSvgIcon } from "@/icons";
import vueEsign from "vue-esign";

const app = createApp(App);

// 使用电子签名
app.use(vueEsign);
// 使用sku组件
app.use(VanSku);
// 拖动
app.use(drag);

const initApp = async () => {
  app.use(router);
  setupVant(app);
  useSvgIcon(app);
  registerStore(app);
  app.mount("#app");
};
initApp();
