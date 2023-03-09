import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
import { Vortex } from 'react-loader-spinner'

export function HosoItemTemplate({ data, currentStep }) {
    const {id, label} = data;
    return (
        <p className={"title-uploads__imgs mb-10s ".concat(currentStep < id ? 'disable' : 
                                                                              (currentStep > id ? 'hide' : ''))}>
            {label}
            {currentStep === id ? (
                <Vortex
                    visible={true}
                    height="20"
                    width="20"
                    ariaLabel="vortex-loading"
                    wrapperclassName="vortex-wrapper"
                    colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                    />
            ) : null}
        </p>
    );
}
export default function HoSoUpdateModal({ data = [], currentStep, translationStrings }) {
    const arrHosoItems = data.map(item => <HosoItemTemplate data = {item}
                                                            key = {item}
                                                            currentStep = {currentStep} />)
  return (
    <>
        <h2 className="modalHsHeadingTitle loading">
            {getTranslation(translationStrings, "dangcapnhattiendohs_label")}
            <span></span>
            <span></span>
            <span></span>
        </h2>
        <div className="modalBodyHs__contents scrollable">
           {arrHosoItems}
        </div>
    </>
  )
}
