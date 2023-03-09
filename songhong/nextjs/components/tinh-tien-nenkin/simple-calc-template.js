import React from 'preact/compat'
import SimpleCalcFormTemplate from './simple-calc-form-template';
import NenkinCalcResultsTemplate from './nenkin-calc-results-template';
export function SimpleCalcTemplate({ resultsData, showResults, MonthsWorkingOptions, SalaryOptions, props }) {
  return (
    <>
        <SimpleCalcFormTemplate MonthsWorkingOptions = {MonthsWorkingOptions}
                                SalaryOptions = {SalaryOptions}
                                props = {props} />
        <NenkinCalcResultsTemplate data = {resultsData}
                                    show = {showResults}
                                    props = {props} />
    </>
  )
}