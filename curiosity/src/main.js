import './app.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueApexCharts from "vue3-apexcharts";

import { useWs } from './ws/useWs'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

useWs('ws://localhost:8000/ws')
app.use(router)

app.use(VueApexCharts);

app.mount('#app')
