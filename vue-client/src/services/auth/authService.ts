import axios from 'axios';

export default abstract class AuthService {
  authUrl: string;

  constructor(authEndpointSuffix: string) {
    this.authUrl = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_AUTH_URL + authEndpointSuffix;
  }

  login(credential: string) {
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

  logout() {
    localStorage.removeItem('user');
  }
}

