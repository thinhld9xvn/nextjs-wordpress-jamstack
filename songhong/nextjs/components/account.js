import { PAGES, SIDEBAR_ACCOUNTS_DATA, SIDEBAR_ACCOUNT_IDS, SIDEBAR_ADMIN_DATA } from '@constants/constants';
import { isDiff, isEmptyObj } from '@js_dir/utils/arrayUtils';
import { verifyHoso } from '@js_dir/utils/hosoUtils';
import { getUserData, setUserMetaData } from '@js_dir/utils/membershipUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { handleChooseAvatarFile } from '@js_dir/utils/uploads/handleUploadFilesUtils';
import { getPageUrlByLocale, getSlugPathByRouter } from '@js_dir/utils/urlUtils';
import { getUserHosoProgressingData } from '@lib/account/getUserHosoProgressingDataApi';
import { getUserInfoData } from '@lib/account/getUserInfoDataApi';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'preact/compat'
import { Circles } from 'react-loader-spinner';
import { connect } from 'react-redux';
import SidebarTemplate from './account/sidebar-template';
import AccessDeniedPage from './account/templates/access-denied';
import DoiMatKhauPanel from './account/templates/doimatkhau-panel';
import HoSoHoanThuePanel from './account/templates/hosohoanthue-panel';
import HoSoNenkinPanel from './account/templates/hosonenkin-panel';
import InformationPanel from './account/templates/infomation-panel';
import TienDoHoSoPanel from './account/templates/tiendohoso-panel';
import XuLyHoSoPanel from './account/templates/xulyhoso-panel';
import LoadingOvery from './templates/loading-overlay';
import RankMath from './templates/rankmath';

