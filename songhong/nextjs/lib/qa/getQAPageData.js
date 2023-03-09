import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getQAListQueryStr } from '@lib/query/getQAListQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import {fetchAPI} from '../api';
export async function getQAPageData(locale = LANGUAGES.vi) {
    const lang = locale.toUpperCase();
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug: PAGES.QA[locale], prefix: 'pageInfo'};    
    return await fetchAPI(
      `query QAPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getQAListQueryStr(locale)}
      }`
    );
  }