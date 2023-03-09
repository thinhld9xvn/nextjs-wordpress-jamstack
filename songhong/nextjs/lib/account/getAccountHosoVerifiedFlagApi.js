import {fetchAPI} from '../api';
export async function getAccountHosoVerifiedFlag(userId) { 
    return await fetchAPI(
      `query getAccountHosoVerified {
        hosoVerifiedFlag: getAccountHosoVerifiedOptions(userId: ${userId}) {
          hoso_verified_flag
        }
      }`
    );
  }