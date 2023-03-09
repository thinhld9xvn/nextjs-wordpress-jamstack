import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getBannerOptionsQueryStr } from '@lib/query/getBannerOptionsQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import { getTaxonomyListQueryStr } from '@lib/query/getTaxonomyListQueryStr';
import {fetchAPI} from '../api';
export async function getPageSearchDataApi(locale = LANGUAGES.vi) {
  const slug = PAGES.SEARCH[locale];
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug, prefix: 'pageInfo'};    
    const taxServicesParams = {...defaultParams, tax : process.env.SERVICES_TAX, prefix: 'servicesTaxList'};  
    const taxNewsParams = {...defaultParams, tax : process.env.NEWS_TAX, prefix: 'newsTaxList'}; 
    const articlesInfoParams = {...defaultParams, post_type : 'any', tax : '', searchable : true, prefix: 'articlesList'}; 
    return await fetchAPI(
      `query contactPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getBannerOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getTaxonomyListQueryStr(taxServicesParams)}
        ${getTaxonomyListQueryStr(taxNewsParams)}
        ${getArticlesListQueryStr(articlesInfoParams)}
      }`
    );
  }