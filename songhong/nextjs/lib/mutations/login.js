import {fetchAPI} from '../api';
export async function Login(username, password) {
    return await fetchAPI(
        `mutation loginMutation {
            login(input: {password: "${password}", username: "${username}"}) {
                authToken
                refreshToken
                user {
                    id
                }                
            }
        }`
    );
}