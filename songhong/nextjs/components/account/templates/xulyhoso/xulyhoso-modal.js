import React, {useState, useEffect, useRef} from 'preact/compat'
import ThongTinHoSo from './templates/thongtinhoso'
import NavAccount from './templates/nav-accounts';
import { PROGRESSING_LABELS, PROGRESSING_STEP_IDS, SIDEBAR_ACCOUNT_IDS } from '@constants/constants';
import HoSoNenkins from './templates/hosonenkins';
import { getTranslation } from '@js_dir/utils/translations';
import HoSoHoanThue from './templates/hosohoanthue';
import XetDuyetTienDo from './templates/xetduyettiendo';
import LoadingOvery from '@components/templates/loading-overlay';
import Modal from 'react-modal';
import HoSoUpdateModal from './hoso-update-modal';
import { getCheckboxPrgStatus, isConfirmNenkin } from '@js_dir/utils/hosoUtils';
import EmailModal from './email-modal';
import { handleAttachEmailFile } from '@js_dir/utils/uploads/handleUploadFilesUtils';
import { handleChangeCbItemStatus, handleChangeGroupCbItemsStatus, 
        handleChangeGroupCbItemsValue, handleChangeHsApprovedBState, handleChangeNenkL3AllowBStatus, handleChangeRouteActive, handleProgressItemChanged, handleShowEmailTemplateModal, handleSubmitFormTienDo, setNenkL3AllowStatusAfterLoading } from '@js_dir/utils/xulyhoso/handleXuLyHoSoUtils';
