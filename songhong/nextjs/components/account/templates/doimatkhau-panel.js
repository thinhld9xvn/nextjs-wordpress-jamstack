import LoadingOvery from '@components/templates/loading-overlay'
import RequiredFieldMsg from '@components/templates/required-field'
import { PAGES } from '@constants/constants'
import { decryptPassword, encryptPassword } from '@js_dir/utils/encrypt'
import { setUserPassData } from '@js_dir/utils/membershipUtils'
import { getTranslation } from '@js_dir/utils/translations'
import { getPageUrlBySlug } from '@js_dir/utils/urlUtils'
import { ChangeUserPassword } from '@lib/mutations/change-password'
import Link from 'next/link'
import React, {useState, useEffect, useRef} from 'preact/compat'
export default function DoiMatKhauPanel({ data, locale, translationStrings, props }) {
    const [checkForm, setCheckForm] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [userId, setUserId] = useState(null);
    const [currentPass, setCurrentPass] = useState('');
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [retypeNewPass, setRetypeNewPass] = useState('');
    const oldPassRef = useRef(null);
    const newPassRef = useRef(null);
    const retypeNewPassRef = useRef(null);
    const {setUserLoggedInData, setUserOriginalLoggedInData} = props;
    useEffect(() => {
        setShowLoading(false);
        handleResetForm();
    }, [,data,locale]);
    useEffect(() => {
        if ( data ) {
            setUserId(data.id);
            setCurrentPass(decryptPassword(data.user_password));
        }
    }, [data]);
    const handleResetForm = (e) => {
        setCheckForm(false);
        setOldPass('');
        setNewPass('');
        setRetypeNewPass('');
        oldPassRef.current.value = '';
        newPassRef.current.value = '';
        retypeNewPassRef.current.value = '';
    }
    const handleUpdateNewPass = (newPass) => {
        const encryptedPass = encryptPassword(newPass);
        setUserOriginalLoggedInData({...data, user_password : encryptedPass});
        setUserLoggedInData({...data, user_password : encryptedPass});
        setUserPassData(encryptedPass);
    }
    const handleChanged = (setValue, e) => {
        setValue(e.target.value);
    }
    const handleChangePassword = async (e) => {
        e.preventDefault();
        setCheckForm(true);
        if ( !oldPass || oldPass !== currentPass || !newPass || !retypeNewPass || newPass !== retypeNewPass ) {
            return;
        }
        setShowLoading(true);
        const results = await ChangeUserPassword({userId, password : currentPass});
        if ( !results.updateUser ) {
            setShowLoading(false);
            setTimeout(() => {
                alert(getTranslation(translationStrings, "updateuserpasserror_label"));
            }, 100);
        }
        handleUpdateNewPass(newPass);
        handleResetForm();
        setShowLoading(false);
        setTimeout(() => {
            alert(getTranslation(translationStrings, "changepasssuccess_label"));  
        }, 100);      
    }
  return (
    <>
        <div className="box-acounts__content content-right__accounts mb-30s height-100s">
            <div className="top-accounts__rights mb-50s">
                <div className="text-top__accounts">
                    <h2 className="fs-32s mb-15s color-blues">{getTranslation(translationStrings, "doimatkhau_label")}</h2>
                    <p>{getTranslation(translationStrings, "banconhomatkhaucukhong_label")} <Link href={getPageUrlBySlug(PAGES.QUEN_MAT_KHAU[locale])}>
                                                                                                <a className="btn-sea__text">{getTranslation(translationStrings, "quenmatkhau_label")}</a>
                                                                                            </Link>
                    </p>
                </div>
            </div>
            <div className="form-content__accounts">
                <form id="frmChangePass" autoComplete="Off">
                    <div className="groups-accounts__form mb-20s">
                        <p className="label-accounts__forms fs-15s mb-10s">{getTranslation(translationStrings, "oldpassword_label")}</p>
                        <div className="control-groups__accounts">
                            <input type="password" value={oldPass} ref={oldPassRef} onChange={handleChanged.bind(this, setOldPass)} />
                        </div>
                        {checkForm && !oldPass ? (
                            <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                        ) : null}
                        {checkForm && (oldPass && oldPass !== currentPass) ? (
                            <RequiredFieldMsg msg = {getTranslation(translationStrings, "passwordoldincorrect_label")} />
                        ) : null}
                    </div>
                    <div className="groups-accounts__form mb-20s">
                        <p className="label-accounts__forms fs-15s mb-10s">{getTranslation(translationStrings, "newpassword_label")}</p>
                        <div className="control-groups__accounts">
                            <input type="password" value={newPass} ref={newPassRef} onChange={handleChanged.bind(this, setNewPass)} />
                        </div>
                        {checkForm && !newPass ? (
                            <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                        ) : null}
                    </div>
                    <div className="groups-accounts__form mb-50s">
                        <p className="label-accounts__forms fs-15s mb-10s">{getTranslation(translationStrings, "nhaplaimatkhau_label")}</p>
                        <div className="control-groups__accounts">
                            <input type="password" value={retypeNewPass} ref={retypeNewPassRef} onChange={handleChanged.bind(this, setRetypeNewPass)} />
                        </div>
                        {checkForm && !retypeNewPass ? (
                            <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                        ) : null}
                        {checkForm && (!newPass || !retypeNewPass || newPass !== retypeNewPass) ? (
                            <RequiredFieldMsg msg = {getTranslation(translationStrings, "passwordretypeincorrect_label")} />
                        ) : null}
                    </div>
                    <a href="#" 
                        className="btn-sea__alls"
                        onClick={handleChangePassword}>{getTranslation(translationStrings, "doimatkhau_label")}</a>
                </form>
            </div>
        </div>
        <LoadingOvery show = {showLoading} />
    </>
  )
}
