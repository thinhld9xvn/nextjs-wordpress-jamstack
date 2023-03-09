import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'preact/compat'
import { connect } from 'react-redux';
import BreadcrumbsTemplate from './templates/breadcrumbs-template';
import RankMath from './templates/rankmath';
function QAItemTemplate({ qa }) {
    const [active, setActive] = useState(false);
    const handleToggleQA = (e) => {
        e.preventDefault();
        setActive(!active);
    }
    return (
        <div className={"items-questions__alls ".concat(active ? 'active-questions__alls' : '')} onClick={handleToggleQA}>
            <span className="btn-questions__alls"></span>
            <div className="infos-questions__alls">
                <h3 className="titles-bold__alls fs-17s">{qa.name}</h3>
                <div className="answer-pages"
                    dangerouslySetInnerHTML={{ __html : qa.content }}>                                            
                </div>
            </div>
        </div>
    )
}
function QA({ pageContext, siteOptions, UpdateSiteOptions, translationStrings }) {
    const router = useRouter();
    const {siteOptions : mySiteOptions, seo, qa_lists, breadcrumbs} = pageContext;
    useEffect(() => {
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
    }, [,router.locale]);
    const breadcrumbsData = addBreadcrumbsContext(breadcrumbs, router.locale, translationStrings);
  return (
    <>
        <RankMath data = {seo} />
        <main>
            <section className="content-questions">
                <div className="container">
                    <BreadcrumbsTemplate data = {breadcrumbsData} />
                    <h2 className="titles-box__befores fs-40s mb-115s titles-transform__alls titl titles-center__alls titles-bold__alls"
                        dangerouslySetInnerHTML={{ __html: getTranslation(translationStrings, "cauhoithuonggapvelaytiennenkin_label") }}>
                    </h2>
                    <div className="box-questions__pages mb-100s">
                        <h3 className="titles-box__questions fs-30s mb-50s">{getTranslation(translationStrings, 'q&a_label')}</h3>
                        <div className="list-questions__alls">
                            {qa_lists.map(qa => <QAItemTemplate key = {qa} qa = {qa} />)}
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
export default connect(mapStateToProps, mapDispatchToProps)(QA);