function AccountPg({ pageContext, siteOptions, UpdateSiteOptions, translationStrings, 
                        UpdateValidateHoso, UpdateMissingVerifiedMsgHoso, UpdateActiveUserId, UpdateIsRoleAdminAccount }) {
    const router = useRouter();
    const {siteOptions : mySiteOptions, seo} = pageContext;
    const [loading, setLoading] = useState(true);
    const [userCookieLoggedInData, setUserCookieLoggedInData] = useState({});
    const [userOriginalLoggedInData, setUserOriginalLoggedInData] = useState(null);
    const [userLoggedInData, setUserLoggedInData] = useState(null);
    const [userHoSoCode, setUserHoSoCode] = useState(null);
    const [dataSidebars, setDataSidebars] = useState(SIDEBAR_ACCOUNTS_DATA);
    const [showTienDoResults, setShowTienDoResults] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [tiendoHTStep, setTienDoHTStep] = useState(0);
    const [isRefundedNenkinNo3, setRefundedNenkinNo3] = useState(null);
    useEffect(() => {  
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
        return() => {
        }
    }, [,router.locale]); 
    useEffect(() => { 
        setLoading(false);
        setShowTienDoResults(false);
        setRefundedNenkinNo3(null);
        setUserHoSoCode(null);
    }, [,router.locale]); 
    useEffect(() => {  
        async function init() {
            setLoading(true);
            if ( !userCookieLoggedInData ) {
                router.push('/', '/');
                return;
            }
            const {userdata, username, user_password} = userCookieLoggedInData;
            if ( userCookieLoggedInData && 
                    !isEmptyObj(userCookieLoggedInData) && 
                        userdata ) {
                setUserOriginalLoggedInData({...userdata, user_password});
                setUserLoggedInData({...userdata, user_password});
                setLoading(false);
                return;
            }
            if ( userCookieLoggedInData && 
                    !isEmptyObj(userCookieLoggedInData) && 
                        !userLoggedInData ) {
                setUserLoggedInData(null);
                setUserOriginalLoggedInData(null);
                const {userInfoOptions} = await getUserInfoData(username);
                setUserLoggedInData({...userInfoOptions, user_password});
                setUserOriginalLoggedInData({...userInfoOptions, user_password});
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
            setLoading(false);
        }
        init();
        return() => {
        }
    }, [userCookieLoggedInData]);
    useEffect(() => {
        if ( userLoggedInData ) {
            //console.log(userLoggedInData);
            const {id, username, is_admin_role, hoso_current_step, hoso_session} = userLoggedInData;
            setUserMetaData({...userLoggedInData}); 
            setUserHoSoCode(btoa('hoso-' + username));
            //console.log(userLoggedInData);
            setIsAdmin(is_admin_role);
            UpdateIsRoleAdminAccount(is_admin_role);
            setTienDoHTStep(hoso_current_step);
            //
            const {validate : boolVerified, infoPersonalValidate, infoNenkinValidate, infoHoanThueValidate} = verifyHoso();
            const isVerfiedHoso = boolVerified;
            const missingInfoPersonalMsg = !infoPersonalValidate ? getTranslation(translationStrings, "thongtincanhan_label") : '';
            const missingNenkinMsg = !infoNenkinValidate ? getTranslation(translationStrings, "nenkin_label") : '';
            const missingHoanThueMsg = !infoHoanThueValidate ? getTranslation(translationStrings, "hoanthue_label") : '';
            const thongDiepMsg = !isVerfiedHoso ? "(" + getTranslation(translationStrings, "thieu_label") + ' ' + 
                                    missingInfoPersonalMsg + (missingInfoPersonalMsg ? ', ' : '') + 
                                    missingNenkinMsg + (missingNenkinMsg ? ', ' : '') + missingHoanThueMsg + ")" : 
                                        getTranslation(translationStrings, "processinghoso_label");
            UpdateValidateHoso(boolVerified);
            UpdateMissingVerifiedMsgHoso(thongDiepMsg);
            UpdateActiveUserId(id);
            //UpdateProcessingVerifyHoso(boolVerified);
            //UpdateHosoNotifications(hoso_notifications);
            //console.log(getTranslation(translationStrings, "hoanthue_label"));
        }
    }, [userLoggedInData, translationStrings]);
    useEffect(() => {
        if ( userLoggedInData ) {
            const is_admin = userLoggedInData.is_admin_role;
            const myPathRouter = getSlugPathByRouter(router);
            const iXuLyHs = myPathRouter === PAGES.XU_LY_HS_URL[router.locale];
            const iTienDoHoSo = myPathRouter === PAGES.KIEM_TRA_TIENDOHS_URL[router.locale];
            if ( (iXuLyHs && !is_admin) || (iTienDoHoSo && is_admin) ) {
                router.push(getPageUrlByLocale("thong_tin_tai_khoan_url", router.locale));
                return;
            }
        }
    }, [,router.locale,router.asPath, userLoggedInData]);
    useEffect(() => {
        setUserCookieLoggedInData(getUserData());  
    }, [, router.locale, router.asPath]);
    //
    useEffect(() => {
        if ( translationStrings ) {
            const myAccountData = isAdmin ? [...SIDEBAR_ACCOUNTS_DATA.filter(item => [SIDEBAR_ACCOUNT_IDS.CAP_NHAT_HS, 
                                                                                        SIDEBAR_ACCOUNT_IDS.KIEM_TRA_TIENDOHS].indexOf(item.id) === -1)] : 
                                            [...SIDEBAR_ACCOUNTS_DATA];
            if ( isAdmin ) {
                SIDEBAR_ADMIN_DATA.forEach((item, ind) => {
                    myAccountData.splice(1 + ind, 0, item);
                });
            }
            setDataSidebars([...myAccountData.map((item) => {
                const myItem = {...item, text : getTranslation(translationStrings, item.translation_key)};
                if ( myItem.childrens ) {
                    myItem.childrens = [...myItem.childrens.map(ic => {
                        return {...ic, text : getTranslation(translationStrings, ic.translation_key)};
                    })];
                }
                return myItem;
            })]);
        }
    }, [translationStrings, isAdmin]);
    const handleChooseAvatar = handleChooseAvatarFile.bind(this, {translationStrings, userLoggedInData, setLoading, setUserLoggedInData});
    const handleSubmitCheckProgressing = async (e) => {
        e.preventDefault();
        const {id} = userLoggedInData;
        setLoading(true);
        setShowTienDoResults(false);
        const results = await getUserHosoProgressingData(id);
        if ( !results.tiendohoso ) {
            setLoading(false);
            return;
        }
        const {hoso_current_step, refund_nenkin_no3} = results.tiendohoso;
        setTienDoHTStep(hoso_current_step);
        setRefundedNenkinNo3(refund_nenkin_no3);
        setLoading(false);
        setShowTienDoResults(true);
    }
    const asPathSub = getSlugPathByRouter(router);
    //
    const isThongTinTaiKhoan = asPathSub === PAGES.THONG_TIN_TAI_KHOAN_URL[router.locale];
    const iHoSoNenkin = asPathSub === PAGES.CAP_NHAT_HS_NENKIN_URL[router.locale];
    const iHoSoHoanThue = asPathSub === PAGES.CAP_NHAT_HS_HOANTHUE_URL[router.locale];
    const iXuLyHs = asPathSub === PAGES.XU_LY_HS_URL[router.locale] && isAdmin;
    const iTienDoHoSo = asPathSub === PAGES.KIEM_TRA_TIENDOHS_URL[router.locale] && !isAdmin;
    const iDoiMatKhau = asPathSub === PAGES.DOI_MATKHAU_URL[router.locale];  
    const iAccessDenied = !isThongTinTaiKhoan && !iHoSoNenkin && 
                            !iHoSoHoanThue && !iXuLyHs && !iTienDoHoSo && !iDoiMatKhau;
  return (
    <>
        <RankMath data = {seo} />
        <main>
            <section className="content-accounts__pages">
                <div className="container">                   
                    <div className="row gutter-40">
                        {!userLoggedInData ? (
                            <div className="box-acounts__content account__loading">
                                <div className="grid-loading">
                                    <Circles color="#3B7CBE" height={80} width={80} />
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="col-lg-4"> 
                                    <SidebarTemplate data = {dataSidebars} 
                                                    userinfo = {userLoggedInData}
                                                    locale = {router.locale}
                                                    router = {router}
                                                    handleChooseAvatar = {handleChooseAvatar}  />
                                </div>
                                <div className="col-lg-8">
                                    {isThongTinTaiKhoan ? (
                                        <InformationPanel data = {userLoggedInData} 
                                                        translationStrings = {translationStrings} />
                                    ) : null}
                                    {iHoSoNenkin ? (
                                        <HoSoNenkinPanel data = {userLoggedInData} 
                                                        translationStrings = {translationStrings}
                                                        props = {{setUserLoggedInData}} />
                                    ) : null}
                                    {iHoSoHoanThue ? (
                                        <HoSoHoanThuePanel data = {userLoggedInData} 
                                                            translationStrings = {translationStrings}
                                                            props = {{setUserLoggedInData}} />
                                    ) : null}
                                    {iTienDoHoSo ? (
                                        <TienDoHoSoPanel translationStrings = {translationStrings}
                                                        userHoSoCode = {userHoSoCode}
                                                        tiendoHTStep = {tiendoHTStep}
                                                        isRefundedNenkinNo3 = {isRefundedNenkinNo3}
                                                        showResults = {showTienDoResults}
                                                        handleSubmit = {handleSubmitCheckProgressing} />
                                    ) : null}
                                    {iXuLyHs ? (
                                        <XuLyHoSoPanel translationStrings = {translationStrings}
                                                        locale = {router.locale}
                                                        data = {userLoggedInData} 
                                                        router = {router} />                            
                                    ) : null}
                                    {iDoiMatKhau ? (
                                        <DoiMatKhauPanel translationStrings = {translationStrings}
                                                        locale = {router.locale}
                                                        data = {userLoggedInData}
                                                        props = {{setUserLoggedInData, setUserOriginalLoggedInData}}  />                            
                                    ) : null}
                                    {iAccessDenied ? (
                                        <AccessDeniedPage translationStrings = {translationStrings} />
                                    ) : null}
                                </div>
                            </>
                        )}
                    </div>
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
        translationStrings : state.globalReducer.translationStrings,
        loginSuccess : state.globalReducer.loginSuccess,
        //isAdminRole : state.globalReducer.isAdminRole
    }
}
function mapDispatchToProps(dispatch) {
    return {
        UpdateSiteOptions : async (v) => await dispatch({
            type : "UPDATE_SITE_OPTIONS",
            payload : v
        }),
        UpdateValidateHoso : async (v) => await dispatch({
            type : "UPDATE_VALIDATE_HOSO",
            payload : v
        }),
        UpdateMissingVerifiedMsgHoso : async (v) => await dispatch({
            type : "UPDATE_MISSING_VERIFIED_MSG_HOSO",
            payload : v
        }),
        UpdateActiveUserId : async (v) => await dispatch({
            type : "UPDATE_ACTIVE_USER_ID",
            payload : v
        }),
        UpdateProcessingVerifyHoso : async (v) => await dispatch({
            type : "UPDATE_PROCESSING_VERIFY_HOSO",
            payload : v
        }),
        UpdateIsRoleAdminAccount : async (v) => await dispatch({
            type : "UPDATE_IS_ROLE_ADMIN_ACCOUNT",
            payload : v
        }),
        UpdateHosoNotifications : async (v) => await dispatch({
            type : "UPDATE_HOSO_NOTIFICATIONS",
            payload : v
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AccountPg);