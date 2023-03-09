import { getHosoDateExpired, getUserAvatar, isConfirmNenkin, isNoNenkin, isWaitingNenkin } from '@js_dir/utils/hosoUtils';
import { getTranslation } from '@js_dir/utils/translations';
import React, { useCallback, useState } from 'preact/compat'
import { Circles } from 'react-loader-spinner';

function TemplateStatusError({ label }) {
  return (
    <li>
      <strong className="status error">
        {label}
        <span className="fa fa-close"></span>
      </strong>
  </li>
  )
}
function TemplateStatusSuccess({ label }) {
  return (
    <li>
      <strong className="status success">
        {label}
        <span className="fa fa-check"></span>
      </strong>
  </li>
  )
}
function TemplateStatusWaiting({ label, iconFa = '' }) {
  return (
    <li>
      <strong className="status waiting">
        {label}
        {!iconFa ? (
          <div className="processingLoader"><Circles color="#ff5e00" height={15} width={15} /></div>
        ) : <div className="processingLoader"><span className={`fa fa${iconFa}`}></span></div>}
      </strong>
  </li>
  )
}
function TemplateStatusExpired({ label }) {
  return (
    <li>
      <strong className="status pending">
        {label}
        <div className="processingLoader"><span className="fa fa-exclamation-triangle"></span></div>
      </strong>
  </li>
  )
}
function TemplateUserItem({ data, translationStrings, handleChooseHoSo }) {
  const {id, username, avatar, fullname, address, email, phone, date_created, 
          hoso_verified : isHsVerified, hoso_confirm_nenkin, hoso_session} = data;
  const {session_status : hoso_status} = hoso_session;
  const [showToolTip, setShowToolTip] = useState(false);
  const [toolTipCornerRight, setToolTipCornerRight] = useState(false);
  const [toolTipTopOffset, setToolTipTopOffset] = useState('');
  const user_avatar = getUserAvatar(avatar);
  const noSettingsLabel = getTranslation(translationStrings, "nosettings_label");
  const handleShowToolTip = useCallback((e) => {
    e.preventDefault();
    const target = e.currentTarget;
    const hsUserItem = target.closest('.hoso__user');
    const tooltip = hsUserItem.querySelector('.userItemToolTip');
    const width = tooltip.clientWidth;
    const {left, top} = tooltip.getClientRects()[0];        
    const isOverScreen = (width + left) >= window.innerWidth;  
    setToolTipCornerRight(isOverScreen);
    setShowToolTip(!showToolTip);
  }, [,showToolTip, toolTipCornerRight]);
  const handleOpenHoso = useCallback((e) => {
    e.preventDefault();
    //setTimeout(() => {
      setShowToolTip(false);
      setToolTipCornerRight(false);
      handleChooseHoSo(username);
    //}, 200);
  }, [,showToolTip, toolTipCornerRight]);
  const isConfirmNenkinL1 = isConfirmNenkin(hoso_confirm_nenkin, 1);
  const isConfirmNenkinL2 = isConfirmNenkin(hoso_confirm_nenkin, 2);
  const isConfirmNenkinL3 = isConfirmNenkin(hoso_confirm_nenkin, 3);
  //
  const isWaitingNenkinL1 = isWaitingNenkin(hoso_confirm_nenkin, 1);
  const isWaitingNenkinL2 = isWaitingNenkin(hoso_confirm_nenkin, 2);
  const isWaitingNenkinL3 = isWaitingNenkin(hoso_confirm_nenkin, 3);
  //
  const isNoNenkinL1 = isNoNenkin(hoso_confirm_nenkin, 1);
  const isNoNenkinL2 = isNoNenkin(hoso_confirm_nenkin, 2);
  //const isNoNenkinL3 = isNoNenkin(hoso_confirm_nenkin, 3);
  //    
  const dayNum = getHosoDateExpired(hoso_session);
  const expiredLabel = getTranslation(translationStrings, "kthopdongsaunngay_label").replace(/\%n/ig, dayNum);
  return (
    <div className="hoso__user">
        <div className="wrapper" onClick={handleShowToolTip}>
          <div className="avatar-customers hoso_user_item">
              <img id="output" className="img-ups" src={user_avatar} />
          </div>
          <h4>{username}</h4>
        </div>
        <div className="approved_buttons user_hstoolbar">
            <a href="#" 
              className={"button_checkhs button_checkhs__rejected xemhs ".concat(showToolTip ? ' active ' : ' ')}
              onClick={handleShowToolTip}>
              <span className="fa fa-eye"></span> 
            </a>
            <a href="#" className="button_checkhs button_checkhs__approved xetduyet"
              onClick={handleOpenHoso}>
              <span className="fa fa-search-plus"></span>
            </a>
        </div>
        <div className={"userItemToolTip ".concat(showToolTip ? ' active ' : ' ',
                                                  toolTipCornerRight ? ' corner__right ' : ' ')}>
          <div className="wrapper">
              <h4>{getTranslation(translationStrings, "mahoso_label")}: <strong>{username || noSettingsLabel}</strong></h4>              
              <h4>{getTranslation(translationStrings, "hovatenkh_label")}: <strong>{fullname || noSettingsLabel}</strong></h4>  
              <h4>{getTranslation(translationStrings, "address_label")}: <strong>{address || noSettingsLabel}</strong></h4>  
              <h4>{getTranslation(translationStrings, "email_label")}: <strong>{email}</strong></h4>       
              <h4>{getTranslation(translationStrings, "phone_label")}: <strong>{phone || noSettingsLabel}</strong></h4>       
              <h4>{getTranslation(translationStrings, "ngaytao_label")}: <strong>{date_created}</strong></h4>
              <h4>{getTranslation(translationStrings, "tthoso_label")}:</h4>
              <ul>
                  {!hoso_status ? (
                    <>
                      {isHsVerified ? (
                        <TemplateStatusSuccess label = {getTranslation(translationStrings, "dacapnhaths_label")} />
                      ) : (
                        <TemplateStatusError label = {getTranslation(translationStrings, "chuacapnhaths_label")} />
                      )}
                      {isNoNenkinL1 ? (
                        <TemplateStatusError label = {getTranslation(translationStrings, "chuaxacnhantiennenkinl1_label")} />
                      ) : null}
                      {isWaitingNenkinL1 ? (
                        <TemplateStatusWaiting label = {getTranslation(translationStrings, "dangchoxacnhantiennenkinl1_label")} />
                      ) : null}
                      {isConfirmNenkinL1 ? (
                        <TemplateStatusSuccess label = {getTranslation(translationStrings, "daxacnhantiennenkinl1_label")} />
                      ) : null}
                      {isNoNenkinL2 ? (
                        <TemplateStatusError label = {getTranslation(translationStrings, "chuaxacnhantiennenkinl2_label")} />
                      ) : null}                  
                      {isWaitingNenkinL2 ? (
                        <TemplateStatusWaiting label = {getTranslation(translationStrings, "dangchoxacnhantiennenkinl2_label")} />
                      ) : null}
                      {isConfirmNenkinL2 ? (
                        <TemplateStatusSuccess label = {getTranslation(translationStrings, "daxacnhantiennenkinl2_label")} />
                      ) : null}           
                      {isWaitingNenkinL3 ? (
                        <TemplateStatusWaiting label = {getTranslation(translationStrings, "dangchoxacnhantiennenkinl3_label")} />
                      ) : null}
                      {isConfirmNenkinL3 ? (
                        <TemplateStatusSuccess label = {getTranslation(translationStrings, "daxacnhantiennenkinl3_label")} />
                      ) : null}
                    </>       
                  ) : null}                 
                  {hoso_status === 'waiting' && dayNum > 0 ? (
                    <TemplateStatusWaiting label = {expiredLabel}
                                           iconFa = "exclamation-circle" />
                  ) : null}          
                  {(hoso_status === 'waiting' && dayNum === 0) || hoso_status === 'expired' ? (
                    <TemplateStatusExpired label = {getTranslation(translationStrings, "tkdabivohieuhoa_label")} />
                  ) : null}           
              </ul>
              <i></i>
          </div>
        </div>
    </div>
  )
}
export default function HosoUsersList({ loading = true, data = [], props }) {
  const {handleChooseHoSo, translationStrings} = props;
  const arrUserItems = data.map(item => <TemplateUserItem data = {item}
                                                          key = {item}
                                                          handleChooseHoSo = {handleChooseHoSo}
                                                          translationStrings = {translationStrings} />)
  return (
    <>
      <div className="hoso_users__lists">
          {loading ? (
            <div className="grid-loading center"><Circles color="#3B7CBE" height={80} width={80} /></div>
          ) : (
            <>{arrUserItems}</>
          )}
      </div>
    </>
  )
}

