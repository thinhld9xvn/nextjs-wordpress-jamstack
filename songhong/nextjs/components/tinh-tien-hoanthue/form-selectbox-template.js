import React from 'preact/compat'
import Select2 from 'react-select';
export default function FormSelectBoxTemplate({ refObj, options, tickValue, selectValue, setTickValue, setSelectValue, 
                                                handleUTickOption, handleChangedOption, noEnabled = false,
                                                selectLabel, placeholderLabel, refCheckBoxIndex, refCheckbox, isMultiple = false }) {
  return (
    <div className="row gutter-15 mb-20s">
        <div className="col-lg-3">
            <div className="check-box__alls" onClick={handleUTickOption.bind(this, {refObj, 
                                                                                    options,
                                                                                    tickValue,
                                                                                    setTickValue,
                                                                                    setSelectValue })}>
                <input type="checkbox" 
                        className="form-check-input input-checked" 
                        value={selectValue}
                        ref = {(el) => {refCheckbox.current[refCheckBoxIndex] = el}} />
                <span className="checkmark"> </span>
                <label className="form-check-label">
                    {selectLabel}
                </label>
            </div>
        </div>
        <div className="col-lg-9 groups-form__greys">
            <div className="control-select__alls items-tops__prices">
                <Select2 className="select-alls select-fullwidth" 
                            options={options}
                            ref={refObj}
                            placeholder={placeholderLabel}
                            isDisabled={noEnabled ? true : !tickValue}
                            value={selectValue}
                            isMulti={isMultiple}
                            onChange={handleChangedOption.bind(this, setSelectValue)} />
            </div>
        </div>
    </div>
  )
}
