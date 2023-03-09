import { LANGUAGES } from '@constants/constants';
import { fetchAPI } from '@lib/api';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getBannerOptionsQueryStr } from '@lib/query/getBannerOptionsQueryStr';
import { getFeaturedPostsSidebarStr } from '@lib/query/getFeaturedPostsSidebarStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
export async function getHdxhPageData(locale = LANGUAGES.vi) {
  const hdxhSlug = locale === LANGUAGES.vi ? process.env.HDXH_VI : process.env.HDXH_JA;
  const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
  const pageInfoParams = {...defaultParams, post_type : 'page', tax : '', term_slug : '', slug : hdxhSlug, prefix : 'pageInfo'};
  const articlesListParams = {...defaultParams, post_type : process.env.HDXH_POST_TYPE, tax : '', term_slug : '', slug : '', prefix : 'articlesList'};
  const limit = 6;
  return await fetchAPI(
    `query hdxhPageData {
      ${getSiteOptionsQueryStr(locale)}
      ${getArticlesListQueryStr(pageInfoParams)}
      ${getArticlesListQueryStr(articlesListParams)}
      ${getBannerOptionsQueryStr(locale)}
      ${getFeaturedPostsSidebarStr(locale, limit)}
    }`
  );
}