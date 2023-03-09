import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { getArticleDateCreated } from '@js_dir/utils/dateUtils';
import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'preact/compat'
import { connect } from 'react-redux';
import BreadcrumbsTemplate from './templates/breadcrumbs-template';
import HotNewsSidebarTemplate from './templates/hot-news-sidebar-template';
import RankMath from './templates/rankmath';
import SectionBanner from './templates/section-banner';

function PageDefaultPg({ pageContext, siteOptions, activePolyLangUrl, updateActivePolyLangUrl, UpdateSiteOptions, translationStrings }) {
    const router = useRouter();
    const [sizes, setSizes] = useState(null);
  const {siteOptions : mySiteOptions, seo, breadcrumbs, pageInfo, bannerOptions, featuredPostsSidebarList} = pageContext;
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
                            <div className="news-text__details mb-30s"
                                 dangerouslySetInnerHTML={{
                                  __html: contents
                                 }}>
                            </div>
                            <div className="share-news__bottoms">
                                <h3 className="titles-news__bottom titles-bold__alls fs-16s mb-20s">Chia sẻ</h3>
                                <ul className="bottoms-app__news">
                                    <li>
                                        <a href="#" title="">
                                            <img src="/static/images/img-share-bottom-1.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="">
                                            <img src="/static/images/img-share-bottom-2.png" alt="" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" title="">
                                            <img src="/static/images/img-share-bottom-3.png" alt="" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                      </div>
                      <div className="col-lg-4">
                            <HotNewsSidebarTemplate data = {featuredPostsSidebarList} />
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
  export default connect(mapStateToProps, mapDispatchToProps)(PageDefaultPg);
  
