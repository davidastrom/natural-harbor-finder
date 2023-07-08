import type { user } from "types/user";
import AuthService from "./authService";
import { PublicClientApplication, type Configuration } from "@azure/msal-browser";

export const scopes = [
  import.meta.env.VITE_AUTH_SCOPE
]

const config: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MS_CLIENT_ID,
    authority: import.meta.env.VITE_MS_AUTHORITY,
    knownAuthorities: [
      import.meta.env.VITE_MS_AUTHORITY,
    ],
    redirectUri: `${location.origin}/auth-redirect/msal`,
  },
}

class MsAuthService extends AuthService<void> {
  msal: PublicClientApplication;
  constructor() {
    super(import.meta.env.VITE_API_MS_AUTH_URL)
    this.msal = new PublicClientApplication(config)
    this.msal.handleRedirectPromise()
  }

  public login(): Promise<user | null> {
    
  }
}


export default new MsAuthService;
