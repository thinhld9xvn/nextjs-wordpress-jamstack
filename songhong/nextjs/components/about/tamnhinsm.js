import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import React from 'preact/compat'
import { connect } from 'react-redux';

function TamNhinSm({ data, translationStrings }) {
  return (
    <section className="box-before__mains mission-about__pages mb-100s">
        <div className="container">
            <h2 className="titles-bold__alls titles-center__alls titles-transform__alls fs-40s mb-85s">{getTranslation(translationStrings, "tamnhinvasumenh_label")}</h2>
            <div className="intros-mission__abouts">
                <div className="row gutter-90">
                    {data.map(section => {
                        const {icon, heading, content} = section;
                        return (
                            <div key={section} className="col-lg-6 col-md-6 col-sm-12">
                                <div className="mission-about__items">
                                    <h3 className="titles-bold__alls fs-22s mb-50s">{heading}</h3>
                                    <Image src={icon} width={128} height={128} layout="fixed" />
                                    <div dangerouslySetInnerHTML={{ __html: content }}></div>
                                </div>
                            </div>
                        )
                    })}
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
export default connect(mapStateToProps, mapDispatchToProps)(TamNhinSm);
