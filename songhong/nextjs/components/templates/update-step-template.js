import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
import { Vortex } from 'react-loader-spinner'

export function UpdateStepItem({ currentStep, value, translationStrings }) {
    return (
        <p className={"title-uploads__imgs mb-10s ".concat(currentStep !== value ? 'disabled' : '')}>
            {getTranslation(translationStrings, "anhgiaygensen_label")}
            {currentStep === value ? (
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
    )
}
