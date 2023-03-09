import QA from '@components/qa';
import { toRankMathJson } from '@js_dir/utils/rankmaths';
import { getFullPageUrlRankMathByLocale } from '@js_dir/utils/urlUtils';
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import { getQAPageData } from '@lib/qa/getQAPageData';
import React from 'preact/compat'

export default function QAPage({ pageContext }) {
  return (
    <QA pageContext = {pageContext} />
  )
}

export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getFullPageUrlRankMathByLocale('qa', locale));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageInfo, qaListOptions} = await getQAPageData(locale);
    const {qa_lists} = qaListOptions;
    const page = pageInfo[0];
    const breadcrumbs = {
        id : 'page_qa',
        title : page.title,
        url: "#"
    };
    return {
      props: {        
        pageContext : {
          siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
          qa_lists: [...qa_lists],
          pageInfo: {...page},
          seo : [...rankmathData],
          breadcrumbs : {...breadcrumbs}
        }
      },
      revalidate: 60
    }
}
