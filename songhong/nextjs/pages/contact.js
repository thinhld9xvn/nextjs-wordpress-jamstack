import Contact from "@components/contact";
import { LANGUAGES } from "@constants/constants";
import { toRankMathJson } from "@js_dir/utils/rankmaths";
import { getFullPageUrlRankMathByLocale } from "@js_dir/utils/urlUtils";
import { getHeadSchemaPage } from "@lib/getHeadSchemaPageApi";
import { getPageContactData } from "@lib/contact/getPageContactDataApi";
export default function ContactPage({ pageContext }) {
  return (
    <Contact pageContext = {pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getFullPageUrlRankMathByLocale('contact', locale));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, contactPageOptions, pageInfo} = await getPageContactData(locale === LANGUAGES.vi ? process.env.CONTACT_VI : process.env.CONTACT_JA, locale);
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
          pageInfo: {...page},
          contactPageOptions: {...contactPageOptions},
          seo : [...rankmathData],
          breadcrumbs : {...breadcrumbs}
        }
      },
      revalidate: 60
    }
}
