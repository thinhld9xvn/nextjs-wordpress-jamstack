import RequiredFieldMsg from '@components/templates/required-field'
import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
export default function FormInputField({ label, placeholder, value, setValue, handleChanged, handleKeyDown, 
                                          translationStrings, validate = false, readonly = false, mb = 20 }) {
  return (
    <div className={`groups-accounts__form groups-form__greys mb-${mb}s`}>
        {label ? (
          <p className="label-accounts__forms fs-15s mb-10s">{label}</p>
        ) : null}
        <div className="control-groups__accounts">
            <input type="text" 
                  placeholder={placeholder} 
                  value={value} 
                  readOnly={readonly}
                  onChange={handleChanged ? handleChanged.bind(this, setValue) : null}
                  onKeyDown={handleKeyDown ? handleKeyDown.bind(this, setValue) : null} />
        </div>
        {validate && !value ? (
          <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
        ) : null}
    </div>
  )
}
