import {fetchAPI} from '../api';
export async function ConfirmNenkinHoso(key, token) {
  return await fetchAPI(
      `mutation confirmNenkinMutation {
        confirmNenkinMoney(input: {key: "${key}", token: "${token}"}) {
          success
          msg
        }
      }`
  );
}