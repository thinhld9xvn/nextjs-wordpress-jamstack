import { LANGUAGES } from '@constants/constants';
export function getBannerOptionsQueryStr(locale = LANGUAGES.vi) {
    const lang = locale.toUpperCase();
    return (
      ` bannerOptions: getBannerOptions(lang: ${lang}) {
          banner_background
        }
      `
    );
  }