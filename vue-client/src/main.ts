import '../src/assets/base.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';

import { createApp } from 'vue';


import App from './App.vue';
import { i18n } from './plugins/i18n';
import router from './router';
import { auth0 } from './plugins/auth0';
import { store } from './stores';
import PrimeVue from 'primevue/config';
import Tailwind from 'primevue/passthrough/tailwind';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(i18n);
app.use(auth0);
app.use(PrimeVue, { unstyled: true, pt: Tailwind });

app.mount('#app');
