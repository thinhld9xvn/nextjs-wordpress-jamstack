import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import React from 'preact/compat'
import { connect } from 'react-redux';

function HotlineSidebar({ phone, translationStrings }) {
  return (
    <div className="contacts-news__sidebars mb-30s">
        <h2 className="titles-bold__alls fs-24s mb-20s">{getTranslation(translationStrings, "lienhevoichungtoiquahotline_label")}</h2>
        <a href="#" title="">
            <Image width={50} height={50} src="/static/images/phones-news-sidebars.png" />
        </a>
        <p className="mb-10s fs-13s">{getTranslation(translationStrings, "tongdai247_label")}</p>
        <p><a href={phone.phone_url}>{phone.phone_label}</a></p>
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(HotlineSidebar);
