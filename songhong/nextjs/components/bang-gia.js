import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useEffect} from 'preact/compat'
import { connect } from 'react-redux';
import BreadcrumbsTemplate from './templates/breadcrumbs-template';
import HotlineSidebar from './templates/hotline-sidebar';
import RankMath from './templates/rankmath';

function BangGiaDetailsPage({ pageContext, siteOptions, UpdateSiteOptions, translationStrings }) {
    const router = useRouter();
    const {siteOptions : mySiteOptions, seo, pageInfo, breadcrumbs, servicesTaxList} = pageContext;
    useEffect(() => {
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
    }, [,router.locale]);
    const {contents} = pageInfo;    
    const {phone} = mySiteOptions;
    const breadcrumbsData = addBreadcrumbsContext(breadcrumbs, router.locale, translationStrings);
    return (
        <>
            <RankMath data = {seo} />
            <main>
                <section className="content-price__nenkin">
                    <div className="container">
                        <BreadcrumbsTemplate data = {breadcrumbsData} />
                        <div className="row gutter-50">
                            <div className="col-lg-8"
                                dangerouslySetInnerHTML={{ __html: contents }}>
                            </div>
                            <div className="col-lg-4">
                                <div className="box-category__sidebars">
                                    <h3 className="titles-bold__alls titles-transform__alls fs-16s mb-15s">{getTranslation(translationStrings, "banggiadichvu_label")}</h3>
                                    <ul className="list-category__sidebars">
                                        {servicesTaxList.map(item => (
                                            <li key = {item}>
                                                <span className="shows-nav__news">
                                                    <i className="fa fa-caret-right" aria-hidden="true"></i>
                                                    <span></span>
                                                </span>
                                                <Link href={item.url}>{item.title}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
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
        translationStrings : state.globalReducer.translationStrings
    }
}
function mapDispatchToProps(dispatch) {
    return {
        UpdateSiteOptions : async (v) => await dispatch({
            type : "UPDATE_SITE_OPTIONS",
            payload : v
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(BangGiaDetailsPage);

