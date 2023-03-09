import { LANGUAGES } from '@constants/constants';
export function getPostsSidebarQueryStr(params) {
  const {post_type = process.env.NEWS_POST_TYPE, tax = process.env.NEWS_TAX, locale = LANGUAGES.vi} = params;
    const lang = locale.toUpperCase();
    return(
      `postsSidebarList: getPostsSidebarOptions(post_type: "${post_type}", tax: "${tax}", lang: ${lang}) {
          id
          title
          url
          data {
            id
            title
            url
          }
      }`
    );
  }