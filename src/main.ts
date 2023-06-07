import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import { createPinia } from 'pinia'

const pinia = createPinia()
const app = createApp(App)

app.provide('$axios', axios);

app.use(pinia)
app.use(router)

app.mount('#app')
