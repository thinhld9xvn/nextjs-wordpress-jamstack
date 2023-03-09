import RequiredFieldMsg from '@components/templates/required-field';
import { getTranslation } from '@js_dir/utils/translations';
import React from 'preact/compat'
import Link from 'next/link'
import { getPageUrlByLocale } from '@js_dir/utils/urlUtils';

export default function LoginForm({ title, translationStrings, props, handleLogin }) {
    const {username, password, checkForm, locale, setUserName, setPassword, handleChanged, handlePerformLoginKeyDown} = props;
  return (
    <div className="form-account__pass">
        <h2 className="titles-bold__alls titles-center__alls color-blues fs-32s mb-60s">{title}</h2>
        <form autoComplete="Off">
            <div className="groups-accounts__form mb-20s">
                <div className="control-groups__accounts">
                    <input type="text" id="username" placeholder={`${getTranslation(translationStrings, "emailhoacsodienthoai_label")}*`}
                            onChange={handleChanged.bind(this, setUserName)}
                            onKeyDown={handlePerformLoginKeyDown} />
                </div>
                {checkForm && (!username || username.length === 0) ? (
                    <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                ) : null}
            </div>
            <div className="groups-accounts__form mb-20s">
                <div className="control-groups__accounts">
                    <input type="password" id="password" placeholder={`${getTranslation(translationStrings, "matkhau_label")}*`}
                            onChange={handleChanged.bind(this, setPassword)}
                            onKeyDown={handlePerformLoginKeyDown} />
                </div>
                {checkForm && (!password || password.length === 0) ? (
                    <RequiredFieldMsg msg = {getTranslation(translationStrings, "requriredfield_label")} />
                ) : null}
            </div>
            <a href="#" 
                className="btn-sea__alls fs-15s mb-15s" 
                onClick={handleLogin}>{getTranslation(translationStrings, "dangnhap_label")}</a>
            <Link href={getPageUrlByLocale('quen_mat_khau', locale)}>
                <a className="btn-lost__pass">{getTranslation(translationStrings, "quenmatkhau_label")}</a>
            </Link>
        </form>
    </div>
  )
}
