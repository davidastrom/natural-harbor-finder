import axios from 'axios';
import { acceptHMRUpdate, defineStore } from 'pinia';
import { auth0 } from "@/plugins/auth0";

export type Auth0User = {
  sub?: string,
  name?: string,
  picture?: string,
  nickname?: string,
}

export type User = {
  appId: string,
  auth0Id: string,
  userName?: string,
  name?: string,
  profilePicture?: string,
  isAdmin: boolean,
}

type LoginReturnModel = {
  id: string,
  auth0Id: string,
  isAdmin: boolean,
  profilePicture?: string,
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: null as User | null,
    }
  },
  getters: {

  },
  actions: {
    async setUserData(auth0User: Auth0User) {
      if (!this.user || this.user.auth0Id !== auth0User.sub) {
      const url = import.meta.env.VITE_API_URL + '/auth/login';
      const token = await auth0.getAccessTokenSilently();

        try {
          const res = await axios.post<LoginReturnModel>(url, null, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          this.user = {
            appId: res.data.id,
            auth0Id: res.data.auth0Id,
            userName: auth0User.nickname ?? auth0User.name,
            name: auth0User.name,
            profilePicture: res.data.profilePicture ?? auth0User.picture,
            isAdmin: res.data.isAdmin,
          }
        } catch (error) {
          this.user = null;
          auth0.logout();
        }
      }

    }
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as never, import.meta.hot))
}
