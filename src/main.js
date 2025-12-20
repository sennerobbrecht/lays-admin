import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { adminRouter } from './admin/router'

const app = createApp(App)

app.use(adminRouter)

app.mount('#app')
