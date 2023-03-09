import { LANGUAGES, NAVMENUS } from '@constants/constants';
import { fetchAPI } from '@lib/api';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getTaxonomyListQueryStr } from '@lib/query/getTaxonomyListQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
export async function getBangGiaSlugPageData(slug = '', locale = LANGUAGES.vi) {
  const BANG_GIA_BASE = locale === LANGUAGES.vi ? process.env.BANG_GIA_VI : process.env.BANG_GIA_JA;
  const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
  const pageBaseInfoParams = {...defaultParams, post_type : 'page', tax : '', term_slug : '', slug : BANG_GIA_BASE, prefix : 'pageBaseInfo'};
  const pageInfoParams = {...defaultParams, post_type : 'page', tax : '', term_slug : '', slug, prefix : 'pageInfo'};
  const servicesTaxParams = {...defaultParams, tax : process.env.SERVICES_TAX, prefix : 'servicesTaxList'};
    return await fetchAPI(
      `query bangGiaSlugPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageBaseInfoParams)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getTaxonomyListQueryStr(servicesTaxParams)}
      }`
    );
  }