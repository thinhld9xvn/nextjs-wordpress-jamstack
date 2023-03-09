import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { getArticles } from '@js_dir/utils/articleUtils';
import { useRouter } from 'next/router';
import React, {useEffect, useState, useCallback} from 'preact/compat'
import { connect } from 'react-redux';
import ArticleRowTemplate from './templates/article-row-template';
import BreadcrumbsTemplate from './templates/breadcrumbs-template';
import HotlineSidebar from './templates/hotline-sidebar';
import RankMath from './templates/rankmath';
import SectionBanner from './templates/section-banner';
import TemplatePaginationBar from './templates/template-pagination-bar';
import { Circles } from 'react-loader-spinner';
import CategorySidebarTemplate from './templates/category-sidebar-template';
import SearchSidebarTemplate from './templates/search-sidebar-template';
import ViewedPostsSidebarTemplate from './templates/viewed-posts-sidebar-template';
import HotNewsSidebarTemplate from './templates/hot-news-sidebar-template';
import { getTranslation } from '@js_dir/utils/translations';
function TinTucCategory({ pageContext, siteOptions, activePolyLangUrl, updateActivePolyLangUrl, UpdateSiteOptions, translationStrings }) {
    const router = useRouter();
    const {siteOptions : mySiteOptions, seo, breadcrumbs, pageInfo, bannerOptions, articlesList, postsSidebarList, featuredPostsSidebarList} = pageContext;
    const [loading, setLoading] = useState(true);
    const [paged, setPaged] = useState(1);
    const [total, setTotal] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [numPerPage, setNumPerPage] = useState(6);
    useEffect(() => {
        router.events.on("routeChangeComplete", function() {
            setPaged(1);
        });
    }, []);
    useEffect(() => {
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
        if ( pageInfo.polylang_term && 
            isDiff(pageInfo.polylang_term, pageInfo.url) && 
                isDiff(pageInfo.polylang_term, activePolyLangUrl) ) {
            updateActivePolyLangUrl(pageInfo.polylang_term);
        }
    }, [,router.locale]);
    const handleFilter = useCallback((page, e) => {
        e && e.preventDefault();  
        setLoading(true);
        setFilteredData(null);
        setTotal(null);
        setTimeout(() => {            
            const elem = document.querySelector('.breadcrumb');
            const t = elem.getClientRects()[0].top;
            const innerHeight = elem.clientHeight;
            window.scroll(0, t + window.scrollY - 2 * innerHeight);
            //
            const arrArticles = getArticles(articlesList, page, numPerPage);
            setFilteredData(arrArticles.map(item => <ArticleRowTemplate key={item} data = {item} />));   
            setTotal(articlesList.length);
            if ( page !== paged ) {
                setPaged(page);
            }
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }, 200);
    }, [,pageContext, paged]);   
    useEffect(() => {
        handleFilter(paged);
    }, [,pageContext,paged]); 
    const breadcrumbsData = addBreadcrumbsContext(breadcrumbs, router.locale, translationStrings);
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
                            <h2 className="titles-bold__alls titles-transform__alls color-blues fs-40s mb-50s markup">{pageInfo.title}</h2>
                            <div className="list-news__pages mb-70s">
                                {!loading ? filteredData : <div className="grid-loading"><Circles color="#3B7CBE" height={80} width={80} /></div>}
                            </div>
                            {!loading ? <TemplatePaginationBar data = {{paged, numPerPage, total, setPaged}}  /> : null}
                        </div>
                        <div className="col-lg-4">
                            <CategorySidebarTemplate title={getTranslation(translationStrings, "news_label")} data = {postsSidebarList} />
                            <HotlineSidebar phone={phone} />
                            <SearchSidebarTemplate />
                            <ViewedPostsSidebarTemplate />
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
export default connect(mapStateToProps, mapDispatchToProps)(TinTucCategory);

