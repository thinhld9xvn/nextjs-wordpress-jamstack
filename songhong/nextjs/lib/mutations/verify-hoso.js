import {fetchAPI} from '../api';
export async function VerifyHoso(userId) {
    return await fetchAPI(
        `mutation verifyHosoMutation {
          verifyHoso(
            input: {userId: ${userId}}
          ) {
            success
          }
        }`
    );
}