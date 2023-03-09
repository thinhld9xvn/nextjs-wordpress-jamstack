import ServicesTax from '@components/services-tax';
import { LANGUAGES } from '@constants/constants';
import { toRankMathJson } from '@js_dir/utils/rankmaths';
import {  getPageUrlByRankMathSlug } from '@js_dir/utils/urlUtils';
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import React from 'preact/compat'
import { getTaxPathsList } from '@lib/getTaxPathsListApi';
import { getServicesCategoryData } from '@lib/services/getServicesCategoryData';
export default function ServicesTaxPage({ pageContext }) {
  return (
    <ServicesTax pageContext={pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {params} = context;
    const {slug} = params;
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getPageUrlByRankMathSlug(slug, process.env.SERVICES_TAX_REWRITE));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, bannerOptions, pageBaseInfo,
            termsListNenkin, termsList, articlesList, postsSidebarList} = await getServicesCategoryData(slug, locale);
    const term = termsList[0];
    const termbase = termsListNenkin[0];
    const pagebase = pageBaseInfo[0];
    const breadcrumbs = {
        id : 'page_services',
        base : 'pages-tree',
        data : [
          {
            id : 'services_base',
            name : pagebase.title,
            url : termbase.url
          },
          {
            id : 'page_' + term.id,
            name : term.title
          }
        ]
    };
    return {
      props: {        
        pageContext : {
          siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
          pageInfo: {...term, page_title: pagebase.title},
          seo : [...rankmathData],
          breadcrumbs : {...breadcrumbs},
          bannerOptions : {...bannerOptions},
          articlesList : [...articlesList],
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
    const {getTaxonomiesList : pagesPathListVi} = await getTaxPathsList(LANGUAGES.vi, process.env.SERVICES_TAX);
    const {getTaxonomiesList : pagesPathListJa} = await getTaxPathsList(LANGUAGES.ja, process.env.SERVICES_TAX);
    const travselListvi = travsel(pagesPathListVi, LANGUAGES.vi);
    const travselListJa = travsel(pagesPathListJa, LANGUAGES.ja);
    const pagesListPaths = travselListvi.concat(travselListJa);
    return {
      paths: [...pagesListPaths],
      fallback: 'blocking',
    }
  }
