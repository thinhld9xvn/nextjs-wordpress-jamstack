import {fetchAPI} from '../api';
export async function RegisterUser(props) {
    const {username, email, userFbInfo,
            fullname, phone, address, password} = props;
    const userFbInfoStr = `""${JSON.stringify(userFbInfo)}""`;
    return await fetchAPI(
        `mutation registerUserMutation {
            registerUser(
              input: {username: "${username}", 
                        facebook: "${userFbInfoStr}", 
                        fullName: "${fullname}", 
                        phone: "${phone}", 
                        address: "${address}", 
                        password: "${password}", 
                        email: "${email}"}
            ) {
              user {
                id
              }
            }
          }`
    );
}