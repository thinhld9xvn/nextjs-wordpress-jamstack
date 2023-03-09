import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getBannerOptionsQueryStr } from '@lib/query/getBannerOptionsQueryStr';
import { getFeaturedPostsSidebarStr } from '@lib/query/getFeaturedPostsSidebarStr';
import { getPostsSidebarQueryStr } from '@lib/query/getPostsSidebarQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import { getTaxonomyListQueryStr } from '@lib/query/getTaxonomyListQueryStr';
import {fetchAPI} from '../api';
export async function getNewsPageData(slug = '', locale = LANGUAGES.vi) {
    const limit = 2;
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug: PAGES.NEWS[locale], prefix: 'pageBaseInfo'};    
    const nenkinsTermListParams = {...defaultParams, post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug: PAGES.VHDS[locale], number : 1, prefix : 'termsListNenkin'};
    const termListParams = {...defaultParams, post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug: slug, number : 1, prefix : 'termsList'};
    const articlesListParams = {...termListParams, term_slug: slug, prefix : 'articlesList'};
    const postsSidebarParams = {...defaultParams, post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX};
    return await fetchAPI(
      `query NewsPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getBannerOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getTaxonomyListQueryStr(nenkinsTermListParams)}
        ${getTaxonomyListQueryStr(termListParams)}
        ${getArticlesListQueryStr(articlesListParams)}
        ${getPostsSidebarQueryStr(postsSidebarParams)}
        ${getFeaturedPostsSidebarStr(locale, limit)}
      }`
    );
  }