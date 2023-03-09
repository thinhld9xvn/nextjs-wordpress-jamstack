import React from 'preact/compat'
function RequiredFieldMsg({ msg }) {
  return(
      <p><span className="form-error-valid">{msg}</span></p>
  );
}
export default function FormInputDateField({ placeholder, value, setValue, handleChanged, 
                                          translationStrings, validate = false, mb = 10 }) {
  return (
    <div className={`control-groups__accounts mb-${mb}s control-date ${value ? 'active-input__texts' : ''}`}>                   
        <input placeholder={placeholder} 
                className="textbox-n" 
                type="date" 
                value={value}
                onChange={handleChanged.bind(this, setValue)} />
    </div>
  )
}
