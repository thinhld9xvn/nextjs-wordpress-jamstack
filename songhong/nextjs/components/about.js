import { isDiff } from '@js_dir/utils/arrayUtils';
import { useRouter } from 'next/router';
import React, {useEffect} from 'preact/compat'
import { connect } from 'react-redux';
import TamNhinSm from './about/tamnhinsm';
import Vision from './about/vision';
import AboutWidget from './home-widgets/about-widget'
import RankMath from './templates/rankmath';
import SectionBanner from './templates/section-banner';

function AboutPage({ pageContext, siteOptions, UpdateSiteOptions }) {
    const router = useRouter();
    const {siteOptions : mySiteOptions, pageInfo, introPageOptions, bannerOptions, seo} = pageContext;
    useEffect(() => {
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
    }, [,router.locale]);
    const {home_intro, tam_nhin, tieu_chi} = introPageOptions;
    const {phone, socials} = mySiteOptions;
  return (
    <>
        <RankMath data = {seo} />
        <main>
            <SectionBanner title={pageInfo.title} 
                            image={bannerOptions.banner_background} />
            <AboutWidget data = {{home_intro, phone, socials}} />
            <Vision data = {tieu_chi} />
            <TamNhinSm data = {tam_nhin} />
        </main>
    </>
  )
}
function mapStateToProps(state) {   
    return { 
        siteOptions : state.globalReducer.siteOptions
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
export default connect(mapStateToProps, mapDispatchToProps)(AboutPage);
