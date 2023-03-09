import { PROGRESSING_STEP_IDS } from '@constants/constants';
import { isConfirmNenkin } from '@js_dir/utils/hosoUtils';
import { getTranslation } from '@js_dir/utils/translations'
import { getExtFn, getShortFn } from '@js_dir/utils/uploads/handleUploadFilesUtils';
import { findAttachmentByNo } from '@js_dir/utils/xulyhoso/handleXuLyHoSoUtils';
import React, {useEffect, useState} from 'preact/compat'
import { Circles } from 'react-loader-spinner';
function AttachmentEmailItem({ no = 1, props }) {
  const {handleChooseEmailAttachment, attachmentFiles} = props;
  let shortFn = '',
      ext = '';
  const file = findAttachmentByNo(attachmentFiles, no);
  if ( file ) {
    ext = getExtFn(file.name);
    shortFn = getShortFn(file.name);
  }
  return (
    <>
      <label className="email__attachment" 
            title="Đính kèm file vào email">
        <img src="/static/images/mail_attachment.png" /> 
        <input type="file" 
                className="attachment_no" 
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.xls,.xlsx" 
                onChange={handleChooseEmailAttachment.bind(this, no)} />
      </label>
      {shortFn ? (
        <span className="label__attachment">{shortFn}</span>
      ) : null}
    </>
  )
}
function InfoEmailItem({ no = 1, props }) {
  const {handleShowEmailTemplate, label} = props;
  return (
    <label className="email__attachment email__info" 
            title="Xem nội dung email" 
            onClick={handleShowEmailTemplate.bind(this, no,
                                                        process.env.E_NENKIN_CONFIRM_NO1_CODE,
                                                        label)}>
      <img src="/static/images/info_icon.png" />
    </label>
  )
}
function ToolbarEmailNenkinTemplate({ no = 1, enabled = true, props }) {
  return (
    <span className={!enabled ? 'disabled' : ''}>
      <InfoEmailItem no = {no} 
                     props = {props} />
      <AttachmentEmailItem no = {no} 
                           props = {props}  />      
    </span>
  )
}
function ProgressTemplateItem({ id, label, value, 
                                  isDisabled = true, 
                                  hideIcon = false, 
                                  isSettings = false, 
                                  props = {}, 
                                  refs = {}, 
                                  handleChanged = null }) {  
  const [openSettings, setOpenSettings] = useState(value);
  const handleToggleSettings = (e) => {
    e.preventDefault();
    setOpenSettings(!openSettings);
  }
  useEffect(() => {
    if ( value !== openSettings ) {
      setOpenSettings(value);
    }
  }, [value]); 
  return (
    <>
      <div className={`checkboxTDHS ${isDisabled ? 'disabled' : ''}`}>
        <input id={id} type="checkbox" name={id} onClick={handleChanged} checked={value} />
        <label htmlFor={id}>{label}</label>
        {isSettings && !hideIcon ? (
          <a href="#" 
            onClick={handleToggleSettings} 
            className={"gear-settings ".concat(!value ? 'disabled' : '' )}>
            <span className="fa fa-gear"></span>
          </a>
        ) : null}
        {id === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L1.value ? (
          <ToolbarEmailNenkinTemplate no = {1}
                                      enabled = {value}
                                      props = {{...props, label}} />
        ) : null}
        {id === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L2.value ? (
          <ToolbarEmailNenkinTemplate no = {2}
                                      enabled = {value}
                                      props = {{...props, label}} />
        ) : null}
        {id === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L3.value ? (
          <ToolbarEmailNenkinTemplate no = {3}
                                      enabled = {value}
                                      props = {{...props, label}} />
        ) : null}
      </div>
      {openSettings ? (
        <>
          {id === PROGRESSING_STEP_IDS.DA_KT_GIAYTO.value ? (
            <KiemTraGiayToCanNopTemplate id = {id}
                                        props = {props}
                                        isDisabled = {isDisabled}
                                        checked = {value}
                                        refs = {refs} />
          ) : null}
          {id === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L1.value && isDisabled ? (
            <ChoXacNhanNenkinNo id = {id}
                                props = {props}
                                isDisabled = {isDisabled}
                                checked = {value}
                                refs = {refs}
                                no = {1} />
          ) : null}
          {id === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L2.value && isDisabled ? (
            <ChoXacNhanNenkinNo id = {id}
                                props = {props}
                                isDisabled = {isDisabled}
                                checked = {value}
                                refs = {refs}
                                no = {2} />
          ) : null}
          {id === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L3.value && isDisabled ? (
            <ChoXacNhanNenkinNo id = {id}
                                props = {props}
                                isDisabled = {isDisabled}
                                checked = {value}
                                refs = {refs}
                                no = {3} />
          ) : null}
        </>
      ) : null}
    </>
  )
}
function KiemTraGiayToCanNopTemplate({ id, isDisabled = false, checked = false, props, refs }) {
  const {denyMsgHs, handleChangeDenyHsMsg, translationStrings} = props;
  const {refDenyMsgHsInput} = refs;
  const {checkHsApproved, handleChangeHsVisStep} = props;
  return (
    <>
      <div className={"checkboxTDHS ".concat(isDisabled ? 'disabled' : '')}>
        <div className="checkboxLayout">
            <div className="approved_buttons">
              <a href="#" 
                onClick={handleChangeHsVisStep.bind(this, true, PROGRESSING_STEP_IDS.DA_KT_GIAYTO.value)} 
                className={"button_checkhs button_checkhs__approved ".concat(checkHsApproved ? 'active' : '')}>
                  {getTranslation(translationStrings, "chapnhan_label")}
              </a>
              <a href="#" 
                 onClick={handleChangeHsVisStep.bind(this, false, PROGRESSING_STEP_IDS.DA_KT_GIAYTO.value)} 
                 className={"button_checkhs button_checkhs__rejected ".concat(!checkHsApproved ? 'active' : '')}>
                  {getTranslation(translationStrings, "tuchoi_label")}
              </a>
            </div>
            {!checkHsApproved ? (
              <div className="tdhs_wrapper">
                <div className="thds_reasons">
                    <label>{getTranslation(translationStrings, "lydotuchoi_label")}:</label>
                    <input id="txtReasons" 
                           className="thds_reasons_input" 
                           type="text"
                           value={denyMsgHs}
                           onChange={handleChangeDenyHsMsg}
                           ref={refDenyMsgHsInput} />
                </div>
              </div>
            ) : null}
        </div>
      </div>
    </>
  )
}
function ChoXacNhanNenkinNo({ id, isDisabled = false, checked = false, no = 1, props, refs }) {
  const {confirmNenkinNoSteps, translationStrings, allowHsNenkinL3, handleChangeNenkL3AllowStatus, boolChkThuTucHoanTienItem} = props;
  const isConfirm = isConfirmNenkin(confirmNenkinNoSteps, no);
  return (
    <>      
      <div className="checkboxTDHS">
        <div className="checkboxLayout">
          <p className="titles-bold__alls sending-email-processing__label">
            {!isConfirm ? (
              <>
                {getTranslation(translationStrings, "dangchoxacnhanemail_label")}
                <div className="processingLoader"><Circles color="#009107" height={15} width={15} /></div>
              </>
            ) : (
              <>
                {getTranslation(translationStrings, "khdaxacnhanemail_label")}
                <div className="processingLoader"><span className="fa fa-check"></span></div>
              </>
            )}
          </p>
        </div>
      </div>  
      {isConfirm && no === 2 ? (
        <div className={"checkboxTDHS ".concat(!boolChkThuTucHoanTienItem ? 'disabled' : '')}>
            <div className="checkboxLayout">
                <div className="approved_buttons">
                  <a href="#" className={"button_checkhs button_checkhs__approved ".concat(allowHsNenkinL3 ? 'active' : '')}
                    onClick={handleChangeNenkL3AllowStatus.bind(this, true)}>
                    {getTranslation(translationStrings, "thutuchoantienl3_label")}
                  </a>
                  <a href="#" className={"button_checkhs button_checkhs__rejected ".concat(!allowHsNenkinL3 ? 'active' : '')}
                      onClick={handleChangeNenkL3AllowStatus.bind(this, false)}>
                    {getTranslation(translationStrings, "ketthuchopdong_label")}
                  </a>
                </div>
            </div>
        </div>
      ) : null}    
    </>
  )
}
export default function XetDuyetTienDo({ props, refs, translationStrings }) {
  const {confirmNenkinNoSteps, denyMsgHs, stagChanged, progressStatus, checkboxesStatus, setDenyMsgHs, attachmentFiles,
          checkHsApproved, handleChangeHsVisStep, allowHsNenkinL3, handleChangeNenkL3AllowStatus,
          handleTextChanged, handlePrgChanged, handleSubmitSaveChanged, handleChangeCbStatus, handleShowEmailTemplate, handleChooseEmailAttachment} = props;
  const handleChangeDenyHsMsg = handleTextChanged.bind(this, setDenyMsgHs);
  return (
    <>
        <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">
          {getTranslation(translationStrings, "xetduyettiendo_label")}
        </h3>
        <div className="form__contents">
          <div className="tdhsbody__section">
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.DANG_CAP_NHAT_HS.value}
                                  label = {getTranslation(translationStrings, "dangtrongqtcapnhaths_label")}
                                  isDisabled = {!checkboxesStatus[0]}
                                  value = {progressStatus[0]}
                                  handleChanged = {handlePrgChanged.bind(this, 0)} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.HOAN_TAT_HS.value}
                                  label = {getTranslation(translationStrings, "hoantaths_label")}
                                  isDisabled = {!checkboxesStatus[1]}
                                  value = {progressStatus[1]}
                                  handleChanged = {handlePrgChanged.bind(this, 1)} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.DA_KT_GIAYTO.value}
                                  label = {getTranslation(translationStrings, "daktgiaytocannop_label")}
                                  isDisabled = {!checkboxesStatus[2]}
                                  value = {progressStatus[2]}
                                  handleChanged = {handlePrgChanged.bind(this, 2)}
                                  isSettings = {true}
                                  props = {{translationStrings, denyMsgHs, checkHsApproved, handleChangeDenyHsMsg, handleChangeHsVisStep, handleChangeCbStatus}}
                                  refs = {refs} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.HOAN_TAT_GUI_TOI_CUC_NENKIN.value}
                                  label = {getTranslation(translationStrings, "hoantatviecguitoicucnenkin_label")}
                                  isDisabled = {!checkboxesStatus[3]} 
                                  value = {progressStatus[3]}
                                  handleChanged = {handlePrgChanged.bind(this, 3)}/>
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.THONG_BAO_VE_QD_HOANTHUE.value}
                                  label = {getTranslation(translationStrings, "thongbaoveqdhtdaden_label")}
                                  isDisabled = {!checkboxesStatus[4]}
                                  value = {progressStatus[4]}
                                  handleChanged = {handlePrgChanged.bind(this, 4)} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.THONG_BAO_CO_KQ_NENKIN_L1.value}
                                  label = {getTranslation(translationStrings, "thongbaocoqdnhantiennenkinl1_label")}
                                  isDisabled = {!checkboxesStatus[5]}
                                  value = {progressStatus[5]}
                                  handleChanged = {handlePrgChanged.bind(this, 5)} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L1.value}
                                  label = {getTranslation(translationStrings, "guiemailxacnhandanhanduoctiennenkinl1_label")}
                                  isDisabled = {!checkboxesStatus[6]}
                                  value = {progressStatus[6]}
                                  handleChanged = {handlePrgChanged.bind(this, 6)}
                                  isSettings = {true}
                                  hideIcon = {true}
                                  props = {{confirmNenkinNoSteps, translationStrings, denyMsgHs, checkHsApproved, attachmentFiles,
                                              handleChangeDenyHsMsg, handleChangeHsVisStep, 
                                                handleChangeCbStatus, handleShowEmailTemplate, handleChooseEmailAttachment}}
                                  refs = {refs} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.THONG_BAO_CO_KQ_NENKIN_L2.value}
                                  label = {getTranslation(translationStrings, "thongbaocokqnenkinl2_label")}
                                  isDisabled = {!checkboxesStatus[7]}
                                  value = {progressStatus[7]}
                                  handleChanged = {handlePrgChanged.bind(this, 7)} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L2.value}
                                  label = {getTranslation(translationStrings, "guiemailxacnhandanhanduoctiennenkinl2_label")}
                                  isDisabled = {!checkboxesStatus[8]}
                                  value = {progressStatus[8]}
                                  handleChanged = {handlePrgChanged.bind(this, 8)}
                                  isSettings = {true}
                                  hideIcon = {true}
                                  props = {{  boolChkThuTucHoanTienItem : !checkboxesStatus[8] && (checkboxesStatus[9] || checkboxesStatus[11]),
                                              confirmNenkinNoSteps, 
                                              allowHsNenkinL3, 
                                              handleChangeNenkL3AllowStatus, 
                                              translationStrings, 
                                              denyMsgHs, attachmentFiles,
                                              checkHsApproved, 
                                              handleChangeDenyHsMsg, 
                                              handleChangeHsVisStep, 
                                              handleChangeCbStatus,
                                              handleShowEmailTemplate, 
                                              handleChooseEmailAttachment }}
                                  refs = {refs} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value}
                                  label = {getTranslation(translationStrings, "dalamthutucxinhoantralaitienthuenenkinl3_label")}
                                  isDisabled = {!checkboxesStatus[9]}
                                  value = {progressStatus[9]}
                                  handleChanged = {handlePrgChanged.bind(this, 9)} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L3.value}
                                  label = {getTranslation(translationStrings, "guiemailxacnhandanhanduoctiennenkinl3_label")}
                                  isDisabled = {!checkboxesStatus[10]}
                                  value = {progressStatus[10]}
                                  handleChanged = {handlePrgChanged.bind(this, 10)}
                                  isSettings = {true}
                                  hideIcon = {true}
                                  props = {{boolChkThuTucHoanTienItem : checkboxesStatus[11], 
                                            confirmNenkinNoSteps, 
                                            allowHsNenkinL3,                                             
                                            translationStrings, 
                                            denyMsgHs, attachmentFiles,
                                            checkHsApproved, 
                                            handleChangeNenkL3AllowStatus, 
                                            handleChangeDenyHsMsg, 
                                            handleChangeHsVisStep, 
                                            handleChangeCbStatus,
                                            handleShowEmailTemplate,
                                            handleChooseEmailAttachment}}
                                  refs = {refs} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.THONG_BAO_CHUYEN_KHOAN_DA_DEN.value}
                                  label = {getTranslation(translationStrings, "thongbaochuyenkhoandaden_label")}
                                  isDisabled = {!checkboxesStatus[11]}
                                  value = {progressStatus[11]}
                                  handleChanged = {handlePrgChanged.bind(this, 11)} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.DA_XAC_NHAN_VIEC_CHUYEN_KHOAN_XONG.value}
                                  label = {getTranslation(translationStrings, "daxacnhanviecckxong_label")}
                                  isDisabled = {!checkboxesStatus[12]}
                                  value = {progressStatus[12]}
                                  handleChanged = {handlePrgChanged.bind(this, 12)} />
            <ProgressTemplateItem id = {PROGRESSING_STEP_IDS.KET_THUC_HOP_DONG.value}
                                  label = {getTranslation(translationStrings, "kthopdongsau30ngay_label")}
                                  isDisabled = {!checkboxesStatus[13]}
                                  value = {progressStatus[13]}
                                  handleChanged = {handlePrgChanged.bind(this, 13)} />
          </div>
          <div className={`tdhs__section ${stagChanged ? '' : 'disabled'}`}>
            <a href="#" className="btn-sea__alls" onClick={handleSubmitSaveChanged}>
              {getTranslation(translationStrings, "save_label")}
            </a>
          </div>
        </div>
    </>
  )
}
