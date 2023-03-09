import { getAccountHosoUsersQueryStr } from '@lib/query/getAccountHosoUsersQueryStr';
import {fetchAPI} from '../api';
export async function getAccountHosoUsersData(paged = 1, num_per_page = 16, s = '', metadata = {}) { 
    return await fetchAPI(
      `query accountHosoUsersData {
        ${getAccountHosoUsersQueryStr(paged, num_per_page, s, metadata)}
      }`
    );
  }