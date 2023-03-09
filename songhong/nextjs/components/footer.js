import { isEmptyObj } from '@js_dir/utils/arrayUtils';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'preact/compat'
import { connect } from 'react-redux';
import FooterBottom from './footer/footer-bottom';
import FooterTop from './footer/footer-top';
import LogoFooter from './footer/logo-footer';
import { isAccountPageUrl } from '@js_utils/urlUtils';
import { getTranslation } from '@js_dir/utils/translations';
import LoadingOvery from './templates/loading-overlay';
import { VerifyHoso } from '@lib/mutations/verify-hoso';
import { getAccountHosoNotificationsData } from '@lib/account/getAccountHosoNotificationsDataApi';
import { getAccountHosoVerifiedFlag } from '@lib/account/getAccountHosoVerifiedFlagApi';
import { VERIFIED_FLAGS } from '@constants/constants';
import NotificationsFooterTemplate from './templates/notifications-footer-template';
import VerifyFooterTemplate from './templates/verify-footer-template';
import { getConfirmNenkinUrl, isConfirmNenkin, isWaitingNenkin } from '@js_dir/utils/hosoUtils';

function Footer({ activeUserId, siteOptions, translationStrings, 
                    isValidateHoso, missingVerifiedHosoMsg, isAdminRole }) {   
  const router = useRouter();
  const [loading, showLoading] = useState(false);
  const [loadingNotif, setLoadingNotif] = useState(true);
  const [loadingVerifiedMode, setLoadingVerifiedMode] = useState(true);
  const [verifiedHoso, setVerifiedHoso] = useState(false);
  const [processingVerify, setProcessingVerify] = useState(false);
  const [tryAgainVerify, setTryAgainVerify] = useState(false);
  const [notificationsList, setNotificationsList] = useState([]);
  const [notificationsData, setNotificationsData] = useState([]);
  const [expiredDays, setExpiredDays] = useState(-1);
  const [denyMsg, setDenyMsg] = useState('');
  const [confirmedNenkin, setConfirmedNenkin] = useState([]);
  const [verifiedFlag, setVerifiedFlag] = useState('');
  const handleVerifyHoso = async (e) => {
    e.preventDefault();
    if ( !isValidateHoso || processingVerify ) return;
    showLoading(true);    
    const results = await VerifyHoso(activeUserId);    
    if ( !results || !results.verifyHoso ) {
      showLoading(false);
      return false;
    }    
    showLoading(false);
    setProcessingVerify(true);
    setTryAgainVerify(false);
    setVerifiedFlag('');
    //console.log(results);    
  }
  const loadNotifications = async (userId) => {    
    setNotificationsList([]);
    setExpiredDays(0);
    setDenyMsg('');
    setConfirmedNenkin([]);
    //setVerifiedFlag('');
    setLoadingNotif(true);
    const results = await getAccountHosoNotificationsData(userId);
    if ( !results || !results.hs_notifications ) {
      setLoadingNotif(false);
      return false;
    }
    //console.log(results);
    const {hs_notifications} = results;
    const {hoso_notifications, expired_days, hoso_deny_message, hoso_confirm_nenkin} = hs_notifications;
    hoso_notifications.reverse();    
    setExpiredDays(expired_days);
    setDenyMsg(hoso_deny_message);
    setConfirmedNenkin(hoso_confirm_nenkin);
    setNotificationsList([...hoso_notifications]);
    setTimeout(() => {
      setLoadingNotif(false);
    }, 500);
  }
  const loadVerifiedFlag = async (userId) => {
    setLoadingVerifiedMode(true);
    const results = await getAccountHosoVerifiedFlag(userId);
    if ( !results || !results.hosoVerifiedFlag ) {
      setLoadingVerifiedMode(false);
      return false;
    }
    const {hosoVerifiedFlag} = results;
    const {hoso_verified_flag} = hosoVerifiedFlag;
    setVerifiedFlag(hoso_verified_flag);
    setVerifiedHoso(isValidateHoso && !hoso_verified_flag);
    setProcessingVerify(isValidateHoso && hoso_verified_flag === VERIFIED_FLAGS.VERIFIED);
    setTryAgainVerify(isValidateHoso && hoso_verified_flag === VERIFIED_FLAGS.VERIFIED_TRY_AGAIN);
    setTimeout(() => {
      setLoadingVerifiedMode(false);
    }, 500);
  }
  useEffect(() => {
    setTimeout(() => {
      try {
        document.getElementById('btn-up__tops').addEventListener('click', function(e) {
          e.preventDefault();
          window.scroll(0, 0);
        });
      } catch(e) {}
    }, 200);
  }, []);
  /*useEffect(() => {
    setProcessingVerify(isProcessingVerifyHoso);
  }, [isProcessingVerifyHoso]);*/
  useEffect(() => {
    if ( activeUserId ) {
      loadNotifications(activeUserId); 
    }
  }, [activeUserId]);
  useEffect(() => {    
    if ( !isValidateHoso ) return;
    if ( activeUserId ) {
      loadVerifiedFlag(activeUserId);
    }
  }, [activeUserId, isValidateHoso]);
  useEffect(() => {
    //console.log(confirmedNenkin);
    const confirmedNo1Url = getConfirmNenkinUrl(confirmedNenkin, 1);
    const confirmedNo2Url = getConfirmNenkinUrl(confirmedNenkin, 2);
    const confirmedNo3Url = getConfirmNenkinUrl(confirmedNenkin, 3);
    //
    const isConfirmedNenkinNo1 = isConfirmNenkin(confirmedNenkin, 1);
    const isConfirmedNenkinNo2 = isConfirmNenkin(confirmedNenkin, 2);
    const isConfirmedNenkinNo3 = isConfirmNenkin(confirmedNenkin, 3);
    //
    setNotificationsData(notificationsList.map(msg => {
      const isExpiredMsg = msg === 'kthopdongsaunngay_label';
      const isDenyMsg = msg === 'hosodabituchoi_label';
      const isApprovedMsg = msg === 'hosoduocchapnhan_label';
      const isConfirmNenkinNo1Msg = msg === 'hosoduocduyetnhantiennenkinl1_label';
      const isConfirmNenkinNo2Msg = msg === 'hosoduocduyetnhantiennenkinl2_label';
      const isConfirmNenkinNo3Msg = msg === 'hosoduocduyetnhantiennenkinl3_label'; 
      let translationStr = getTranslation(translationStrings, msg);
      if ( isExpiredMsg ) {
        translationStr = translationStr.replace(/\%n/ig, expiredDays);
      }
      if ( isDenyMsg ) {
        translationStr = `${translationStr}: <br/><span className="tooltipAlert">"${denyMsg}"</span>`;
      }
      if ( isApprovedMsg ) {
        translationStr = `<span className="tooltipGreen">${translationStr}</span>`;
      }
      //console.log(confirmedNo1);
      if ( isConfirmNenkinNo1Msg && confirmedNo1Url ) {
        //console.log(confirmedNo1);
        translationStr = translationStr.replace(/\%url/ig, confirmedNo1Url);
        if ( isConfirmedNenkinNo1 ) {
          translationStr = `<span className="tooltipDisabled">${translationStr}</span>`;
        } 
      }
      if ( isConfirmNenkinNo2Msg && confirmedNo2Url ) {
        translationStr = translationStr.replace(/\%url/ig, confirmedNo2Url);
        if ( isConfirmedNenkinNo2 ) {
          translationStr = `<span className="tooltipDisabled">${translationStr}</span>`;
        } 
      }
      if ( isConfirmNenkinNo3Msg && confirmedNo3Url ) {
        translationStr = translationStr.replace(/\%url/ig, confirmedNo3Url);
        if ( isConfirmedNenkinNo3 ) {
          translationStr = `<span className="tooltipDisabled">${translationStr}</span>`;
        } 
      }
      return (
        <p key={msg} className={isExpiredMsg ? 'tooltipGreen' : ''}
          dangerouslySetInnerHTML={{
            __html : translationStr
          }}></p>
      )
    }));
  }, [notificationsList, confirmedNenkin, expiredDays, translationStrings]);
  if ( isEmptyObj(siteOptions) ) return <></>;
  const {logo_footer, company_name, company_address, hotline, email, socials, copyright, footer_dichvu_menu_html, footer_thongtin_menu_html} = siteOptions;
  const {fanpage, zalo} = socials;
  const isAccountPage = isAccountPageUrl(router);  
  //console.log(verifiedFlag);
  //console.log(expiredDays);
  return (
    <>
      <section className="footers">
          <div className="tops-footers">
              <div className="container">
                  <LogoFooter data = {logo_footer} />
                  <FooterTop data = {{company_name, company_address, hotline, email, fanpage, footer_dichvu_menu_html, footer_thongtin_menu_html}} />
              </div>
          </div>
          <FooterBottom data = {{copyright}} />
          <ul className="fixed-btn__groups">
            {!isAccountPage ? (
              <>
                <li>
                    <a href={fanpage}><Image src="/static/images/fixed-icons-1.svg" width={30} height={30} layout="fixed" /></a>
                </li>
                <li>
                    <a href={zalo}><Image src="/static/images/fixed-icons-2.svg" width={30} height={30} layout="fixed" /></a>
                </li>
              </>
            ) : (
              <>
                {!isAdminRole ? (
                  <>
                    <NotificationsFooterTemplate loading = {loadingNotif}
                                                 data = {notificationsData}
                                                 translationStrings = {translationStrings} />
                    <VerifyFooterTemplate loading = {loadingVerifiedMode}
                                          isValidate = {isValidateHoso}
                                          isProcessing = {processingVerify}
                                          isTryAgain = {tryAgainVerify}
                                          isVerified = {verifiedHoso}
                                          handleVerify = {handleVerifyHoso}
                                          missingMsg = {missingVerifiedHosoMsg}
                                          expiredDays = {expiredDays}
                                          translationStrings = {translationStrings} />
                    
                  </>
                ) : null}
              </>
            )}
            <li>
                <a id="btn-up__tops" href="#" className="btn-up__tops">
                  <Image src="/static/images/fixed-icons-3.svg" width={30} height={30} layout="fixed" />
                </a>
            </li>
          </ul>
      </section>
      <div id="fb-root"></div>
      <LoadingOvery show={loading} />
    </>
  )
}
function mapStateToProps(state) {   
  return { 
      siteOptions : state.globalReducer.siteOptions,
      translationStrings : state.globalReducer.translationStrings,
      isValidateHoso : state.globalReducer.isValidateHoso,
      missingVerifiedHosoMsg : state.globalReducer.missingVerifiedHosoMsg,
      isProcessingVerifyHoso : state.globalReducer.isProcessingVerifyHoso,
      activeUserId : state.globalReducer.activeUserId,
      isAdminRole : state.globalReducer.isAdminRole,
      hsNotifications : state.globalReducer.hsNotifications
  }
}
function mapDispatchToProps(dispatch) {
  return {
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Footer);