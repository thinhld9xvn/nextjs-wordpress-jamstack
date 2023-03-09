import { PROGRESSING_LABELS, PROGRESSING_STEP_IDS } from "@constants/constants";
import { ReportUserStepHoso } from "@lib/mutations/report-user-hoso";
import { getTranslation } from "../translations";
import { cloneDeep } from "lodash";
import { getEmailTemplateByCode } from "@lib/account/getEmailTemplateByCodeApi";
export function handleGetCheckboxStatuses(values, checkedValue, nextId) {
    return [...values.map((v, i) => {
        if ( i === nextId ) {
            return checkedValue;
        }
        if ( i > nextId ) {
            return false;
        }
        return v;
    })];
}
export function handleGetCheckboxValues(values, nextId) {
    const _values = [...values];
    return [..._values.map((v, i) => {
        if ( i >= nextId ) {
            return false;
        }
        return v;
    })];
}
export function handleSetChosenStepValues(values, step) {
    values.sort();
    const i = values.findIndex(v => v === step);
    if ( i !== -1 ) {
        values.splice(i);
    }
    else {
        values.push(step);
    }
    values.sort();
}
export function handleChangeRouteActive(id, setRouteId) {
    setRouteId(id);
}
export function handleChangeHsApprovedBState(props) {
    const {processId, approvedValue, setCheckHsApproved, handleChangeCbStatus} = props;
    setCheckHsApproved(approvedValue);
    handleChangeCbStatus(processId, approvedValue);
}
async function doReportStep(uid, step, props) {
    const {checkHsApproved, denyMsgHs, setActiveCurrentStep, attachmentFile} = props;
    return await new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            const metadata = {};             
            setActiveCurrentStep(step);
            if ( step === PROGRESSING_STEP_IDS.DA_KT_GIAYTO.value ) {
                metadata['approved'] = checkHsApproved;
                metadata['deny_reason_msg'] = !checkHsApproved ? denyMsgHs : '';
            }
            const results = await ReportUserStepHoso(uid, step, metadata, attachmentFile);
            if ( !results || !results.reportHosoStepUser ) {
                reject(false);
                return;
            }
            resolve(results);
        }, 500);
    });
}
export function handleProgressItemChanged(props) {
    const {progressStatus, checkboxesStatus, chosenSteps, tickedValue, currentIndex,
                setProgressStatus, setCheckboxesStatus, setActiveProgressStep, setChosenSteps} = props;
    let _values = [...progressStatus];
    let _statuses = [...checkboxesStatus];
    const _chosenSteps = [...chosenSteps];
    const nextId = currentIndex + 1;
    const currentStep = currentIndex + 1;
    _values[currentIndex] = tickedValue;
    if ( nextId < _values.length ) {
        _values = handleGetCheckboxValues(_values, nextId);
        _statuses = handleGetCheckboxStatuses(_statuses, tickedValue, nextId);            
    }
    handleSetChosenStepValues(_chosenSteps, currentStep);        
    //
    setProgressStatus([..._values]);
    setCheckboxesStatus([..._statuses]);
    setActiveProgressStep(tickedValue ? currentStep : currentIndex);
    setChosenSteps([..._chosenSteps]);
}
export function handleChangeCbItemStatus(props) {
    const {activeId, tickedValue, progressStatus, checkboxesStatus, activeProgressStep, 
            setProgressStatus, setActiveProgressStep, setCheckboxesStatus, setChosenSteps} = props;
    const currentStep = activeId;
    const _chosenSteps = [];
    const statuses = [...progressStatus.map((status, i) => {
        const curPos = i + 1;
        if ( curPos > activeId ) {
            return false;
        }
        return status;
    })];
    statuses.forEach((status, i) => {
        if ( status ) {
            _chosenSteps.push(i + 1);
        }
    })
    setCheckboxesStatus([...checkboxesStatus.map((status, i) => {
        const curPos = i + 1;
        if ( curPos > activeId ) {
            if ( i === activeId ) {
                return tickedValue;
            }
            return false;
        }
        return status;
    })]);
    setProgressStatus([...statuses]);    
    if ( currentStep !== activeProgressStep ) {
        setActiveProgressStep(currentStep);
    }
    setChosenSteps([..._chosenSteps]);
}
export function handleChangeGroupCbItemsStatus(props) {
    const {items, checkboxesStatus, setCheckboxesStatus} = props;
    const _statuses = [...checkboxesStatus];
    items.forEach(item => {
        const {id, value} = item;
        const i = id - 1;
        _statuses[i] = value;
    });
    setCheckboxesStatus([..._statuses]);
}
export function handleChangeGroupCbItemsValue(props) {
    const {items, progressStatus, setProgressStatus} = props;
    const _statuses = [...progressStatus];
    items.forEach(item => {
        const {id, value} = item;
        const i = id - 1;
        _statuses[i] = value;
    });
    setProgressStatus([..._statuses]);
}
export async function handleChangeNenkL3AllowBStatus(props) {
    const {originActiveProgressStep, value, 
            setAllowHsNenkinL3, setActiveProgressStep, setChosenSteps,
                handleChangeCbItemsValueStatus, handleChangeCbItemsStatus} = props;
    setAllowHsNenkinL3(value);
    //
    setActiveProgressStep(originActiveProgressStep);
    setChosenSteps([]);
    //
    const values = [{ id : PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value, value : false },
                    { id : PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L3.value, value : false },
                    { id : PROGRESSING_STEP_IDS.THONG_BAO_CHUYEN_KHOAN_DA_DEN.value, value : false },
                    { id : PROGRESSING_STEP_IDS.DA_XAC_NHAN_VIEC_CHUYEN_KHOAN_XONG.value, value : false },
                    { id : PROGRESSING_STEP_IDS.KET_THUC_HOP_DONG.value, value : false } ];
    const statuses = cloneDeep(values).map(status => {
        const {id} = status;
        status.value = value ? id === PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value : 
                            id === PROGRESSING_STEP_IDS.THONG_BAO_CHUYEN_KHOAN_DA_DEN.value;
        return status;
    });
    handleChangeCbItemsValueStatus([...values]);
    handleChangeCbItemsStatus([...statuses]);
}
export async function setNenkL3AllowStatusAfterLoading(v, activeStepValue, props) {
    const {setAllowHsNenkinL3} = props;
    setAllowHsNenkinL3(v);
    const values = [ { id : PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value, value : v },
                     { id : PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L3.value, value : v },
                     { id : PROGRESSING_STEP_IDS.THONG_BAO_CHUYEN_KHOAN_DA_DEN.value, value : true },
                     { id : PROGRESSING_STEP_IDS.DA_XAC_NHAN_VIEC_CHUYEN_KHOAN_XONG.value, value : true },
                     { id : PROGRESSING_STEP_IDS.KET_THUC_HOP_DONG.value, value : true } ];
    const statuses = [...cloneDeep(values).map(item => {
        item.value = false;
        return item;
    })];
    for(let i = 0; i < values.length; i++) {
        const {id} = values[i];  
        statuses[i].value = false;          
        if ( id === PROGRESSING_STEP_IDS.DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3.value || 
                id === PROGRESSING_STEP_IDS.XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L3.value ) {
            if ( !v ) {
                values[i].value = v;
            }
        }
        else {
            values[i].value = activeStepValue >= id;                
            if ( activeStepValue >= id && statuses[i + 1] ) {
                statuses[i + 1].value = true;
            }
        }
    }
    //console.log([...statuses]);
    handleChangeGroupCbItemsValue([...values]);
    handleChangeGroupCbItemsStatus([...statuses]);
}
export function findAttachmentByNo(attachmentFiles, no) {
    if ( !attachmentFiles || attachmentFiles.length === 0 ) return null;
    return attachmentFiles.find(item => item.no === no);
}
export async function handleShowEmailTemplateModal(props) {
    const {contentEmailModal, headingLabel, username, no, emailCode, translationStrings, attachmentFiles,
            setLoading, setAttachmentFnModal, setShowEmailModal, setHeadingEmailModal, setContentEmailModal} = props;
    const attachmentFn = findAttachmentByNo(attachmentFiles, no);
    setAttachmentFnModal(attachmentFn?.name || '');
    if ( contentEmailModal ) {
        setShowEmailModal(true);
        return;
    }
    setLoading(true);
    const results = await getEmailTemplateByCode(username, emailCode);
    if ( !results || !results.email_template ) {
        setLoading(false);
        return;
    }
    const {email_template} = results;
    const {content} = email_template;
    const heading = getTranslation(translationStrings, "mauemail_label").replace("%s", headingLabel);
    setHeadingEmailModal(heading);
    setContentEmailModal(content);
    setLoading(false);
    setShowEmailModal(true);
}
// submit
export async function handleSubmitFormTienDo(props) {
    const {translationStrings, checkHsApproved, denyMsgHs, userId, chosenSteps, checkboxesStatus, attachmentFiles,
            setProgressingUpdateData, setActiveCurrentStep, setShowUpdateModal,
                setActiveProgressStep, setOriginActiveProgressStep, setCheckboxesStatus,
                    setChosenSteps, setStagChanged} = props;    
    const length = chosenSteps.length;
    const progressingLabels = PROGRESSING_LABELS.map(label => getTranslation(translationStrings, label));
    const attachmentFile = attachmentFiles[0]?.file || null;
    setActiveCurrentStep(1);
    setProgressingUpdateData([...chosenSteps.map(v => ({
        id : v,
        label : progressingLabels[v - 1]
    }))]);
    setShowUpdateModal(true);
    for(let i = 0; i < length; i++) {
        const results = await doReportStep(userId, chosenSteps[i], {checkHsApproved, denyMsgHs, setActiveCurrentStep, attachmentFile});
    }  
    setTimeout(() => {
        setShowUpdateModal(false);             
        const step = chosenSteps[length - 1];
        const _statuses = [...checkboxesStatus];
        chosenSteps.forEach((st, i) => {
            _statuses[st - 1] = false;
        });
        setActiveProgressStep(step);
        setOriginActiveProgressStep(step);       
        setCheckboxesStatus([..._statuses]);
        setChosenSteps([]);
        setStagChanged(false);
    }, 200);
}