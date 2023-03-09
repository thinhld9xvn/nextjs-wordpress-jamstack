import ArticleGridTemplate from '@components/templates/article-grid-template';
import { PAGES } from '@constants/constants';
import { getTranslation } from '@js_dir/utils/translations';
import { getPageUrlByLocale } from '@js_dir/utils/urlUtils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'preact/compat'
import { connect } from 'react-redux';

function WeHaveThingsWidget({ data, translationStrings }) {
  const router = useRouter();
  return (
    <section className="box-before__mains we-have__mains mb-60s">
        <div className="container">
            <div className="first-box__befores mb-70s">
                <h2 className="titles-box__befores fs-44s titles-transform__alls titles-bold__alls">
                  {getTranslation(translationStrings, "scrcogi_label")}
                </h2>
                <div className="infos-first__befores">
                    <Link href={getPageUrlByLocale("vhds_url", router.locale)}>
                        <a className="btn-blues__alls">{getTranslation(translationStrings, "viewall_label")}</a>
                    </Link>
                </div>
            </div>
            <div className="list-have__mains">
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
export default connect(mapStateToProps, mapDispatchToProps)(WeHaveThingsWidget);

