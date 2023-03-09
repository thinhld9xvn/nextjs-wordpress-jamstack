import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
import HoSoItemTemplate from './hoso-item-template';

export default function HoSoNenkins({ data, translationStrings }) {
    const {nenskin_frontcard, nenkins_image, nenkins_passport, nenkins_bank_images} = data;
  return (
    <>
        <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">{getTranslation(translationStrings, "thongtinhosonenkin_label")}</h3>
        <div className="form__contents">
            <HoSoItemTemplate data = {nenskin_frontcard}
                            label = {getTranslation(translationStrings, "anhthengoaikieumattruocmatsau_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
            <HoSoItemTemplate data = {nenkins_image}
                            label = {getTranslation(translationStrings, "anhnenkin_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
            <HoSoItemTemplate data = {nenkins_passport}
                            label = {getTranslation(translationStrings, "anhhochieu_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
            <HoSoItemTemplate data = {nenkins_bank_images}
                            label = {getTranslation(translationStrings, "anhgiayxacnhannganhang_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
        </div>
    </>
  )
}
