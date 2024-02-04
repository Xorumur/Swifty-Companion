import { retrieveTokens } from "./auth";

export async function searchQuery(username) {
	if (!username || username == "") return undefined;
	const tokens = await retrieveTokens();

	const response = await fetch(`https://api.intra.42.fr/v2/users?filter[login]=${username.toLowerCase()}`, {
		headers: { Authorization: `Bearer ${tokens.token}` }
	});
	const data = await response.json();
	if (data.length == 0) return null;
	return data[0];
}