import BangGiaDetailsPage from '@components/bang-gia';
import { LANGUAGES, PAGES } from '@constants/constants';
import { toRankMathJson } from '@js_dir/utils/rankmaths';
import { getPageUrlByRankMathSlug, getPageUrlBySlug } from '@js_dir/utils/urlUtils';
import { getBangGiaSlugPageData } from '@lib/bang-gia/getBangGiaSlugPageData';
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import { getPagesPathsList } from '@lib/getPagesPathsListApi';
import React from 'preact/compat'
export default function BangGiaPage({ pageContext }) {
    return (
        <BangGiaDetailsPage pageContext={pageContext} />
    )
}
export async function getStaticProps(context) {
    const {params} = context;
    const {slug} = params;
    const {locale} = context;  
    const BANG_GIA_BASE = locale === LANGUAGES.vi ? process.env.BANG_GIA_VI : process.env.BANG_GIA_JA;
    const NENKINS_BASE = locale === LANGUAGES.vi ? process.env.NENKINS_VI : process.env.NENKINS_JA;
    const seo = await getHeadSchemaPage(getPageUrlByRankMathSlug(slug, BANG_GIA_BASE));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageBaseInfo, pageInfo, servicesTaxList} = await getBangGiaSlugPageData(slug, locale);
    const {title : pageBaseTitle} = pageBaseInfo[0];
    const page = pageInfo[0];
    const breadcrumbs = {
        id : 'page_banggia',
        base : 'pages-tree',
        data : [
          {
            id : 'banggia_base',
            name : pageBaseTitle,
            url : getPageUrlBySlug(NENKINS_BASE, BANG_GIA_BASE)     
          },
          {
            id : 'page_' + page.id,
            name : page.title
          }
        ]
    };
    return {
        props: {
            pageContext : {
                siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
                pageInfo: {...page},
                servicesTaxList: [...servicesTaxList],
                seo : [...rankmathData],
                breadcrumbs : {...breadcrumbs}
            }
        },
        revalidate: 60
    }
}
export async function getStaticPaths() {
  const travsel = (objects, locale = LANGUAGES.vi) => {
    return objects.map(e => {   
      return {
        params: {
          slug: e[locale]
        },
        locale
      }
    })
  }
  const pagesObjectList = [
    {
      vi : process.env.NENKINS_VI,
      ja : process.env.NENKINS_JA,
    },
    {
      vi : process.env.HOANTHUE_VI,
      ja : process.env.HOANTHUE_JA,
    },
    {
      vi : process.env.BIENPHIENDICH_VI,
      ja : process.env.BIENPHIENDICH_JA,
    },
    {
      vi : process.env.VISATUCACHLUUTRU_VI,
      ja : process.env.VISATUCACHLUUTRU_JA,
    },
  ];
  const pagesList = [].concat(travsel(pagesObjectList, LANGUAGES.vi),
                              travsel(pagesObjectList, LANGUAGES.ja));
  return {
    paths: [...pagesList],
    fallback: 'blocking',
  }
}
