import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { onSubmit_submitCf7, setTranslations } from '@js_dir/utils/contactformUtils';
import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {useEffect} from 'preact/compat'
import { connect } from 'react-redux';
import BreadcrumbsTemplate from './templates/breadcrumbs-template';
import RankMath from './templates/rankmath';
import SectionBanner from './templates/section-banner';

function Contact({ pageContext, siteOptions, UpdateSiteOptions, translationStrings }) {
    const router = useRouter();
    const {siteOptions : mySiteOptions, pageInfo, contactPageOptions, seo, breadcrumbs} = pageContext;
    useEffect(() => {
        if (translationStrings) {
            setTranslations({...translationStrings});
        }
    }, [translationStrings]);    
    useEffect(() => {
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
        setTimeout(() => {
            document.querySelector('.wpcf7-form')
                    .addEventListener('submit', e => onSubmit_submitCf7(e, translationStrings, router.locale, 
                                                                            {vi : process.env.CTF7_VI,
                                                                             ja : process.env.CTF7_JA}));
        }, 200);
        return() => {
        }
    }, [,router.locale]);    
    const {lh_banner, lh_form, lh_gmap, lh_notices, lh_address, lh_thongdiepsticky} = contactPageOptions;
    const {phone, email, socials, hotline} = mySiteOptions;
    const {hotline_vietnam, hotline_nhatban} = hotline;
    const {zalo, fanpage} = socials;
    const breadcrumbsData = addBreadcrumbsContext(breadcrumbs, router.locale, translationStrings);
  return (
    <>
        <RankMath data = {seo} />
        <main>
            <SectionBanner title={pageInfo.title} image={lh_banner} />
            <section className="container mb-50s">
                <BreadcrumbsTemplate data = {breadcrumbsData} />
            </section>
            <section className="content-contact__pages mb-150s">
                <div className="container">
                    <div className="row gutter-50">
                        <div className="col-lg-5">
                            <div className="form-contact__pages"
                                 dangerouslySetInnerHTML={{
                                    __html : lh_form
                                 }}></div>
                        </div>
                        <div className="col-lg-7">
                            <div className="intros-contacts__pages">
                                <p className="titles-bold__alls fs-20s mb-15s">{getTranslation(translationStrings, "thongtinlienhe_label")}</p>
                                <h3 className="titles-bold__alls fs-40s mb-20s">{getTranslation(translationStrings, "congtycophansonghong_label")}</h3>
                                <div dangerouslySetInnerHTML={{ __html: lh_thongdiepsticky }}></div>
                                <div className="groups-infos__contacts">
                                    <div className="infos-contacts__boxs">
                                        <div className="items-infos__contacts">
                                            <Image src="/static/images/items-infos-contacts-1.png" width={44} height={44} layout="fixed" />
                                            <div className="text-items__contacts fs-16s">
                                                {lh_address.map(address => (
                                                    <>
                                                        <h3 className="titles-bold__alls fs-18s mb-5s">{address.name}</h3>
                                                        <div dangerouslySetInnerHTML={{ __html: address.content }}></div>
                                                    </>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="infos-contacts__boxs">
                                        <div className="items-infos__contacts">
                                            <Image src="/static/images/items-infos-contacts-2.png" width={44} height={44} layout="fixed"  />
                                            <div className="text-items__contacts fs-16s">
                                                <h3 className="titles-bold__alls fs-18s mb-5s">{getTranslation(translationStrings, "hotline_vn_label")}</h3>
                                                <p><a href={hotline_vietnam.phone_url}>{hotline_vietnam.phone_label}</a></p>
                                            </div>
                                        </div>
                                        <div className="items-infos__contacts">
                                            <div className="text-items__contacts fs-16s">
                                                <h3 className="titles-bold__alls fs-18s mb-5s">{getTranslation(translationStrings, "hotline_jp_label")}</h3>
                                                <p><a href={hotline_nhatban.phone_url}>{hotline_nhatban.phone_label}</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="infos-contacts__boxs">
                                        <div className="items-infos__contacts">
                                            <Image src="/static/images/items-infos-contacts-3.png" width={44} height={44} layout="fixed" />
                                            <div className="text-items__contacts fs-16s">
                                                <h3 className="titles-bold__alls fs-18s mb-5s">{getTranslation(translationStrings, "email_label")}</h3>
                                                <p><a href={`mailto:${email}`}>{email}</a></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="infos-contacts__boxs">
                                        <div className="items-infos__contacts">
                                            <Image src="/static/images/items-infos-contacts-4.png" width={44} height={44} layout="fixed" />
                                            <div className="text-items__contacts fs-16s">
                                                <h3 className="titles-bold__alls fs-18s mb-5s">Zalo</h3>
                                                <p><a href={zalo} target="_blank" rel="noreferrer">{phone.phone_label}</a></p>
                                            </div>
                                        </div>
                                        <div className="items-infos__contacts">
                                            <Image src="/static/images/items-infos-contacts-5.png" width={44} height={44} layout="fixed" />
                                            <div className="text-items__contacts fs-16s">
                                                <h3 className="titles-bold__alls fs-18s mb-5s">Facebook</h3>
                                                <p><a href={fanpage} target="_blank" rel="noreferrer">Nenkin – Hoàn thuế S.C.R</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="map-contact__pages mb-25s">
                                <iframe
                                    src={lh_gmap}
                                    style={{border : '0'}}
                                    allowFullScreen=""
                                    loading="lazy"
                                ></iframe>
                            </div>
                            <div dangerouslySetInnerHTML={{ __html: lh_notices }}></div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Contact);
