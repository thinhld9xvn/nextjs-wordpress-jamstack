import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
import Image from 'next/image'

export default function NotificationsFooterTemplate({ loading = true, data = [], translationStrings }) {
  return (
    <li>
      <a href="#" className="btn__verify btn__notifications">
        <Image src="/static/images/bells-icon.png" width={50} height={50} layout="fixed" /> 
        <span>{!loading ? data.length : ''}</span>
      </a>
      <div className="verifyTooltip verify">
          <p className="tooltipHeading">{getTranslation(translationStrings, "thongbao_label")}</p>
          <div className="tooltipNotifications">
            {loading ? (
              <p className="tooltipCenter"><span className="fa fa-spinner fa-spin"></span></p>
            ) : (
              <>
                {data}
              </>
            )}
          </div>
          <i></i>
      </div>
    </li>
  )
}
