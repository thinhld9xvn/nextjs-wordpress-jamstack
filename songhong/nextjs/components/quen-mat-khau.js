import { isDiff } from '@js_dir/utils/arrayUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { SendResetPassword } from '@lib/mutations/send-reset-password';
import { useRouter } from 'next/router';
import React, {useEffect, useState, useRef} from 'preact/compat'
import { connect } from 'react-redux';
import HeaderAccount from './account/header-account';
import SliderAccountTemplate from './account/slider-account-template';
import LoadingOvery from './templates/loading-overlay';
import RankMath from './templates/rankmath';
import RequiredFieldMsg from './templates/required-field';

function QuenMatKhauPg({ pageContext, siteOptions, UpdateSiteOptions, translationStrings }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showSuccessMsg, setShowSuccessMsg] = useState(false);
    const [checkForm, setCheckForm] = useState(false);
    const [username, setUserName] = useState('');
    const refUserName = useRef(null);
    const {siteOptions : mySiteOptions, pageInfo, seo, accountOptions} = pageContext;
    useEffect(() => {       
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
        return() => {
        }
    }, [,router.locale]); 
    useEffect(() => {       
        setLoading(false);
        setShowSuccessMsg(false);
        setCheckForm(false);
        setUserName('');
        refUserName.current.value = '';
    }, [,router.locale]); 
    const {logo} = mySiteOptions; 
    const {slider_account} = accountOptions;
    const handleResetForm = (e) => {
        setUserName('');  
        refUserName.current.value = '';      
    }
    const handleSendPassword = async (e) => {
        e.preventDefault();
        setShowSuccessMsg(false);
        setCheckForm(true);       
        if ( !username ) return;
        setLoading(true);
        const results = await SendResetPassword(username);
        if ( !results.sendPasswordResetEmail ) {
            handleResetForm();
            setLoading(false);
            setCheckForm(false);
            setTimeout(() => {
                alert(getTranslation(translationStrings, "usernamenotfound_label"));
            }, 100);
            return;
        }
        handleResetForm();
        setCheckForm(false);
        setLoading(false);
        setShowSuccessMsg(true);
    }
    const handleChange = (e) => {
        setUserName(e.target.value);
    }
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
                    <div className={`${!showSuccessMsg ? "form-account__pass" : "text-register__confirms"}`}>
                        <h2 className="titles-bold__alls titles-center__alls color-blues fs-32s mb-60s">
                            {getTranslation(translationStrings, "quenmatkhau_label")}
                        </h2>
                        {!showSuccessMsg ? (
                            <form id="frmForgotPassword"  autoComplete="Off">
                                <div className="groups-accounts__form mb-20s">
                                    <div className="control-groups__accounts">
                                        <input type="text" 
                                                placeholder={`${getTranslation(translationStrings, "emailhoacsodienthoai_label")}*`}
                                                value={username}
                                                ref={refUserName}
                                                onChange={handleChange} />
                                    </div>
                                    {checkForm && !username ? (
                                        <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                                    ) : null}
                                </div>
                                <a href="#" 
                                    className="btn-sea__alls fs-15s mb-15s"
                                    onClick={handleSendPassword}>{getTranslation(translationStrings, "timlaimatkhau_label")}</a>
                            </form>
                        ) : <p>{getTranslation(translationStrings, "vuilongkiemtraemaildenhanmatkhau_label")}</p>}
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
export default connect(mapStateToProps, mapDispatchToProps)(QuenMatKhauPg);

