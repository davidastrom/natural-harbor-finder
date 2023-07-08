import '../src/assets/base.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { createAuth0 } from '@auth0/auth0-vue'

import { defaultConfig, plugin } from '@formkit/vue';

import App from './App.vue';
import { i18n } from './plugins/i18n';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(plugin, defaultConfig);
app.use(i18n)
app.use(
  createAuth0({
    domain: import.meta.env.VITE_AUTH0_DOMAIN,
    clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
    authorizationParams: {
      redirect_uri: import.meta.env.VITE_AUTH0_CALLBACK_URL,
    },
  })
)

app.mount('#app');
