import RequiredFieldMsg from '@components/templates/required-field';
import { getTranslation } from '@js_dir/utils/translations';
import React, {useState, useEffect} from 'preact/compat'
import FormInputDateField from './form-input-date-field';
import FormInputField from './form-input-field';
function TemplateCompanyItem({ index = 0, 
                                data, 
                                props,
                                translationStrings }) {    
    const { checkForm, handleRemoveCompanyInfoChanged, handleUpdateCompanyInfoChanged, handleTextChanged } = props;
    const [nameValue, setNameValue] = useState('');
    const [fromDateValue, setFromDateValue] = useState('');
    const [toDateValue, setToDateValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    useEffect(() => {
        const {id, name, fromDate, toDate, address} = data; 
        setNameValue(name);
        setFromDateValue(fromDate);
        setToDateValue(toDate);
        setAddressValue(address);
    }, [data]);
    useEffect(() => {
        handleUpdateCompanyInfoChanged.call(this, data.id, {name : nameValue, 
                                                            fromDate : fromDateValue, 
                                                            toDate : toDateValue, 
                                                            address : addressValue});
    }, [nameValue, fromDateValue, toDateValue, addressValue]);
    //console.log('nameValue: ' + nameValue);
    //console.log('toDateValue: ' + toDateValue);
    return (
        <div className="row gutter-20 mb-10s">
            {index > 0 ? (
                <div className="col-lg-12 mb-10s">
                    <p className="btn-remove__companys" 
                        style={{textAlign: 'right'}}
                        onClick={handleRemoveCompanyInfoChanged.bind(this, data.id)}>- {getTranslation(translationStrings, "xoa_label")}</p>
                </div>
            ) : null}
            <div className="col-lg-6">
                <FormInputField label = {""} 
                                value = {nameValue}
                                setValue = {setNameValue}
                                placeholder={getTranslation(translationStrings, "nhaptencongty_label")}
                                mb={0}
                                handleChanged={handleTextChanged} />
            </div>
            <div className="col-lg-3">
                <FormInputDateField value = {fromDateValue}
                                    setValue = {setFromDateValue}
                                    handleChanged = {handleTextChanged}
                                    placeholder = {getTranslation(translationStrings, "tungay_label")} />
            </div>
            <div className="col-lg-3">
                <FormInputDateField value = {toDateValue}
                                    setValue = {setToDateValue}
                                    handleChanged = {handleTextChanged}
                                    placeholder = {getTranslation(translationStrings, "denngay_label")} />
            </div>
            <div className={`col-lg-12`}>
                <FormInputField label = {""} 
                                value = {addressValue} 
                                setValue = {setAddressValue}
                                placeholder={getTranslation(translationStrings, "nhapdiachihantu_label")}
                                mb = {0}
                                handleChanged={handleTextChanged} />
            </div>            
        </div>
    )
}
export default function FormCompanyAccordion({ translationStrings, data, props }) {
    const {checkForm, companyInfoValidate} = props;
    //console.log(data);
    const arrCompanyInfos = data ? data.map((item, i) => <TemplateCompanyItem key = {item} 
                                                                        data = {item}
                                                                        index = {i}
                                                                        translationStrings = {translationStrings}
                                                                        props = {props} />) : null;
    
  return (
    <div className="groups-accounts__form groups-form__greys groups-form__dates mb-20s">
        <p className="label-accounts__forms fs-15s mb-10s">{getTranslation(translationStrings, "congty_label")}:</p>
        {arrCompanyInfos}
        <p className="btn-add__companys" 
            onClick={props.handleAddCompanyInfoChanged}>+ {getTranslation(translationStrings, "them_label")}</p>
        {checkForm && !companyInfoValidate ? (
            <div style={{order : 4, width : '100%', marginTop: '5px'}}>
                <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
            </div>
        ) : null}
    </div>
  )
}
