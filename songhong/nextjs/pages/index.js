import HomePage from "@components/home";
import { toRankMathJson } from "@js_dir/utils/rankmaths";
import { getHomePageUrlByLocale } from "@js_dir/utils/urlUtils";
import { getHeadSchemaPage } from "@lib/getHeadSchemaPageApi";
import { getHomePageData } from '@lib/home/getHomePageDataApi';
export default function Home({ pageContext }) { 
    return (
        <HomePage pageContext = {pageContext} />
    )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getHomePageUrlByLocale(locale));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, SliderItemsList, servicesBrandingList, homePageOptions, servicesNenkinsList, recommendPageList} = await getHomePageData(locale);
    return {
      props: {        
        pageContext : {
          siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
          SliderItemsList: [...SliderItemsList],
          servicesBrandingList : [...servicesBrandingList],
          homePageOptions : {...homePageOptions},
          servicesNenkinsList: [...servicesNenkinsList],
          recommendPageList: [...recommendPageList],
          seo : [...rankmathData]
        }
      },
      revalidate: 60
    }
}
