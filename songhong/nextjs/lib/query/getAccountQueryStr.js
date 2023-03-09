import { LANGUAGES } from '@constants/constants';
export function getAccountQueryStr(locale = LANGUAGES.vi) {
    return(
      `accountOptions: getAccountOptions(lang: ${locale.toUpperCase()}) {
        note_register_html
        slider_account {
          heading
          content
          button_text
          button_url
        }
      }`
    );
  }