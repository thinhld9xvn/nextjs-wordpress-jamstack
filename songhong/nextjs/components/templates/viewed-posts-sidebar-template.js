import { getTranslation } from '@js_dir/utils/translations';
import Link from 'next/link';
import React from 'preact/compat'
import { connect } from 'react-redux';

function ViewedPostsSidebarTemplate({ data = [], translationStrings }) {
  return (
    <div className="news-seen__sidebars mb-30s">
        <h3 className="titles-bold__alls titles-transform__alls fs-16s mb-20s">{getTranslation(translationStrings, "baivietdaxem_label")}</h3>
        <ul className="list-seen__news">
            {data && data.length ? data.map(item => (
                <li key = {item}>
                    <Link href={item.url}>{item.title}</Link>
                </li>
            )) : <li className="empty-lists">{getTranslation(translationStrings, "emptylists_label")}</li>}
        </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewedPostsSidebarTemplate);
