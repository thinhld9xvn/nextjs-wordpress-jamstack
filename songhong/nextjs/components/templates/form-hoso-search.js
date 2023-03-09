import { getTranslation } from '@js_dir/utils/translations';
import Image from 'next/image'
import React from 'preact/compat'

export default function FormHosoSearch({ keyword, router, searchRef, handleSubmit, handleChanged, translationStrings }) {
  return (
    <form method="get" 
            autoComplete="Off"
            onSubmit={handleSubmit}>
        <input type="text" 
                name="s" 
                className="s" 
                ref={searchRef}
                value={keyword}
                onChange={handleChanged}
                placeholder={getTranslation(translationStrings, "nhaptenhoso_label")} />
        <button><Image src="/static/images/search-sidebar-news.svg" width={19} height={19} layout="fixed" /></button>
    </form>
  )
}