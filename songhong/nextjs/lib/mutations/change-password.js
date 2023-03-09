import {fetchAPI} from '../api';
export async function ChangeUserPassword({userId, password}) {
    return await fetchAPI(
        `mutation changePasswordMutation {
            updateUser(input: {password: "${password}", id: "${userId}"}) {
              user {
                id
              }
            }
        }`
    );
}