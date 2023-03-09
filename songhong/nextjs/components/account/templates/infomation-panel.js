import LoadingOvery from '@components/templates/loading-overlay';
import { isEmptyObj } from '@js_dir/utils/arrayUtils';
import { handleNumberChanged as _handleNumberChanged } from '@js_dir/utils/handleInputBoxUtils';
import { getHosoDateExpired } from '@js_dir/utils/hosoUtils';
import { setUserMetaData } from '@js_dir/utils/membershipUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { UpdateUser } from '@lib/mutations/update-user';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, {useState, useEffect, useRef, useCallback} from 'preact/compat'
import FormPage1 from './form-information/form-page1';
import FormPage2 from './form-information/form-page2';
const DEFAULT_COMPANY_INFO = { id : 0, 
                                name : '', 
                                fromDate : '', 
                                toDate : '', 
                                address : '' };
export default function InformationPanel({ data, translationStrings }) {
    const router = useRouter();   
    const {data : session} = useSession();
    //
    const [checkForm, setCheckForm] = useState(false);  
    //
    const [loading, setLoading] = useState(false);
    const [popup, setPopUp] = useState(false);
    const [linkedFb, setLinkedFb] = useState(true);
    //
    const [userId, setUserId] = useState('');
    const [fullnameValue, setFullNameValue] = useState('');
    const [addressValue, setAddressValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [phoneValue, setPhoneValue] = useState('');
    const [facebookInfoValue, setFacebookInfoValue] = useState({});
    const [shortAbbrValue, setShortAbbrValue] = useState('');
    //
    const [fullnameJapanValue, setFullNameJapanValue] = useState('');
    const [nameUnsignedValue, setNameUnsignedValue] = useState('');
    const [yearValue, setYearValue] = useState({});
    const [monthValue, setMonthValue] = useState({});
    const [dayValue, setDayValue] = useState({});
    const [nenkinCode, setNenkinCode] = useState('');
    const [companyInfoValue, setCompanyInfoValue] = useState([DEFAULT_COMPANY_INFO]);
    const [companyInfoValidate, setCompanyInfoValidate] = useState(false);
    const [bankNameVietNamValue, setBankNameVietNamValue] = useState('');
    const [bankNameBranchVietNamValue, setBankNameBranchVietNamValue] = useState('');
    const [addressBankNameBranchVietNamValue, setAddressBankNameBranchVietNamValue] = useState('');
    const [noBankValue, setNoBankValue] = useState('');
    const [nameLastAddressValue, setNameLastAddressValue] = useState('');
    const [noZipValue, setNoZipValue] = useState('');
    const [disableEditing, setDisableEditing] = useState(false);
    //
    const [paged, setPaged] = useState(1);
    const refYearsBithDayObj = useRef(null);
    const refMonthBithDayObj = useRef(null);
    const refDateBithDayObj = useRef(null);
    //
    const handleCheckCompanyInfo = () => {
        const boolResults = companyInfoValue.map(item => {
            const {id, name, fromDate, toDate, address} = item;
            if ( !name || !fromDate || !toDate || !address ) {
                return false;
            }
            return true;
        }).filter(result => !result).length === 0;
        return boolResults;
    }
    //
    const handleChangePaged = (n, e) => {
        e.preventDefault();        
        setPaged(n);
    }    
    const handleNumberChanged = useCallback(_handleNumberChanged, []);
    const handleTextChanged = useCallback((setValue, e) => {
        //console.log(e);
        setValue(e.currentTarget.value);
    }, []);
    const handleSelectBoxChanged = useCallback((setValue, e) => { 
        //const {label, value} = e;   
        setValue(e);
    }, []);
    const handleAddCompanyInfoChanged = useCallback((e) => {
        e.preventDefault();
        const data = [...companyInfoValue];
        data.push({
            id : data.length + 1,
            name : '', 
            fromDate : '', 
            toDate : '', 
            address : ''
        })
        setCompanyInfoValue([...data]);
    }, [,companyInfoValue]);
    const handleRemoveCompanyInfoChanged = useCallback((id, e) => {
        e.preventDefault();
        if (companyInfoValue.length > 1) {
            const data = [...companyInfoValue];
            data.splice(data.findIndex((item, i) => item.id === id), 1);
            setCompanyInfoValue([...data]);
        }
    }, [,companyInfoValue]);
    const handleUpdateCompanyInfoChanged = useCallback((id, values, e) => {
        //e.preventDefault();
        const data = [...companyInfoValue];
        const itemData = data.find((item, i) => item.id === id);
        itemData.name = values.name;
        itemData.fromDate = values.fromDate;
        itemData.toDate = values.toDate;
        itemData.address = values.address;
        setCompanyInfoValue([...data]);
    }, [,companyInfoValue]);    
    const handleSaveForm = async (e) => {
        e.preventDefault();
        setCheckForm(true);        
        const validateCompanyInfo = handleCheckCompanyInfo();
        if (!fullnameValue || !addressValue || !emailValue || !phoneValue || isEmptyObj(facebookInfoValue)) {
            setPaged(1);
            return;
        }
        else if (!fullnameJapanValue || !nameUnsignedValue || !yearValue || !monthValue || !dayValue || 
                  !nenkinCode || !bankNameVietNamValue || !bankNameBranchVietNamValue || !addressBankNameBranchVietNamValue || 
                    !noBankValue || !nameLastAddressValue || !noZipValue || !validateCompanyInfo) {
            setPaged(2);
            return;
        }
        setLoading(true);
        const birthdayValue = dayValue.value + '-' + monthValue.value + '-' + yearValue.value;
        const params = {id : userId, facebookInfoValue,
                        fullnameValue, phoneValue, addressValue, companyInfoValue,
                        fullnameJapanValue, nenkinCode,
                        noZipValue, nameLastAddressValue, nameUnsignedValue,
                        bankNameBranchVietNamValue, noBankValue,
                        addressBankNameBranchVietNamValue, birthdayValue, bankNameVietNamValue};
        const results = await UpdateUser(params);  
        if (!results.updateUser) {
            setLoading(false);
            setTimeout(() => {
                alert(translationStrings.updateusererror_label);
            }, 100);
            return;
        }
        setLoading(false);
        setUserMetaData({...data, 
                                address : addressValue,
                                facebook_metainfo : JSON.stringify(facebookInfoValue),
                                fullname : fullnameValue,
                                phone : phoneValue,
                                addressbanknamebranchvietnam : addressBankNameBranchVietNamValue,
                                banknamebranchvietnam : bankNameBranchVietNamValue,
                                banknamevietnam : bankNameVietNamValue,
                                birthday : birthdayValue,
                                companyinfo : JSON.stringify(companyInfoValue),
                                fullnamejapan : fullnameJapanValue,
                                namelastaddress : nameLastAddressValue,
                                nameunsigned : nameUnsignedValue,
                                nenkincode : nenkinCode,
                                nobank : noBankValue,
                                nozip : noZipValue});
        setPaged(1);
    };
    const handleOpenFacebookDialog = (e) => {
        e.preventDefault(); 
        if ( !linkedFb ) {
            setPopUp(true);
        }
        else {
            setLinkedFb(false);
        }
    }
    //
    useEffect(() => {
        setPaged(1);
    }, [,router.locale]);
    useEffect(() => {          
        window.scroll(0, 0);
      return () => {
      }
    }, [paged]);
    useEffect(() => {
        const {id, address,
                email,
                facebook_metainfo,
                fullname = '',
                phone,
                addressbanknamebranchvietnam,
                banknamebranchvietnam,
                banknamevietnam,
                birthday = '',
                companyinfo = '',
                fullnamejapan,
                namelastaddress,
                nameunsigned,
                nenkincode,
                nobank,
                nozip,
                hoso_session} = data || {};   
        const birthData = birthday.split('-');      
        const birthYear = birthData.length > 2 ? birthData[2] : '';
        const birthMonth = birthData.length > 1 ? birthData[1] : '';
        const birthDate = birthData.length > 0 ? birthData[0] : '';
        const cminfo = companyinfo ? JSON.parse(companyinfo) : [DEFAULT_COMPANY_INFO];        
        //
        setUserId(id);
        setFullNameValue(fullname);
        setAddressValue(address);
        setEmailValue(email);
        setPhoneValue(phone);
        setFacebookInfoValue(JSON.parse(facebook_metainfo || '{}'));        
        setShortAbbrValue(fullname.split(' ').pop());
        //
        setFullNameJapanValue(fullnamejapan);
        setAddressBankNameBranchVietNamValue(addressbanknamebranchvietnam);
        setBankNameBranchVietNamValue(banknamebranchvietnam);
        setBankNameVietNamValue(banknamevietnam);
        //
        setYearValue({label : birthYear, value : birthYear});
        setMonthValue({label : birthMonth, value : birthMonth});
        setDayValue({label : birthDate, value : birthDate});
        //
        //console.log(cminfo);
        setCompanyInfoValue(cminfo);
        //
        setNameLastAddressValue(namelastaddress);
        setNameUnsignedValue(nameunsigned);
        setNenkinCode(nenkincode);
        setNoBankValue(nobank);
        setNoZipValue(nozip);   
        //
        setDisableEditing(getHosoDateExpired(hoso_session) >= 0);     
    }, [data]);
    useEffect(() => {
        if ( checkForm ) {
            setCompanyInfoValidate(handleCheckCompanyInfo());
        }
    }, [checkForm, companyInfoValue]);
    useEffect(() => {
        if (popup) {
            var myWin = window.open('/sign-in', "", "width=800,height=500,top=100,left=300");
            myWin.onbeforeunload = function(){
                setPopUp(false);
                setLinkedFb(true);
            }
        }
      return () => {
      }
    }, [popup]);   
    useEffect(() => {
        if ( refYearsBithDayObj.current && yearValue && !yearValue.value ) {
            refYearsBithDayObj.current.clearValue();
        }
        if ( refMonthBithDayObj.current && monthValue && !monthValue.value ) {
            refMonthBithDayObj.current.clearValue();
        }
        if ( refDateBithDayObj.current && dayValue && !dayValue.value ) {
            refDateBithDayObj.current.clearValue();
        }
    }, [paged, yearValue, monthValue, dayValue]); 
    useEffect(() => {
        const elem = document.getElementById('lnk-account');
        if ( linkedFb && isEmptyObj(facebookInfoValue) && session && session.user ) {
            setFacebookInfoValue({...session.user});
            elem.value = session.user.name;
        }
        if ( !linkedFb ) {
            setFacebookInfoValue({});          
            elem.value = '';  
        }
    }, [linkedFb]);
    //
    const nowYear = (new Date()).getFullYear();
    const yearsBirthDay = [];
    const monthsBirthDay = [];
    const dateBirthDay = [];
    //
    for(let i = 1900; i <= nowYear; i++) {
        yearsBirthDay.push({
            label : i,
            value : i
        })
    }
    for(let i = 1; i < 13; i++) {
        monthsBirthDay.push({
            label : i,
            value : i
        })
    }
    for(let i = 1; i < 32; i++) {
        dateBirthDay.push({
            label : i,
            value : i
        })
    }
    //
    //console.clear();
    /*console.log(data);
    console.log('userid: ' + userId);
    console.log('fullname: ' + fullnameValue);
    console.log('address: ' + addressValue);
    console.log('phone: ' + phoneValue);
    console.log('email: ' + emailValue);
    console.log('facebook: ' + facebookInfoValue);
    console.log('fullnameJapanValue: ' + fullnameJapanValue);
    console.log('nameUnsignedValue: ' + nameUnsignedValue);
    console.log('yearValue: ' + yearValue);
    console.log('monthValue: ' + monthValue);
    console.log('dayValue: ' + dayValue);
    console.log('nenkinCode: ' + nenkinCode);
    console.log('companyInfoValue: ');
    console.log(companyInfoValue);
    console.log('bankNameVietNamValue: ' + bankNameVietNamValue);
    console.log('bankNameBranchVietNamValue: ' + bankNameBranchVietNamValue);
    console.log('addressBankNameBranchVietNamValue: ' + addressBankNameBranchVietNamValue);
    console.log('noBankValue: ' + noBankValue);
    console.log('nameLastAddressValue: ' + nameLastAddressValue);
    console.log('noZipValue: ' + noZipValue);*/
    //console.log(linkedFb);
    //console.log(facebookInfoValue);
  return (
    <>
        <div className="box-acounts__content content-right__accounts height-100s">
            <div className="top-accounts__rights mb-50s">
                <div className="text-top__accounts">
                    <h2 className="fs-32s mb-15s color-blues">{getTranslation(translationStrings, "xinchao_label").concat(shortAbbrValue ? ' ' + shortAbbrValue + ',' : ',')}</h2>
                    <p>{getTranslation(translationStrings, "quanlythongtincuaminh_label")}</p>
                </div>
                <a href="#" 
                    className="btn-sea__alls"
                    onClick={handleSaveForm}>{getTranslation(translationStrings, "save_label")}</a>
            </div>
            {/*<div className="progress-accounts__files mb-30s">
                <p className="titles-progress__files mb-25s">{getTranslation(translationStrings, "mucdohoanthanhhs_label")} 1/2</p>
                <div className="progress">
                    <div className="progress-bar" role="progressbar" style="width: 50%;" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
            </div>*/}
            <div className="form-content__accounts">
                <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">{getTranslation(translationStrings, "thongtincoban_label")}</h3>
                <form id = "frmUpdateForm">
                    {paged === 1 ? (
                        <FormPage1 data = {{fullnameValue, emailValue, addressValue, phoneValue, facebookInfoValue, linkedFb}}
                                    translationStrings = {translationStrings}
                                    props = {{linkedFb, checkForm, setFullNameValue, setAddressValue, setEmailValue, setPhoneValue, 
                                                handleTextChanged, handleNumberChanged, handleOpenFacebookDialog}} />
                    ) : null}
                    {paged === 2 ? (
                        <FormPage2 options = {{yearsBirthDay, monthsBirthDay, dateBirthDay}}
                                  translationStrings = {translationStrings}
                                  refs = {{refYearsBithDayObj, refMonthBithDayObj, refDateBithDayObj}}
                                  props = {{checkForm, companyInfoValidate,
                                                fullnameJapanValue, nameUnsignedValue, yearValue, monthValue, dayValue,
                                                nenkinCode, companyInfoValue, bankNameVietNamValue, bankNameBranchVietNamValue,
                                                addressBankNameBranchVietNamValue, noBankValue, nameLastAddressValue, noZipValue,
                                            setFullNameJapanValue, setNameUnsignedValue, setYearValue, setMonthValue, setDayValue,
                                            setNenkinCode, setCompanyInfoValue, setBankNameVietNamValue, setBankNameBranchVietNamValue,
                                            setAddressBankNameBranchVietNamValue, setNoBankValue, setNameLastAddressValue, setNoZipValue,
                                            handleNumberChanged, handleTextChanged, handleSelectBoxChanged, handleAddCompanyInfoChanged, handleRemoveCompanyInfoChanged, handleUpdateCompanyInfoChanged}} />
                    ) : null}
                    <div className="pagenigation pagenigation-custom">
                        <a href="#" className={"page-items ".concat(paged === 1 ? 'active' : '')}
                                    onClick={handleChangePaged.bind(this, 1)}> 1 </a>
                        <a href="#" className={"page-items ".concat(paged === 2 ? 'active' : '')}
                                    onClick={handleChangePaged.bind(this, 2)}> 2 </a>
                    </div>
                </form>    
            </div>
        </div>        
        <LoadingOvery show={loading} />
    </>
  )
}
