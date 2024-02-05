import { authorize } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from './config';

// Get clientid and secret with env variables
const config = {
	  issuer: 'https://api.intra.42.fr',
	  clientId: Config.CLIENT_ID,
	  clientSecret: Config.CLIENT_SECRET,
	  redirectUrl: "com.AwesomeProject://oauth2redirect",
	  scopes: ['public'],
	  serviceConfiguration: {
	    authorizationEndpoint: 'https://api.intra.42.fr/oauth/authorize',
		tokenEndpoint: 'https://api.intra.42.fr/oauth/token',
	},
};

export async function auth() {
	const tokens = await retrieveTokens();

	if (tokens)
		return tokens;

	try {
		const result = await authorize(config);
		storeTokens(result.accessToken, result.refreshToken);
		return result;
	}
	catch (error) {
		return null;
	}
}

// storeToken after a successful OAuth2 login
export async function storeTokens(accessToken, refreshToken) {
	try {
		await AsyncStorage.setItem('access_token', accessToken);
		await AsyncStorage.setItem('refresh_token', refreshToken);
	}
	catch (error) {
	}
}

// retrieveToken when you need to check if the user is already authenticated
export async function retrieveTokens() {
	try {
		const token = await AsyncStorage.getItem('access_token');
		const refreshToken = await AsyncStorage.getItem('refresh_token');
		
		if (token == null || refreshToken == null)
			return null;

		const newTokensIfNeeded = await refreshTokenIfNeeded();

		if (newTokensIfNeeded)
			return newTokensIfNeeded;

		return { token, refreshToken };
	}
	catch (error) {
		return null;
	}
}

export async function refreshTokenIfNeeded() {

	const token = await AsyncStorage.getItem('access_token');
	const refreshToken = await AsyncStorage.getItem('refresh_token');

    try {

        const tokenCheckRes = await fetch('https://api.intra.42.fr/v2/me', {
            headers: { Authorization: `Bearer ${token}` }
        });
            
        const tokenCheckData = await tokenCheckRes.json();
    
        // No error means the token is still valid so return null
        if (!tokenCheckData.error)
            return null;
    
        // Refresh token when there is an error -> means the access token is expired
        const response = await fetch('https://api.intra.42.fr/oauth/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `grant_type=refresh_token&client_id=${Config.CLIENT_ID}&client_secret=${Config.CLIENT_SECRET}&refresh_token=${refreshToken}`,
        });
    
        const data = await response.json();
        
        await storeTokens(data.access_token, data.refresh_token);
    
        return { token: data.access_token, refreshToken: data.refresh_token};
    } catch (error) { return null; }
}