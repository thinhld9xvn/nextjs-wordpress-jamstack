import React from 'preact/compat'
import { connect } from 'react-redux';
import ArticleGridTemplate from '@components/templates/article-grid-template';
import { getTranslation } from '@js_dir/utils/translations';
function RealityServices({ data, translationStrings }) {
  return (
    <section className="reality-sevice__mains">
        <div className="container">
            <div className="text-firts__allls mb-90s">
                <p className="fs-20s mb-10s">{getTranslation(translationStrings, "thuctrangve_label")}</p>
                <h2 className="fs-44s titles-bold__alls titles-transform__alls">{getTranslation(translationStrings, "dichvunenkin_label")}</h2>
            </div>
            <div className="list-reality__sevice mb-20s">
                <div className="row">
                    {data.map(article => <ArticleGridTemplate key={article.id} data={article} />)}
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
export default connect(mapStateToProps, mapDispatchToProps)(RealityServices);
