import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';


console.log(import.meta.env.VITE_BACK_URL)
const app = createApp(App)
app.provide('$axios', axios);

app.use(store)
app.use(router)

app.mount('#app')
