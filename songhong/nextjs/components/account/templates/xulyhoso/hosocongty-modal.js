import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
function TemplateCongTyItem({ data, translationStrings }) {
    const {id, name, fromDate, toDate, address} = data;
    return (
        <div className="info__section">
            <div className="form-content__accounts">
                <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">{name}</h3>
                <div className="form__contents">
                    <div className="groups-accounts__form groups-form__greys mb-20s">
                        <p className="label-accounts__forms mb-10s">{getTranslation(translationStrings, "tencongty_label")}</p>
                        <p className="label-accounts__forms has__data">{name}</p>
                    </div>
                    <div className="groups-accounts__form groups-form__greys mb-20s">
                        <p className="label-accounts__forms mb-10s">{getTranslation(translationStrings, "tungay_label")}</p>
                        <p className="label-accounts__forms has__data">{fromDate}</p>
                    </div>
                    <div className="groups-accounts__form groups-form__greys mb-20s">
                        <p className="label-accounts__forms mb-10s">{getTranslation(translationStrings, "denngay_label")}</p>
                        <p className="label-accounts__forms has__data">{toDate}</p>
                    </div>
                    <div className="groups-accounts__form groups-form__greys mb-20s">
                        <p className="label-accounts__forms mb-10s">{getTranslation(translationStrings, "address_label")}</p>
                        <p className="label-accounts__forms has__data">{address}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function HoSoCongTyModal({ data, translationStrings }) {
    const arrCtItems = data.map(item => <TemplateCongTyItem data = {item}
                                                           key = {item}
                                                            translationStrings = {translationStrings} />)
  return (
    <>
        <h2 className="modalHsHeadingTitle">{getTranslation(translationStrings, "thongtincongty_label")}</h2>
        <div className="modalBodyHs__contents">
            {arrCtItems}
        </div>
    </>
  )
}
