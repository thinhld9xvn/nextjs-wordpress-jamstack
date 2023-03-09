import { toRankMathJson } from "@js_dir/utils/rankmaths";
import { getFullPageUrlRankMathByLocale } from "@js_dir/utils/urlUtils";
import { getHeadSchemaPage } from "@lib/getHeadSchemaPageApi";
import { getPageSearchDataApi } from "@lib/search/getPageSearchDataApi";
import SearchPg from "@components/search";
export default function SearchPage({ pageContext }) {
  return (
    <SearchPg pageContext={pageContext} />
  )
}
export async function getStaticProps(context) { 
    const {locale} = context;  
    const seo = await getHeadSchemaPage(getFullPageUrlRankMathByLocale('search', locale));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageInfo, bannerOptions, servicesTaxList, newsTaxList, articlesList} = await getPageSearchDataApi(locale);
    const page = pageInfo[0];
    const breadcrumbs = {
      id : 'page_search',
      title : `%s : "%keyword"`,
      url: "#"
  };
    return {
      props: {        
        pageContext : {
          siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
          pageInfo: {...page},
          seo : [...rankmathData],
          bannerOptions : {...bannerOptions},
          breadcrumbs : {...breadcrumbs},
          servicesTaxList : [...servicesTaxList],
          newsTaxList : [...newsTaxList],
          articlesList : [...articlesList]
        }
      },
      revalidate: 60
    }
}
