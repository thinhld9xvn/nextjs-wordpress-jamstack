import { LANGUAGES } from '@constants/constants';
export function getArticlesListQueryStr(params) {
    const {post_type = 'post', tax = '', term_slug = '', slug = '', locale = LANGUAGES.vi, limit = -1, searchable = false, prefix = 'articlesList'} = params;
    const lang = locale.toUpperCase();
    return(
      `${prefix}: getArticlesList(
          lang: ${lang}
          post_type: "${post_type}"
          tax: "${tax}"
          term: "${term_slug}",
          slug: "${slug}",
          limit: ${limit},
          searchable : ${searchable}
        ) {
          id   
          title
          contents
          excerpt
          url          
          thumbnail
          background
          polylang_post
          view_count
          post_type
          date_created {
            day
            month
            year
          }
          categories {
            id
            title
            url
          }
        }`
    );
  }