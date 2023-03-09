import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import React, {useState} from 'preact/compat'
import { connect } from 'react-redux';
import HoSoCongTyTemplate from './about-widget/hosocongty-template';
import LienLacTemplate from './about-widget/lienlac-template';
import AboutSlider from './about-widget/slider';
import ViTriDiaLyTemplate from './about-widget/vitridialy-template';
function AboutWidget({ data, translationStrings }) {
    const tabsData = [
        {
            id : 'hs-tab',
            label: translationStrings.hosocongty_label
        },
        {
            id : 'vtdl-tab',
            label: translationStrings.vitridialy_label
        },
        {
            id : 'contact-tab',
            label: translationStrings.lienlac_label
        }
    ];  
    const [tabActiveId, setTabActiveId] = useState('hs-tab');
    const handleSwitchTab = (id, e) => {
        e.preventDefault();
        setTabActiveId(id);
    }
    const {home_intro, phone, socials} = data;
    const {gt_hs_cong_ty, gt_vitri_dialy, gt_lienlac, gt_slider} = home_intro;
    
  return (
    <section className="about-mains">
        <div className="container">
            <div className="row gutter-50">
                <div className="col-lg-6">
                    <div className="text-firts__allls mb-60s">
                        <p className="fs-20s mb-10s">{getTranslation(translationStrings, "gioithieuve_label")}</p>
                        <h2 className="fs-44s titles-bold__alls titles-transform__alls">{getTranslation(translationStrings, "songhongcoltd_label")}</h2>
                    </div>
                    <div>
                        <ul className="nav tag-abouts__mains mb-30s" id="myTab" role="tablist">
                            {tabsData.map(item => (
                                <li key={item.id} className="">
                                    <a className={tabActiveId === item.id ? 'active' : ''} 
                                        id={item.id}
                                        data-toggle="tab" 
                                        href={`#${item.id}`} 
                                        role="tab" 
                                        aria-controls={`#${item.id}`}
                                        onClick={e => handleSwitchTab(item.id, e)}>
                                       {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="tab-content content-tags__alls">
                            <div className="tab-pane fade show active">
                                {tabActiveId === 'hs-tab' ? <HoSoCongTyTemplate data = {gt_hs_cong_ty} /> : 
                                    (tabActiveId === 'vtdl-tab' ? <ViTriDiaLyTemplate data = {gt_vitri_dialy} /> : 
                                                                    <LienLacTemplate data = {{gt_lienlac, phone, socials}} />) }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="right-abouts__mains">
                        <div className="img-about__mains">
                            <Image src="/static/images/img-abouts-mains.png" width={373} height={373} />
                        </div>
                        <AboutSlider data = {gt_slider} />
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
function mapStateToProps(state) {   
    return { 
        translationStrings : state.globalReducer.translationStrings
    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AboutWidget);
