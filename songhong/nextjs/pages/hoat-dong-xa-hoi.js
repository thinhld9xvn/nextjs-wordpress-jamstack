import React from 'preact/compat'
import { toRankMathJson } from '@js_dir/utils/rankmaths';
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import HoatDongXaHoiPg from '@components/hoat-dong-xa-hoi';
import { getFullPageUrlRankMathByLocale } from '@js_dir/utils/urlUtils';
import { getHdxhPageData } from '@lib/hdxh/getHdxhPageData';
export default function HoatDongXaHoiPage({ pageContext }) {
  return (
    <HoatDongXaHoiPg pageContext={pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getFullPageUrlRankMathByLocale('hdxh', locale));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageInfo, bannerOptions, articlesList, featuredPostsSidebarList} = await getHdxhPageData(locale);
    const page = pageInfo[0];
    const breadcrumbs = {
      id : 'page_hdxh',
      title : page.title,
      url: "#"
    };
    return {
      props: {        
        pageContext : {
          siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
          seo : [...rankmathData],
          breadcrumbs : {...breadcrumbs},
          pageInfo: {...page},
          bannerOptions: {...bannerOptions},
          articlesList: [...articlesList],
          featuredPostsSidebarList: [...featuredPostsSidebarList]
        }
      },
      revalidate: 60
    }
}
