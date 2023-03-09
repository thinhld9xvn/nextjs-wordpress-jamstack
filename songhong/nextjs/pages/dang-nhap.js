import { LANGUAGES } from "@constants/constants";
import { toRankMathJson } from "@js_dir/utils/rankmaths";
import { getFullPageUrlRankMathByLocale } from "@js_dir/utils/urlUtils";
import { getHeadSchemaPage } from "@lib/getHeadSchemaPageApi";
import LoginPg from "@components/login";
import { getPageLoginData } from "@lib/account/getPageLoginDataApi";
export default function LoginPage({ pageContext }) {
  return (
    <LoginPg pageContext = {pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getFullPageUrlRankMathByLocale('dang_nhap', locale));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageInfo, accountOptions} = await getPageLoginData(locale);
    const page = pageInfo[0];
    const breadcrumbs = {
      id : 'page_login',
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
