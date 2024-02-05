import { retrieveTokens } from "./auth";

export async function searchQuery(username) {
	if (!username || username == "") return undefined;
	const tokens = await retrieveTokens();

	const response = await fetch(`https://api.intra.42.fr/v2/users?filter[login]=${username.toLowerCase()}`, {
		headers: { Authorization: `Bearer ${tokens.token}` }
	});
	const data = await response.json();

    
    console.log(data);
	if (data.length == 0) return null;
    
    
    const responseIdRequest = await fetch(`https://api.intra.42.fr/v2/users/${data[0].id}`, {
        headers: { Authorization: `Bearer ${tokens.token}` }
    });

    // console.log(res.cursus_users[1].skills);
    try {
        const res = await responseIdRequest.json();
        return res;
    }
    catch (error) {
        let done = false;
        while (!done) {
            try {
                const req = await fetch(`https://api.intra.42.fr/v2/users/${data[0].id}`, {
                    headers: { Authorization: `Bearer ${tokens.token}` }
                });
                const res = await req.json();
                done = true;
                return res;
            } catch (error) {
                console.log("Error: ", error);
            }
        }
    }



	return res;
}