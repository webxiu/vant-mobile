import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { setupVant } from '@/plugins/setupVant'
import 'vant/lib/index.css'
import '@/styles/index.scss' // 导入公共样式
import '@/permission'

const app = createApp(App)

const initApp = async() => {
    app.use( router );
    setupVant( app );
    app.mount( '#app' );
}
initApp() 