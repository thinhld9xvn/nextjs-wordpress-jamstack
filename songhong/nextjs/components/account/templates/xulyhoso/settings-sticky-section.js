import FormHosoSearch from '@components/templates/form-hoso-search'
import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
import HosoFilters from './hoso-filters'

export default function SettingsStickySection({ props, translationStrings }) {
  const {keyword, router, searchRef, handleSearchSubmit, handleKeywordChanged,
            showFilterBox, handleToggleFilterBox, showSettingsBox, prgChekboxStatuses, handleToggleSettingsBox, 
              handleResetSettingsBox, handleSaveChangesSettingsBox, handlePrgItemChanged} = props;
  return (
    <>
      <div className="btn__settings" onClick={handleToggleSettingsBox}>
        <img src="/static/images/settings.png" alt="" />
      </div>
      <div className={`hs-settings__box ${showSettingsBox ? 'sticky' : ''}`}>
          <div className="wrapper">
            <h2 className="fs-32s mb-50s color-blues">{getTranslation(translationStrings, "tuychinhcaidat_label")}</h2>
            <span className="close-settings" onClick={handleToggleSettingsBox}>x</span>
            <div className="box-hs-transparent mb-40s">
                <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">
                    {getTranslation(translationStrings, "search_label")}
                </h3>
                <div className="box-hs__section">
                    <div className="sidebar-search__news">
                        <FormHosoSearch keyword = {keyword}
                                        router = {router}
                                        searchRef = {searchRef}
                                        handleSubmit = {handleSearchSubmit}
                                        handleChanged = {handleKeywordChanged}
                                        translationStrings = {translationStrings} />
                    </div>
                </div>
              </div>
              <div className="box-hs-transparent mb-40s">
                  <HosoFilters translationStrings = {translationStrings}
                              show = {showFilterBox}
                              statuses = {prgChekboxStatuses}
                              handleToggleFilterBox = {handleToggleFilterBox}
                              handleTickChanged = {handlePrgItemChanged} />
              </div>
              <div className="box-hs-transparent mb-40s">
                <div className="approved_buttons box-hs__section box-hs__filters">
                    <a href="#" className="button_checkhs button_checkhs__approved xetduyet"
                      onClick={handleSaveChangesSettingsBox}>
                      {getTranslation(translationStrings, "savechanges_label")}
                    </a>
                    <a href="#" className="button_checkhs button_checkhs__rejected xemhs"
                       onClick={handleResetSettingsBox}>
                      {getTranslation(translationStrings, "resettodefault_label")}
                    </a>
                </div>
              </div>

          </div>
      </div>
    </>
  )
}
