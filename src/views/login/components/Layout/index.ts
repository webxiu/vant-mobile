import Login from "./src/login.vue";

export const LoginLayout = Object.assign(Login, {
  install(app) {
    app.component(Login.name, Login);
  },
});
