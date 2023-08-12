import { acceptHMRUpdate, defineStore } from 'pinia';


export const useUserStore = defineStore('user', {
  state: () => {
    return {}
  },
  getters: {

  },
  actions: {
    
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
