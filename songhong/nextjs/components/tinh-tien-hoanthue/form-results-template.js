import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'

export default function FormResultsTemplate({ results, showResults = false, translationStrings }) {
  return (
    <div className={"box-result__nenkins ".concat(showResults ? 'show' : '')}>
        <h2 className="title-result__nenkins titles-bold__alls titles-transform__alls color-blues fs-20s mb-30s">{getTranslation(translationStrings, "sotienhoanthuenhanduoc_label")}</h2>
        <div className="groups-accounts__form result-price__forms mb-20s">
            <p className="fs-15s mb-10s">{getTranslation(translationStrings, "sotiendukiennhanduoc_label")}</p>
            <div className="control-groups__accounts">
                <input type="text" value={results} />
                <p>{getTranslation(translationStrings, "yen_label")}</p>
            </div>
        </div>
        <ul className="list-result__nenkins list-result__tax mb-20s">
            <li>
                <p>{getTranslation(translationStrings, "banmuonbiet_label")} <a href="#">{getTranslation(translationStrings, "sotienchitra_label")}</a> {getTranslation(translationStrings, "lagi_label")} ?</p>
            </li>
            <li>
                <p>{getTranslation(translationStrings, "banmuonbiet_label")} <a href="#">{getTranslation(translationStrings, "sotiennhanduoc_label")} </a> {getTranslation(translationStrings, "lagi_label")} ?</p>
            </li>
            <li>
                <p>{getTranslation(translationStrings, "banmuonbiet_label")} <a href="#">{getTranslation(translationStrings, "sotienbhxh_label")}</a> {getTranslation(translationStrings, "lagi_label")} ?</p>
            </li>
            <li>
                <p>{getTranslation(translationStrings, "banmuonbiet_label")} <a href="#">{getTranslation(translationStrings, "tienthue_label")}</a> {getTranslation(translationStrings, "lagi_label")} ?</p>
            </li>
        </ul>
    </div>
  )
}
