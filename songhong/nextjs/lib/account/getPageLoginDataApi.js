import { LANGUAGES, PAGES } from '@constants/constants';
import { getAccountQueryStr } from '@lib/query/getAccountQueryStr';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import {fetchAPI} from '../api';
export async function getPageLoginData(locale = LANGUAGES.vi) {
  const slug = PAGES.DANG_NHAP[locale];
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug, prefix: 'pageInfo'};    
    return await fetchAPI(
      `query contactPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getAccountQueryStr(locale)}
      }`
    );
  }