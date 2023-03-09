import React from 'preact/compat'
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import {  getPageUrlByRankMathSlug, getPageUrlBySlug } from '@js_dir/utils/urlUtils';
import { toRankMathJson } from '@js_dir/utils/rankmaths';
import { PAGES } from '@constants/constants';
import { getNenkinsPageData } from '@lib/tinh-tien/getNenkinsPageData';
import TinhTienNenkinsPg from '@components/tinh-tien-nenkins'
export default function TinhTienNenkins({ pageContext }) {
  return (
    <TinhTienNenkinsPg pageContext = {pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getPageUrlByRankMathSlug(PAGES.TINH_TIEN_NENKINS[locale], PAGES.TINH_TIEN[locale]));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageBaseInfo, pageInfo, nenkinSimpleCalcOptions, nenkinAdvancedCalcOptions} = await getNenkinsPageData(locale);
    const pageBase = pageBaseInfo[0];
    const page = pageInfo[0];
    const breadcrumbs = {
      id : 'page_nenkins',
      base : 'pages-tree',
      data : [
        {
          id : 'nenkins_base',
          name : pageBase.title,
          url : getPageUrlBySlug(PAGES.TINH_TIEN_NENKINS[locale], PAGES.TINH_TIEN[locale])
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
            seo : [...rankmathData],
            breadcrumbs : {...breadcrumbs},
            nenkinSimpleCalcOptions : {...nenkinSimpleCalcOptions},
            nenkinAdvancedCalcOptions : {...nenkinAdvancedCalcOptions}
        }
      },
      revalidate: 60
    }
}
