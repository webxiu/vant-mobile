import "vant/lib/index.css";
import "@/styles/index.scss";
import "@/permission";

import App from "@/App.vue";
import { createApp } from "vue";
import { registerStore } from "@/store";
import router from "@/router";
import { setupVant } from "@/plugins/setupVant";
import { useSvgIcon } from "@/icons";

const app = createApp(App);

const initApp = async () => {
  app.use(router);
  setupVant(app);
  useSvgIcon(app);
  registerStore(app);
  app.mount("#app");
};
initApp();
