import { createRouter, createWebHistory } from 'vue-router';

import AddDetailView from '../views/add/AddDetailView.vue';
import AddHarborView from '../views/add/AddHarborView.vue';
import LoginView from '../views/auth/LoginView.vue';
import MapView from '../views/map/MapView.vue';

import { useAuthGuard } from '../services/auth/authGuard';

const { authGuard, authRedirect } = useAuthGuard();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MapView,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/harbors/manage',
      name: 'manageHarbors',
      component: AddHarborView,
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/add',
      name: 'addHarbor',
      component: AddHarborView,
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/add/detail',
      name: 'addDetail',
      component: AddDetailView,
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/callback',
      name: 'callback',
      redirect: authRedirect,
    },
  ],
});

router.beforeEach(authGuard);

export default router;
