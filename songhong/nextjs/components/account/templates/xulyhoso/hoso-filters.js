import { HOSO_FILTER_ITEMS } from '@constants/constants'
import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'

function HosoFilterItem({ id, label, ticked = false, handleTickChanged = null }) {
    return (
        <div className="checkboxTDHS">
            <input id={id} type="checkbox" name={id} checked={ticked} />
            <label htmlFor={id} onClick={handleTickChanged.bind(this, id, !ticked)}>{label}</label>
        </div>
    )
}
export default function HosoFilters({ show, statuses = [], handleToggleFilterBox, handleTickChanged, translationStrings }) {
  const getTickedValue = (items, id) => {
    if ( !items || items.length === 0 ) return false;
    const searched = items.find(it => it.id === id);
    return searched ? searched.value : false;
  }    
  return (
    <>
        <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">
            {getTranslation(translationStrings, "filter_label")}
        </h3>
        <div className="box-hs__section">        
            <div className={`hosoFilters ${show ? '' : '__minimize'}`}>
                <label onClick={handleToggleFilterBox}>
                    {getTranslation(translationStrings, "trangthaihoso_label")}:
                </label>
                <div className="wrapper">
                    <div className="filterChoices">
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.CHUA_XAC_THUC_HS.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.CHUA_XAC_THUC_HS.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.CHUA_XAC_THUC_HS.id)}
                                        handleTickChanged = {handleTickChanged} />
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.DA_XAC_THUC_HS.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.DA_XAC_THUC_HS.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.DA_XAC_THUC_HS.id)}
                                        handleTickChanged = {handleTickChanged} />
                    </div>
                    <div className="filterChoices">
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.DA_XAC_NHAN_TIEN_L1.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.DA_XAC_NHAN_TIEN_L1.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.DA_XAC_NHAN_TIEN_L1.id)}
                                        handleTickChanged = {handleTickChanged} />
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.DA_XAC_NHAN_TIEN_L2.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.DA_XAC_NHAN_TIEN_L2.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.DA_XAC_NHAN_TIEN_L2.id)}
                                        handleTickChanged = {handleTickChanged} />
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.DA_XAC_NHAN_TIEN_L3.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.DA_XAC_NHAN_TIEN_L3.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.DA_XAC_NHAN_TIEN_L3.id)}
                                        handleTickChanged = {handleTickChanged} />
                    </div>
                    <div className="filterChoices">
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.DANG_CHO_XAC_NHAN_TIEN_L1.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.DANG_CHO_XAC_NHAN_TIEN_L1.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.DANG_CHO_XAC_NHAN_TIEN_L1.id)}
                                        handleTickChanged = {handleTickChanged} />
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.DANG_CHO_XAC_NHAN_TIEN_L2.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.DANG_CHO_XAC_NHAN_TIEN_L2.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.DANG_CHO_XAC_NHAN_TIEN_L2.id)}
                                        handleTickChanged = {handleTickChanged} />
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.DANG_CHO_XAC_NHAN_TIEN_L3.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.DANG_CHO_XAC_NHAN_TIEN_L3.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.DANG_CHO_XAC_NHAN_TIEN_L3.id)}
                                        handleTickChanged = {handleTickChanged} />
                    </div>
                    <div className="filterChoices">
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.CHUA_XAC_NHAN_TIEN_L1.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.CHUA_XAC_NHAN_TIEN_L1.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.CHUA_XAC_NHAN_TIEN_L1.id)}
                                        handleTickChanged = {handleTickChanged} />
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.CHUA_XAC_NHAN_TIEN_L2.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.CHUA_XAC_NHAN_TIEN_L2.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.CHUA_XAC_NHAN_TIEN_L2.id)}
                                        handleTickChanged = {handleTickChanged} />
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.CHUA_XAC_NHAN_TIEN_L3.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.CHUA_XAC_NHAN_TIEN_L3.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.CHUA_XAC_NHAN_TIEN_L3.id)}
                                        handleTickChanged = {handleTickChanged} />
                    </div>
                    <div className="filterChoices">
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.CHUA_KTHD.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.CHUA_KTHD.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.CHUA_KTHD.id)}
                                        handleTickChanged = {handleTickChanged} />
                        <HosoFilterItem id = {HOSO_FILTER_ITEMS.DA_KTHD.id}
                                        label = {getTranslation(translationStrings, HOSO_FILTER_ITEMS.DA_KTHD.label)}
                                        ticked = {getTickedValue(statuses, HOSO_FILTER_ITEMS.DA_KTHD.id)}
                                        handleTickChanged = {handleTickChanged} />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
