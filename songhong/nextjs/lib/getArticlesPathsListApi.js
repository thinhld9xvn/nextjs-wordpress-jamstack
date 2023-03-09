import { LANGUAGES } from '@constants/constants';
import {fetchAPI} from './api';
export async function getArticlesPathsList(post_type = 'post', locale = LANGUAGES.vi) {
  const lang = locale.toUpperCase();
    return await fetchAPI(
      `query getArticlesPathsList {
        articlesPathList: getArticlesList(post_type: "${post_type}", lang: ${lang}) {
          slug
        }
      }`
    );
  }