import { LANGUAGES } from '@constants/constants';
import {fetchAPI} from './api';
export async function getTaxPathsList(lang = LANGUAGES.vi, tax) {
  const langCodeEnum = lang.toUpperCase();
    return await fetchAPI(
      `query getTaxPathsList {
        getTaxonomiesList(lang: ${langCodeEnum}, tax: "${tax}") {
          id          
          slug          
        }
      }
      `
    );
  }