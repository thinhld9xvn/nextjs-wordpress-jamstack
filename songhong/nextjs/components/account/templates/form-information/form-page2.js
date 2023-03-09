import { getTranslation } from '@js_dir/utils/translations';
import React, {useEffect} from 'preact/compat'
import FormCompanyAccordion from './form-company-accordion';
import FormInputField from './form-input-field';
import SelectBoxField from './selectbox-field';
export default function FormPage2({ options, refs, translationStrings, props }) {
  const {yearsBirthDay, monthsBirthDay, dateBirthDay} = options;
  const {refYearsBithDayObj, refMonthBithDayObj, refDateBithDayObj} = refs;
  const {fullnameJapanValue, nameUnsignedValue, yearValue, monthValue, dayValue,
            nenkinCode, companyInfoValue, bankNameVietNamValue, bankNameBranchVietNamValue,
            addressBankNameBranchVietNamValue, noBankValue, nameLastAddressValue, noZipValue,
            setFullNameJapanValue, setNameUnsignedValue, setYearValue, setMonthValue, setDayValue,
            setNenkinCode, setCompanyInfoValue, setBankNameVietNamValue, setBankNameBranchVietNamValue,
            setAddressBankNameBranchVietNamValue, setNoBankValue, setNameLastAddressValue, setNoZipValue,
            handleNumberChanged, handleTextChanged, 
            handleSelectBoxChanged, handleAddCompanyInfoChanged, handleRemoveCompanyInfoChanged, 
            handleUpdateCompanyInfoChanged,
            checkForm, companyInfoValidate} = props;
    //console.log(companyInfoValue);
    
  return (
    <>
        <FormInputField label = {getTranslation(translationStrings, "hovatentiengnhat_label")} 
                        value = {fullnameJapanValue} 
                        placeholder={getTranslation(translationStrings, "vietgiongtrongsotaynenkin_label")}
                        translationStrings={translationStrings}
                        setValue={setFullNameJapanValue}
                        handleChanged={handleTextChanged}
                        validate={checkForm} />
        <FormInputField label = {getTranslation(translationStrings, "tenvietkhongdau_label")} 
                        value = {nameUnsignedValue} 
                        placeholder={getTranslation(translationStrings, "nhapten_label")}
                        setValue={setNameUnsignedValue}
                        handleChanged={handleTextChanged}
                        translationStrings={translationStrings}
                        validate={checkForm} />
        <div className="groups-accounts__form groups-form__greys mb-20s">
            <p className="label-accounts__forms fs-15s mb-10s">{getTranslation(translationStrings, "birthday_label")}:</p>
            <div className="row gutter-20">
                <div className="col-lg-4">
                    <SelectBoxField options={yearsBirthDay}
                                    reff={refYearsBithDayObj}
                                    placeholder={getTranslation(translationStrings, "year_label")}
                                    setValue={setYearValue}
                                    value={yearValue}
                                    handleChanged={handleSelectBoxChanged}
                                    validate={checkForm}
                                    translationStrings={translationStrings} />
                </div>
                <div className="col-lg-4">
                    <SelectBoxField options={monthsBirthDay}
                                    reff={refMonthBithDayObj}
                                    setValue={setMonthValue}
                                    value={monthValue}
                                    placeholder={getTranslation(translationStrings, "month_label")}
                                    handleChanged={handleSelectBoxChanged}
                                    validate={checkForm}
                                    translationStrings={translationStrings} />
                </div>
                <div className="col-lg-4">
                    <SelectBoxField options={dateBirthDay}
                                    reff={refDateBithDayObj}
                                    setValue={setDayValue}
                                    placeholder={getTranslation(translationStrings, "day_label")}
                                    handleChanged={handleSelectBoxChanged}
                                    validate={checkForm}
                                    value={dayValue}
                                    translationStrings={translationStrings} />
                </div>
            </div>
        </div>
        <FormInputField label = {getTranslation(translationStrings, "msnenkin_label")} 
                        value = {nenkinCode} 
                        placeholder={getTranslation(translationStrings, "nhapso_label")}
                        setValue={setNenkinCode}
                        handleKeyDown={handleNumberChanged}
                        translationStrings={translationStrings}
                        validate={checkForm} />
        <FormCompanyAccordion translationStrings={translationStrings}
                                data = {companyInfoValue}
                                props = {{checkForm, companyInfoValidate, handleRemoveCompanyInfoChanged, handleAddCompanyInfoChanged, 
                                            handleUpdateCompanyInfoChanged, handleTextChanged}} />
        <FormInputField label = {getTranslation(translationStrings, "bankkhongdau_label")} 
                      value = {bankNameVietNamValue} 
                      placeholder={`${getTranslation(translationStrings, "vidu_label")}: VIETCOMBANK")`}
                      setValue={setBankNameVietNamValue}
                      handleChanged={handleTextChanged}
                      translationStrings={translationStrings}
                      validate={checkForm} />
        <FormInputField label = {getTranslation(translationStrings, "bankchinhanhkhongdau_label")} 
                      value = {bankNameBranchVietNamValue} 
                      placeholder={`${getTranslation(translationStrings, "vidu_label")}: VIETCOMBANK DONG DONG NAI - TRU SO CN")`}
                      setValue={setBankNameBranchVietNamValue}
                      handleChanged={handleTextChanged}
                      translationStrings={translationStrings}
                      validate={checkForm} />
        <FormInputField label = {getTranslation(translationStrings, "bankdiachichinhanhkhongdau_label")} 
                      value = {addressBankNameBranchVietNamValue} 
                      placeholder={`${getTranslation(translationStrings, "vidu_label")}: 54-55 VO THI SAU - QUYET THANG - THANH PHO BIEN HOA - DONG NAI")`}
                      setValue={setAddressBankNameBranchVietNamValue}
                      handleChanged={handleTextChanged}
                      translationStrings={translationStrings}
                      validate={checkForm} />
        <FormInputField label = {getTranslation(translationStrings, "sotaikhoannganhang_label")} 
                      value = {noBankValue} 
                      placeholder={`${getTranslation(translationStrings, "vidu_label")}: 03106353686868")`}
                      setValue={setNoBankValue}
                      handleChanged={handleTextChanged}
                      translationStrings={translationStrings}
                      validate={checkForm} />
        <FormInputField label = {getTranslation(translationStrings, "diachicuoicungkhionhat_label")} 
                      value = {nameLastAddressValue} 
                      placeholder={`${getTranslation(translationStrings, "vidu_label")}: 大阪府和泉市光明台三丁目1番3-403号")`}
                      setValue={setNameLastAddressValue}
                      handleChanged={handleTextChanged}
                      translationStrings={translationStrings}
                      validate={checkForm} />
        <FormInputField label = {getTranslation(translationStrings, "mabuudiendiachicuoicungkhionhat_label")} 
                      value = {noZipValue} 
                      placeholder={`${getTranslation(translationStrings, "vidu_label")}: 522-0223")`}
                      setValue={setNoZipValue}
                      handleChanged={handleTextChanged}
                      translationStrings={translationStrings}
                      validate={checkForm} />
    </>
  )
}
