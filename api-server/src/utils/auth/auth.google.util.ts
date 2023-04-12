import { OAuth2Client } from 'google-auth-library';
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket';

const clientId = process.env.GOOGLE_CLIENT_ID
const client = new OAuth2Client(clientId);


export async function verifyGoogleToken(token: string): Promise<GoogleVerificationResult> {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: clientId, 
        });
        return { payload: ticket.getPayload()};
    } catch (e) {
        return {error: 'Invalid user'}
    }
}

interface GoogleVerificationResult {
    payload?: TokenPayload,
    error?: string
}
