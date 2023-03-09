import AboutPage from "@components/about";
import { toRankMathJson } from "@js_dir/utils/rankmaths";
import { getFullPageUrlRankMathByLocale } from "@js_dir/utils/urlUtils";
import { getHeadSchemaPage } from "@lib/getHeadSchemaPageApi";
import { getIntroPageData } from "@lib/intro/getIntroPageData";
export default function Home({ pageContext }) { 
    return (
        <AboutPage pageContext = {pageContext} />
    )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getFullPageUrlRankMathByLocale('about_us', locale));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageInfo, introPageOptions, bannerOptions, introTCTamNhinOptions} = await getIntroPageData(locale);
    return {
      props: {        
        pageContext : {
          siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
          introPageOptions: {...introPageOptions, ...introTCTamNhinOptions},
          bannerOptions: {...bannerOptions},
          pageInfo: {...pageInfo[0]},
          seo : [...rankmathData]
        }
      },
      revalidate: 60
    }
}
