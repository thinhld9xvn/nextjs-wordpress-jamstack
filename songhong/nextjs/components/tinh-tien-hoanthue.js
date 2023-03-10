import { isDiff } from '@js_dir/utils/arrayUtils';
import { useRouter } from 'next/router';
import React, {useEffect, useState, useCallback, useRef} from 'preact/compat'
import { connect } from 'react-redux';
import RankMath from './templates/rankmath';
import BreadcrumbsTemplate from './templates/breadcrumbs-template';
import { addBreadcrumbsContext } from '@js_dir/utils/addBreadcrumbsContextUtils';
import BoxCategorySidebar from './tinh-tien-nenkin/box-category-sidebar';
import HotlineSidebar from './templates/hotline-sidebar';
import { HOANTHUE_OPTIONS } from '@constants/constants';
import FormCalcTemplate from './tinh-tien-hoanthue/form-calc-template';
import FormResultsTemplate from './tinh-tien-hoanthue/form-results-template';
import { handleNumberChanged } from '@js_dir/utils/handleInputBoxUtils';
import { handleGetPasteOnlyNumbers } from '@js_dir/utils/tinhtienUtils';
import { getTranslation } from '@js_dir/utils/translations';
function TinhTienHoanThuePg({ pageContext, siteOptions, UpdateSiteOptions, translationStrings }) { 
    const router = useRouter();
    const {siteOptions : mySiteOptions, seo, breadcrumbs, nenkinSimpleCalcOptions, hoanThueCalcOptions} = pageContext;
    const {hoanthue_calc, hoanthue_luuy_html} = hoanThueCalcOptions;
    const {rate_price_default_1,
            rate_price_default_2,
            rate_price_default_3,
            rate_price_default_4,
            rate_price_default_5,
            rate_price_default_6,
            rate_price_default_7,
            rate_price_default_8} = hoanthue_calc;
    //
    const [agesPMOptions, setAgesPMOptions] = useState(null);
    const [agesChildsOptions, setAgesChildsOptions] = useState(null);
    const [yesNoOptions, setYesNoOptions] = useState(null);
    //   
    const [enableParentSelect, setEnableParentSelect] = useState(false);
    const [enableMotherSelect, setEnableMotherSelect] = useState(false);
    const [enableSiblingsSelect, setEnableSiblingsSelect] = useState(false);
    const [enableHusWifeSelect, setEnableHusWifeSelect] = useState(false);
    //
    const [parentSelectedValue, setParentSelectedValue] = useState(null);
    const [motherSelectedValue, setMotherSelectedValue] = useState(null);
    const [siblingsSelectedValue, setSiblingsSelectedValue] = useState(null);
    const [husWifeSelectedValue, setHusWifeSelectedValue] = useState(null);
    //
    const [enableTeenAgeInputBox, setEnableTeenAgeInputBox] = useState(false);
    const [enableOutTeenAgeInputBox, setEnableOutTeenAgeInputBox] = useState(false);
    //
    const parentSelectRef = useRef(null);
    const motherSelectRef = useRef(null);
    const siblingsSelectRef = useRef(null);
    const husWifeSelectRef = useRef(null);
    const checkboxesRef = useRef([null, null, null, null]);
    //
    const [teenNumChilds, setTeenNumChilds] = useState(0);
    const [olderNumChilds, setOlderNumChilds] = useState(0);
    const [soTienChiTra, setSoTienChiTra] = useState(0);
    const [soTienNhan, setSoTienNhan] = useState(0);
    const [soTienBHXH, setSoTienBHXH] = useState(0);
    const [soTienThue, setSoTienThue] = useState(0);
    //
    const [results, setResults] = useState(0);
    const [showResults, setShowResults] = useState(false);
    //
    useEffect(() => {
        if ( isDiff(mySiteOptions, siteOptions) ) {            
            UpdateSiteOptions({...mySiteOptions});
        }
    }, [,router.locale]);
    useEffect(() => {
        document.getElementById('hoanthue-form')
                .querySelectorAll('input')
                .forEach(input => {
            const type = input.getAttribute('type');
            if ( type === 'text' ) {
                input.value = '';
            } 
            if ( type === 'checkbox' ) {
                input.checked = false;
            }
        });
        //
        setEnableParentSelect(false);
        setEnableMotherSelect(false);
        setEnableSiblingsSelect(false);
        setEnableHusWifeSelect(false);
        //
        setParentSelectedValue(null);
        setMotherSelectedValue(null);
        setSiblingsSelectedValue(null);
        setHusWifeSelectedValue(null);
        //
        parentSelectRef.current.clearValue();
        motherSelectRef.current.clearValue();
        siblingsSelectRef.current.clearValue();
        husWifeSelectRef.current.clearValue();
        //
        setTeenNumChilds(0);
        setSoTienChiTra(0);
        setSoTienNhan(0);
        setSoTienBHXH(0);
        setSoTienThue(0);
        //
        setResults(0);
        setShowResults(false);
    }, [,router.locale]);
    useEffect(() => {
        //
        setAgesPMOptions([
            {
                label : getTranslation(translationStrings, "tren70tuoi_label"),
                value : HOANTHUE_OPTIONS.TREN_70_TUOI_VALUE
            },
            {
                label : getTranslation(translationStrings, "duoi70tuoi_label"),
                value : HOANTHUE_OPTIONS.DUOI_70_TUOI_VALUE
            }
        ]);
        setAgesChildsOptions([
            {
                label : getTranslation(translationStrings, "tu19den23tuoi_label"),
                value : HOANTHUE_OPTIONS.TU_19_DEN_23_TUOI_VALUE
            },
            {
                label : getTranslation(translationStrings, "ngoai19den23tuoi_label"),
                value : HOANTHUE_OPTIONS.NGOAI_19_DEN_23_TUOI_VALUE
            }
        ]);
        setYesNoOptions([
            {
                label : '',
                value : HOANTHUE_OPTIONS.YES_VALUE
            },
            {
                label : '',
                value : HOANTHUE_OPTIONS.NO_VALUE
            },
        ]);   
    },[,router.locale,translationStrings]);
    useEffect(() => {
        if ( siblingsSelectedValue ) {
            setEnableTeenAgeInputBox(false);
            setEnableOutTeenAgeInputBox(false);
            //
            if ( Array.isArray(siblingsSelectedValue) ) {     
                if ( siblingsSelectedValue.length === 0 ) {
                    setEnableSiblingsSelect(false);                    
                    return;
                }           
                if ( siblingsSelectedValue.length ) {
                    siblingsSelectedValue.forEach(item => {
                        const {value} = item;
                        if ( HOANTHUE_OPTIONS.TU_19_DEN_23_TUOI_VALUE === value ) {
                            setEnableTeenAgeInputBox(true);
                        }
                        if ( HOANTHUE_OPTIONS.NGOAI_19_DEN_23_TUOI_VALUE === value ) {
                            setEnableOutTeenAgeInputBox(true);
                        }
                    });
                }
            }
            //
            if ( !Array.isArray(siblingsSelectedValue) ) {
                const {value} = siblingsSelectedValue;
                if ( HOANTHUE_OPTIONS.TU_19_DEN_23_TUOI_VALUE === value ) {
                    setEnableTeenAgeInputBox(true);
                }
                if ( HOANTHUE_OPTIONS.NGOAI_19_DEN_23_TUOI_VALUE === value ) {
                    setEnableOutTeenAgeInputBox(true);
                }
            }
        }
    }, [siblingsSelectedValue]);
    useEffect(() => {
        checkboxesRef.current[2].checked = enableSiblingsSelect;
    }, [enableSiblingsSelect]);
    const breadcrumbsData = addBreadcrumbsContext(breadcrumbs, router.locale, translationStrings);
    const {phone} = mySiteOptions;    
    const handleUTickOption = useCallback((props, e) => {
        const target = e.currentTarget;
        const {options, tickValue, refObj, setSelectValue, setTickValue} = props;
        if ( tickValue ) { // current enable box
            refObj.current.clearValue();
            setTickValue(false);
            setSelectValue(null);
        }
        else {
            setTickValue(true);
            setSelectValue({...options[0]});
        }
    }, []);
    const handleChangedOption = (setValue, e) => {
        setValue(e);
    }
    const handleNumberInBoxChanged = useCallback(handleNumberChanged, []);
    const roundDown = (v, decNum = 3) => {
        const n = Math.pow(10, decNum);
        return ~~(v / n) * n;
    }
    const getValue = (selected) => {
        return selected ? selected.value : '';
    }    
    const handleSubmit = (e) => {
        e.preventDefault();
        const divSoTienChiTra = soTienChiTra / 4;
        const soTienNhanX = roundDown(divSoTienChiTra, 3); // N6 - N??i ??i???n l????ng
        console.log('N5 (N??i ??i???n l????ng): ' + divSoTienChiTra);
        console.log('N6 (N??i ??i???n l????ng): ' + soTienNhanX);
        const soTienNhanY = soTienChiTra <= rate_price_default_4 ? 0.6 :
                    (soTienChiTra > rate_price_default_5 ? 0.8 : 0.7); // N7 - N??i ??i???n l????ng
        console.log('N7 (N??i ??i???n l????ng): ' + soTienNhanY);
        //console.log(rate_price_default_4, rate_price_default_6, rate_price_default_7, rate_price_default_8);
        const soTienNhanZ = soTienChiTra <= rate_price_default_4 ? rate_price_default_6 :
                    (soTienChiTra > rate_price_default_5 ? rate_price_default_7 : 
                                                            rate_price_default_8); // N8 - N??i ??i???n l????ng
        console.log('N8 (N??i ??i???n l????ng): ' + soTienNhanZ);
        const soTienNhanThucTe = soTienNhan === 0 ? soTienNhanX * 4 * soTienNhanY + soTienNhanZ : soTienNhan; // C18 - N??i ??i???n ng?????i g???i
        console.log('C18 (N??i ??i???n l????ng): ' + soTienNhanThucTe);
        //
        const husWifeResValue = getValue(husWifeSelectedValue) === HOANTHUE_OPTIONS.YES_VALUE ? rate_price_default_1 : 0; // C11 - N??i ??i???n ng?????i g???i
        console.log('C11 (N??i ??i???n ng?????i g???i): ' + husWifeResValue);
        const parentResValue = getValue(parentSelectedValue) === HOANTHUE_OPTIONS.TREN_70_TUOI_VALUE ? rate_price_default_2 : 
                                    ( getValue(parentSelectedValue) === HOANTHUE_OPTIONS.DUOI_70_TUOI_VALUE ? rate_price_default_1 : 0 ); // (C12, E12) - N??i ??i???n ng?????i g???i
        console.log('(C12, E12) (N??i ??i???n ng?????i g???i): ' + parentResValue);
        const motherResValue = getValue(motherSelectedValue) === HOANTHUE_OPTIONS.TREN_70_TUOI_VALUE ? rate_price_default_2 : 
                                    (getValue(motherSelectedValue) === HOANTHUE_OPTIONS.DUOI_70_TUOI_VALUE ? rate_price_default_1 : 0); // (D12, F12) - N??i ??i???n ng?????i g???i
        console.log('(D12, F12) (N??i ??i???n ng?????i g???i): ' + motherResValue);
        const siblingsTeenResValue = (enableTeenAgeInputBox ? rate_price_default_3 : 0) * teenNumChilds; // C13
        const siblingsOlderResValue = (enableOutTeenAgeInputBox ? rate_price_default_1 : 0) * olderNumChilds; // D13
        /*const siblingsResValue = (getValue(siblingsSelectedValue) === HOANTHUE_OPTIONS.TU_19_DEN_23_TUOI_VALUE ? rate_price_default_3 : 
                                    (getValue(siblingsSelectedValue) === HOANTHUE_OPTIONS.NGOAI_19_DEN_23_TUOI_VALUE ? rate_price_default_1 : 0)) * numChilds; // (C13, D13) - N??i ??i???n ng?????i g???i*/
        console.log('C13 - S??? ti???n ng?????i g???i (T??? 19 - 23 tu???i): ' + siblingsTeenResValue);
        console.log('D13 - S??? ti???n ng?????i g???i (Ngo??i 19 - 23 tu???i): ' + siblingsOlderResValue);
        //
        const totalsFamilyResValue = parentResValue + motherResValue + siblingsTeenResValue + siblingsOlderResValue; // C21 - N??i ??i???n ng?????i g???i
        console.log('C21 - N??i ??i???n ng?????i g???i: ' + totalsFamilyResValue);
        const totalsMienThueResValue = husWifeResValue + parentResValue + motherResValue + 
                                        siblingsTeenResValue + siblingsOlderResValue + 
                                        rate_price_default_2 + soTienBHXH; // C23 - N??i ??i???n ng?????i g???i
        console.log('C23 - N??i ??i???n ng?????i g???i: ' + totalsMienThueResValue);
        const soTienThuNhapBiTinhThue = soTienNhanThucTe - totalsMienThueResValue >= 0 ? roundDown(soTienNhanThucTe - totalsMienThueResValue, 3) : 0; // C25 - N??i ??i???n ng?????i g???i
        console.log('C25 - N??i ??i???n ng?????i g???i: ' + soTienThuNhapBiTinhThue);
        const soTienThueX = soTienThuNhapBiTinhThue * 0.05; // C27 - N??i ??i???n ng?????i g???i
        console.log('C27 - N??i ??i???n ng?????i g???i: ' + soTienThueX);
        const soTienThueY = roundDown(soTienThueX * 0.021, 0); // C28 - N??i ??i???n ng?????i g???i
        console.log('C28 - N??i ??i???n ng?????i g???i: ' + soTienThueY);
        const totalsSoTienThueZ = soTienThueX + soTienThueY; // C29 - N??i ??i???n ng?????i g???i
        console.log('C29 - N??i ??i???n ng?????i g???i: ' + totalsSoTienThueZ);
        //
        const totalsHoanThue = totalsSoTienThueZ - soTienThue >= 0 ? 0 : totalsSoTienThueZ - soTienThue;
        console.log('C31 - N??i ??i???n ng?????i g???i: ' + totalsHoanThue);
        console.log('C32 - N??i ??i???n ng?????i g???i: ' + Math.abs(totalsHoanThue));
        setResults(Math.abs(totalsHoanThue)); // C31 - N??i ??i???n ng?????i g???i       
        setShowResults(true);
    };
    /*console.clear();
    console.log(parentSelectedValue, motherSelectedValue, siblingsSelectedValue, husWifeSelectedValue,
                numChilds, soTienChiTra, soTienNhan, soTienBHXH, soTienThue);*/
    //console.log(seo);
    return (
        <>
            <RankMath data = {seo} />
            <main>
                <section className="content-form__details">
                    <div className="container">
                        <BreadcrumbsTemplate data = {breadcrumbsData} />
                        <div className="row gutter-50">
                            <div className="col-lg-8">
                                <div className="box-content__prices mb-40s">
                                    <div className="top-accounts__rights mb-40s">
                                        <div className="text-top__accounts">
                                            <h2 className="fs-30s mb-15s titles-bold__alls titles-transform__alls color-blues">{getTranslation(translationStrings, "tinhtienhoanthue_label")}</h2>
                                            <p>{getTranslation(translationStrings, "bancothexemthongtintaiday_label")} 
                                                <a data-toggle="modal" data-target="#modal-guides__accounts" className="btn-blues__text"> {getTranslation(translationStrings, "xemgiaygensen_label")} </a></p>
                                        </div>
                                    </div>
                                    <FormCalcTemplate options={{agesPMOptions, agesChildsOptions, yesNoOptions}} 
                                                        translationStrings={translationStrings}
                                                        props={{enableParentSelect,
                                                                enableSiblingsSelect,
                                                                enableMotherSelect,
                                                                enableHusWifeSelect,
                                                                enableTeenAgeInputBox,
                                                                enableOutTeenAgeInputBox,
                                                                //
                                                                parentSelectedValue,
                                                                motherSelectedValue,
                                                                siblingsSelectedValue,
                                                                husWifeSelectedValue,
                                                                //
                                                                setEnableParentSelect,                                                                 
                                                                setEnableMotherSelect,
                                                                setEnableHusWifeSelect,
                                                                //
                                                                setParentSelectedValue, 
                                                                setMotherSelectedValue,
                                                                setSiblingsSelectedValue,
                                                                setHusWifeSelectedValue,
                                                                setEnableSiblingsSelect,
                                                                //
                                                                teenNumChilds,
                                                                olderNumChilds,
                                                                soTienNhan,
                                                                soTienChiTra,
                                                                soTienBHXH,
                                                                soTienThue,
                                                                //
                                                                setTeenNumChilds,
                                                                setOlderNumChilds,
                                                                setSoTienNhan,
                                                                setSoTienChiTra,
                                                                setSoTienBHXH,
                                                                setSoTienThue,
                                                                //
                                                                handleChangedOption,
                                                                handleUTickOption,
                                                                handleNumberInBoxChanged,
                                                                handleGetPasteOnlyNumbers,
                                                                handleSubmit}}
                                                        refs={{parentSelectRef, motherSelectRef, siblingsSelectRef, husWifeSelectRef, checkboxesRef}} />
                                    <FormResultsTemplate results={results} 
                                                        showResults={showResults}
                                                        translationStrings={translationStrings} />
                                </div>
                                <div className="note-price__forms mb-100s">
                                    <h3 className="titles-bold__alls color-blues fs-17s mb-10s">*{getTranslation(translationStrings, "luuy_label")}</h3>
                                    <div dangerouslySetInnerHTML={{ __html : hoanthue_luuy_html }}></div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <BoxCategorySidebar locale={router.locale} />
                                <HotlineSidebar phone = {phone} />
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
export default connect(mapStateToProps, mapDispatchToProps)(TinhTienHoanThuePg);