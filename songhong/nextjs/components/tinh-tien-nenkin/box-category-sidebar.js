import { getTranslation } from '@js_dir/utils/translations';
import { getPageUrlByLocale } from '@js_dir/utils/urlUtils';
import Link from 'next/link';
import React from 'preact/compat'
import { connect } from 'react-redux';

function BoxCategorySidebar({ translationStrings, locale }) {
  return (
    <div className="box-category__sidebars">
        <h3 className="titles-bold__alls titles-transform__alls fs-16s mb-15s">{getTranslation(translationStrings, "tinhtiennhanduoc_label")}</h3>
        <ul className="list-category__sidebars">
            <li>
                <span className="shows-nav__news">
                    <i className="fa fa-caret-right"></i>
                    <span></span>
                </span>
                <Link href={getPageUrlByLocale("tinh_tien_nenkins_url", locale)}>
                    <a>{getTranslation(translationStrings, "nenkin_label")}</a>
                </Link>
            </li>
            <li>
                <span className="shows-nav__news">
                    <i className="fa fa-caret-right"></i>
                    <span></span>
                </span>
                <Link href={getPageUrlByLocale("tinh_tien_hoanthue_url", locale)}>
                    <a>{getTranslation(translationStrings, "hoanthue_label")}</a>
                </Link>
            </li>
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
export default connect(mapStateToProps, mapDispatchToProps)(BoxCategorySidebar);
