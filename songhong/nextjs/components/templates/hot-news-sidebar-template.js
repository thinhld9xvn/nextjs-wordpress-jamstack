import { getArticleData } from '@js_dir/utils/articleUtils';
import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image';
import Link from 'next/link';
import React from 'preact/compat'
import { connect } from 'react-redux';
function ArticleHotNewsTemplate({ data, translationStrings }) {
    const {title,
            url,
            day,
            month,
            year,
            view_count,
            thumbnail} = getArticleData(data);
    return (
        <div className="items-news__hots">
            <div className="img-news__hots">
                <Link href={url}>
                    <a>
                        <Image src={thumbnail} layout="fill" objectFit="cover" />
                    </a>
                </Link>
            </div>
            <div className="intros-news__hots">
                <h3><Link href={url}><a className="names-news__hots fs-15s mb-10s titles-bold__alls">{title}</a></Link></h3>
                <ul className="times-views__mains mb-15s">
                    <li>
                        <Image src="/static/images/times-views-main-1.svg" width={20} height={20} layout="fixed" />
                        <p>{day} {getTranslation(translationStrings, "month_label")}{month}, {year}</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}
function HotNewsSidebarTemplate({ data = [], translationStrings }) {
  return (
    <div className="news-hot__sidebars">
        <h2 className="titles-bold__alls fs-16s titles-transform__alls mb-20s">{getTranslation(translationStrings, "featuredposts_label")}</h2>
        <div className="groups-news__sidebars">
            {data && data.length ? 
                data.map(item => <ArticleHotNewsTemplate key={item} data = {item} translationStrings = {translationStrings} />) :
                <li className="empty-lists">{getTranslation(translationStrings, "emptylists_label")}</li>}
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
export default connect(mapStateToProps, mapDispatchToProps)(HotNewsSidebarTemplate);
