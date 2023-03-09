import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getBannerOptionsQueryStr } from '@lib/query/getBannerOptionsQueryStr';
import { getPostsSidebarQueryStr } from '@lib/query/getPostsSidebarQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import { getTaxonomyListQueryStr } from '@lib/query/getTaxonomyListQueryStr';
import {fetchAPI} from '../api';
export async function getServicesSingleData(slug = '', locale = LANGUAGES.vi) {
    const defaultParams = {post_type : process.env.SERVICES_POST_TYPE, tax : process.env.SERVICES_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug: PAGES.SERVICES[locale], prefix: 'pageBaseInfo'};    
    const articlesListParams = {...defaultParams, slug, prefix: 'articleData'};    
    const postsSidebarParams = {...defaultParams, post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX};
    return await fetchAPI(
      `query ServicesPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getBannerOptionsQueryStr(locale)}
        ${getTaxonomyListQueryStr(pageInfoParams)}
        ${getArticlesListQueryStr(articlesListParams)}
        ${getPostsSidebarQueryStr(postsSidebarParams)}
      }`
    );
  }