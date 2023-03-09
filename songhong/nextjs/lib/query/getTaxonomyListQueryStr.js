import { LANGUAGES } from '@constants/constants';
export function getTaxonomyListQueryStr(params) {
  const {tax = process.env.NEWS_TAX, term_slug = '', locale = LANGUAGES.vi, number = -1, prefix = 'taxonomiesList'} = params;
    const lang = locale.toUpperCase();
    return(
      `${prefix}: getTaxonomiesList(lang: ${lang}, tax: "${tax}", term_slug: "${term_slug}", number: ${number}) {
        id
        title
        slug
        url
        color
        background_color
        thumbnail
        polylang_term
      }`
    );
  }