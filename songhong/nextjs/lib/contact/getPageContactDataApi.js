import { LANGUAGES } from '@constants/constants';
import { getSiteOptionsQueryStr } from '@lib/query/getSiteOptionsQueryStr';
import {fetchAPI} from '../api';
export async function getPageContactData(slug = '', locale = LANGUAGES.vi) {
    const lang = locale.toUpperCase();
    return await fetchAPI(
      `query contactPageData {
        ${getSiteOptionsQueryStr(locale)}
        pageInfo: getArticlesList(post_type: "page", slug: "${slug}", lang: ${lang}) {
          id
          title
          contents
        }
        contactPageOptions: getContactPageOptions(lang: ${lang}) {
          lh_banner
          lh_form
          lh_gmap
          lh_notices
          lh_thongdiepsticky
          lh_address {
            name
            content
          }
        }
      }`
    );
  }