import RequiredFieldMsg from '@components/templates/required-field';
import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import Select2 from 'react-select';
export default function SelectBoxField({ options, reff, placeholder, validate, value, setValue, handleChanged, translationStrings }) {
  return (
    <>
      <div className="control-select__alls items-tops__prices">
          <Select2 className="select-alls select-fullwidth" 
                  options={options}
                  ref={reff}
                  placeholder={placeholder}
                  value={value}
                  onChange={handleChanged.bind(this, setValue)} />        
      </div>
      {validate && !value ? (
        <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
      ) : null}
    </>
  )
}
