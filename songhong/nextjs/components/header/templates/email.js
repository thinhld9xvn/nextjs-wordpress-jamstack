import { getTranslation } from '@js_dir/utils/translations'
import Image from 'next/image'
import React from 'preact/compat'
import { connect } from 'react-redux'

function Email({ data, translationStrings }) {
  return (
    <div className="items-center__headers">
        <Image src="/static/images/center-header-3.png" width={40} height={40}  />
        <div className="intros-items__headers">
            <p className="fs-13s color-greys">{getTranslation(translationStrings, "email_label")}</p>
            <p><a href={`mailto:${data}`}  className="fs-17s titles-bold__alls">{data}</a></p>
        </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(Email);
