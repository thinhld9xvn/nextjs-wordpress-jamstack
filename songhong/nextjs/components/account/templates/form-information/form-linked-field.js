import RequiredFieldMsg from '@components/templates/required-field'
import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
export default function FormLinkedField({ label, labelLinked, labelUnLinked, placeholder, linkedFb, value, validate = false, handleChanged, mb = 20, translationStrings }) {
  //console.log(linkedFb, value);
  return (
    <div className={`groups-accounts__form groups-facebooks mb-${mb}s`}>
        <p className="label-accounts__forms fs-15s mb-10s">{label}</p>
        <div className="control-groups__accounts">
            <input id="lnk-account" type="text" value={value} readOnly={true} placeholder={placeholder} />
            <button className="submit-facebooks" onClick={handleChanged}>{!linkedFb ? labelUnLinked : labelLinked}</button>
        </div>
        {validate && !value ? (
          <RequiredFieldMsg msg = {getTranslation(translationStrings, "requiredlinkedfb_label")} />
        ) : null}
    </div>
  )
}
