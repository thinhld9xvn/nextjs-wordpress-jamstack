import FormHosoSearch from '@components/templates/form-hoso-search'
import { getTranslation } from '@js_dir/utils/translations'
import React, {useState, useEffect, useRef, useCallback} from 'preact/compat'
import HosoUsersList from './xulyhoso/hoso-users-list'
import Modal from 'react-modal';
import XuLyHoSoModal from './xulyhoso/xulyhoso-modal';
import { getUserInfoData } from '@lib/account/getUserInfoDataApi';
import LoadingOvery from '@components/templates/loading-overlay';
import HoSoCongTyModal from './xulyhoso/hosocongty-modal';
import { getAccountHosoUsersData } from '@lib/account/getAccountHosoUsersDataApi';
import TemplatePaginationBar from '@components/templates/template-pagination-bar';
import HosoFilters from './xulyhoso/hoso-filters';
import SettingsStickySection from './xulyhoso/settings-sticky-section';
import { HOSO_FILTER_ITEMS } from '@constants/constants';
import { cloneDeep } from 'lodash';
export default function XuLyHoSoPanel({ data, router, locale, translationStrings }) {
    const [loading, setLoading] = useState(false);
    const [loadingHosoUsers, setLoadingHosoUsers] = useState(false);
    const [showHosoModal, setShowHosoModal] = useState(false);
    const [showHosoCongTyModal, setShowHosoCongTyModal] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [activeUserName, setActiveUserName] = useState('');
    const [activeUserInfo, setActiveUserInfo] = useState(null)
    const [activeCongtyData, setActiveCongtyData] = useState(null);
    const [paged, setPaged] = useState(1);
    const [total, setTotal] = useState(null);
    const [numPerPage, setNumPerPage] = useState(16);
    const [activeHosoUsers, setActiveHosoUsers] = useState([]);
    const [showFilterBox, setShowFilterBox] = useState(true);
    const [showSettingsBox, setShowSettingsBox] = useState(false);
    const [prgChekboxStatuses, setPrgCheckboxStatuses] = useState([]);
    const [metaFilters, setMetaFilters] = useState({});
    const processingRef = useRef(false);
    const searchRef = useRef(null);
    const handleChooseHoSo = (username) => {
        setActiveUserName(username);
        //setShowHosoModal(true);
    }
    const handleOpenHsCongTy = (s, e) => {
        e.preventDefault();
        setActiveCongtyData(JSON.parse(s));
        setShowHosoCongTyModal(true);
    }
    const handleCloseHosoModal = (e) => {
        e.preventDefault();
        setShowHosoModal(false);
    }
    const handleCloseHosoCongTyModal = (e) => {
        e.preventDefault();
        setShowHosoCongTyModal(false);
    }   
    const loadHosoUsersList = async (page, s, metadata = {}, e) => {
        e && e.preventDefault();  
        if ( processingRef.current ) return false;
        processingRef.current = true;
        setLoadingHosoUsers(true);
        setActiveHosoUsers([]);
        setTotal(null);
        //
        const elem = document.querySelector('.form-content__accounts');
        const t = elem.getClientRects()[0].top;
        window.scroll(0, t + window.scrollY - 130);
        //
        setTimeout(async () => {
            const results = await getAccountHosoUsersData(page, numPerPage, s, metadata);
            if ( !results ) return false;
            const {accountHosoUsersOptions} = results;
            const {data, totals} = accountHosoUsersOptions;
            setActiveHosoUsers(data);   
            setTotal(totals);
            if ( page !== paged ) {
                setPaged(page);
            }
            setTimeout(() => {
                setLoadingHosoUsers(false);
                processingRef.current = false;
            }, 200);
        }, 200);
    }
    const handleKeywordChanged = (e) => {
        setKeyword(e.currentTarget.value);
    }
    const handleSearchSubmit = async (e) => {
        e.preventDefault();
        handleSaveSettingsChanges();        
    }
    const handlePrgItemChanged = (id, v) => {
        const handleSearchFilterItem = (searchedId) => {
            const searched = {
                index: -1,
                value : null
            };
            Object.keys(HOSO_FILTER_ITEMS)
                    .forEach((key, i) => {
                if ( HOSO_FILTER_ITEMS[key].id === searchedId ) {
                    searched.index = i;
                    searched.value = {...HOSO_FILTER_ITEMS[key]};
                    return true;
                }                    
            });
            return searched;
        }
        const _metaFilters = cloneDeep(metaFilters);
        const _prgChekboxStatuses = cloneDeep(prgChekboxStatuses);
        const checkboxStatusItem = _prgChekboxStatuses.find(item => item.id === id);
              checkboxStatusItem.value = v;
        const {index, value} = handleSearchFilterItem(id);
        const {metadata} = value;
        if ( v ) {
            _metaFilters[id] = [...metadata];
        }
        else {
            _metaFilters[id] ? delete _metaFilters[id] : null;
        }
        setPrgCheckboxStatuses([..._prgChekboxStatuses]);
        setMetaFilters({..._metaFilters});
    }
    const handleToggleFilterBox = (e) => {
        e.preventDefault();
        setShowFilterBox(!showFilterBox);
    }
    const handleToggleSettingsBox = (e) => {
        e.preventDefault();
        setShowSettingsBox(!showSettingsBox);
    }
    const handleResetSettingsBox = (e) => {
        e.preventDefault();
        setPrgCheckboxStatuses([...prgChekboxStatuses.map(item => ({...item, value : false}))]);
        setMetaFilters({});
        setKeyword('');
        searchRef.current.value = '';
        //setShowSettingsBox(false);
    }
    const handleSaveChangesSettingsBox = (e) => {
        e.preventDefault();
        handleSaveSettingsChanges();
    }
    const handleSaveSettingsChanges = () => {
        loadHosoUsersList(1, keyword, metaFilters);
        setShowSettingsBox(false);
    }
    useEffect(() => {
        if ( showHosoModal ) {
            document.querySelector('body, html')
                    .classList
                    .add('prevent__scrollbar');            
        }
        else {
            setActiveUserName('');
            document.querySelector('body, html')
                    .classList
                    .remove('prevent__scrollbar');
        }
    }, [showHosoModal]);
    useEffect(() => {
        const loadUser = async (username) => { 
            setLoading(true);
            const results = await getUserInfoData(username);
            if ( !results ) return false;
            const {userInfoOptions} = results;
            setActiveUserInfo({...userInfoOptions});
            setLoading(false);
            setShowHosoModal(true);
        } 
        if ( activeUserName ) { 
            loadUser(activeUserName);
        }
        else {
            setActiveUserInfo(null);
        }
    }, [activeUserName]);
    useEffect(() => {
    }, [activeUserInfo]);
    useEffect(() => {
    }, [showHosoCongTyModal]);
    useEffect(() => {
        const elem = document.querySelector('html');
        if ( showSettingsBox ) {
            elem.classList.add('prevent__scrollbar');
        }
        else {
            elem.classList.remove('prevent__scrollbar');
        }
    }, [showSettingsBox]);
    useEffect(() => {
        loadHosoUsersList(1, '');
    }, [,router.locale,router.asPath]);
    useEffect(() => {
        loadHosoUsersList(paged, keyword);
    }, [paged]);
    useEffect(() => {
        const checkboxesStatus = Object.keys(HOSO_FILTER_ITEMS)
                                        .map((k) => {
                                    const {id} = HOSO_FILTER_ITEMS[k];
                                    return {
                                        id,
                                        value : false,
                                        meta : {
                                            key : '',
                                            value : '',
                                            compare : ''
                                        }
                                    }
                                });
        setPrgCheckboxStatuses([...checkboxesStatus]);
    }, [data]);
    useEffect(() => {
        document.addEventListener('mouseup', function(e) {
            try {
                const target = e.target;
                const userToolTipActive = document.querySelector('.userItemToolTip.active');
                if ( !userToolTipActive.contains(target) ) {
                    document.querySelector('.xemhs.active')
                            .click();
                }
            } catch(e) {}
        });
    }, []);
    //console.log([...prgChekboxStatuses]);
    console.log(metaFilters);
  return (
    <>
        <div className="box-acounts__content content-right__accounts mb-30s height-100s">
            <div className="top-accounts__rights mb-50s">
                <div className="text-top__accounts">
                    <h2 className="fs-32s mb-15s color-blues">
                        {getTranslation(translationStrings, "xulyhoso_label")}
                    </h2>
                </div>
            </div>
            <div className="form-content__accounts">                
                <div className="box-hs-transparent">
                    <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">
                        {getTranslation(translationStrings, "cachosomoitaogannhat_label")}
                    </h3>
                    <div className="box-hs__section">
                        <div className="hosoResultsLabel">
                            {!loadingHosoUsers ? (
                                <>
                                    {total > 0 ? getTranslation(translationStrings, "cohosoduoctimthay_label").replace(/\%total/ig, total) : 
                                                getTranslation(translationStrings, "khongcohosoduoctimthay_label")}
                                </> 
                            ) : null}
                        </div>
                        <HosoUsersList loading = {loadingHosoUsers}
                                        data = {activeHosoUsers}
                                        props= {{ handleChooseHoSo, translationStrings }} />
                        {!loadingHosoUsers ? <TemplatePaginationBar classname="pagenigation-custom mtop40" 
                                                                    data = {{paged, numPerPage, total, setPaged}}  /> : 
                                                null}
                    </div>
                </div>
            </div>            
        </div>
        <SettingsStickySection translationStrings = {translationStrings}
                               props = {{ keyword, router, searchRef, handleSearchSubmit, handleKeywordChanged,
                                            showSettingsBox, handleToggleSettingsBox, 
                                                showFilterBox, handleToggleFilterBox, prgChekboxStatuses, 
                                                    handleResetSettingsBox, handleSaveChangesSettingsBox, handlePrgItemChanged }} />
        <Modal
            isOpen={showHosoModal}
            onRequestClose={handleCloseHosoModal}
            className="hosoModal hosoProgModal"
            overlayClassName="hosoOverlay"
            shouldCloseOnOverlayClick={false}
            contentLabel="Thông tin hồ sơ">
            <span className="close__button" onClick={handleCloseHosoModal}>x</span>
            <XuLyHoSoModal translationStrings = {translationStrings}
                           locale = {locale}
                           router = {router}
                           data = {activeUserInfo}
                           username = {activeUserName}
                           handleOpenHsCongTy = {handleOpenHsCongTy} />
        </Modal>
        <Modal
            isOpen={showHosoCongTyModal}
            onRequestClose={handleCloseHosoCongTyModal}
            className="hosoModal hosoCongTyModal"
            overlayClassName="hosoOverlay"
            shouldCloseOnOverlayClick={false}
            contentLabel="Thông tin hồ sơ công ty">
            <span className="close__button" onClick={handleCloseHosoCongTyModal}>x</span>
            <HoSoCongTyModal translationStrings = {translationStrings}
                            data = {activeCongtyData} />
        </Modal>
        <LoadingOvery show = {loading} />        
    </>
  )
}
