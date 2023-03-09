import { LANGUAGES, PAGES } from '@constants/constants';
import { getArticlesListQueryStr } from '@lib/query/getArticlesListQueryStr';
import { getBannerOptionsQueryStr } from '@lib/query/getBannerOptionsQueryStr';
import { getHomePageOptionsQueryStr } from '@lib/query/getHomePageOptionsQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import {fetchAPI} from '../api';
export async function getIntroPageData(locale = LANGUAGES.vi) {
    const lang = locale.toUpperCase();
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const pageInfoParams = {...defaultParams, post_type : process.env.PAGES_POST_TYPE, slug: PAGES.ABOUT_US[locale], prefix: 'pageInfo'};    
    return await fetchAPI(
      `query introPageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getArticlesListQueryStr(pageInfoParams)}
        ${getHomePageOptionsQueryStr(locale, 'introPageOptions')}
        ${getBannerOptionsQueryStr(locale)}
        introTCTamNhinOptions: getGioiThieuPageOptions(lang: ${lang}) {
          tam_nhin {
            icon
            heading
            content
          }
          tieu_chi {
            background
            content
          }
        }
      }`
    );
  }