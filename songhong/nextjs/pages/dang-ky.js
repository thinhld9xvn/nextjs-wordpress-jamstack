import { toRankMathJson } from "@js_dir/utils/rankmaths";
import { getFullPageUrlRankMathByLocale } from "@js_dir/utils/urlUtils";
import { getHeadSchemaPage } from "@lib/getHeadSchemaPageApi";
import RegisterPg from "@components/register";
import { getPageRegisterDataApi } from "@lib/account/getPageRegisterDataApi";
export default function LoginPage({ pageContext }) {
  return (
    <RegisterPg pageContext = {pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getFullPageUrlRankMathByLocale('dang_ky', locale));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageInfo, accountOptions} = await getPageRegisterDataApi(locale);
    const page = pageInfo[0];
    const breadcrumbs = {
      id : 'page_register',
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
