import FormInputBoxTemplate, { FormMonthInputBoxTemplate } from '@components/templates/form-inputbox-template';
import RequiredFieldMsg from '@components/templates/required-field';
import { MAX_M_LENGTH, MAX_N_LENGTH } from '@constants/constants';
import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import { connect } from 'react-redux';
import Select2 from 'react-select';
function AdvancedCalcFormTempate({ MonthsWorkingOptions, SalaryOptions, citiesOptions, props, translationStrings }) {
    const { salaryInboxSelectedValue, 
                monthRValue,
                monthRateSelectedValue,
                salaryPermonthRateSelectedValue,
                checkForm,
                months_working,
                minSalSelectedValue,
                OTSelectedValue,
                BonusSelectedValue,
                HomeBillsSelectedValue,
                setmonthRateSelectedValue,
                setmonthRValue,
                setSalaryPermonthRateSelectedValue,
                setCitySelectedValue,
                setOTSelectedValue,
                setBonusSelectedValue,
                setHomeBillsSelectedValue,
                monthRef, salaryRef, cityRef, handleMonthSelectBoxChanged, handleMonthInputBoxChanged,
                setSalaryInBoxSelectedValue,
                handleSalaryPerMonthBoxChanged,
                handleFieldTextChanged, handleAdvancedSubmit,
                handlePreventAction, handleGetPasteOnlyNumbers,
                handleGetPasteMonthNumbers,
                currency_active } = props;
    //console.log(monthRateSelectedValue, monthRValue);
  return (
    <div className="form-content__accounts mb-60s">
        <form id="advancedNenkinCalc" onSubmit={handleAdvancedSubmit}>
            <div className="groups-accounts__form mb-20s">
                <p className="fs-15s mb-10s">{getTranslation(translationStrings, "sothanglamvieconhat_label")} <span className="color-red">*</span></p>
                <div className="groups-tops__prices groups-form__greys">
                    <div className="control-select__alls items-tops__prices">
                        <Select2 className="select-alls select-fullwidth" 
                                    ref={monthRef}
                                    options={MonthsWorkingOptions}
                                    placeholder={getTranslation(translationStrings, "bamvaodaydechon_label")}
                                    onChange={handleMonthSelectBoxChanged.bind(this, 
                                                                                'months-aprice', 
                                                                                setmonthRValue, 
                                                                                setmonthRateSelectedValue)} />
                    </div>
                    <FormMonthInputBoxTemplate id = "months-aprice" 
                                               label = {getTranslation(translationStrings, "hoac_label")}
                                               groupboxLabel = {getTranslation(translationStrings, "month_label")}
                                               placeholderLabel = {getTranslation(translationStrings, "diencuthe_label")}                                               
                                               handleChanged = {handleMonthInputBoxChanged.bind(this, months_working, 
                                                                                                        monthRef, 
                                                                                                        'months-aprice', 
                                                                                                        setmonthRValue, 
                                                                                                        setmonthRateSelectedValue)}
                                               handleCut = {handlePreventAction}
                                               handleCopy = {handlePreventAction}
                                               handlePaste = {handleGetPasteMonthNumbers.bind(this, months_working, setmonthRValue, setmonthRateSelectedValue, monthRef, MAX_M_LENGTH)} />
                </div>
                {checkForm ? (
                    <RequiredFieldMsg msg = {monthRateSelectedValue === 0 && monthRValue === 0 ? translationStrings.requriredfield_label : 
                                                (monthRateSelectedValue === 0 && monthRValue > 0 && monthRValue < 7 ? translationStrings.monthsworkingnotvalidate_label : '')} />
                ) : null}
            </div>
            <div className="groups-accounts__form mb-20s">
                <p className="fs-15s mb-10s">{getTranslation(translationStrings, "luongbinhquanmoithang_label")} <span className="color-red">*</span></p>
                <div className="row">
                    <div className="col-lg-7 groups-form__greys">
                        <div className="select-salary__class">
                            <div className="control-select__alls">
                                <Select2 className="select-alls select-fullwidth" 
                                        ref={salaryRef}
                                        options={SalaryOptions}
                                        placeholder={getTranslation(translationStrings, "bamvaodaydechon_label")}
                                        onChange={handleSalaryPerMonthBoxChanged.bind(this, setSalaryPermonthRateSelectedValue)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <FormInputBoxTemplate label=""
                                            mbClassName={null}
                                            placeholderLabel={`${getTranslation(translationStrings, "diencuthe_label")} (${getTranslation(translationStrings, "neubiet_label")})`}
                                            groupboxLabel={getTranslation(translationStrings, "yen_label")}
                                            id="salary-binhquan"
                                            setValue={setSalaryInBoxSelectedValue}
                                            handleChanged={handleFieldTextChanged}
                                            handleCut={handlePreventAction}
                                            handleCopy={handlePreventAction}
                                            handlePaste={handleGetPasteOnlyNumbers.bind(this, setSalaryInBoxSelectedValue, MAX_N_LENGTH)}
                                            required={true}
                                            requiredConditional={null}
                                            requiredMsgTemplate={null} />
                    </div>
                </div>
                {checkForm && salaryPermonthRateSelectedValue === 0 ? (
                    <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                ) : null}
            </div>
            {salaryPermonthRateSelectedValue !== 0 ? (
                <>
                    {salaryPermonthRateSelectedValue === process.env.MSALARY3 ? (
                        <>
                            <div className="groups-accounts__form mb-20s">
                                <p className="fs-15s mb-10s">{getTranslation(translationStrings, "noibansongtainhat_label")} <span className="color-red">*</span></p>
                                <div className="control-select__alls">
                                    <Select2 className="select-alls select-fullwidth" 
                                            ref={cityRef}
                                            options={citiesOptions}
                                            placeholder={getTranslation(translationStrings, "bamvaodaydechon_label")}
                                            onChange={handleSalaryPerMonthBoxChanged.bind(this, setCitySelectedValue)} />
                                </div>
                                {checkForm && minSalSelectedValue === 0 ? (
                                    <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                                ) : null}
                            </div>
                            <FormInputBoxTemplate label={getTranslation(translationStrings, "sogiolamthemtrungbinhmoithang_label")}
                                            placeholderLabel={`${getTranslation(translationStrings, "diencuthe_label")} (${getTranslation(translationStrings, "neubiet_label")})`}
                                            groupboxLabel={getTranslation(translationStrings, "hour_label")}
                                            id="ot_times"
                                            setValue={setOTSelectedValue}
                                            handleChanged={handleFieldTextChanged}
                                            handleCut={handlePreventAction}
                                            handleCopy={handlePreventAction}
                                            handlePaste={handleGetPasteOnlyNumbers.bind(this, setOTSelectedValue, MAX_N_LENGTH)}
                                            required={true}
                                            requiredConditional={checkForm && OTSelectedValue === 0}
                                            requiredMsgTemplate={<RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />} />
                        </>
                    ) : null}
                    <FormInputBoxTemplate label={getTranslation(translationStrings, "tienthuongmotnam_label")}
                                            placeholderLabel={`${getTranslation(translationStrings, "diensotien_label")}`}
                                            groupboxLabel={getTranslation(translationStrings, "hour_label")}
                                            id="bonus_salary"
                                            setValue={setBonusSelectedValue}
                                            handleChanged={handleFieldTextChanged}
                                            handleCut={handlePreventAction}
                                            handleCopy={handlePreventAction}
                                            handlePaste={handleGetPasteOnlyNumbers.bind(this, setBonusSelectedValue, MAX_N_LENGTH)}
                                            required={false} />
                    {salaryPermonthRateSelectedValue === process.env.MSALARY1 || 
                        salaryPermonthRateSelectedValue === process.env.MSALARY3 ? (
                            <FormInputBoxTemplate label={getTranslation(translationStrings, "tiennhadiennuocwifimoithang_label")}
                                                    placeholderLabel={`${getTranslation(translationStrings, "diensotien_label")}`}
                                                    groupboxLabel={getTranslation(translationStrings, "hour_label")}
                                                    id="homebills_salary"
                                                    setValue={setHomeBillsSelectedValue}
                                                    handleChanged={handleFieldTextChanged}
                                                    handleCut={handlePreventAction}
                                                    handleCopy={handlePreventAction}
                                                    handlePaste={handleGetPasteOnlyNumbers.bind(this, setHomeBillsSelectedValue, MAX_N_LENGTH)}
                                                    required={true}
                                                    requiredConditional={checkForm && HomeBillsSelectedValue === 0}
                                                    requiredMsgTemplate={<RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />} />
                    ) : null}  
                </>
            ) : null}
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
export default connect(mapStateToProps, mapDispatchToProps)(AdvancedCalcFormTempate);
