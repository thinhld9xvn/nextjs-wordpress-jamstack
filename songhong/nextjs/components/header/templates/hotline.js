import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import React from 'preact/compat'
import { connect } from 'react-redux';

function Hotline({ data, translationStrings }) {
    const {hotline_vietnam, hotline_nhatban} = data;
    const {phone_label : phone_vn_label, phone_url : phone_vn_url} = hotline_vietnam;
    const {phone_label : phone_jp_label, phone_url : phone_jp_url} = hotline_nhatban;
  return (
    <>
        <div className="items-center__headers">
            <Image src="/static/images/center-header-1.png" width={40} height={40} />
            <div className="intros-items__headers">
                <p className="fs-13s color-greys">{getTranslation(translationStrings, "hotline_vn_label")}</p>
                <p><a href={phone_vn_url} className="fs-17s titles-bold__alls">{phone_vn_label}</a></p>
            </div>
        </div>
        <div className="items-center__headers">
            <Image src="/static/images/center-header-2.png" width={40} height={40} />
            <div className="intros-items__headers">
                <p className="fs-13s color-greys">{getTranslation(translationStrings, "hotline_jp_label")}</p>
                <p><a href={phone_jp_url}  className="fs-17s titles-bold__alls">{phone_jp_label}</a></p>
            </div>
        </div>
    </>
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
export default connect(mapStateToProps, mapDispatchToProps)(Hotline);
