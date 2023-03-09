import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { getArticleDateCreated } from '@js_dir/utils/dateUtils';
import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {useEffect, useState, useCallback} from 'preact/compat'
import { connect } from 'react-redux';
import BreadcrumbsTemplate from './templates/breadcrumbs-template';
import CategorySidebarTemplate from './templates/category-sidebar-template';
import HotlineSidebar from './templates/hotline-sidebar';
import RankMath from './templates/rankmath';
import SectionBanner from './templates/section-banner';
function ServicesSingle({ pageContext, siteOptions, activePolyLangUrl, updateActivePolyLangUrl, UpdateSiteOptions, translationStrings }) {
  const router = useRouter();
  const [sizes, setSizes] = useState(null);
  const {siteOptions : mySiteOptions, seo, breadcrumbs, pageInfo, bannerOptions, postsSidebarList} = pageContext;
  useEffect(() => {
    if ( isDiff(mySiteOptions, siteOptions) ) {            
        UpdateSiteOptions({...mySiteOptions});
    }
    if ( pageInfo.polylang_post && 
      isDiff(pageInfo.polylang_post, pageInfo.url) && 
          isDiff(pageInfo.polylang_post, activePolyLangUrl) ) {
      updateActivePolyLangUrl(pageInfo.polylang_post);
  }
  }, [,router.locale]);
  useEffect(() => {
      const myImage = document.createElement('img');
      myImage.src = background;
      myImage.onload = function() {
          setSizes({width: this.width, height: this.height});
      }
      myImage.onerror = function() {
      }
  }, [pageContext]);
  const breadcrumbsData = addBreadcrumbsContext(breadcrumbs, router.locale, translationStrings);
  const {title, background, date_created, view_count, contents} = pageInfo;
  const {day, month, year} = getArticleDateCreated(date_created);
  const {phone} = mySiteOptions;
  return (
    <>
      <RankMath data = {seo} />
      <main>
          <SectionBanner title={pageInfo.title} image={bannerOptions.banner_background} />
          <section className="container mb-50s">
              <BreadcrumbsTemplate data={breadcrumbsData} />
          </section>
          <section className="news-pages mb-150s">
              <div className="container">
                  <div className="row gutter-50">
                      <div className="col-lg-8">
                          <div className="tops-details__news mb-30s">
                              {sizes ? (
                                <div className="img-details__news mb-30s">
                                    <Image src={background} width={sizes.width} height={sizes.height} />
                                </div>
                              ) : null}
                              <h2 className="titles-bold__alls titles-transform__alls color-blues fs-32s mb-15s">{title}</h2>
                              <ul className="times-views__mains mb-15s">
                                  <li>
                                    <Image src="/static/images/times-views-main-1.svg" width={20} height={20} layout="fixed" />
                                      <p>{day} {getTranslation(translationStrings, "month_label")}{month}, {year}</p>
                                  </li>
                                  <li>
                                    <Image src="/static/images/times-views-main-2.svg" width={20} height={20} layout="fixed" />
                                      <p>{view_count + 1} {getTranslation(translationStrings, "viewcount_label")}</p>
                                  </li>
                              </ul>
                          </div>
                          <div className="news-text__details"
                                 dangerouslySetInnerHTML={{
                                  __html: contents
                                 }}>
                          </div>
                      </div>
                      <div className="col-lg-4">
                          <CategorySidebarTemplate title={pageInfo.page_title} data = {postsSidebarList} />
                          <HotlineSidebar phone={phone} />
                      </div>
                  </div>
              </div>
          </section>
  
      </main>
    </>
  )
}
function mapStateToProps(state) {   
  return { 
      siteOptions : state.globalReducer.siteOptions,
      activePolyLangUrl : state.globalReducer.activePolyLangUrl,
      translationStrings : state.globalReducer.translationStrings
  }
}
function mapDispatchToProps(dispatch) {
  return {
      UpdateSiteOptions : async (v) => await dispatch({
          type : "UPDATE_SITE_OPTIONS",
          payload : v
      }),
      updateActivePolyLangUrl : async (v) => await dispatch({
          type : "UPDATE_ACTIVE_POLYLANG_URL",
          payload : v
      }),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ServicesSingle);
