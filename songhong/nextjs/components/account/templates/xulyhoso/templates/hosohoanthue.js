import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
import HoSoItemTemplate from './hoso-item-template'

export default function HoSoHoanThue({ data, translationStrings }) {
  const {hoanthue_gensen, hoanthue_giaytoquanhe_images, hoanthue_mynumber_images, 
          hoanthue_ngoaikieu_images, hoanthue_passport, hoanthue_sotttaikhoan_images, hoanthue_transfer_images} = data;
  return (
    <>
        <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">{getTranslation(translationStrings, "thongtinhosohoanthue_label")}</h3>
        <div className="form__contents">
            <HoSoItemTemplate data = {hoanthue_gensen}
                            label = {getTranslation(translationStrings, "anhgiaygensen_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
            <HoSoItemTemplate data = {hoanthue_transfer_images}
                            label = {getTranslation(translationStrings, "anhgiaychuyentien_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
            <HoSoItemTemplate data = {hoanthue_giaytoquanhe_images}
                            label = {getTranslation(translationStrings, "giaytochungminhquanhevoinguoiphungduong_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
            <HoSoItemTemplate data = {hoanthue_passport}
                            label = {getTranslation(translationStrings, "anhhochieu_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
            <HoSoItemTemplate data = {hoanthue_mynumber_images}
                            label = {getTranslation(translationStrings, "anhthemynumber_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
            <HoSoItemTemplate data = {hoanthue_sotttaikhoan_images}
                            label = {getTranslation(translationStrings, "songanhanghoacthongtintk_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
            <HoSoItemTemplate data = {hoanthue_ngoaikieu_images}
                            label = {getTranslation(translationStrings, "anhthengoaikieumattruocmatsau_label")}
                            nodata_label = {getTranslation(translationStrings, "khongcodulieunao_label")} />
        </div>
    </>
  )
}
