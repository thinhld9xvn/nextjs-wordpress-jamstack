import { LANGUAGES } from '@constants/constants';
export function getNenkinSimpleCalcQueryStr(locale = LANGUAGES.vi) {
    return(
      `nenkinSimpleCalcOptions: getNenkinsSimpleCalcOptions(lang: ${locale.toUpperCase()}) {
        nenkin_luuy_html
        rate_yen_to_vnd
        currency_active
        nenkin_simple_calc {
          rate_default
          rate_percentage_nenkin_L1
          rate_price_default_1
          rate_price_default_2
          rate_price_default_3
          price_compare_default
          rate_percentage_default
          price_tt_default          
          months_working {
            label
            content
            rate_payment
            start_value
            end_value
            price
            price_extends {
              start_value
              end_value
              price
            }
          }
          salary_per_month {
            id
            label
          }
        }        
      }`
    );
  }