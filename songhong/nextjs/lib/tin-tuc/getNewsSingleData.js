import { LANGUAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getBannerOptionsQueryStr } from '@lib/query/getBannerOptionsQueryStr';
import { getFeaturedPostsSidebarStr } from '@lib/query/getFeaturedPostsSidebarStr';
import { getPostsSidebarQueryStr } from '@lib/query/getPostsSidebarQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import {fetchAPI} from '../api';
export async function getNewsSingleData(slug = '', locale = LANGUAGES.vi) {
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const articleDataParams = {...defaultParams, slug, prefix : 'articleData'};
    const postsSidebarParams = {...defaultParams};
   return await fetchAPI(
      `query NewsSinglePageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getBannerOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(articleDataParams)}
        ${getPostsSidebarQueryStr(postsSidebarParams)}
        ${getFeaturedPostsSidebarStr(locale)}
      }`
    );
  }