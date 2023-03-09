import RequiredFieldMsg from '@components/templates/required-field';
import { getTranslation } from '@js_dir/utils/translations';
import { signIn, useSession } from 'next-auth/react';
import React, {useState, useEffect} from 'preact/compat'
export default function RegisterForm({ title, translationStrings, props }) {
    const {data: session, status} = useSession();
    const {note_register_html,
            linkedFb, setLinkedFb, popup, setPopUp, userFbInfo, setUserFbInfo, handleChanged,
            username, setUserName, password, setPassword, retypePassword, setRetypePassword,
            fullname, setFullName, phone, setPhone, address, setAddress, acceptTerms, setAcceptTerms,
            email, setEmail,
            checkForm, setCheckForm, handleAcceptTerms, handleSubmit} = props;
    const handleOpenFacebookDialog = (e) => {
        e.preventDefault(); 
        if ( !linkedFb ) {
            setPopUp(true);
        }
        else {
            setLinkedFb(false);
        }
    }
    useEffect(() => {
        if (popup) {
            var myWin = window.open('/sign-in', "", "width=800,height=500,top=100,left=300");
            const t = setInterval(() => {
                if (myWin.closed) {
                    clearInterval(t);
                    setPopUp(false);
                    if ( session ) {
                        setLinkedFb(true);
                    }
                }
            }, 100);
        }
      return () => {
      }
    }, [popup]);
    useEffect(() => {
        if ( linkedFb && session ) {
            setUserFbInfo({...session.user});
        }
    }, [linkedFb, session]);
    //console.log(userFbInfo);
  return (
    <>
        <h2 className="titles-bold__alls titles-center__alls color-blues fs-32s mb-60s">{title}</h2>
        <form id="register-form" onSubmit={handleSubmit} autoComplete="Off">
            <div className="groups-accounts__form mb-20s">
                <div className="control-groups__accounts">
                    <input type="text"
                            placeholder={`${getTranslation(translationStrings, "emailhoacsodienthoai_label")}*`}
                            onChange={handleChanged.bind(this, setUserName)}
                            value={username} />
                </div>
                {checkForm && (!username || username.length === 0) ? (
                    <RequiredFieldMsg msg={getTranslation(translationStrings, "requriredfield_label")} />
                ) : null}
            </div>
            <div className="groups-accounts__form mb-20s">
                <div className="control-groups__accounts">
                    <input type="password"
                            placeholder={`${getTranslation(translationStrings, "matkhau_label")}*`}
                            onChange={handleChanged.bind(this, setPassword)} />
                </div>
                {checkForm && (!password || password.length === 0) ? (
                    <RequiredFieldMsg msg={getTranslation(translationStrings, "requriredfield_label")} />
                ) : null}                
            </div>
            <div className="groups-accounts__form mb-30s">
                <div className="control-groups__accounts">
                    <input type="password"
                            placeholder={`${getTranslation(translationStrings, "nhaplaimatkhau_label")}*`}
                            onChange={handleChanged.bind(this, setRetypePassword)} />
                </div>
                {checkForm && (!retypePassword || retypePassword.length === 0) ? (
                    <RequiredFieldMsg msg={getTranslation(translationStrings, "requriredfield_label")} />
                ) : null}
                {checkForm && (!password || !retypePassword || password !== retypePassword) ? (
                    <RequiredFieldMsg msg={getTranslation(translationStrings, "passwordretypeincorrect_label")} />
                ) : null}
            </div>
            <h3 className="titles-after__befores fs-14s mb-30s">
                <span>{getTranslation(translationStrings, "thongtincanhan_label")}</span>
            </h3>
            <div className="groups-accounts__form mb-20s">
                <div className="control-groups__accounts">
                    <input type="text" 
                            placeholder={`${getTranslation(translationStrings, "hovaten_label")}*`}
                            onChange={handleChanged.bind(this, setFullName)}  />
                </div>
                {checkForm && (!fullname || fullname.length === 0) ? (
                    <RequiredFieldMsg msg={getTranslation(translationStrings, "requriredfield_label")} />
                ) : null}
            </div>
            <div className="groups-accounts__form mb-20s">
                <div className="control-groups__accounts">
                    <input type="email" 
                            placeholder={`${getTranslation(translationStrings, "email_label")}*`}
                            onChange={handleChanged.bind(this, setEmail)} />
                </div>
                {checkForm && (!email || email.length === 0) ? (
                    <RequiredFieldMsg msg={getTranslation(translationStrings, "requriredfield_label")} />
                ) : null}
            </div>
            <div className="groups-accounts__form mb-20s">
                <div className="control-groups__accounts">
                    <input type="text" placeholder={`${getTranslation(translationStrings, "facebook_label")}*`} readOnly={true} value={linkedFb && session ? session.user.name : ''} />
                    <button className="submit-facebooks" onClick={handleOpenFacebookDialog}>{!linkedFb ? getTranslation(translationStrings, "chualienket_label") : getTranslation(translationStrings, "lienket_label")}</button>
                </div>
                {checkForm && !linkedFb ? (
                    <RequiredFieldMsg msg={getTranslation(translationStrings, "requiredlinkedfb_label")} />
                ) : null}
            </div>
            <div className="groups-accounts__form mb-20s">
                <div className="control-groups__accounts">
                    <input type="text" placeholder={getTranslation(translationStrings, "address_label")}
                            onChange={handleChanged.bind(this, setAddress)} />
                </div>
            </div>
            <div className="groups-accounts__form mb-20s">
                <div className="control-groups__accounts">
                    <input type="text" 
                            placeholder={getTranslation(translationStrings, "phone_label")}
                            onChange={handleChanged.bind(this, setPhone)} />
                </div>
            </div>
            <div className="check-box__alls mb-40s"
                 onClick={handleAcceptTerms}>
                <div className="terms-flexbox">
                    <input type="checkbox" className="form-check-input input-checked" value="1" checked={acceptTerms} />
                    <span className="checkmark"> </span>
                    <label className="form-check-label">
                        {getTranslation(translationStrings, "acceptterms_label")}
                    </label>         
                </div>
                {checkForm && !acceptTerms ? (
                    <RequiredFieldMsg msg={getTranslation(translationStrings, "requiredacceptterms_label")} />
            ) : null}       
            </div>            
            <button className="btn-sea__alls fs-15s mb-30s">{getTranslation(translationStrings, "dangky_label")}</button>
            <div dangerouslySetInnerHTML={{ __html: note_register_html }}></div>
        </form>
    </>
  )
}