export default function XuLyHoSoModal({ data, locale, router, username, handleOpenHsCongTy, translationStrings}) {
    const [loading, setLoading] = useState(true);
    const [tabActiveId, setTabActiveId] = useState(SIDEBAR_ACCOUNT_IDS.THONG_TIN_TAI_KHOAN);
    const [progressStatus, setProgressStatus] = useState([]); // giá trị của checkbox (checked/unchecked)
    const [checkboxesStatus, setCheckboxesStatus] = useState([]); // trạng thái của box checkbox (enabled/disabled)
    const [stagChanged, setStagChanged] = useState(false);
    const [originActiveProgressStep, setOriginActiveProgressStep] = useState(0);
    const [activeProgressStep, setActiveProgressStep] = useState(0);    
    const [chosenSteps, setChosenSteps] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [progressingUpdateData, setProgressingUpdateData] = useState([]);
    const [activeCurrentStep, setActiveCurrentStep] = useState(1);
    const [denyMsgHs, setDenyMsgHs] = useState('');
    const [checkHsApproved, setCheckHsApproved] = useState(true);
    const [allowHsNenkinL3, setAllowHsNenkinL3] = useState(true);
    const [headingEmailModal, setHeadingEmailModal] = useState('');
    const [contentEmailModal, setContentEmailModal] = useState('');
    const [attachmentFiles, setAttachmentFiles] = useState([]);
    const [attachmentFnModal, setAttachmentFnModal] = useState('');
    //
    const refDenyMsgHsInput = useRef(null);
    const refChosenSteps = useRef(null);
    //
    const {isHsVerified, hoso_confirm_nenkin : confirmNenkinNoSteps, refund_nenkin_no3} = data;
    //
    const handleChooseEmailAttachment = (no, e) => handleAttachEmailFile.call(this, {setLoading, 
                                                                                     translationStrings, 
                                                                                     no, 
                                                                                     targetFiles : e.target.files,
                                                                                     attachmentFiles, 
                                                                                     setAttachmentFiles});
    //
    const handleChangeTabActive = (id, e) => {
        e.preventDefault();
        handleChangeRouteActive.call(this, id, setTabActiveId);
    }
    const handleChangeHsVisStep = (approvedValue, processId, e) => {
        e.preventDefault();
        handleChangeHsApprovedBState.call(this, {processId, approvedValue, setCheckHsApproved, handleChangeCbStatus});   
    }
    const handleSubmitSaveChanged = async (e) => {
        e.preventDefault();
        handleSubmitFormTienDo.call(this, {translationStrings, 
                                            checkHsApproved, 
                                            denyMsgHs, 
                                            userId : data.id, 
                                            chosenSteps, 
                                            checkboxesStatus,
                                            attachmentFiles,
                                            setProgressingUpdateData, setActiveCurrentStep, setShowUpdateModal,
                                                setActiveProgressStep, setOriginActiveProgressStep, setCheckboxesStatus,
                                                    setChosenSteps, setStagChanged});
    }
    const handlePrgChanged = (index, e) => {        
        e.preventDefault();
        handleProgressItemChanged.call(this, {progressStatus, checkboxesStatus, chosenSteps, 
                                                tickedValue : e.currentTarget.checked, 
                                                currentIndex : index,
                                                setProgressStatus, setCheckboxesStatus, setActiveProgressStep, setChosenSteps});
    }
    const handleChangeCbStatus = (id, v) => {
        handleChangeCbItemStatus.call(this, {activeId : id, 
                                                    tickedValue : v, 
                                                    progressStatus, checkboxesStatus, activeProgressStep, 
                                                    setProgressStatus, setActiveProgressStep, setCheckboxesStatus, setChosenSteps});
    }
    const handleChangeCbItemsStatus = (items) => {
        handleChangeGroupCbItemsStatus.call(this, {items, checkboxesStatus, setCheckboxesStatus});
    }
    const handleChangeCbItemsValueStatus = (items) => {
        handleChangeGroupCbItemsValue.call(this, {items, progressStatus, setProgressStatus});
    }
    const handleCloseUpdateModal = (e) => {
        e.preventDefault();
        setShowUpdateModal(false);
    }
    const handleTextChanged = (setValue, e) => {
        setValue(e.currentTarget.value);
    }
    const handleChangeNenkL3AllowStatus = async (v, e) => {
        e.preventDefault();
        handleChangeNenkL3AllowBStatus.call(this, {originActiveProgressStep, value : v, 
                                                    setAllowHsNenkinL3, setActiveProgressStep, setChosenSteps,
                                                        handleChangeCbItemsValueStatus, handleChangeCbItemsStatus});
    }
    const handleShowEmailTemplate = async (no, emailCode, label, e) => {
        e.preventDefault();       
        handleShowEmailTemplateModal.call(this, {contentEmailModal, headingLabel : label, username, no, emailCode, translationStrings, attachmentFiles,
                                                    setAttachmentFnModal, setShowEmailModal, setLoading, setHeadingEmailModal, setContentEmailModal});
    }
    const handleCloseEmailModal = (e) => {
        e.preventDefault();
        setShowEmailModal(false);
    }
    useEffect(() => {        
        const pgs = [];
        const chks = [];
        const {hoso_current_step} = data;       
        for ( let i = 0; i < PROGRESSING_LABELS.length; i++ ) {
            pgs[i] = false;
            chks[i] = false;
        }        
        for (let i = 0; i < hoso_current_step; i++) {
            pgs[i] = true;
            chks[i] = false;
        }
        const nextProgId = hoso_current_step;
        if ( nextProgId < chks.length ) {
            chks[nextProgId] = true;
        } 
        setOriginActiveProgressStep(hoso_current_step);
        setActiveProgressStep(hoso_current_step);     
        setProgressStatus([...pgs]);
        setCheckboxesStatus([...chks]);   
        setTimeout(() => {
            setLoading(false); 
        }, 500);
    }, [data]);
    useEffect(() => {   
        setStagChanged(originActiveProgressStep !== activeProgressStep);
    }, [activeProgressStep]);
    useEffect(() => {   
        const isConfirmNo1 = isConfirmNenkin(confirmNenkinNoSteps, 1);
        const isConfirmNo2 = isConfirmNenkin(confirmNenkinNoSteps, 2);
        const prgStatusThongBaoCoKQNenkinL2 = getCheckboxPrgStatus(progressStatus, PROGRESSING_STEP_IDS.THONG_BAO_CO_KQ_NENKIN_L2.value);
        const prgStatusDaLamThuTucXinHoanTienL3 = getCheckboxPrgStatus(progressStatus, PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value);
        if ( activeProgressStep === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L1.value && 
                prgStatusThongBaoCoKQNenkinL2 !== isConfirmNo1 ) {
            handleChangeCbItemsStatus([{ id : PROGRESSING_STEP_IDS.THONG_BAO_CO_KQ_NENKIN_L2.value, value : isConfirmNo1 }]); 
        }
        if ( activeProgressStep === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L2.value ) {            
            if ( isConfirmNo2 ) {
                if ( prgStatusDaLamThuTucXinHoanTienL3 !== allowHsNenkinL3 ) {
                    handleChangeCbItemsStatus([{ id : PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value, value : allowHsNenkinL3 }]); 
                }
            }
            else {
                if ( prgStatusDaLamThuTucXinHoanTienL3 !== false ) {
                    handleChangeCbItemsStatus([{ id : PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value, value : false }]); 
                }
            }
        }
    }, [activeProgressStep, confirmNenkinNoSteps, allowHsNenkinL3]);
    useEffect(() => {
        if ( !loading ) {
            const isConfirmNo1 = isConfirmNenkin(confirmNenkinNoSteps, 1);
            const isConfirmNo2 = isConfirmNenkin(confirmNenkinNoSteps, 2);
            if ( !isConfirmNo1 ) {
                handleChangeCbItemsStatus([{ id : PROGRESSING_STEP_IDS.THONG_BAO_CO_KQ_NENKIN_L2.value, value : false }]);
            }
            if ( !isConfirmNo2 ) {
                handleChangeCbItemsStatus([{ id : PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value, value : false }]);
            }
        }
      }, [loading, confirmNenkinNoSteps]);
    useEffect(() => {
        if ( !loading ) {
            if ( refund_nenkin_no3 === null ) return;
            if ( activeProgressStep > PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L2.value ) {
                setNenkL3AllowStatusAfterLoading(refund_nenkin_no3, activeProgressStep);
            }
        }
      }, [loading, activeProgressStep, refund_nenkin_no3]);
    useEffect(() => {   
    }, [activeProgressStep, allowHsNenkinL3]);
    let notificationsCount = isHsVerified ? 1 : 0;
    //
    //console.log(refund_nenkin_no3);
    //console.clear();
    /*console.log('data', data);
    console.log('stagChanged: ', stagChanged);
    console.log('progressStatus: ', progressStatus);
    console.log('checkboxesStatus: ', checkboxesStatus);
    console.log('originActiveProgressStep: ', originActiveProgressStep);*/
    /*console.log('activeProgressStep: ', activeProgressStep);
    console.log('chosenSteps: ', chosenSteps);
    console.log('denyMsgHs: ', denyMsgHs);*/
    //console.log(activeProgressStep);
    console.log(attachmentFiles);
    return (
        <>
            <h2 className="modalHsHeadingTitle">
                {getTranslation(translationStrings, "thongtinhoso_label")} "{username}"
            </h2>
            <div className="modalBodyHs__contents">
                <div className="row">
                    <div className="col-lg-4">
                        <NavAccount locale = {locale}
                                    router = {router}
                                    translationStrings = {translationStrings}
                                    tabActiveId = {tabActiveId}
                                    handleChangeTabActive = {handleChangeTabActive}
                                    notificationsCount = {notificationsCount} />
                    </div>
                    <div className="col-lg-8">
                        <div className="form-content__accounts">
                            {tabActiveId === SIDEBAR_ACCOUNT_IDS.THONG_TIN_TAI_KHOAN ? (
                                <ThongTinHoSo translationStrings = {translationStrings}
                                              data = {data}
                                              handleOpenHsCongTy = {handleOpenHsCongTy} />
                            ) : null}
                            {tabActiveId === SIDEBAR_ACCOUNT_IDS.THONG_TIN_HS_NENKIN ? (
                                <HoSoNenkins translationStrings = {translationStrings}
                                              data = {data} />
                            ) : null}
                            {tabActiveId === SIDEBAR_ACCOUNT_IDS.THONG_TIN_HS_HOANTHUE ? (
                                <HoSoHoanThue translationStrings = {translationStrings}
                                             data = {data} />
                            ) : null}
                            {tabActiveId === SIDEBAR_ACCOUNT_IDS.XET_DUYET_TIEN_DO ? (
                                <XetDuyetTienDo translationStrings = {translationStrings}
                                                props = {{progressStatus, checkboxesStatus, stagChanged, denyMsgHs, confirmNenkinNoSteps, attachmentFiles,
                                                            setDenyMsgHs, checkHsApproved, allowHsNenkinL3, handleChangeNenkL3AllowStatus,
                                                            handleChangeHsVisStep, handleShowEmailTemplate, handleChooseEmailAttachment,
                                                            handleTextChanged, handlePrgChanged, handleSubmitSaveChanged, handleChangeCbStatus}}
                                                refs = {{refDenyMsgHsInput}} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={showUpdateModal}
                onRequestClose={handleCloseUpdateModal}
                className="hosoModal hosoUpdatingModal"
                overlayClassName="hosoOverlay"
                contentLabel="Đang cập nhật tiến độ"
                shouldCloseOnOverlayClick={false}>
                <HoSoUpdateModal translationStrings = {translationStrings}
                                 currentStep = {activeCurrentStep}
                                 data = {progressingUpdateData} />
            </Modal>
            <Modal
                isOpen={showEmailModal}
                onRequestClose={handleCloseEmailModal}
                className="hosoModal emailModal"
                overlayClassName="hosoOverlay"
                contentLabel="Mẫu email"
                shouldCloseOnOverlayClick={false}>
                <span className="close__button" onClick={handleCloseEmailModal}>x</span>
                <EmailModal heading = {headingEmailModal}
                            content = {contentEmailModal}
                            filename = {attachmentFnModal} />
            </Modal>
            <LoadingOvery show = {loading} />
        </>
  )
}
