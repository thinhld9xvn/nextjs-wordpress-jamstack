import FormInputBoxTemplate, { FormMonthInputBoxTemplate } from '@components/templates/form-inputbox-template';
import RequiredFieldMsg from '@components/templates/required-field';
import { MAX_M_LENGTH, MAX_N_LENGTH } from '@constants/constants';
import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import { connect } from 'react-redux';
import Select2 from 'react-select';
function SimpleCalcFormTempate({ MonthsWorkingOptions, SalaryOptions, translationStrings, props }) {
    const { salaryInboxSelectedValue, 
            monthRateSelectedValue, 
            salaryPermonthRateSelectedValue,
            months_working,
            monthRValue,
            setmonthRateSelectedValue,
            setSalaryPermonthRateSelectedValue,
            setmonthRValue,
            checkForm,
            monthRef, salaryRef, handleMonthSelectBoxChanged, handleMonthInputBoxChanged,
            handleSalaryPerMonthBoxChanged,
            setSalaryInBoxSelectedValue,
            handleSalaryInBoxChanged, handleSimpleSubmit,
            handlePreventAction,
            handleGetPasteOnlyNumbers,
            handleGetPasteMonthNumbers,
            currency_active } = props;
  return (
    <div className="form-content__accounts mb-60s">
        <form id="frmSimpleNenkinCalc" onSubmit={handleSimpleSubmit}>
            <div className="groups-accounts__form mb-20s">
                <p className="fs-15s mb-10s">{getTranslation(translationStrings, "sothanglamvieconhat_label")} <span className="color-red">*</span></p>
                <div className="groups-tops__prices groups-form__greys">
                    <div className="control-select__alls items-tops__prices">
                        <Select2 className="select-alls select-fullwidth" 
                                    ref={monthRef}
                                    options={MonthsWorkingOptions}
                                    placeholder={getTranslation(translationStrings, "bamvaodaydechon_label")}
                                    onChange={handleMonthSelectBoxChanged.bind(this, 'months-price', setmonthRValue, setmonthRateSelectedValue)} />
                    </div>
                    <FormMonthInputBoxTemplate id = "months-price" 
                                               label = {getTranslation(translationStrings, "hoac_label")}
                                               groupboxLabel = {getTranslation(translationStrings, "month_label")}
                                               placeholderLabel = {getTranslation(translationStrings, "diencuthe_label")}                                               
                                               handleChanged = {handleMonthInputBoxChanged.bind(this, months_working, monthRef, 'months-price', setmonthRValue, setmonthRateSelectedValue)}
                                               handleCut = {handlePreventAction}
                                               handleCopy = {handlePreventAction}
                                               handlePaste = {handleGetPasteMonthNumbers.bind(this, months_working, setmonthRValue, setmonthRateSelectedValue, monthRef, MAX_M_LENGTH)} />
                </div>
                {checkForm ? (
                    <RequiredFieldMsg msg = {monthRateSelectedValue === 0 && monthRValue === 0 ? translationStrings.requriredfield_label : 
                                                (monthRateSelectedValue === 0 && monthRValue > 0 && monthRValue < 7 ? translationStrings.monthsworkingnotvalidate_label : '')} />
                ) : null}
            </div>
            <div className="groups-accounts__form groups-form__greys mb-20s">
                <p className="fs-15s mb-10s">{getTranslation(translationStrings, "luongbinhquanmoithang_label")} <span className="color-red">*</span></p>
                <div className="control-select__alls">
                    <Select2 className="select-alls select-fullwidth" 
                            ref={salaryRef}
                            options={SalaryOptions}
                            placeholder={getTranslation(translationStrings, "bamvaodaydechon_label")}
                            onChange={handleSalaryPerMonthBoxChanged.bind(this, setSalaryPermonthRateSelectedValue)} />
                </div>
                {checkForm && salaryPermonthRateSelectedValue === 0 ? (
                    <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                ) : null}
            </div>
            <FormInputBoxTemplate label={getTranslation(translationStrings, "luongbinhquanvetayhangthang_label")}
                                    placeholderLabel={getTranslation(translationStrings, "diensotien_label")}
                                    groupboxLabel={getTranslation(translationStrings, "yen_label")}
                                    id="salary-binhquan"
                                    setValue={setSalaryInBoxSelectedValue}
                                    handleChanged={handleSalaryInBoxChanged}
                                    handleCut={handlePreventAction}
                                    handleCopy={handlePreventAction}
                                    handlePaste={handleGetPasteOnlyNumbers.bind(this, setSalaryInBoxSelectedValue, MAX_N_LENGTH)}
                                    required={true}
                                    requiredConditional={checkForm && salaryInboxSelectedValue === 0}
                                    requiredMsgTemplate={<RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />} />
            <button className="btn-opacity__blues titles-bold__alls">{getTranslation(translationStrings, "tinhtiennenkin_label")}</button>
        </form>
    </div>
  )
}
function mapStateToProps(state) {   
    return { 
        translationStrings : state.globalReducer.translationStrings
    }
}
function mapDispatchToProps(dispatch) {
    return {
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(SimpleCalcFormTempate);
