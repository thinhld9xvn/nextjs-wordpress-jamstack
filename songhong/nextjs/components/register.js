import { isDiff, isEmptyObj } from '@js_dir/utils/arrayUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { getPageUrlByLocale } from '@js_dir/utils/urlUtils';
import { RegisterUser } from '@lib/mutations/register';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'preact/compat'
import { connect } from 'react-redux';
import HeaderAccount from './account/header-account';
import RegisterForm from './account/register-form';
import SliderAccountTemplate from './account/slider-account-template';
import LoadingOvery from './templates/loading-overlay';
import RankMath from './templates/rankmath';

function RegisterPg({ pageContext, siteOptions, UpdateSiteOptions, translationStrings }) {
    const router = useRouter();
    const {siteOptions : mySiteOptions, pageInfo, seo, accountOptions} = pageContext;
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [retypePassword, setRetypePassword] = useState('');
    const [email, setEmail] = useState('');
    const [fullname, setFullName] = useState('');
    const [userFbInfo, setUserFbInfo] = useState({});
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [popup, setPopUp] = useState(false);
    const [linkedFb, setLinkedFb] = useState(false);
    const [checkForm, setCheckForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    useEffect(() => {       
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
        return() => {
        }
    }, [,router.locale]); 
    useEffect(() => {
        handleResetForm();
    }, [,router.locale]); 
    const {logo} = mySiteOptions; 
    const {slider_account, note_register_html} = accountOptions;
    const handleResetForm = () => {
        document.getElementById('register-form')
                .querySelectorAll('input')
                .forEach(input => {
            const type = input.getAttribute('type');
            if (type === 'text' || type === 'password' || type === 'email') {
                input.value = '';
            }
            if ( type === 'checkbox' ) {
                input.checked = false;
            }
        });
        setUserName('');
        setPassword('');
        setRetypePassword('');
        setEmail('');
        setFullName('');
        setUserFbInfo({});
        setPhone('');
        setAddress('');
        setPopUp(false);
        setLinkedFb(false);
        setCheckForm(false);
        setAcceptTerms(false);
    }
    const handleChanged = (setValue, e) => {
        setValue(e.currentTarget.value);
    }
    const handleAcceptTerms = (e) => {
        setAcceptTerms(!acceptTerms);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();    
        const locale = router.locale;
        setCheckForm(true);        
        if (!username || !email || !password || 
                !fullname || !acceptTerms || isEmptyObj(userFbInfo)) return;        
        setShowLoading(true);
        const results = await RegisterUser({username, email, userFbInfo,
                                                fullname, phone, address, password});
        if ( !results.registerUser ) {
            const {message} = results[0];
            setShowLoading(false);
            setCheckForm(false);
            setTimeout(() => {
                alert(getTranslation(translationStrings, message));
            }, 100);
            return;
        }
        handleResetForm();
        setShowLoading(false);
        setCheckForm(false);
        router.push(getPageUrlByLocale('dang_nhap', locale));
    }
  return (
    <>
        <RankMath data = {seo} />
        <main>
            <HeaderAccount logo = {logo} 
                            translationStrings = {translationStrings}
                            locale = {router.locale}
                            showLoginButton = {true} />
            <section className="content-account__pass">
                <div className="left-accounts__pass">
                    <div className="form-account__pass">                        
                        <RegisterForm title = {pageInfo.title}
                                      translationStrings = {translationStrings}
                                      props = {{
                                        note_register_html,
                                        username, setUserName,
                                        password, setPassword,
                                        retypePassword, setRetypePassword,
                                        fullname, setFullName,
                                        phone, setPhone,
                                        email, setEmail,
                                        popup, setPopUp,
                                        linkedFb, setLinkedFb,
                                        address, setAddress,
                                        acceptTerms, setAcceptTerms,
                                        userFbInfo, setUserFbInfo,
                                        checkForm, setCheckForm,
                                        handleChanged,
                                        handleAcceptTerms,
                                        handleSubmit
                                      }} />
                    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterPg);

