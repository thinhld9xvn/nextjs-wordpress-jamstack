import React from 'preact/compat'
import AdvancedCalcFormTemplate from './advanced-calc-form-template'
import NenkinCalcResultsTemplate from './nenkin-calc-results-template'
export function AdvancedCalcTemplate({ resultsData, showResults, MonthsWorkingOptions, SalaryOptions, citiesOptions, props }) {
  return (
    <>
      <AdvancedCalcFormTemplate MonthsWorkingOptions = {MonthsWorkingOptions}
                                SalaryOptions = {SalaryOptions}
                                citiesOptions = {citiesOptions}
                                props = {props} />
      <NenkinCalcResultsTemplate data = {resultsData}
                                  show = {showResults}
                                  props = {props} />
    </>
  )
}