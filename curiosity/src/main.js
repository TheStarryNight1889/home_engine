import './index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useWs } from './ws/useWs'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

useWs('ws://localhost:3000')
app.use(router)

app.mount('#app')
