import SliderWidget from '@home_widgets/slider-widget';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { useRouter } from 'next/router';
import React, { useEffect } from 'preact/compat';
import { connect } from 'react-redux';
import AboutWidget from './home-widgets/about-widget';
import BrandingWidget from './home-widgets/branding-widget';
import FeedbacksWidget from './home-widgets/feedbacks-widget';
import LogoPartners from './home-widgets/logo-partners';
import RealityServices from './home-widgets/reality-services';
import RecommendList from './home-widgets/recommend-list';
import ServicesWidget from './home-widgets/services-widget';
import WeHaveThingsWidget from './home-widgets/we-have-things-widget';
import RankMath from './templates/rankmath';

function HomePage({ pageContext, siteOptions, UpdateSiteOptions }) {
    const router = useRouter();
    const {siteOptions : mySiteOptions, SliderItemsList, 
            servicesBrandingList, homePageOptions, servicesNenkinsList, recommendPageList, seo} = pageContext;
    useEffect(() => {
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
    }, [,router.locale]);
    const {home_intro, home_servicestt : servicesttList, home_whatscr : whatScrList, home_feedbacks, home_logo_partners} = homePageOptions;
    const {phone, socials} = mySiteOptions;
    return (
        <>
            <RankMath data = {seo} />
            <main>
                <SliderWidget data = {SliderItemsList} />
                <BrandingWidget data = {servicesBrandingList} />
                <AboutWidget data = {{home_intro, phone, socials}} />
                <ServicesWidget data = {servicesNenkinsList} />
                <RealityServices data = {servicesttList} />
                <WeHaveThingsWidget data = {whatScrList} />
                <section className="listen-customers__mains">
                    <FeedbacksWidget data = {home_feedbacks} />
                    <LogoPartners data = {home_logo_partners} />
                </section>
                <RecommendList data = {recommendPageList} />
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
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
