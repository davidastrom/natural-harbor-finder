import './assets/base.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

import { createApp } from 'vue';


import App from './App.vue';
import { i18n } from './plugins/i18n';
import router from './router';
import { auth0 } from './plugins/auth0';
import { store } from './stores';
import PrimeVue from 'primevue/config';
import Lara from './presets/lara';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);
app.use(auth0);
app.use(PrimeVue, { unstyled: true, pt: Lara });

app.mount('#app');
