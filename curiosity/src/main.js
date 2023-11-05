import './app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";

import { useWs } from './ws/useWs'

import App from './App.vue'
import router from './router'
import { auth0 } from './auth';


const app = createApp(App)
document.cookie = "cross-site-cookie=bar; SameSite=None; Secure"
app.use(router)

app.use(auth0);
  

app.use(createPinia())

useWs('ws://localhost:3001/ws')

app.use(VueApexCharts);

app.mount('#app')
