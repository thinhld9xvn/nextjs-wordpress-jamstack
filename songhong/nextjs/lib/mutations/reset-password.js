import {fetchAPI} from '../api';
export async function resetUserPassword(props) {
  const {key, username, newpassword} = props;
    return await fetchAPI(
        `mutation resetUserPasswordMutation {
          resetUserPassword(input: {key: "${key}", login: "${username}", password: "${newpassword}"}) {
            user {
              id
            }
          }
        }`
    );
}