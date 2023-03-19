import { createRouter, createWebHistory } from 'vue-router';

import AddDetailView from '../views/add/AddDetailView.vue';
import AddHarborView from '../views/add/AddHarborView.vue';
import SignInView from '../views/auth/SignInView.vue';
import MapView from '../views/map/MapView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapView,
    },
    {
      path: '/add',
      name: 'addHarbor',
      component: AddHarborView,
    },
    {
      path: '/add/detail',
      name: 'addDetail',
      component: AddDetailView,
    },
    {
      path: '/signin',
      name: 'signIn',
      component: SignInView,
    }
  ],
});

export default router;
