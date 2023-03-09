import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import FormInputField from './form-input-field';
import FormLinkedField from './form-linked-field';

export default function FormPage1({ data, translationStrings, props }) {
    const {linkedFb, fullnameValue, facebookInfoValue, addressValue, phoneValue, emailValue} = data || {};
    const {checkForm, setFullNameValue, setAddressValue, setPhoneValue, handleTextChanged, handleNumberChanged, handleOpenFacebookDialog} = props;
  return (
    <>
        <FormInputField label = {getTranslation(translationStrings, "hovaten_label")} 
                        value = {fullnameValue} 
                        setValue = {setFullNameValue}
                        placeholder=""
                        handleChanged={handleTextChanged}
                        translationStrings = {translationStrings}
                        validate={checkForm} />
        <FormLinkedField label = {getTranslation(translationStrings, "facebook_label")} 
                         labelLinked = {getTranslation(translationStrings, "lienket_label")} 
                         labelUnLinked = {getTranslation(translationStrings, "chualienket_label")} 
                         translationStrings = {translationStrings}
                         linkedFb = {linkedFb}
                         value = {facebookInfoValue.name}
                         placeholder = ""
                         handleChanged={handleOpenFacebookDialog}
                         validate={checkForm} />
        <FormInputField label = {getTranslation(translationStrings, "address_label")} 
                        setValue={setAddressValue} 
                        value = {addressValue} placeholder="" 
                        handleChanged = {handleTextChanged}
                        translationStrings = {translationStrings}
                        validate={checkForm} />
        <FormInputField label = {getTranslation(translationStrings, "phone_label")} 
                        value = {phoneValue} placeholder=""
                        setValue = {setPhoneValue}
                        handleChanged = {null}
                        handleKeyDown = {handleNumberChanged}
                        translationStrings = {translationStrings}
                        validate={checkForm} />
        <FormInputField label = {getTranslation(translationStrings, "email_label")} 
                          value = {emailValue} 
                          readonly = {true} 
                          placeholder="" 
                          validate={checkForm}
                          translationStrings = {translationStrings}
                          mb={40} />
    </>
  )
}
