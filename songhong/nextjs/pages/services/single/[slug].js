import React from 'preact/compat'
import ServicesSingle from '@components/services-single';
import { LANGUAGES } from '@constants/constants';
import { getArticlesPathsList } from '@lib/getArticlesPathsListApi';
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import { getPageUrlByRankMathSlug } from '@js_dir/utils/urlUtils';
import { toRankMathJson } from '@js_dir/utils/rankmaths';
import { getServicesSingleData } from '@lib/services/getServicesSingleData';
export default function SingleServicePage({ pageContext }) {
  return (
    <ServicesSingle pageContext={pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {params} = context;
    const {slug} = params;
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getPageUrlByRankMathSlug(slug, process.env.SERVICES_POST_TYPE));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, bannerOptions, pageBaseInfo, articleData, postsSidebarList} = await getServicesSingleData(slug, locale);
    const article = articleData[0];
    const pagebase = pageBaseInfo[0];
    const category = article.categories[0];
    const breadcrumbs = {
      id : 'single_services',
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
          pageInfo: {...article, page_title: pagebase.title},
          breadcrumbs : {...breadcrumbs},
          postsSidebarList : [...postsSidebarList]
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
    const {articlesPathList : articlesListVi} = await getArticlesPathsList(process.env.SERVICES_POST_TYPE, LANGUAGES.vi);
    const {articlesPathList : articlesListJa} = await getArticlesPathsList(process.env.SERVICES_POST_TYPE, LANGUAGES.ja);
    const travselListvi = travsel(articlesListVi, LANGUAGES.vi);
    const travselListJa = travsel(articlesListJa, LANGUAGES.ja);
    const articlesListPaths = travselListvi.concat(travselListJa);
    return {
      paths: [...articlesListPaths],
      fallback: 'blocking',
    }
  }
