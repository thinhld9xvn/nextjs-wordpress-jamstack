import { LANGUAGES } from '@constants/constants';
import { getHomePageOptionsQueryStr } from '@lib/query/getHomePageOptionsQueryStr';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import { getTaxonomyListQueryStr } from '@lib/query/getTaxonomyListQueryStr';
import {fetchAPI} from '../api';
export async function getHomePageData(locale = LANGUAGES.vi) {
    const lang = locale.toUpperCase();
    const defaultParams = {post_type : process.env.NEWS_POST_TYPE, tax : process.env.NEWS_TAX, term_slug : '', slug : '', locale, prefix : 'articlesList'};
    const servicesBrandingsParams = {...defaultParams, tax : process.env.SERVICES_TAX, number : -1, prefix : 'servicesBrandingList'};
    const servicesNenkinsParams = {...defaultParams, tax : process.env.SERVICES_TAX, number : 4, prefix : 'servicesNenkinsList'};
    return await fetchAPI(
      `query homePageData {
        ${getSiteOptionsQueryStr(locale)}
        ${getHomePageOptionsQueryStr(locale)}
        ${getTaxonomyListQueryStr(servicesBrandingsParams)}
        ${getTaxonomyListQueryStr(servicesNenkinsParams)}
        SliderItemsList: getSliderItemsList(lang: ${lang}) {
          id
          title
          thumbnail
        }
        recommendPageList: getRecommendPageOptions(lang: ${lang}) {
          id
          title
          slug
          url
        }      
      }`
    );
  }