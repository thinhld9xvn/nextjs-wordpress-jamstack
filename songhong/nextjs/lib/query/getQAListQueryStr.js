import { LANGUAGES } from '@constants/constants';
export function getQAListQueryStr(locale = LANGUAGES.vi) {
    const lang = locale.toUpperCase();
    return(
      `qaListOptions: getQAListOptions(lang: ${lang}) {
          qa_lists {
            name
            content
          }
        }`
    );
  }