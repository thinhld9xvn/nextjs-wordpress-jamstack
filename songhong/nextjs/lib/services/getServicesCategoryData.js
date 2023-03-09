import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getBannerOptionsQueryStr } from '@lib/query/getBannerOptionsQueryStr';
import { getPostsSidebarQueryStr } from '@lib/query/getPostsSidebarQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import { getTaxonomyListQueryStr } from '@lib/query/getTaxonomyListQueryStr';
import {fetchAPI} from '../api';
export async function getServicesCategoryData(slug = '', locale = LANGUAGES.vi) {
    const defaultParams = {post_type : process.env.SERVICES_POST_TYPE, tax : process.env.SERVICES_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug: PAGES.SERVICES[locale], prefix: 'pageBaseInfo'};    
    const nenkinsTermListParams = {...defaultParams, term_slug: PAGES.NENKINS_TERM[locale], number : 1, prefix : 'termsListNenkin'};
    const termListParams = {...defaultParams, term_slug: slug, number : 1, prefix : 'termsList'};
    const articlesListParams = {...termListParams, prefix : 'articlesList'};
    const postsSidebarParams = {...defaultParams, post_type : process.env.SERVICES_POST_TYPE, tax : process.env.SERVICES_TAX};
   return await fetchAPI(
      `query ServicesPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getBannerOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getTaxonomyListQueryStr(nenkinsTermListParams)}
        ${getTaxonomyListQueryStr(termListParams)}
        ${getArticlesListQueryStr(articlesListParams)}
        ${getPostsSidebarQueryStr(postsSidebarParams)}
      }`
    );
  }