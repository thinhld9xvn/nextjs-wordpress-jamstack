import { Login } from "@lib/mutations/login";
import { encryptPassword } from "../encrypt";
import { getTranslation } from "../translations";
import { getPageUrlByLocale } from "../urlUtils";

export function resetLoginForm(props) {
    const {setShowLoading, setCheckForm, setUserName, setPassword} = props;
    setCheckForm(false);
    setShowLoading(false);
    setUserName('');
    setPassword('');
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
}
export function handleLoginKeyDownChanged(props, e) {
    const {loginFormCallback} = props;
    const keyCode = e.which || e.keyCode;
    if ( keyCode === 13 ) {
        e.preventDefault();
        loginFormCallback();
        return;
    }
}
export async function handleSubmitLogin(props, e) {
    const {username, password, router, translationStrings, 
            setCheckForm, setShowLoading, setUserData, resetFormCallback} = props;
    if ( e && typeof(e.preventDefault) === 'function' ) {
        e.preventDefault();
    }
    setCheckForm(true);
    if ( !username || !password ) {
        return;
    }
    setShowLoading(true);
    const results = await Login(username, password);
    if ( !results.login ) {
        const {message} = results[0];
        resetFormCallback();
        setTimeout(() => {
            alert(getTranslation(translationStrings, message));
        }, 200);
        return;
    }        
    setUserData({   user_tokens : results.login.authToken, 
                    username, 
                    userid : results.login.user.id, 
                    user_password : encryptPassword(password)   });
    resetFormCallback();
    //UpdateLoginSuccess(true);
    router.push(getPageUrlByLocale("thong_tin_tai_khoan_url", router.locale));       
} 