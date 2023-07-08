import axios from 'axios';
import type { user } from 'types/user';

export default abstract class AuthService<InputType> {
  authUrl: string;

  constructor(authEndpointSuffix: string) {
    this.authUrl = import.meta.env.VITE_API_URL + import.meta.env.VITE_API_AUTH_URL + authEndpointSuffix;
  }

  public abstract login(credential: InputType): Promise<user | null>;

  logout() {
    localStorage.removeItem('user');
  }
}

