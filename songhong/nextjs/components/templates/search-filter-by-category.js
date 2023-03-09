import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
import { Circles } from 'react-loader-spinner';
function TemplateItem({ data, type = '', resultsData = [], handleFilter }) {
    const {id, title} = data;
    const itemResult = resultsData.find(item => item.type === type && item.id === id);
    const count = itemResult ? itemResult.data.length : 0;
    return (
        <li><a href="#" onClick={handleFilter.bind(this, 1, id, type)}>- {title} ({count})</a></li>
    )
}
function TemplateMainChild({ data, label, resultsData = [], type = '', handleFilter }) {
    const resultTotalItems = resultsData.filter(item => item.type === type);
    let totals = 0;
    resultTotalItems.forEach(item => {
        totals += item.data.length;
    }, []);
    return (
        <li>
            <span className="shows-nav__news active-nav__news">
                <i className="fa fa-caret-down"></i>
                <span></span>
            </span>
            <a href="#" onClick={handleFilter.bind(this, 1, null, type)}>{label} ({totals})</a>
            {data && data.length ? (
                <ul className="show">
                    {data.map(item => <TemplateItem key = {item} 
                                                    data = {item}
                                                    type = {type}
                                                    resultsData = {resultsData}
                                                    handleFilter = {handleFilter} />)}
                </ul>
            ) : null}
        </li>
    )
}
export default function SearchFilterByCategory({ data, servicesTaxList, newsTaxList, handleFilter, translationStrings, loading = false }) {
    const arrServicesList = <TemplateMainChild label={getTranslation(translationStrings, "dichvu_label")}
                                                data = {servicesTaxList}
                                                type = {process.env.SERVICES_POST_TYPE}
                                                resultsData = {data}
                                                handleFilter = {handleFilter} />
    const arrNewsList = <TemplateMainChild label={getTranslation(translationStrings, "news_label")}
                                            data = {newsTaxList}
                                            type = {process.env.NEWS_POST_TYPE}
                                            resultsData = {data}
                                            handleFilter = {handleFilter} />
    const arrHdxhList = <TemplateMainChild  label={getTranslation(translationStrings, "hdxh_label")}
                                            type = {process.env.HDXH_POST_TYPE}
                                            resultsData = {data}
                                            data = {null}
                                            handleFilter = {handleFilter} />
  return (
    <div className="box-category__sidebars mb-30s">
        <h3 className="titles-bold__alls titles-transform__alls fs-16s mb-15s">
            {getTranslation(translationStrings, "filterbycat_label")}
        </h3>
        {loading ? (
            <div className="grid-loading"><Circles color="#3B7CBE" height={40} width={40} /></div>
        ) : (
            <ul className="list-category__sidebars">
                {arrServicesList}
                {arrNewsList}
                {arrHdxhList}
            </ul>
        )}
    </div>
  )
}
