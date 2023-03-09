import { PAGES } from '@constants/constants';
import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import { isDiff } from '@js_dir/utils/arrayUtils';
import { encryptPassword } from '@js_dir/utils/encrypt';
import { handleLoginKeyDownChanged, handleSubmitLogin, resetLoginForm } from '@js_dir/utils/login/loginUtils';
import { setUserData, setUserToken } from '@js_dir/utils/membershipUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { getPageUrlByLocale } from '@js_dir/utils/urlUtils';

import { Login } from '@lib/mutations/login';
import { route } from 'next/dist/server/router';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'preact/compat'
import { connect } from 'react-redux';
import HeaderAccount from './account/header-account';
import LoginForm from './account/login-form';
import SliderAccountTemplate from './account/slider-account-template';
import LoadingOvery from './templates/loading-overlay';
import RankMath from './templates/rankmath';

function LoginPg({ pageContext, siteOptions, UpdateSiteOptions, translationStrings, loginSuccess }) {
    const router = useRouter();
    const {siteOptions : mySiteOptions, pageInfo, seo, accountOptions} = pageContext;
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [checkForm, setCheckForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const propsSetStates = {username, password, router, translationStrings, 
                                setShowLoading, setCheckForm, setUserName, setPassword, setUserData,
                                    resetFormCallback : null,
                                    loginFormCallback : null};
    useEffect(() => {       
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
        resetForm();
        return() => {
        }
    }, [,router.locale]); 
    const {logo} = mySiteOptions; 
    const {slider_account} = accountOptions;
    const resetForm = resetLoginForm.bind(this, {...propsSetStates}); 
    const handleLogin = handleSubmitLogin.bind(this, {...propsSetStates, 
                                                        resetFormCallback : resetForm});
    const handlePerformLoginKeyDown = handleLoginKeyDownChanged.bind(this, {...propsSetStates, 
                                                                            resetFormCallback : resetForm,
                                                                            loginFormCallback : handleLogin});
    const handleChanged = (setValue, e) => {
        setValue(e.currentTarget.value);
    }
    const {locale} = router;
  return (
    <>
        <RankMath data = {seo} />
        <main>
            <HeaderAccount logo = {logo} 
                            translationStrings = {translationStrings}
                            locale = {locale}
                            showRegisterButton = {true} />
            <section className="content-account__pass">
                <div className="left-accounts__pass">
                    <LoginForm title = {pageInfo.title} 
                                translationStrings={translationStrings}
                                handleLogin = {handleLogin}
                                props = {{
                                    username,
                                    password,
                                    checkForm,
                                    loginSuccess,
                                    locale,
                                    setUserName,
                                    setPassword,
                                    handleChanged,
                                    handlePerformLoginKeyDown
                                }} />
                </div>
                <div className="right-accounts__pass">
                    <SliderAccountTemplate data = {slider_account} />
                </div>
            </section>
        </main>
        <LoadingOvery show = {showLoading} />
    </>
  )
}
function mapStateToProps(state) {   
    return { 
        siteOptions : state.globalReducer.siteOptions,
        translationStrings : state.globalReducer.translationStrings,
        loginSuccess : state.globalReducer.loginSuccess
    }
}
function mapDispatchToProps(dispatch) {
    return {
        UpdateSiteOptions : async (v) => await dispatch({
            type : "UPDATE_SITE_OPTIONS",
            payload : v
        }),
        UpdateLoginSuccess : async (v) => await dispatch({
            type : "UPDATE_LOGIN_SUCCESS",
            payload : v
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginPg);

