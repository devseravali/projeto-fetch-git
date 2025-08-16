import { baseUrl } from '../variables.js'
import { githubToken } from '../variables.js';

async function getUser(userName){
    const response = await fetch(`${baseUrl}/${userName}`, {
        headers: {
            Authorization: `token ${githubToken}`
        }
    });
    return await response.json();
}

export { getUser }