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
	console.log("Config oauth2 ->", config);
	try {
		const result = await authorize(config);
		storeTokens(result.accessToken, result.refreshToken);
		return result;
	}
	catch (error) {
		console.error(error);
	}
}

// storeToken after a successful OAuth2 login
export async function storeTokens(accessToken, refreshToken) {
	try {
		await AsyncStorage.setItem('access_token', accessToken);
		await AsyncStorage.setItem('refresh_token', refreshToken);
	}
	catch (error) {
		console.error(error);
	}
}

// retrieveToken when you need to check if the user is already authenticated
export async function retrieveTokens() {
	try {
		const token = await AsyncStorage.getItem('access_token');
		return token;
	}
	catch (error) {
		console.error(error);
	}
}