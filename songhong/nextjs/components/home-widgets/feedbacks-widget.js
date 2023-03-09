import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import { connect } from 'react-redux';
import FeedbacksSlider from './feedbacks-widget/slider';

function FeedbacksWidget({ data, translationStrings }) {
  return (
    <div className="tops-listen__mains">
        <div className="container">
            <div className="text-listen__mains">
                <p className="titles-md__alls mb-10s">{getTranslation(translationStrings, "cungnghe_label")}</p>
                <h2 className="titles-bold__alls titles-transform__alls fs-44s">{getTranslation(translationStrings, "khachhangnoivescr_label")}</h2>
            </div>
        </div>
        <FeedbacksSlider data = {data} />
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
export default connect(mapStateToProps, mapDispatchToProps)(FeedbacksWidget);
