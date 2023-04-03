import '../src/assets/base.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import { defaultConfig, plugin } from '@formkit/vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);

app.mount('#app');
