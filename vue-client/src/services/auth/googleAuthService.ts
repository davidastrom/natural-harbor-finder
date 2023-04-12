import AuthService from './authService';

class GoogleAuthService extends AuthService {
  constructor() {
    super(import.meta.env.VITE_API_GOOGLE_AUTH_URL)
  }
}

export default new GoogleAuthService()
