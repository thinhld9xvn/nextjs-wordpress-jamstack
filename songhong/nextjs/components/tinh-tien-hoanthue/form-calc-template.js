import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import FormInputBoxTemplate from '../templates/form-inputbox-template';
import FormSelectBoxTemplate from './form-selectbox-template';
export default function FormCalcTemplate({ options, props, refs, translationStrings }) {
  const {agesPMOptions, agesChildsOptions, yesNoOptions} = options;
  const {enableParentSelect, enableSiblingsSelect, enableMotherSelect, enableHusWifeSelect,
          enableTeenAgeInputBox, enableOutTeenAgeInputBox,
          parentSelectedValue, motherSelectedValue, siblingsSelectedValue, husWifeSelectedValue,
          setEnableParentSelect, setEnableMotherSelect, setEnableSiblingsSelect, setEnableHusWifeSelect,
          setParentSelectedValue, setMotherSelectedValue, setSiblingsSelectedValue, setHusWifeSelectedValue,
          setTeenNumChilds, setOlderNumChilds, setSoTienNhan, setSoTienChiTra, setSoTienBHXH, setSoTienThue,
          handleUTickOption, handleChangedOption, handleNumberInBoxChanged, handleGetPasteOnlyNumbers,
          handleSubmit} = props;
  const {parentSelectRef, motherSelectRef, siblingsSelectRef, husWifeSelectRef, checkboxesRef} = refs;
  //console.log(enableTeenAgeInputBox, enableOutTeenAgeInputBox);
  return (
    <div className="form-content__accounts mb-60s">
        <form id="hoanthue-form" onSubmit={handleSubmit}>
            <div className="groups-accounts__form mb-20s">
                <p className="fs-15s mb-20s">{getTranslation(translationStrings, "quanhevoinguoiguitien_label")}</p>
                <FormSelectBoxTemplate refObj={parentSelectRef}
                                       options={agesPMOptions}
                                       tickValue={enableParentSelect}
                                       selectValue={parentSelectedValue}
                                       setTickValue={setEnableParentSelect}
                                       setSelectValue={setParentSelectedValue}
                                       handleUTickOption={handleUTickOption}
                                       handleChangedOption={handleChangedOption}
                                       selectLabel={getTranslation(translationStrings, "cha_label")}
                                       placeholderLabel={getTranslation(translationStrings, "chondotuoi_label")}
                                       refCheckBoxIndex = {0}
                                       refCheckbox = {checkboxesRef} />
                <FormSelectBoxTemplate refObj={motherSelectRef}
                                       options={agesPMOptions}
                                       tickValue={enableMotherSelect}
                                       selectValue={motherSelectedValue}
                                       setTickValue={setEnableMotherSelect}
                                       setSelectValue={setMotherSelectedValue}
                                       handleUTickOption={handleUTickOption}
                                       handleChangedOption={handleChangedOption}
                                       selectLabel={getTranslation(translationStrings, "me_label")}                                       
                                       placeholderLabel={getTranslation(translationStrings, "chondotuoi_label")}
                                       refCheckBoxIndex = {1}
                                       refCheckbox = {checkboxesRef} />
                <FormSelectBoxTemplate refObj={siblingsSelectRef}
                                       options={agesChildsOptions}
                                       tickValue={enableSiblingsSelect}
                                       selectValue={siblingsSelectedValue}
                                       setTickValue={setEnableSiblingsSelect}
                                       setSelectValue={setSiblingsSelectedValue}
                                       handleUTickOption={handleUTickOption}
                                       handleChangedOption={handleChangedOption}
                                       selectLabel={getTranslation(translationStrings, "anhchiemcon_label")}
                                       placeholderLabel={getTranslation(translationStrings, "chondotuoi_label")}
                                       isMultiple={true} 
                                       refCheckBoxIndex={2}
                                       refCheckbox={checkboxesRef}/>
                <FormSelectBoxTemplate refObj={husWifeSelectRef}
                                       options={yesNoOptions}
                                       tickValue={enableHusWifeSelect}
                                       selectValue={husWifeSelectedValue}
                                       setTickValue={setEnableHusWifeSelect}
                                       setSelectValue={setHusWifeSelectedValue}
                                       handleUTickOption={handleUTickOption}
                                       handleChangedOption={handleChangedOption}
                                       selectLabel={getTranslation(translationStrings, "vochong_label")}
                                       noEnabled={true}
                                       placeholderLabel={null}
                                       refCheckBoxIndex={3}
                                       refCheckbox={checkboxesRef} />
            </div>
            {enableTeenAgeInputBox ? (
              <FormInputBoxTemplate label={getTranslation(translationStrings, "tongsoanhchiemcondaguitienve_label").concat(' (', getTranslation(translationStrings, "tu19den23tuoi_label"), ')')}
                                    placeholderLabel={getTranslation(translationStrings, "dientongsonguoi_label")}
                                    groupboxLabel={getTranslation(translationStrings, "nguoi_label")}
                                    id="tongsoanhchiem__teen"
                                    setValue={setTeenNumChilds}
                                    handleChanged={handleNumberInBoxChanged}
                                    handlePaste={handleGetPasteOnlyNumbers} />
            ) : null}
            {enableOutTeenAgeInputBox ? (
              <FormInputBoxTemplate label={getTranslation(translationStrings, "tongsoanhchiemcondaguitienve_label").concat(' (', getTranslation(translationStrings, "ngoai19den23tuoi_label"), ')')}
                                    placeholderLabel={getTranslation(translationStrings, "dientongsonguoi_label")}
                                    groupboxLabel={getTranslation(translationStrings, "nguoi_label")}
                                    id="tongsoanhchiem__older"
                                    setValue={setOlderNumChilds}
                                    handleChanged={handleNumberInBoxChanged}
                                    handlePaste={handleGetPasteOnlyNumbers} />
            ) : null}
            <FormInputBoxTemplate label={getTranslation(translationStrings, "sotienduocchitra_label")}
                                  placeholderLabel={getTranslation(translationStrings, "diensotien_label")}
                                  groupboxLabel={getTranslation(translationStrings, "yen_label")}
                                  id="sotienchitra"
                                  setValue={setSoTienChiTra}
                                  handleChanged={handleNumberInBoxChanged}
                                  handlePaste={handleGetPasteOnlyNumbers} />
            <FormInputBoxTemplate label={getTranslation(translationStrings, "sotiennhanduoc_label")}
                                  placeholderLabel={getTranslation(translationStrings, "diensotien_label")}
                                  groupboxLabel={getTranslation(translationStrings, "yen_label")}
                                  id="sotiennhanduoc"
                                  setValue={setSoTienNhan}
                                  handleChanged={handleNumberInBoxChanged}
                                  handlePaste={handleGetPasteOnlyNumbers} />
            <FormInputBoxTemplate label={getTranslation(translationStrings, "sotienbaohiemxahoi_label")}
                                  placeholderLabel={getTranslation(translationStrings, "diensotien_label")}
                                  groupboxLabel={getTranslation(translationStrings, "yen_label")}
                                  id="bhxh"
                                  setValue={setSoTienBHXH}
                                  handleChanged={handleNumberInBoxChanged}
                                  handlePaste={handleGetPasteOnlyNumbers} />
            <FormInputBoxTemplate label={getTranslation(translationStrings, "tienthue_label")}
                                  placeholderLabel={getTranslation(translationStrings, "diensotien_label")}
                                  groupboxLabel={getTranslation(translationStrings, "yen_label")}
                                  id="tienthue"
                                  setValue={setSoTienThue}
                                  handleChanged={handleNumberInBoxChanged}
                                  handlePaste={handleGetPasteOnlyNumbers} />
            <button className="btn-opacity__blues titles-bold__alls">{getTranslation(translationStrings, "tinhtienhoanthue_label")}</button>
        </form>
    </div>
  )
}
