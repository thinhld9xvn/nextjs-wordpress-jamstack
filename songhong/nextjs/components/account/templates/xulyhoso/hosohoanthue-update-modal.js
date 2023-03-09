import { UpdateStepItem } from '@components/templates/update-step-template'
import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'

export default function HosoHoanThueUpdateModal({ currentStep = 0, translationStrings }) {
    const arrStepsTemplate = [];
    for(let i = 0; i < 7; i++) {
        arrStepsTemplate.push( <UpdateStepItem translationStrings = {translationStrings}
                                                currentStep = {currentStep}
                                                value = {i}
                                                key = {i} /> );
    }
  return (
    <>
        <h2 className="modalHsHeadingTitle loading">
            {getTranslation(translationStrings, "dangcapnhatanhhs_label")}
            <span></span>
            <span></span>
            <span></span>
        </h2>
        <div className="modalBodyHs__contents">
            {arrStepsTemplate}
        </div>
    </>
  )
}
