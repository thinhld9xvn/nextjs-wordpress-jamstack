import { PROGRESSING_LABELS, PROGRESSING_STEP_IDS } from '@constants/constants';
import { getTranslation } from '@js_dir/utils/translations';
import React, {useEffect, useState} from 'preact/compat'

function TienDoItemTemplate({ label, id, tiendoHTStep, isRefundedNenkinNo3 = null }) {
    let className = 'unchecked';
    if ( id === PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value || 
            id === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L3.value ) {
        if ( isRefundedNenkinNo3 === true ) {
            className = 'checked';
        }
    }
    else {
        if ( tiendoHTStep >= id ) {
            className = 'checked';
        }
    }
    return (
        <li className={className}>
            <a href="#">
                {label}
            </a>
        </li>
    )
}
export default function TienDoHoSoPanel({ showResults = false, 
                                                handleSubmit, 
                                                    userHoSoCode, 
                                                        tiendoHTStep, 
                                                            isRefundedNenkinNo3 = null, 
                                                                translationStrings }) {  
    let arrTienDoItems = [];   
    if ( showResults ) {
            const step_ids = Object.keys(PROGRESSING_STEP_IDS);
                arrTienDoItems = PROGRESSING_LABELS.map((label, i) => {
                    const id = PROGRESSING_STEP_IDS[step_ids[i]].value;
                    return (
                        <TienDoItemTemplate key = {label}
                                            id = {id}
                                            label = {getTranslation(translationStrings, label)}
                                            tiendoHTStep = {tiendoHTStep}
                                            isRefundedNenkinNo3 = {isRefundedNenkinNo3} />
                    );    
                }).reverse();
        }
  return (
    <>
        <div className="box-acounts__content content-right__accounts mb-30s height-100s">
            <div className="top-accounts__rights mb-50s">
                <div className="text-top__accounts">
                    <h2 className="fs-32s mb-15s color-blues">{getTranslation(translationStrings, "tiendohoso_label")}</h2>
                    <p>{getTranslation(translationStrings, "capnhattiendohosomsg_label")}</p>
                </div>
            </div>
            <div className="form-content__accounts">
                <form onSubmit={handleSubmit}>
                    <div className="search-profile__code">
                        <input type="text" 
                                placeholder={getTranslation(translationStrings, "nhapmahoso_label")} 
                                value={userHoSoCode} 
                                readOnly={true} />
                        <button>{getTranslation(translationStrings, "kiemtra_label")}</button>
                    </div>
                </form>
            </div>
            <div className={"form-results__accounts ".concat(showResults ? 'show' : '')}>
                <ul className="treetiendo__list">
                    {arrTienDoItems}
                </ul>
            </div>
        </div>
    </>
  )
}
