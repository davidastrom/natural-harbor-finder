import { acceptHMRUpdate, defineStore } from 'pinia';

import googleAuthService from '@/services/auth/googleAuthService';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {}
  },
  getters: {

  },
  actions: {
    async loginGoogle(credential: string) {
      return googleAuthService.login(credential)
      .then(user => {
        console.log(user)
      },
      error => {
        
      })
    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
