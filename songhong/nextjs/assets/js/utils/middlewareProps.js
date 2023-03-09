import { LANGUAGES, SLUG_TYPE } from '@constants/constants';
import {fetchAPI} from '@lib/api';
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import { getPageDefaultData } from '@lib/page-default/getPageDefaultData';
import { getNewsSingleData } from '@lib/tin-tuc/getNewsSingleData';
import { toRankMathJson } from './rankmaths';
import { getPageUrlByRankMathSlug } from './urlUtils';
async function isCategory(slug, locale = LANGUAGES.vi) {
  const {taxPath} = await fetchAPI(
    `query getTaxPathsList {
      taxPath : getTaxonomiesList(tax: "${process.env.NEWS_TAX}", term_slug: "${slug}", lang: ${locale.toUpperCase()}) {
        slug
      }
    }`
  );
  return taxPath.length && taxPath[0].slug;
}
async function isPage(slug, locale = LANGUAGES.vi) {
  const {pagePath} = await fetchAPI(
    `query getArticlesPathsList {
      pagePath: getArticlesList(post_type: "${process.env.PAGES_POST_TYPE}", slug: "${slug}", lang: ${locale.toUpperCase()}) {
        slug
      }
    }`
  );
  return pagePath.length;
}
async function isPost(slug, locale = LANGUAGES.vi) {
  const {postPath} = await fetchAPI(
    `query getArticlesPathsList {
      postPath: getArticlesList(post_type: "${process.env.NEWS_POST_TYPE}", slug: "${slug}", lang: ${locale.toUpperCase()}) {
        slug
      }
    }`
  );
  return postPath.length;
}
export async function getTypeSlug(slug, locale = LANGUAGES.vi) {
  if ( await isCategory(slug, locale) ) return SLUG_TYPE.CATEGORY;
  if ( await isPage(slug, locale) ) return SLUG_TYPE.PAGE;
  if ( await isPost(slug, locale) ) return SLUG_TYPE.POST;
  return false;
}
export async function getPostContextProps(slug, locale = LANGUAGES.vi) {
  const seo = await getHeadSchemaPage(getPageUrlByRankMathSlug(slug));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, bannerOptions, articleData, postsSidebarList, featuredPostsSidebarList} = await getNewsSingleData(slug, locale);
    const article = articleData[0];
    const category = article.categories[0];
    const breadcrumbs = {
      id : 'single_tintuc',
      base : 'pages-tree',
      data : [
        {
          id : 'single_base',
          name : category.title,
          url : category.url
        },
        {
          id : 'page_' + article.id,
          name : article.title
        }
      ]
  };
    return {
      props: {        
        pageContext : {
          siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
          bannerOptions : {...bannerOptions},
          seo : [...rankmathData],
          pageInfo: {...article},
          breadcrumbs : {...breadcrumbs},
          postsSidebarList : [...postsSidebarList],
          featuredPostsSidebarList : [...featuredPostsSidebarList],
          type: SLUG_TYPE.POST
        }
      },
      revalidate: 60
    }
}
export async function getPageContextProps(slug, locale = LANGUAGES.vi) {
  const seo = await getHeadSchemaPage(getPageUrlByRankMathSlug(slug));
  const rankmathData = toRankMathJson(seo);
  const {menuItemsList, siteOptions, bannerOptions, articleData, featuredPostsSidebarList} = await getPageDefaultData(slug, locale);
  const article = articleData[0];
  const breadcrumbs = {
    id : 'page_single',
    base : 'pages-tree',
    data : [
      {
        id : 'page_' + article.id,
        name : article.title
      }
    ]
  };
  return {
    props: {        
      pageContext : {
        siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
        bannerOptions : {...bannerOptions},
        seo : [...rankmathData],
        breadcrumbs : {...breadcrumbs},
        pageInfo : {...article},
        featuredPostsSidebarList : [...featuredPostsSidebarList],
        type: SLUG_TYPE.PAGE
      }
    },
    revalidate: 60
  }
}