import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { filterArticlesByCatId, filterArticlesByProps, filterSearchArticles, getArticles, inCategory } from '@js_dir/utils/articleUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { getParamFromURL } from '@js_dir/utils/urlUtils';
import { useRouter } from 'next/router';
import React, {useCallback, useEffect, useState} from 'preact/compat'
import { Circles } from 'react-loader-spinner';
import { connect } from 'react-redux';
import ArticleRowTemplate from './templates/article-row-template';
import BreadcrumbsTemplate from './templates/breadcrumbs-template';
import RankMath from './templates/rankmath';
import SearchFilterByCategory from './templates/search-filter-by-category';
import SearchSidebarTemplate from './templates/search-sidebar-template';
import SectionBanner from './templates/section-banner';
import TemplatePaginationBar from './templates/template-pagination-bar';

function SearchPg({ pageContext, siteOptions, UpdateSiteOptions, translationStrings }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [paged, setPaged] = useState(1);
    const [totals, setTotals] = useState(null);
    const [numPerPage, setNumPerPage] = useState(6);
    const [bread, setBread] = useState(null);
    const [breadList, setBreadList] = useState(null);
    const [filteredList, setFilteredList] = useState(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchResultsByCat, setSearchResultsByCat] = useState([]);
    const [keyword, setKeyWord] = useState('');
    const {siteOptions : mySiteOptions, breadcrumbs, bannerOptions, pageInfo, servicesTaxList, newsTaxList, articlesList, seo} = pageContext;
    useEffect(() => {
        router.events.on("routeChangeComplete", function() {
            setPaged(1);
        });
    }, []);
    useEffect(() => {       
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
    }, [,router.locale]); 
   useEffect(() => {
        if ( pageContext ) {
            const s = getParamFromURL("s");            
            const title = breadcrumbs.title
                                     .replace("%s", getTranslation(translationStrings, "search_label"))
                                     .replace("%keyword", s);
            setKeyWord(s);
            setBread({...breadcrumbs, title});
        }
   }, [,router.locale,router.query.s,pageContext,translationStrings]);
   useEffect(() => {
        if ( bread ) {
            setBreadList(addBreadcrumbsContext(bread, router.locale, translationStrings));
        }
   }, [bread]);
   useEffect(() => {
     if ( searchResults && 
            searchResults.length ) {
        const myResults = [];
        servicesTaxList.forEach(item => {
            const results = filterArticlesByCatId(searchResults, item.id);
            const itemResult = {
                id : item.id,
                type : process.env.SERVICES_POST_TYPE,
                data : []
            };
            if ( results.length ) {
                itemResult['data'] = [...results];
            }
            myResults.push(itemResult);
        });
        newsTaxList.forEach(item => {
            const results = filterArticlesByCatId(searchResults, item.id);
            const itemResult = {
                id : item.id,
                type : process.env.NEWS_POST_TYPE,
                data : []
            };
            if ( results.length ) {
                itemResult['data'] = [...results];
            }
            myResults.push(itemResult);
        });
        const hdxhResults = searchResults.filter(item => item.post_type === process.env.HDXH_POST_TYPE)
                                         .map(item => ({ id : item.id,
                                                        type : process.env.HDXH_POST_TYPE,
                                                        data : [{...item}] }));
        setSearchResultsByCat([...myResults].concat([...hdxhResults]));
     }
   }, [searchResults,keyword]);
   const handleFilter = useCallback((page, cid, type, e) => {
        e && e.preventDefault();  
        setLoading(true);
        //setPaged(1);
        setFilteredList(null);
        setTotals(null);
        setSearchResults([]);
        setSearchResultsByCat([]);
        setTimeout(() => {
            const elem = document.querySelector('.breadcrumb');
            const t = elem.getClientRects()[0].top;
            const innerHeight = elem.clientHeight;
            window.scroll(0, t + window.scrollY - 2 * innerHeight);
            //
            const originalSearchedArticles = [...filterSearchArticles(articlesList, keyword)];
            let searchedArticles = [...originalSearchedArticles];
            if ( cid && type ) {
                searchedArticles = [...filterArticlesByProps(searchedArticles, cid, type)];
            }
            if ( !cid && type ) {
                searchedArticles = [...searchedArticles.filter(item => item.post_type === type)];
            }
            const arrArticles = getArticles(searchedArticles, paged, numPerPage);
            setSearchResults([...originalSearchedArticles]);
            setFilteredList(arrArticles.map(item => <ArticleRowTemplate key={item} data = {item} />));   
            setTotals(searchedArticles.length);
            if ( page !== paged ) {
                setPaged(page);
            }
            setTimeout(() => {
                setLoading(false);
            }, 200);
        }, 100);
    }, [,pageContext, paged, keyword]);
   useEffect(() => {
        handleFilter(paged);
   }, [,pageContext, paged, keyword]);
  return (
    <>
        <RankMath data = {seo} />
        <main>
            <SectionBanner title={pageInfo.title} 
                           image={bannerOptions.banner_background} />
            <section className="container mb-50s">
                <BreadcrumbsTemplate data={breadList} />
            </section>
            <section className="news-pages mb-150s">
                <div className="container">
                    <SearchSidebarTemplate />
                    <div className="row gutter-50">
                        <div className="col-lg-8">
                            <div className="list-news__pages mb-70s">
                                {!loading ? <p className="search__results-label mb-20s">{filteredList && filteredList.length ? `${getTranslation(translationStrings, "timthay_label")} ${totals} ${getTranslation(translationStrings, "ketquavetukhoa_label")} "${keyword}"` : `${getTranslation(translationStrings, "khongtimthayketquanaovetukhoa_label")} "${keyword}"`}</p> : null}
                                <div className="search_results">
                                    {!loading ? filteredList : <div className="grid-loading"><Circles color="#3B7CBE" height={80} width={80} /></div>}
                                </div>
                            </div>
                            {!loading ? <TemplatePaginationBar data = {{paged, numPerPage, total : totals, setPaged}}  /> : null}
                        </div>
                        <div className="col-lg-4">
                            <SearchFilterByCategory translationStrings = {translationStrings}
                                                    servicesTaxList = {servicesTaxList}
                                                    newsTaxList = {newsTaxList}
                                                    data = {searchResultsByCat}
                                                    handleFilter = {handleFilter}
                                                    loading = {loading} />
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
        translationStrings : state.globalReducer.translationStrings
    }
}
function mapDispatchToProps(dispatch) {
    return {
        UpdateSiteOptions : async (v) => await dispatch({
            type : "UPDATE_SITE_OPTIONS",
            payload : v
        })
    }}
export default connect(mapStateToProps, mapDispatchToProps)(SearchPg);
