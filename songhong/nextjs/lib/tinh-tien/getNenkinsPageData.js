import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getNenkinAdvancedCalcQueryStr } from '@lib/query/getNenkinAdvancedCalcQueryStr';
import { getNenkinSimpleCalcQueryStr } from '@lib/query/getNenkinSimpleCalcQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import {fetchAPI} from '../api';
export async function getNenkinsPageData(locale = LANGUAGES.vi) {
    const slug = PAGES.TINH_TIEN_NENKINS[locale];
    const slugBase = PAGES.TINH_TIEN[locale];
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageBaseInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug : slugBase, prefix: 'pageBaseInfo'};   
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug, prefix: 'pageInfo'};   
    return await fetchAPI(
      `query NewsPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageBaseInfoParams)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getNenkinSimpleCalcQueryStr(locale)}
        ${getNenkinAdvancedCalcQueryStr(locale)}
      }`
    );
  }