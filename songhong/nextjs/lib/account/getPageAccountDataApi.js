import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import { getUserInfoQueryStr } from '@lib/query/getUserInfoQueryStr';
import {fetchAPI} from '../api';
export async function getPageAccountData(slug = '', locale = LANGUAGES.vi) {
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug, prefix: 'pageInfo'};    
    return await fetchAPI(
      `query accountPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageInfoParams)}        
      }`
    );
  }