import {fetchAPI} from '../api';
export async function SendResetPassword(username) {
    return await fetchAPI(
        `mutation sendPasswordEmailMutation {
            sendPasswordResetEmail(input: {username: "${username}"}) {
              user {
                id
              }
            }
        }`
    );
}