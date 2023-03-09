import Logo from '@components/header/templates/logo'
import { getTranslation } from '@js_dir/utils/translations'
import { getPageUrlByLocale } from '@js_dir/utils/urlUtils'
import Link from 'next/link'
import React from 'preact/compat'

export default function HeaderAccount({ logo, showRegisterButton = false, showLoginButton = false, translationStrings, locale }) {
  return (
    <section className="headers-account__pass">
        <div className="container">
            <div className="logo-account__pass">
                <Logo data = {logo} />
            </div>
            {showRegisterButton ? (
              <Link href={getPageUrlByLocale('dang_ky', locale)}>
                  <a className="btn-sea__alls">{getTranslation(translationStrings, "dangky_label")}</a>
              </Link>
            ) : null}
            {showLoginButton ? (
              <Link href={getPageUrlByLocale('dang_nhap', locale)}>
                  <a className="btn-sea__alls">{getTranslation(translationStrings, "dangnhap_label")}</a>
              </Link>
            ) : null}
        </div>
    </section>
  )
}
