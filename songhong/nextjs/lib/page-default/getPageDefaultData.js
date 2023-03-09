import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getBannerOptionsQueryStr } from '@lib/query/getBannerOptionsQueryStr';
import { getFeaturedPostsSidebarStr } from '@lib/query/getFeaturedPostsSidebarStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import {fetchAPI} from '../api';
export async function getPageDefaultData(slug = '', locale = LANGUAGES.vi) {
    const limit = 6;
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const articleDataParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, tax : '', term_slug : '', slug, prefix : 'articleData'};
        return await fetchAPI(
            `query PageDefaultData {
                ${getSiteOptionsQueryStr(locale)}
                ${getBannerOptionsQueryStr(locale)}
                ${getArticlesListQueryStr(articleDataParams)}
                ${getFeaturedPostsSidebarStr(locale, limit)}
            }`
        );
  }