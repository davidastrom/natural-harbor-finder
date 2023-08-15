import '../src/assets/base.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

import { createApp } from 'vue';

import { defaultConfig, plugin } from '@formkit/vue';

import App from './App.vue';
import { i18n } from './plugins/i18n';
import router from './router';
import { auth0 } from './plugins/auth0';
import { store } from './stores';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(plugin, defaultConfig);
app.use(i18n)
app.use(auth0)

app.mount('#app');
