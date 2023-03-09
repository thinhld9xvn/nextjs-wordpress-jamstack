import { PAGES } from '@constants/constants';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { getPageUrlBySlug, getParamFromURL } from '@js_dir/utils/urlUtils';
import { resetUserPassword } from '@lib/mutations/reset-password';
import { useRouter } from 'next/router';
import React, {useEffect, useState, useRef} from 'preact/compat'
import { connect } from 'react-redux';
import HeaderAccount from './account/header-account';
import SliderAccountTemplate from './account/slider-account-template';
import LoadingOvery from './templates/loading-overlay';
import RankMath from './templates/rankmath';
import RequiredFieldMsg from './templates/required-field';

function ResetMatKhauPg({ pageContext, siteOptions, UpdateSiteOptions, translationStrings }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [checkForm, setCheckForm] = useState(false);
    const [username, setUserName] = useState('');
    const [key, setKey] = useState('');
    const [newpassword, setNewPassword] = useState('');
    const [retypepassword, setRetypePassword] = useState('');
    const refNewPass = useRef(null);
    const refRetypeNewPass = useRef(null);
    const {siteOptions : mySiteOptions, pageInfo, seo, accountOptions} = pageContext;
    useEffect(() => {       
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
        return() => {
        }
    }, [,router.locale]); 
    useEffect(() => {   
        setCheckForm(false);
        setNewPassword('');
        setRetypePassword('');
        refNewPass.current && (refNewPass.current.value = '');
        refRetypeNewPass.current && (refRetypeNewPass.current.value = '');
    }, [,router.locale]); 
    useEffect(() => {
        setLoading(true);
        const _username = getParamFromURL('username');
        const _key = getParamFromURL('key');
        if ( !_username || !_key ) {
            router.push('/', '/');
            return;
        }
        setUserName(_username);
        setKey(_key);
        setLoading(false);
    }, [,router.locale]); 
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setCheckForm(true);
        if ( !newpassword || !retypepassword || newpassword !== retypepassword ) {
            return;
        }
        setLoading(true);
        const results = await resetUserPassword({key, username, newpassword});
        //console.log(results);
        if ( !results.resetUserPassword ) {
            setLoading(false);
            setTimeout(() => {
                alert(getTranslation(translationStrings, "makeykhongtontai_label"));
            }, 100);            
            return;
        }
        router.push(getPageUrlBySlug(PAGES.DANG_NHAP[router.locale]));
        setCheckForm(false);
    }
    const handleChanged = (setValue, e) => {
        setValue(e.target.value);
    }
    const {logo} = mySiteOptions; 
    const {slider_account} = accountOptions;    
  return (
    <>
        <RankMath data = {seo} />
        <main>
            <HeaderAccount logo = {logo} 
                            translationStrings = {translationStrings}
                            locale = {router.locale}
                            showRegisterButton = {true} />
            <section className="content-account__pass">
                <div className="left-accounts__pass">
                    <div className="form-account__pass">
                        <h2 className="titles-bold__alls titles-center__alls color-blues fs-32s mb-60s ">{getTranslation(translationStrings, "datlaimatkhau_label")}</h2>
                        <form id="frmResetPassword"  autoComplete="Off">
                            <div className="groups-accounts__form mb-20s">
                                <div className="control-groups__accounts">
                                    <input type="text" 
                                            className="disabled" 
                                            placeholder={getTranslation(translationStrings, "userkey_label")}
                                            readOnly={true}
                                            value={key} />
                                </div>
                            </div>
                            <div className="groups-accounts__form mb-20s">
                                <div className="control-groups__accounts">
                                    <input type="text"
                                            className="disabled" 
                                            placeholder={getTranslation(translationStrings, "username_label")}
                                            readOnly={true}
                                            value={username} />
                                </div>
                            </div>
                            <div className="groups-accounts__form mb-20s">
                                <div className="control-groups__accounts">
                                    <input type="password" 
                                            placeholder={getTranslation(translationStrings, "newpassword_label")}
                                            value={newpassword}
                                            ref={refNewPass}
                                            onChange={handleChanged.bind(this, setNewPassword)} />
                                </div>
                                {checkForm && !newpassword ? (
                                    <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                                ) : null}
                            </div>
                            <div className="groups-accounts__form mb-20s">
                                <div className="control-groups__accounts">
                                    <input type="password" 
                                            placeholder={getTranslation(translationStrings, "xacnhannewpassword_label")}
                                            value={retypepassword}
                                            ref={refRetypeNewPass}
                                            onChange={handleChanged.bind(this, setRetypePassword)} />
                                </div>
                                {checkForm && !retypepassword ? (
                                    <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                                ) : null}
                                {checkForm && (!newpassword || !retypepassword || newpassword !== retypepassword) ? (
                                    <RequiredFieldMsg msg = {getTranslation(translationStrings, "passwordretypeincorrect_label")} />
                                ) : null}
                            </div>
                            <a href="#" 
                                className="btn-sea__alls fs-15s mb-15s"
                                onClick={handleResetPassword}>
                                {getTranslation(translationStrings, "datlaimatkhau_label")}
                            </a>
                        </form>
                    </div>
                </div>
                <div className="right-accounts__pass">
                    <SliderAccountTemplate data = {slider_account} />
                </div>
            </section>
        </main>
        <LoadingOvery show = {loading} />
    </>
  )
}
function mapStateToProps(state) {   
    return { 
        siteOptions : state.globalReducer.siteOptions,
        translationStrings : state.globalReducer.translationStrings
    }
}
function mapDispatchToProps(dispatch) {
    return {
        UpdateSiteOptions : async (v) => await dispatch({
            type : "UPDATE_SITE_OPTIONS",
            payload : v
        })
    }}
export default connect(mapStateToProps, mapDispatchToProps)(ResetMatKhauPg);

