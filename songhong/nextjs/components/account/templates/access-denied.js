import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'

export default function AccessDeniedPage({ translationStrings }) {
  return (
    <div className="box-acounts__content content-right__accounts height-100s">
        <p>{getTranslation(translationStrings, "accessdenied_label")}</p>
    </div>
  )
}
