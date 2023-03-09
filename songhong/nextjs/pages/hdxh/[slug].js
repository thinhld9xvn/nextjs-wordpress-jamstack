import React from 'preact/compat'
import { LANGUAGES } from '@constants/constants';
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import { getPageUrlByRankMathSlug } from '@js_dir/utils/urlUtils';
import { toRankMathJson } from '@js_dir/utils/rankmaths';
import HdxhSingle from '@components/hdxh-single';
import { getHdxhSingleData } from '@lib/hdxh/getHdxhSingleData';
import { getArticlesPathsList } from '@lib/getArticlesPathsListApi';
export default function SingleHDXHPage({ pageContext }) {
  return (
    <HdxhSingle pageContext = {pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {params} = context;
    const {slug} = params;
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getPageUrlByRankMathSlug(slug, process.env.HDXH_POST_TYPE));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, bannerOptions, 
            pageInfo : pageBaseInfo, articleData, featuredPostsSidebarList} = await getHdxhSingleData(slug, locale);
    const article = articleData[0];
    const page = pageBaseInfo[0];
    const breadcrumbs = {
      id : 'single_hdxh',
      base : 'pages-tree',
      data : [
        {
          id : 'single_base',
          name : page.title,
          url : page.url
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
          featuredPostsSidebarList : [...featuredPostsSidebarList]
        }
      },
      revalidate: 60
    }
}
export async function getStaticPaths() {
  const travsel = (paths, locale) => {
    return paths.map(e => {
      return {
        params: {
          slug: e.slug
        },
        locale
      }
    })
  }
    const {articlesPathList : articlesListVi} = await getArticlesPathsList(process.env.HDXH_POST_TYPE, LANGUAGES.vi);
    const {articlesPathList : articlesListJa} = await getArticlesPathsList(process.env.HDXH_POST_TYPE, LANGUAGES.ja);
    const travselListvi = travsel(articlesListVi, LANGUAGES.vi);
    const travselListJa = travsel(articlesListJa, LANGUAGES.ja);
    const articlesListPaths = travselListvi.concat(travselListJa);
    return {
      paths: [...articlesListPaths],
      fallback: 'blocking',
    }
  }
