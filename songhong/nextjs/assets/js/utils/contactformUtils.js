import axios from "axios";
import { getTranslation } from "./translations";
var translations = {};
export function setTranslations(v) {
    translations = {...v};
}
export function validateTextField(field) {
    const value = field.value.trim();
    if ( value === '' ) {
        return false;
    } 
    return true;
}
export function validateEmailField(field) {
    const value = field.value.trim();
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(value);
}
export function validateUrlField(field) {
    const value = field.value.trim();  
    const urlRegex = /^((http(s?)?):\/\/)?([wW]{3}\.)?[a-zA-Z0-9\-.]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/g;
    return urlRegex.test(value);
}
export function validatePhoneField(field) {
    const value = field.value.trim();  
    const reg = /[0-9]{9,11}/g;
    return reg.test(value);
}
export function setValidateField(field, boolValidate, msg) {
    const isGroupContainer = field.closest('.groups-accounts__form') !== null;
    const e = isGroupContainer ? field.closest('.groups-accounts__form').querySelector('.form-error-valid') : 
                                    field.closest('.wpcf7-form-control-wrap').querySelector('.form-error-valid');
    if ( boolValidate ) {
        if ( e !== null ) {
            e.remove();
        }
    }
    else {
        if ( e !== null ) {
            e.innerHTML = msg;
        }
        else {
            const errorElem = document.createElement('span');
            errorElem.setAttribute('class', 'form-error-valid');
            errorElem.innerHTML = msg;
            if ( isGroupContainer ) {
                field.closest('.groups-accounts__form').append(errorElem);                    
            }
            else {
                field.closest('.wpcf7-form-control-wrap').append(errorElem);
            }
        }
    }
}
function showLoading(form) {
    const spinner = document.createElement('i');
    spinner.className = 'fa fa-spinner fa-spin';
    //
    const submit = form.querySelector('.wpcf7-submit');
    form.classList.add('form-disabled');    
    submit.parentElement.classList.add('loading');
    submit.classList.add('form-disabled');
    submit.parentElement.append(spinner);
}
function hideLoading(form) {
    const submit = form.querySelector('.wpcf7-submit');
    form.classList.remove('form-disabled');
    submit.parentElement.classList.remove('loading');
    submit.classList.remove('form-disabled');
    submit.parentElement.querySelector('i').remove();
}
export function handleValidateForm(fields) {
    let boolValidate = true;
    let boolFormValidate = true;
    fields.forEach(field => {
        const type = field.type;
        switch (type) {
            case 'text' : 
                boolValidate = validateTextField(field);
                boolFormValidate = boolFormValidate && boolValidate;
                setValidateField(field, boolValidate, translations.requriredfield_label);
                break;
            case 'textarea' : 
                boolValidate = validateTextField(field);
                boolFormValidate = boolFormValidate && boolValidate;
                setValidateField(field, boolValidate, translations.requriredfield_label);
                break;
            case 'email' : 
                boolValidate = validateEmailField(field);
                boolFormValidate = boolFormValidate && boolValidate;
                setValidateField(field, boolValidate, translations.requiredemailfield_label);
                break;
            case 'url' : 
                boolValidate = validateUrlField(field);
                boolFormValidate = boolFormValidate && boolValidate;
                setValidateField(field, boolValidate, translations.requiredurlfield_label);
                break;
            case 'tel' :
                boolValidate = validatePhoneField(field);
                boolFormValidate = boolFormValidate && boolValidate;
                setValidateField(field, boolValidate, translations.requiredphonefield_label);
                break;
            case 'select-one' : 
                boolValidate = validateTextField(field);
                boolFormValidate = boolFormValidate && boolValidate;
                setValidateField(field, boolValidate, translations.requriredfield_label);
                break;
        }        
    });
    return boolFormValidate;
}
export async function onSubmit_submitCf7(e, translationsString, locale, cfForms) {
    e.preventDefault();
    const form = e.target;
    const fields = form.querySelectorAll('*[aria-required="true"]')
    const boolFormValidate = handleValidateForm(fields);
    if ( !boolFormValidate ) {
        return;
    }   
    showLoading(form);
    const fd  = new FormData(form);
    const fid = cfForms[locale];  
    axios.interceptors.response.use(
        res => res,
        err => false
    );
    const response = await axios.post(process.env.WP_SITE_URL + `/wp-json/contact-form-7/v1/contact-forms/${fid}/feedback`, fd);
    if ( !response ) {        
        hideLoading(form);
        setTimeout(() => {
            alert(getTranslation(translationsString, "loitrongquatrinhguimail_label"));
        }, 100);
        return;
    }
    const { data } = response;
    if ( data.status !== 'mail_sent' ) {
        hideLoading(form);
        setTimeout(() => {
            alert(getTranslation(translationsString, "loitrongquatrinhguimail_label"));
        }, 100);        
        return;
    }   
    form.reset();
    setTimeout(() => {
        alert(getTranslation(translationsString, "bandaguimailthanhcong_label"));
    }, 100);
}
