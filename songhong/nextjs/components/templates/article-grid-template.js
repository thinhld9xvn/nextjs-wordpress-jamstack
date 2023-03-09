import { getArticleData } from '@js_dir/utils/articleUtils';
import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import Link from 'next/link';
import React from 'preact/compat'
import { connect } from 'react-redux';

function ArticleGridTemplate({ data, translationStrings }) {
    const {title,
            url,
            day,
            month,
            year,
            view_count,
            thumbnail} = getArticleData(data);
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
        <div className="items-reality__sevice">
            <div className="img-reality__sevices">
                <Link href={url}>
                    <a><Image src={thumbnail} layout="fill" objectFit="cover" /></a>
                </Link>
            </div>
            <div className="intros-reality__sevice">
                <ul className="times-views__mains mb-15s">
                    <li>
                        <Image src="/static/images/times-views-main-1.svg" width={20} height={20} layout="fixed" />
                        <p>{day} {getTranslation(translationStrings, "month_label")}{month}, {year}</p>
                    </li>
                    <li>
                        <Image src="/static/images/times-views-main-2.svg" width={20} height={20} layout="fixed" />
                        <p>{view_count} {getTranslation(translationStrings, "viewcount_label")}</p>
                    </li>
                </ul>
                <h3>
                    <Link href={url}>
                        <a className="names-reality__sevices fs-17s mb-15s titles-bold__alls">
                            {title}
                        </a>
                    </Link>
                </h3>
                <Link href={url}>
                    <a className="see-reality__alls titles-transform__alls fs-12s">
                        {getTranslation(translationStrings, "chitiet_label")}
                    </a>
                </Link>
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(ArticleGridTemplate);
