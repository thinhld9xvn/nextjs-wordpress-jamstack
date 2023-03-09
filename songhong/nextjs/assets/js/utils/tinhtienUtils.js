import { getTranslation } from "./translations";

export function formatMoney(number, decPlaces, thouSeparator, decSeparator) {
    var n = number,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
}
export function getCurrencyTranslationLabel(v, translationStrings) {
    return v === 'yen' ? getTranslation(translationStrings, "yen_label") : 
                            getTranslation(translationStrings, "dong_label");
}
function _getClipboardValue(e, limit) {
    const clipboardData = e.clipboardData || window.clipboardData;
    let value = clipboardData.getData('Text').replace(/\D/g, "") || 0;  
    if ( value.length > limit ) {
        value = value.substr(0, limit);
    }        
    return parseInt(value);
}
export function findRateByMonth(data, month) {
    const realMonthValue = month - 1;
    const op = data.filter(option => (realMonthValue >= option.start_value && realMonthValue < option.end_value) || 
                                        (option.start_value === option.end_value && realMonthValue >= option.start_value));
    return op.length ? op[0].content : 0;
}
export function handleGetPasteOnlyNumbers(setValue, limit, e) {
    const value = _getClipboardValue(e, limit);
    setTimeout(() => {
        setValue(value);
        e.target.value = value;
    }, 10);
}
export function handleGetPasteMonthNumbers(data, setValue, setRate, ref, limit, e) {
    const value = _getClipboardValue(e, limit);
    const rate = findRateByMonth(data, value);
    setTimeout(() => {
        setValue(value);
        setRate(rate);        
        ref.current.clearValue();
        e.target.value = value;
    }, 10);
}
export function handleNenkinSimpleSubmit(props, e) {
    e.preventDefault();
    const {monthRateSelectedValue, salaryPermonthRateSelectedValue, salaryInboxSelectedValue, 
            checkForm, defaultOptions, setCheckForm, setResultsForm, setShowResults} = props;
    const {rate, rate_yen, rate_nenkin_l1, rate_d1, rate_d2, rate_d3, rate_compare, price_tt, rate_pg_default, currency} = defaultOptions;
    const results = {};
    setCheckForm(true);
    setShowResults(false);
    if ( monthRateSelectedValue === 0 || 
            salaryPermonthRateSelectedValue === 0 || 
                salaryInboxSelectedValue == 0) return false;
    let totals = 0, total_L1 = 0, total_L2 = 0, total_tk = 0;     
    if ( salaryPermonthRateSelectedValue === process.env.MSALARY1 ) {
        totals = monthRateSelectedValue * (salaryInboxSelectedValue * rate + rate_d1 + rate_d2);        
    }
    else {
        totals = monthRateSelectedValue * salaryInboxSelectedValue;
    }
    total_L1 = totals * rate_nenkin_l1 / 100;
    total_L2 = totals - total_L1;
    total_tk = total_L2 * rate_pg_default / 100 + rate_d3;
    total_tk = total_tk <= rate_compare ? 
                        price_tt : total_tk;
    results['totals'] = formatMoney(totals, 0, '.', ',');
    results['total_L1'] = formatMoney(total_L1, 0, '.', ',');
    results['total_L2'] = formatMoney(total_L2, 0, '.', ',');
    results['total_TK'] = formatMoney(currency === 'vnd' ? total_tk * rate_yen : total_tk, 0, '.', ',');
    results['rate'] = formatMoney(monthRateSelectedValue, 1, '.', ',');
    setResultsForm({...results});
    setShowResults(true);
} 
export function handleNenkinAdvancedSubmit(props, e) {
    e.preventDefault();
    const {monthRateSelectedValue, salaryPermonthRateSelectedValue, salaryInboxSelectedValue, 
        minSalSelectedValue, OTSelectedValue,  BonusSelectedValue, HomeBillsSelectedValue, monthRValue,
        checkForm, defaultOptions, setCheckForm, setResultsForm, setShowResults} = props;
    const {rate, rate_price, price_tt, rate_pg_default, rate_yen, rate_compare, rate_d3, currency} = defaultOptions;
    const results = {};
    setCheckForm(true);
    setShowResults(false);
    let boolCheck = salaryPermonthRateSelectedValue && monthRateSelectedValue > 0;
        boolCheck = boolCheck && (salaryPermonthRateSelectedValue === process.env.MSALARY3 ? 
                                    minSalSelectedValue > 0 && OTSelectedValue > 0 : true);
        boolCheck = boolCheck && ((salaryPermonthRateSelectedValue === process.env.MSALARY1 || 
                                    salaryPermonthRateSelectedValue === process.env.MSALARY3) ? HomeBillsSelectedValue > 0 : true);
    if ( !boolCheck ) {
        return;
    }
    let totals = 0, totals_L1 = 0, totals_L2 = 0, totals_tk = 0;
    if (salaryPermonthRateSelectedValue === process.env.MSALARY1) {
        totals = monthRateSelectedValue * (salaryInboxSelectedValue * rate + 
                                                BonusSelectedValue / 12 + 
                                                    HomeBillsSelectedValue);
    }
    else if (salaryPermonthRateSelectedValue === process.env.MSALARY2) {
        totals = monthRateSelectedValue * (salaryInboxSelectedValue + BonusSelectedValue / 12);
    }
    else if (salaryPermonthRateSelectedValue === process.env.MSALARY3) {
        totals = monthRateSelectedValue * (minSalSelectedValue * rate_price / 12 + 
                                                OTSelectedValue * minSalSelectedValue + 
                                                    BonusSelectedValue / 12 + HomeBillsSelectedValue);
    }
    totals_L1 = totals * 79.42 / 100;
    totals_L2 = totals - totals_L1;
    totals_tk = totals_L2 * rate_pg_default / 100 + rate_d3;
    totals_tk = totals_tk <= rate_compare ? 
                    price_tt : totals_tk;
    results['totals'] = formatMoney(totals, 0, '.', ',');
    results['total_L1'] = formatMoney(totals_L1, 0, '.', ',');
    results['total_L2'] = formatMoney(totals_L2, 0, '.', ',');
    results['total_TK'] = formatMoney(currency === 'vnd' ? totals_tk * rate_yen : totals_tk, 0, '.', ',');
    results['rate'] = formatMoney(monthRateSelectedValue, 1, '.', ',');
    setResultsForm({...results});
    setShowResults(true);
}