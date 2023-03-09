import { toRankMathJson } from "@js_dir/utils/rankmaths";
import { getFullPageUrlRankMathByLocale } from "@js_dir/utils/urlUtils";
import { getHeadSchemaPage } from "@lib/getHeadSchemaPageApi";
import { getPageRegisterDataApi } from "@lib/account/getPageRegisterDataApi";
import QuenMatKhauPg from "@components/quen-mat-khau";

export default function QuenMatKhauPage({ pageContext }) {
  return (
    <QuenMatKhauPg pageContext={pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getFullPageUrlRankMathByLocale('quen_mat_khau', locale));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageInfo, accountOptions} = await getPageRegisterDataApi(locale);
    const page = pageInfo[0];
    const breadcrumbs = {
      id : 'page_forgot_password',
      title : page.title,
      url: "#"
  };
    return {
      props: {        
        pageContext : {
          siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
          pageInfo: {...page},
          accountOptions: {...accountOptions},
          seo : [...rankmathData],
          breadcrumbs : {...breadcrumbs}
        }
      },
      revalidate: 60
    }
}
