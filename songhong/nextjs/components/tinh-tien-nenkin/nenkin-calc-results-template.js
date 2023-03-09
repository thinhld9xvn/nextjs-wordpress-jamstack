import { getCurrencyTranslationLabel } from '@js_dir/utils/tinhtienUtils';
import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import { connect } from 'react-redux';

function NenkinCalcResultsTemplate({ data, props, show, translationStrings }) {
   const {rate, totals, total_L1, total_L2, total_TK} = data;
   const {priceTronGoi, currency_active} = props;
   const activeCurLabel = getCurrencyTranslationLabel(currency_active, translationStrings);
  return (
    <div className={`box-result__nenkins ${show ? 'show' : ''}`}>
        <h2 className="title-result__nenkins titles-bold__alls titles-transform__alls color-blues fs-20s mb-30s">{getTranslation(translationStrings, "sotiennenkinnhanduoc_label")}</h2>
        <ul className="list-result__nenkins mb-20s">
            <li>
                <p>{getTranslation(translationStrings, "sotiennenkinnhanduoc_label")}: <span className="titles-bold__alls color-blues">{totals} {getTranslation(translationStrings, "yen_label")}</span></p>
                <p>{getTranslation(translationStrings, "banmuonbiet_label")} <a href="#" title="">Tổng Tiền Nenkin </a> {getTranslation(translationStrings, "lagi_label")} ?</p>
            </li>
            <li>
                <p>{getTranslation(translationStrings, "tiennenkinlanmot_label")}: <span className="titles-bold__alls color-blues">{total_L1} {getTranslation(translationStrings, "yen_label")}</span></p>
                <p>{getTranslation(translationStrings, "banmuonbiet_label")} <a href="#" title="">Tiền Nenkin lần 1 </a> {getTranslation(translationStrings, "lagi_label")} ?</p>
            </li>
            <li>
                <p>{getTranslation(translationStrings, "tiennenkinlanhai_label")}: <span className="titles-bold__alls color-blues">{total_L2} {getTranslation(translationStrings, "yen_label")}</span></p>
                <p>{getTranslation(translationStrings, "banmuonbiet_label")} <a href="#" title="">Tiền Nenkin lần 2</a> {getTranslation(translationStrings, "lagi_label")} ?</p>
            </li>
        </ul>
        <div className="groups-accounts__form result-price__forms mb-20s">
            <p className="fs-15s mb-10s">{getTranslation(translationStrings, "chiphitrongoiscr_label")}</p>
            <div className="control-groups__accounts">
                <input type="text" value={priceTronGoi} />
                <p>{activeCurLabel}</p>
            </div>
        </div>
        <div className="groups-accounts__form result-price__forms mb-20s">
            <p className="fs-15s mb-10s">{getTranslation(translationStrings, "chiphithamkhaotietkiem_label")}</p>
            <div className="control-groups__accounts">
                <input type="text" value={total_TK} />
                <p>{activeCurLabel}</p>
            </div>
        </div>
        <div className="groups-accounts__form result-price__forms mb-20s">
            <p className="fs-15s mb-10s">{getTranslation(translationStrings, "heso_label")}</p>
            <div className="control-groups__accounts">
                <input type="text" value={rate} />
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
export default connect(mapStateToProps, mapDispatchToProps)(NenkinCalcResultsTemplate);