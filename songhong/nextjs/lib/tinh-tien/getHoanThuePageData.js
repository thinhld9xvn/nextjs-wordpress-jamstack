import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getHoanThueCalcQueryStr } from '@lib/query/getHoanThueCalcQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import {fetchAPI} from '../api';
export async function getHoanThuePageData(locale = LANGUAGES.vi) {
    const slug = PAGES.TINH_TIEN_HOANTHUE[locale];
    const slugBase = PAGES.TINH_TIEN[locale];
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageBaseInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug : slugBase, prefix: 'pageBaseInfo'};   
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug, prefix: 'pageInfo'};   
    return await fetchAPI(
      `query NewsPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageBaseInfoParams)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getHoanThueCalcQueryStr(locale)}
      }`
    );
  }