import { LANGUAGES } from '@constants/constants';
import {fetchAPI} from './api';
export async function getPagesPathsList(lang = LANGUAGES.vi) {
  const langCodeEnum = lang.toUpperCase();
    return await fetchAPI(
      `
      query getPagesPathsList {
        pagesPathList: getArticlesList(post_type: "page", lang: ${langCodeEnum}) {
          slug
        }
      }
      `
    );
  }