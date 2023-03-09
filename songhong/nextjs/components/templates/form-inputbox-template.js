import React from 'preact/compat'
export function FormMonthInputBoxTemplate({label, groupboxLabel, placeholderLabel, 
                                              id,
                                              handleChanged,
                                              handleCut,
                                              handleCopy,
                                              handlePaste}) {
  return (
    <>
      <p className="items-tops__prices">{label}</p>
      <div className="control-groups__accounts control-price__froms items-tops__prices">
          <input id={id}
                  type="text" 
                  placeholder={placeholderLabel} 
                  onKeyDown={handleChanged}
                  autoComplete="Off"
                  onCut={handleCut}
                  onCopy={handleCopy}
                  onPaste={handlePaste} />
          <p>{groupboxLabel}</p>
      </div>
    </>
  )
}
export default function FormInputBoxTemplate({ label = null, groupboxLabel = null, placeholderLabel = null, 
                                                setValue,
                                                required = false,
                                                requiredConditional = false,
                                                requiredMsgTemplate = null,
                                                id = '',
                                                mbClassName = 'mb-20s',
                                                handleChanged,
                                                handleCut = null,
                                                handleCopy = null,
                                                handlePaste = null }) {
  return (
    <div className={`groups-accounts__form ${mbClassName || ''}`}>
        {label ? (
          <p className="fs-15s mb-10s">{label}: {required ? <span className="color-red">*</span> : null}</p>
        ) : null}
        <div className="control-groups__accounts control-price__froms">
            <input type="text" 
                    id={id}
                    placeholder={placeholderLabel} 
                    onKeyDown={handleChanged.bind(this, setValue)}
                    onCut={handleCut}
                    onCopy={handleCopy}
                    onPaste={handlePaste}
                    autoComplete="Off" />
            <p>{groupboxLabel}</p>
        </div>
        {requiredConditional ? (
            <>
              {requiredMsgTemplate}
            </>
        ) : null}
    </div>
  )
}
