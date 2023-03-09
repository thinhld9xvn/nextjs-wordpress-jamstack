import { getItemCached, removeItemCached, setItemCached } from '@js_dir/utils/sessionStorage';
import { getPageUrlByLocale, getPageUrlBySlug } from './urlUtils';
export function setUserToken(v) {
    setItemCached('user_tokens', v);
}
export function setUserData(data) {
    setItemCached('user_tokens', data.user_tokens);
    setItemCached('username', data.username);
    setItemCached('userid', data.userid);
    setItemCached('user_password', data.user_password);
}
export function setUserPassData(user_password) {
    setItemCached('user_password', user_password);
}
export function setUserMetaData(data) {
    setItemCached('userdata', JSON.stringify(data));
}
export function getUserData() {
    const token = getItemCached('user_tokens');
    const username = getItemCached('username');
    const userId = getItemCached('userid');
    const user_password = getItemCached('user_password');
    const userdata = JSON.parse(getItemCached('userdata'));
    if ( !token ) return null;
    return {
        token,
        username,
        userId,
        user_password,
        userdata
    }
}
export function checkLoggedIn() {
    if ( !getUserData() ) return false;
    return true;
}
export function logout(router, e) {
    e.preventDefault();    
    const url = getPageUrlByLocale('dang_nhap', router.locale);
    router.push(url).then(() => {
        removeItemCached("user_tokens");
        removeItemCached("username");
        removeItemCached("userid");
        removeItemCached("user_password");
        removeItemCached("userdata");
    });
}