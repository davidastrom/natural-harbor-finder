import type {
  RouteLocationNormalized,
  NavigationGuardNext,
  NavigationGuard,
  RouteLocation,
  RouteLocationRaw,
} from 'vue-router';
import { useLocalStorage } from '@vueuse/core';

import { auth0 } from '../../plugins/auth0';
import { watchEffect } from 'vue';
import { useUserStore } from '@/stores/user';

export function useAuthGuard() {
  const BASE_REDIRECT = '/';

  const redirectPath = useLocalStorage('redirect', BASE_REDIRECT);

  const authGuard: NavigationGuard = async (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => {
    const fn = async () => {
      if ((to.meta.requiresAuth || to.meta.requiresAdmin) && (!auth0.isAuthenticated.value || !auth0.user.value)) {
        redirectPath.value = to.path;
        next({
          name: 'login',
        });
        return;
      }


      const userStore = useUserStore();
      if (auth0.user.value) {
        await userStore.setUserData(auth0.user.value);
      }

      if (to.meta.requiresAdmin && !userStore.user?.isAdmin) {
        next({
          name: 'home'
        });
        return;
      }

      next();
    };

    if (!auth0.isLoading.value) {
      await fn();
      return;
    }

    await new Promise<void>((resolve) => {
      const unwatch = watchEffect(() => {
        if (!auth0.isLoading.value) {
          unwatch();
          resolve();
        }
      });
    });

    await fn();
  };

  const authRedirect = (_to: RouteLocation): RouteLocationRaw => {
    const redirect = redirectPath.value;
    redirectPath.value = BASE_REDIRECT;
    return {
      path: redirect,
    };
  };

  return { authGuard, authRedirect };
}
