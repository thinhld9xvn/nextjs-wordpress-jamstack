import { getTranslation } from '@js_dir/utils/translations';
import Link from 'next/link';
import React from 'preact/compat'
import { connect } from 'react-redux';

function BrandingWidget({ data, translationStrings }) {
  return (
    <section className="field-support__mains mb-100s">
        <div className="container">
            <div className="row gutter-100">
                <div className="col-lg-5">
                    <div className="text-field__mains fs-17s">
                        <h2 className="titles-bold__alls titles-transform__alls fs-36s mb-15s"
                            dangerouslySetInnerHTML={{
                                __html : translationStrings.linhvucscrsupport_label
                            }}>
                        </h2>
                        <p>{getTranslation(translationStrings, "nenkinshoanthuehayvaonenkins_label")}</p>
                    </div>
                </div>
                <div className="col-lg-7">
                    <ul className="list-field__mains">
                        {data.map(item => (
                            <li key={item.id}>
                                <Link href={item.url}>
                                    <a style={{backgroundColor: item.background_color, color: item.color}}>{item.title}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(BrandingWidget);
