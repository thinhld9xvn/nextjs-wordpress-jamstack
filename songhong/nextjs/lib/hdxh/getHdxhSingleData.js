import { LANGUAGES, NAVMENUS } from '@constants/constants';
import { fetchAPI } from '@lib/api';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getBannerOptionsQueryStr } from '@lib/query/getBannerOptionsQueryStr';
import { getFeaturedPostsSidebarStr } from '@lib/query/getFeaturedPostsSidebarStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
export async function getHdxhSingleData(slug = '', locale = LANGUAGES.vi) {
  const hdxhSlug = locale === LANGUAGES.vi ? process.env.HDXH_VI : process.env.HDXH_JA;
  const post_type = process.env.HDXH_POST_TYPE;
  const limit = 6;
  const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
  const pageInfoParams = {...defaultParams, post_type : 'page', tax : '', term_slug : '', slug : hdxhSlug, prefix : 'pageInfo'};
  const articleDataParams = {...defaultParams, post_type : post_type, tax : '', term_slug : '', slug : slug, prefix : 'articleData'};
    return await fetchAPI(
      `query hdxhPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getBannerOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getArticlesListQueryStr(articleDataParams)}
        ${getFeaturedPostsSidebarStr(locale, limit)}
      }`
    );
  }