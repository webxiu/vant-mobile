import "vant/lib/index.css";
import "@/styles/index.scss";
import "@/permission";
import "~/types/global.d";

import App from "@/App.vue";
import { Dialog } from "vant";
import { createApp } from "vue";
import { registerStore } from "@/store";
import router from "@/router";
import { setupVant } from "@/plugins/setupVant";
import { useSvgIcon } from "@/icons";
import vueEsign from "vue-esign";

const app = createApp(App);
app.use(Dialog);

// 使用电子签名
app.use(vueEsign);

const initApp = async () => {
  app.use(router);
  setupVant(app);
  useSvgIcon(app);
  registerStore(app);
  app.mount("#app");
};
initApp();
