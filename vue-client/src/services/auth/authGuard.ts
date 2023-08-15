import type { RouteLocationNormalized, NavigationGuardNext, NavigationGuard, RouteLocation, RouteLocationRaw } from 'vue-router';
import { useLocalStorage } from '@vueuse/core';

import {auth0} from '../../plugins/auth0';
import { watchEffect } from 'vue';
import { store } from '@/stores';
import { useUserStore } from '@/stores/user';

export function useAuthGuard() {
  const BASE_REDIRECT = '/';

  const redirectPath = useLocalStorage('redirect', BASE_REDIRECT);

  const authGuard: NavigationGuard = async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const fn = () => {
      if ((to.meta.requiresAuth || to.meta.requiresAdmin) && !auth0.isAuthenticated.value) {
        redirectPath.value = to.path;
        next( {
          name: 'login',
        })
        return;
      }

      const userStore = useUserStore();
      userStore.setUserData(auth0.user.value)
      
      if (to.meta.requiresAdmin && !auth0.user.value?.['harbor-finder/roles']?.includes('Admin')) {
        next(false)
        return
      }
  
      next()
    }

    if (!auth0.isLoading.value) {
      fn()
      return
    }

    await new Promise<void>(resolve => {
      const unwatch = watchEffect(() => {
        if (!auth0.isLoading.value) {
          unwatch();
          resolve();
        }
      });
    });

    fn()
  }

  const authRedirect = (_to: RouteLocation): RouteLocationRaw  => {
    console.log(_to)
    const redirect = redirectPath.value;
    redirectPath.value = BASE_REDIRECT;
    return {
      path: redirect,
    }
  }

  return {authGuard, authRedirect};
}

