import { LANGUAGES } from '@constants/constants';
export function getNenkinAdvancedCalcQueryStr(locale = LANGUAGES.vi) {
    return(
      `nenkinAdvancedCalcOptions : getNenkinsAdvancedCalcOptions(lang: ${locale.toUpperCase()}) {
        nenkins_advanced_calc {
          cities_living {
            label
            min_sal
          }
          rate_default
          rate_price_default
        }
      }`
    );
  }