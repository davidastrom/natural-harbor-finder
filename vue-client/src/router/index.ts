import { createRouter, createWebHistory } from 'vue-router';
import { useAuthGuard } from '../services/auth/authGuard';

const { authGuard, authRedirect } = useAuthGuard();

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/map/MapView.vue') ,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/harbors/manage',
      name: 'manageHarbors',
      component: () => import('@/views/harbors/ManageHarborView.vue'),
      meta: {
        requiresAdmin: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
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
