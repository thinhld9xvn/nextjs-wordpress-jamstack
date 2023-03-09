import { getUserInfoQueryStr } from '@lib/query/getUserInfoQueryStr';
import {fetchAPI} from '../api';
export async function getUserInfoData(username = '') { 
    return await fetchAPI(
      `query userInfoPageData {
        ${getUserInfoQueryStr(username)}
      }`
    );
  }