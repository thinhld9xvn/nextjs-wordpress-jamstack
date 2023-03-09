import { isDiff } from '@js_dir/utils/arrayUtils';
import { useRouter } from 'next/router';
import React, {useEffect, useState, useCallback, useRef} from 'preact/compat'
import { connect } from 'react-redux';
import RankMath from './templates/rankmath';
import HotlineSidebar from './templates/hotline-sidebar';
import BreadcrumbsTemplate from './templates/breadcrumbs-template';
import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import NavTemplate from './tinh-tien-nenkin/nav-template';
import { SimpleCalcTemplate } from './tinh-tien-nenkin/simple-calc-template';
import BanghesoTemplate from './tinh-tien-nenkin/bangheso-template';
import { findRateByMonth, formatMoney, handleGetPasteMonthNumbers, handleGetPasteOnlyNumbers, handleNenkinAdvancedSubmit, handleNenkinSimpleSubmit } from '@js_dir/utils/tinhtienUtils';
import { AdvancedCalcTemplate } from './tinh-tien-nenkin/advanced-calc-template';
import BoxCategorySidebar from './tinh-tien-nenkin/box-category-sidebar';
import { MAX_N } from '@constants/constants';
import { handleInputMonthChanged, handleNumberChanged } from '@js_dir/utils/handleInputBoxUtils';
import { getTranslation } from '@js_dir/utils/translations';
function TinhTienNenkinsPg({ pageContext, siteOptions, UpdateSiteOptions, translationStrings }) { 
    const router = useRouter();
    const [initialBreadData, setInitialBreadData] = useState([]); 
    const monthRef = useRef(null);
    const salaryRef = useRef(null);
    const cityRef = useRef(null);
    const monthAdvancedRef = useRef(null);
    const salaryAdvancedRef = useRef(null);
    const [checkForm, setCheckForm] = useState(false);
    const [checkAdForm, setCheckAdForm] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [showAdResults, setShowAdResults] = useState(false);
    const [monthRateSelectedValue, setmonthRateSelectedValue] = useState(0); // Số tháng làm việc ở Nhật (select box)
    const [monthRateAdSelectedValue, setmonthRateAdSelectedValue] = useState(0); 
    const [monthRValue, setmonthRValue] = useState(0); // Số tháng làm việc ở Nhật (input box)
    const [monthRAdValue, setmonthRAdValue] = useState(0); 
    const [priceTronGoi, setPriceTronGoi] = useState(0); 
    const [priceAdTronGoi, setPriceAdTronGoi] = useState(0); 
    const [salaryPermonthRateSelectedValue, setSalaryPermonthRateSelectedValue] = useState(0); // Lương bình quân mỗi tháng (select box)
    const [salaryPermonthAdRateSelectedValue, setSalaryPermonthAdRateSelectedValue] = useState(0);    
    const [salaryCitySelectedValue, setCitySelectedValue] = useState('');    
    const [salaryInboxSelectedValue, setSalaryInBoxSelectedValue] = useState(0); // Lương bình quân về tay hàng tháng (input box)
    const [salaryInboxAdSelectedValue, setSalaryInBoxAdSelectedValue] = useState(0); // Lương bình quân mỗi tháng (input box)
    //
    const [minSalSelectedValue, setMinSalSelectedValue] = useState(0);
    const [OTSelectedValue, setOTSelectedValue] = useState(0);
    const [BonusSelectedValue, setBonusSelectedValue] = useState(0);
    const [HomeBillsSelectedValue, setHomeBillsSelectedValue] = useState(0);
    //
    const [breadActiveItem, setBreadActiveItem] = useState({id : initialBreadData.length ? initialBreadData[0].id : '', 
                                                            name : initialBreadData.length ? initialBreadData[0].name : ''});
    const [breadData, setBreadData] = useState([]);
    const [resultsForm, setResultsForm] = useState({});
    const [resultsAdForm, setResultsAdForm] = useState({});
    //
    const {siteOptions : mySiteOptions, seo, breadcrumbs, nenkinSimpleCalcOptions, nenkinAdvancedCalcOptions} = pageContext;
    const {nenkin_simple_calc, nenkin_luuy_html, rate_yen_to_vnd, currency_active} = nenkinSimpleCalcOptions;
    const {nenkins_advanced_calc} = nenkinAdvancedCalcOptions;
    const {cities_living, rate_default : def_rate_advanced, rate_price_default : def_rate_price_advanced} = nenkins_advanced_calc;
    const { months_working, salary_per_month, rate_default, 
            rate_price_default_1, rate_price_default_2, rate_price_default_3,
               price_compare_default, price_tt_default, rate_percentage_default, rate_percentage_nenkin_L1 } = nenkin_simple_calc;
    //
    const MonthsWorkingOptions = months_working.map(item => ({ label : item.label, value : item.content }));
    const SalaryOptions = salary_per_month.map(item => (item.id !== process.env.MSALARY3 ? { label : item.label, value : item.id } : null)).filter(item => item !== null);
    const SalaryAdvancedOptions = salary_per_month.map(item => ({ label : item.label, value : item.id }));
    const citiesOptions = cities_living.map(item => ({ label : item.label, value : item.label }));
    const {phone} = mySiteOptions;
    //
    const handleChangeMonthRate = useCallback((data, value, setValue) => {
        if ( value ) {
            const {price, price_extends} = data.filter(item => item.content === value)[0];
            if ( price_extends.length ) {
                const priceFinder = price_extends.find(item => value >= item.start_value && value < item.end_value);
                if ( priceFinder ) {
                    setValue(priceFinder.price);
                }
            }
            else {
                setValue(price);
            }
        }
    }, []);
    const handleMonthSelectBoxChanged = useCallback((elemDOMId, setInputValue, setValue, e) => {  
        const {label, value} = e || {};           
        const elemDOM = document.getElementById(elemDOMId);        
        if ( label && value ) {
            setValue(value);
            setInputValue(0);
            elemDOM.value = '';
        }
    }, []);
    const handleMonthInputBoxChanged = useCallback((data, ref, elemDOMId, setInputValue, setValue, e) => {   
        const elemDOM = document.getElementById(elemDOMId); 
        return handleInputMonthChanged(data, elemDOM, ref, setValue, setInputValue, e);
    }, []);
    const handleSalaryPerMonthBoxChanged = useCallback((setValue, e) => {
        try {
            const {label, value} = e;
            setValue(value);
        } catch (e) {}
    }, []);
    const handleSalaryInBoxChanged = useCallback(handleNumberChanged, []);
    const handleSelectTab = (id, e) => {
        e.preventDefault();
        const breadItem = initialBreadData.find(item => item.id === id);
        setBreadActiveItem({
            id: breadItem.id,
            name: breadItem.name
        });
    };
    const handlePreventAction = (e) => {
        e.preventDefault();
        return false;
    }
    const handleSimpleSubmit = handleNenkinSimpleSubmit.bind(this, { monthRateSelectedValue, salaryPermonthRateSelectedValue, 
                                                                        salaryInboxSelectedValue, 
                                                                        defaultOptions: {   rate: rate_default, 
                                                                                            rate_yen : rate_yen_to_vnd,
                                                                                            rate_nenkin_l1 : rate_percentage_nenkin_L1,
                                                                                            rate_d1: rate_price_default_1, 
                                                                                                rate_d2: rate_price_default_2,
                                                                                                    rate_d3 : rate_price_default_3, 
                                                                                                        rate_compare: price_compare_default,
                                                                                                            price_tt : price_tt_default, 
                                                                                                                rate_pg_default: rate_percentage_default,
                                                                                                                    currency : currency_active  },
                                                                        checkForm, setCheckForm,
                                                                        setResultsForm, setShowResults });
    const handleAdvancedSubmit = handleNenkinAdvancedSubmit.bind(this, { monthRateSelectedValue : monthRateAdSelectedValue, 
                                                                        salaryPermonthRateSelectedValue : salaryPermonthAdRateSelectedValue, 
                                                                        salaryInboxSelectedValue : salaryInboxAdSelectedValue, 
                                                                        minSalSelectedValue,
                                                                        OTSelectedValue,
                                                                        BonusSelectedValue,
                                                                        HomeBillsSelectedValue,
                                                                        monthRValue : monthRAdValue,
                                                                        defaultOptions: {   rate: def_rate_advanced, 
                                                                                            rate_price: def_rate_price_advanced,
                                                                                            rate_yen : rate_yen_to_vnd,
                                                                                            price_tt : price_tt_default,
                                                                                            rate_compare : price_compare_default,
                                                                                            rate_pg_default : rate_percentage_default,
                                                                                            rate_d3 : rate_price_default_3,
                                                                                            currency : currency_active  },
                                                                        checkForm : checkAdForm, 
                                                                        setCheckForm : setCheckAdForm,
                                                                        setResultsForm : setResultsAdForm, 
                                                                        setShowResults : setShowAdResults });
    useEffect(() => {
        try {
            monthRef.current.clearValue();
            salaryRef.current.clearValue();
            document.getElementById('months-price').value = '';
            document.getElementById('salary-binhquan').value = '';
            setCheckForm(false);
            setShowResults(false);
            setmonthRateSelectedValue(0);
            setmonthRValue(0);
            setPriceTronGoi(0);
            setSalaryPermonthRateSelectedValue(0);
            setSalaryInBoxSelectedValue(0);
            //
            const monthsPriceInput = document.getElementById('months-aprice');
            const salaryPriceInput = document.getElementById('salary-apermonth');
            const otTimesInput = document.getElementById('ot_times');
            const bonusInput = document.getElementById('bonus_salary');
            const homebillsInput = document.getElementById('homebills_salary');
            monthAdvancedRef.current && (monthAdvancedRef.current.clearValue());
            salaryAdvancedRef.current && (salaryAdvancedRef.current.clearValue());
            cityRef.current && (cityRef.current.clearValue());
            monthsPriceInput && (monthsPriceInput.value = '');
            salaryPriceInput && (salaryPriceInput.value = '');
            otTimesInput && (otTimesInput.value = '');
            bonusInput && (bonusInput.value = '');
            homebillsInput && (homebillsInput.value = '');
            setmonthRateAdSelectedValue(0);
            setmonthRAdValue(0);
            setSalaryPermonthAdRateSelectedValue(0);
            setSalaryInBoxAdSelectedValue(0);
            setMinSalSelectedValue(0);
            setOTSelectedValue(0);
            setBonusSelectedValue(0);
            setHomeBillsSelectedValue(0);
            setCheckAdForm(false);
            setShowAdResults(false);
            //
        } catch(e) {}
    }, [,router.locale,breadActiveItem]);
    useEffect(() => {
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
    }, [,router.locale]);
    useEffect(() => {
        setInitialBreadData([
            {
                id : 'simple',
                name : getTranslation(translationStrings, "simplecalc_label")
            },
            {
                id : 'adv',
                name : getTranslation(translationStrings, "advcalc_label")
            }
        ]);      
    }, [,router.locale,translationStrings]);
    useEffect(() => {
        if (initialBreadData.length === 0) return;
        setBreadActiveItem({id : initialBreadData[0].id, 
                             name : initialBreadData[0].name});
    }, [, router.locale, pageContext, initialBreadData]);
    useEffect(() => {
        if (initialBreadData.length === 0) return;
        const dataBreadcrumbs = structuredClone(breadcrumbs);
        dataBreadcrumbs.data.push(breadActiveItem);
        setBreadData(addBreadcrumbsContext(dataBreadcrumbs, router.locale, translationStrings));
    }, [, router.locale, pageContext, breadActiveItem]);    
    useEffect(() => {
        if ( salaryCitySelectedValue ) {
            setMinSalSelectedValue(cities_living.filter(item => item.label === salaryCitySelectedValue)[0].min_sal);
        }
    }, [salaryCitySelectedValue]);
    useEffect(() => {
        if ( salaryPermonthAdRateSelectedValue !== 0 ) {
            const otTimesInput = document.getElementById('ot_times');
            const bonusInput = document.getElementById('bonus_salary');
            const homebillsInput = document.getElementById('homebills_salary');
            cityRef.current && (cityRef.current.clearValue());
            otTimesInput && (otTimesInput.value = '');
            bonusInput && (bonusInput.value = '');
            homebillsInput && (homebillsInput.value = '');
            setOTSelectedValue(0);
            setBonusSelectedValue(0);
            setHomeBillsSelectedValue(0);
            setCheckAdForm(false);
        }
    }, [salaryPermonthAdRateSelectedValue]);
    useEffect(() => {
        handleChangeMonthRate(months_working, monthRateSelectedValue, setPriceTronGoi);
        handleChangeMonthRate(months_working, monthRateAdSelectedValue, setPriceAdTronGoi);
    }, [monthRateSelectedValue, monthRateAdSelectedValue]);
    /*console.log(monthRateAdSelectedValue, 
                    salaryInboxAdSelectedValue, 
                        minSalSelectedValue,
                            OTSelectedValue,
                                BonusSelectedValue,
                                    HomeBillsSelectedValue);*/
  return (
    <>
        <RankMath data = {seo} />
        <main>
            <section className="content-form__details">
                <div className="container">
                    <BreadcrumbsTemplate data = {breadData} />
                    <div className="row gutter-50">
                        <div className="col-lg-8">
                            <div className="box-content__prices mb-40s">
                                <h2 className="Tính tiền nenkin color-blues titles-bold__alls titles-transform__alls color-blues fs-30s mb-40s">
                                    {getTranslation(translationStrings, "tinhtiennenkin_label")}
                                </h2>
                                <div className="price-tags__form">
                                    <NavTemplate activeId = {breadActiveItem} 
                                                 data = {initialBreadData}
                                                 props = {{ handleSelectTab }} />
                                    {breadActiveItem.id === 'simple' ? (
                                        <SimpleCalcTemplate resultsData={resultsForm} 
                                                            showResults = {showResults}
                                                            MonthsWorkingOptions={MonthsWorkingOptions} 
                                                            SalaryOptions = {SalaryOptions}
                                                            props = {{  salaryInboxSelectedValue, 
                                                                        monthRateSelectedValue, 
                                                                        salaryPermonthRateSelectedValue,
                                                                        months_working, 
                                                                        monthRValue,
                                                                        setmonthRValue,
                                                                        setmonthRateSelectedValue,
                                                                        setSalaryPermonthRateSelectedValue,
                                                                        priceTronGoi : formatMoney(currency_active === 'vnd' ? priceTronGoi * rate_yen_to_vnd : 
                                                                                                                                priceTronGoi, 0, '.', ','),
                                                                        currency_active,
                                                                        rate_yen_to_vnd,
                                                                        monthRef,
                                                                        salaryRef,
                                                                        checkForm,
                                                                        handleMonthSelectBoxChanged, 
                                                                        handleMonthInputBoxChanged,
                                                                        handleSalaryPerMonthBoxChanged,
                                                                        setSalaryInBoxSelectedValue,
                                                                        handleSalaryInBoxChanged, 
                                                                        handlePreventAction,
                                                                        handleGetPasteOnlyNumbers,
                                                                        handleGetPasteMonthNumbers,
                                                                        handleSimpleSubmit  }} />
                                    ) : (
                                        <AdvancedCalcTemplate  resultsData={resultsAdForm} 
                                                                showResults = {showAdResults}
                                                                MonthsWorkingOptions={MonthsWorkingOptions} 
                                                                SalaryOptions = {SalaryAdvancedOptions}
                                                                citiesOptions = {citiesOptions}
                                                                props = {{  salaryInboxSelectedValue : salaryInboxAdSelectedValue, 
                                                                            monthRateSelectedValue : monthRateAdSelectedValue, 
                                                                            months_working,
                                                                            salaryPermonthRateSelectedValue : salaryPermonthAdRateSelectedValue,
                                                                            monthRValue : monthRAdValue,
                                                                            minSalSelectedValue,
                                                                            OTSelectedValue,
                                                                            BonusSelectedValue,
                                                                            HomeBillsSelectedValue,
                                                                            setmonthRateSelectedValue : setmonthRateAdSelectedValue,
                                                                            setmonthRValue : setmonthRAdValue,
                                                                            setSalaryPermonthRateSelectedValue : setSalaryPermonthAdRateSelectedValue,
                                                                            setSalaryInBoxSelectedValue : setSalaryInBoxAdSelectedValue,
                                                                            setCitySelectedValue,
                                                                            setOTSelectedValue,
                                                                            setBonusSelectedValue,
                                                                            setHomeBillsSelectedValue,
                                                                            priceTronGoi : formatMoney(currency_active === 'vnd' ? priceAdTronGoi * rate_yen_to_vnd : 
                                                                                                                                    priceAdTronGoi, 0, '.', ','),
                                                                            currency_active,
                                                                            rate_yen_to_vnd,
                                                                            monthRef : monthAdvancedRef,
                                                                            salaryRef : salaryAdvancedRef,
                                                                            cityRef,
                                                                            checkForm : checkAdForm,
                                                                            handleMonthSelectBoxChanged, 
                                                                            handleMonthInputBoxChanged,
                                                                            handleSalaryPerMonthBoxChanged,
                                                                            handleFieldTextChanged : handleSalaryInBoxChanged,
                                                                            handlePreventAction,
                                                                            handleGetPasteOnlyNumbers,
                                                                            handleGetPasteMonthNumbers,
                                                                            handleAdvancedSubmit  }}  />
                                    )}
                                </div>
                            </div>
                            <div className="note-price__forms mb-100s">
                                <h3 className="titles-bold__alls color-blues fs-17s mb-10s">*{getTranslation(translationStrings, "luuy_label")}</h3>
                                <div dangerouslySetInnerHTML={{ __html : nenkin_luuy_html }}></div>
                            </div>
                            <BanghesoTemplate data = {months_working} />
                        </div>
                        <div className="col-lg-4">
                            <BoxCategorySidebar locale={router.locale} />
                            <HotlineSidebar phone={phone} 
                                            translationStrings={translationStrings} />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </>
  )
}
function mapStateToProps(state) {   
    return { 
        siteOptions : state.globalReducer.siteOptions,
        translationStrings : state.globalReducer.translationStrings
    }
}
function mapDispatchToProps(dispatch) {
    return {
        UpdateSiteOptions : async (v) => await dispatch({
            type : "UPDATE_SITE_OPTIONS",
            payload : v
        }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TinhTienNenkinsPg);