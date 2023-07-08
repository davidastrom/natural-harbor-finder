import axios from 'axios';
import type { user } from 'types/user';
import AuthService from './authService';

class GoogleAuthService extends AuthService<string> {
  constructor() {
    super(import.meta.env.VITE_API_GOOGLE_AUTH_URL)
  }

  public async login(credential: string): Promise<user | null> {
    console.log(credential)
    return axios
      .post(this.authUrl + '/login', {
        credential: credential
      })
      .then(response => {
        if (response.data.user.token) {
          localStorage.setItem('user', JSON.stringify(response.data.user))
        }

        return response.data.user
      })
  }
}

export default new GoogleAuthService()
