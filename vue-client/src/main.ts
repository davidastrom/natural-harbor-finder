import '../src/assets/base.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import vue3GoogleLogin from 'vue3-google-login';

import { defaultConfig, plugin } from '@formkit/vue';

import App from './App.vue';
import { i18n } from './plugins/i18n';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);
app.use(i18n)
app.use(vue3GoogleLogin, {
  clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
})

app.mount('#app');
