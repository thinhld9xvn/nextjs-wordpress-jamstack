import { LANGUAGES } from '@constants/constants';
export function getHoanThueCalcQueryStr(locale = LANGUAGES.vi) {
    return(
      `nenkinSimpleCalcOptions: getNenkinsSimpleCalcOptions(lang: ${locale.toUpperCase()}) {
        nenkin_luuy_html
      }
      hoanThueCalcOptions: getHoanThueCalcOptions(lang: ${locale.toUpperCase()}) {
        hoanthue_luuy_html
        hoanthue_calc {
          rate_price_default_1
          rate_price_default_2
          rate_price_default_3
          rate_price_default_4
          rate_price_default_5
          rate_price_default_6
          rate_price_default_7
          rate_price_default_8
        }
      }`
    );
  }