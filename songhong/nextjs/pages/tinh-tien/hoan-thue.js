import React from 'preact/compat'
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import {  getPageUrlByRankMathSlug, getPageUrlBySlug } from '@js_dir/utils/urlUtils';
import { toRankMathJson } from '@js_dir/utils/rankmaths';
import { PAGES } from '@constants/constants';
import TinhTienHoanThuePg from '@components/tinh-tien-hoanthue';
import { getHoanThuePageData } from '@lib/tinh-tien/getHoanThuePageData';
export default function TinhTienNenkins({ pageContext }) {
  return (
    <TinhTienHoanThuePg pageContext = {pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getPageUrlByRankMathSlug(PAGES.TINH_TIEN_HOANTHUE[locale], PAGES.TINH_TIEN[locale]));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageBaseInfo, pageInfo, nenkinSimpleCalcOptions, hoanThueCalcOptions} = await getHoanThuePageData(locale);
    const pageBase = pageBaseInfo[0];
    const page = pageInfo[0];
    const breadcrumbs = {
      id : 'page_hoanthue',
      base : 'pages-tree',
      data : [
        {
          id : 'hoanthue_base',
          name : pageBase.title,
          url : getPageUrlBySlug(PAGES.TINH_TIEN_HOANTHUE[locale], PAGES.TINH_TIEN[locale])
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
            hoanThueCalcOptions : {...hoanThueCalcOptions}
        }
      },
      revalidate: 60
    }
}
