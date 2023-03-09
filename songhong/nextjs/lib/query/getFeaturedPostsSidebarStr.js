import { LANGUAGES } from '@constants/constants';
export function getFeaturedPostsSidebarStr(locale = LANGUAGES.vi, limit = 2) {
    return(
      `featuredPostsSidebarList: getFeaturedPostsSidebarOptions(lang: ${locale.toUpperCase()}, limit: ${limit}) {
        id
        title
        url
        thumbnail
        date_created {
          day
          month
          year
        }
      }`
    );
  }