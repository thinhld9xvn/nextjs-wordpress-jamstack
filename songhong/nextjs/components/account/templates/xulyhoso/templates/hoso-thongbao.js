import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'

export default function HosoThongBao({ data, translationStrings }) {
    const {hoso_verified} = data;
  return (
    <>
        <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">
            {getTranslation(translationStrings, "thongbao_label")}
        </h3>
        <div className="form__contents">
            {hoso_verified ? (
                <div className="message__tb success">
                    <p>{getTranslation(translationStrings, "userdacapnhathscanhan_label")}</p>
                </div>
            ) : null}
        </div>
    </>
  )
}
