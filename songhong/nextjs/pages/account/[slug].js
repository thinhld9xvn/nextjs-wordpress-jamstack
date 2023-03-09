import AccountPg from '@components/account';
import { LANGUAGES, PAGES } from '@constants/constants';
import { toRankMathJson } from '@js_dir/utils/rankmaths';
import { getPageUrlByRankMathSlug } from '@js_dir/utils/urlUtils';
import { getPageAccountData } from '@lib/account/getPageAccountDataApi';
import { getHeadSchemaPage } from '@lib/getHeadSchemaPageApi';
import React from 'preact/compat'
export default function AccountPage({ pageContext }) {
    return (
        <AccountPg pageContext={pageContext} />
    )
}
export async function getStaticProps(context) {
    const {params} = context;
    const {slug} = params;
    const {locale} = context;
    const seo = await getHeadSchemaPage(getPageUrlByRankMathSlug(slug, PAGES.ACCOUNT[locale]));
    const rankmathData = toRankMathJson(seo);
    const {menuItemsList, siteOptions, pageInfo} = await getPageAccountData(slug, locale);
    const page = pageInfo[0];
    return {
        props: {
            pageContext : {
              siteOptions: {...siteOptions, menuItemsList: [...menuItemsList]},
              seo : [...rankmathData]
            }
        },
        revalidate: 60
    } 
}
export async function getStaticPaths() {
  const travsel = (objects, locale = LANGUAGES.vi) => {
    return objects.map(e => {        
      return {
        params: {
          slug: e[locale]
        },
        locale
      }
    })
  }
  const pagesObjectList = [
    PAGES.THONG_TIN_TAI_KHOAN,
    PAGES.CAP_NHAT_HS_NENKIN,
    PAGES.CAP_NHAT_HS_HOANTHUE,
    PAGES.KIEM_TRA_TIENDOHS,
    PAGES.DOI_MATKHAU,
    PAGES.XU_LY_HS
  ];
  const pagesList = [].concat(travsel(pagesObjectList, LANGUAGES.vi),
                              travsel(pagesObjectList, LANGUAGES.ja));
    return {
      paths: [...pagesList],
      fallback: 'blocking',
    }
  }
  

  
