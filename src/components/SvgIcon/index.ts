import YuSvgIcon from "./src/index.vue";

export const SvgIcon = Object.assign(YuSvgIcon, {
  install(app) {
    console.log("YuSvgIcon.name", YuSvgIcon.name);
    app.component(YuSvgIcon.name, YuSvgIcon);
  },
});

export default SvgIcon;
