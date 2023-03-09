import { DEFAULT_UPLOAD_VALUE, UPLOADS_GQL_GALLERIES, UPLOADS_IDENTITY } from '@constants/constants';
import { checkUploadsMinimumValidated, getUploadItemsChanged, handleAppendDefValue, handleChanged, handleRemoveAttachmentUpload, handleRemoveUploadItem, handleSetUploadImages, handleUploadFiles, isDiffToOriginImages } from '@js_dir/utils/hosoUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { parseImageRemoved, parseImagesData } from '@lib/mutations/update-hosonenkin';
import React, {useState, useEffect, useRef} from 'preact/compat'
import Modal from 'react-modal';
import GroupUploads from './form-hosonenkin/group-uploads'
import HosoNenkinUpdateModal from './xulyhoso/hosonenkin-update-modal';
import HosoNenkinUploadModal from './xulyhoso/hosonenkin-upload-modal';
export default function HoSoNenkinPanel({ data, translationStrings, props }) {
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [uploadProgressDone, setUploadProgressDone] = useState(false);
    const [checkForm, setCheckForm] = useState(false);
    const [userId, setUserId] = useState(null);    
    const { nenskin_frontcard : ngoaikieuOriginalImages,
            nenkins_passport : hoChieuOriginalImages,
            nenkins_image : nenkinOriginalImages,
            nenkins_bank_images : giayNganHangOriginalImages } = data || {};
    const {setUserLoggedInData} = props;
    const [ngoaikieuImages, setNgoaiKieuImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.NGOAI_KIEU}, 
                                                                {...DEFAULT_UPLOAD_VALUE, identify :  UPLOADS_IDENTITY.NGOAI_KIEU, id : 1}]);
    const [nenkinImages, setNenkinImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify :  UPLOADS_IDENTITY.NENKIN}, 
                                                        {...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.NENKIN, id : 1}]);
    const [hoChieuImages, setHoChieuImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.HO_CHIEU}, 
                                                            {...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.HO_CHIEU, id : 1}]);
    const [giayNganHangImages, setGiayNganHangImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.GIAY_NGAN_HANG}, 
                                                                        {...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.GIAY_NGAN_HANG, id : 1}]);
    //
    const [ngoaikieuFiles, setNgoaiKieuFiles] = useState([]);
    const [nenkinFiles, setNenkinFiles] = useState([]);
    const [hochieuFiles, setHoChieuFiles] = useState([]);
    const [giayNganHangFiles, setGiayNganHangFiles] = useState([]);
    //
    const [stagChanged, setStagChanged] = useState(false);
    const [activeUploadItemId, setActiveUploadItemId] = useState(0);
    const [activeUploadPercentage, setActiveUploadPercentage] = useState({});
    const [activeUploadErrors, setActiveUploadErrors] = useState({});
    //
    const [updateCurrentStep, setUpdateCurrentStep] = useState(0);
    const [stopUpdateImagesState, setStopUpdateImagesState] = useState(false);
    //
    const userCookiesDataRef = useRef(data);
    //
    const handleSubmitUpdate = async (e) => {
        e.preventDefault();   
        if ( !stagChanged ) return false;
        setShowUpdateModal(true);
    }
    const handleCloseModal = (e) => {
        e.preventDefault();
        setShowModal(false);
    }
    const handleCloseUpdateModal = (e) => {
        e.preventDefault();
        setShowUpdateModal(false);
    }
    useEffect(() => {
        if ( data ) {
            userCookiesDataRef.current = {...data};
            setUserId(data.id);
            if ( stopUpdateImagesState ) return;
            handleSetUploadImages(UPLOADS_IDENTITY.NGOAI_KIEU, ngoaikieuImages, ngoaikieuOriginalImages, setNgoaiKieuImages);            
            handleSetUploadImages(UPLOADS_IDENTITY.NENKIN, nenkinImages, nenkinOriginalImages, setNenkinImages);   
            handleSetUploadImages(UPLOADS_IDENTITY.HO_CHIEU, hoChieuImages, hoChieuOriginalImages, setHoChieuImages);            
            handleSetUploadImages(UPLOADS_IDENTITY.GIAY_NGAN_HANG, giayNganHangImages, giayNganHangOriginalImages, setGiayNganHangImages);            
        }
    }, [data]);
    useEffect(() => {    
        handleAppendDefValue(ngoaikieuImages, setNgoaiKieuImages, UPLOADS_IDENTITY.NGOAI_KIEU);
        handleAppendDefValue(nenkinImages, setNenkinImages, UPLOADS_IDENTITY.NENKIN);
        handleAppendDefValue(hoChieuImages, setHoChieuImages, UPLOADS_IDENTITY.HO_CHIEU);
        handleAppendDefValue(giayNganHangImages, setGiayNganHangImages, UPLOADS_IDENTITY.GIAY_NGAN_HANG);
        //
        
    }, [ngoaikieuImages, nenkinImages, hoChieuImages, giayNganHangImages]);
    useEffect(() => {
        /*console.log(ngoaikieuImages, ngoaikieuOriginalImages);
        console.log(nenkinImages, nenkinOriginalImages);
        console.log(hoChieuImages, hoChieuOriginalImages);
        console.log(giayNganHangImages, giayNganHangOriginalImages);*/
        const isDiff = isDiffToOriginImages(ngoaikieuImages, ngoaikieuOriginalImages) || 
                        isDiffToOriginImages(nenkinImages, nenkinOriginalImages) || 
                            isDiffToOriginImages(hoChieuImages, hoChieuOriginalImages) || 
                                isDiffToOriginImages(giayNganHangImages, giayNganHangOriginalImages);
        if ( isDiff ) {
            if ( !stagChanged ) {
                setStagChanged(true);
            }
        }
        else {
            if ( stagChanged ) {
                setStagChanged(false);
            }
        }
    }, [ngoaikieuImages, nenkinImages, hoChieuImages, giayNganHangImages]);
    useEffect(() => {
        async function performUpdate() {
            const diffNgoaiKieuResults = getUploadItemsChanged(ngoaikieuImages, setNgoaiKieuImages, ngoaikieuOriginalImages);
            const diffNenkinResults = getUploadItemsChanged(nenkinImages, setNenkinImages, nenkinOriginalImages);
            const diffHochieuResults = getUploadItemsChanged(hoChieuImages, setHoChieuImages, hoChieuOriginalImages);
            const diffGiaynganhangResults = getUploadItemsChanged(giayNganHangImages, setGiayNganHangImages, giayNganHangOriginalImages);
            //
            const hosoMetaData = {};
            hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS] = {};
            if ( diffNgoaiKieuResults ) {            
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.NGOAI_KIEU] = [...diffNgoaiKieuResults];
            }
            if ( diffNenkinResults ) {
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.NENKIN] = [...diffNenkinResults];
            }
            if ( diffHochieuResults ) {
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.HO_CHIEU] = [...diffHochieuResults];
            }
            if ( diffGiaynganhangResults ) {
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.GIAY_NGAN_HANG] = [...diffGiaynganhangResults];
            }        
            //
            const _ngoaikieuFiles = parseImagesData(ngoaikieuImages);
            const _nenkinFiles = parseImagesData(nenkinImages);
            const _hochieuFiles = parseImagesData(hoChieuImages);
            const _giayNganHangFiles = parseImagesData(giayNganHangImages);
            //
            setNgoaiKieuFiles(_ngoaikieuFiles);
            setNenkinFiles(_nenkinFiles);
            setHoChieuFiles(_hochieuFiles);
            setGiayNganHangFiles(_giayNganHangFiles);
            //
            setUpdateCurrentStep(0);
            setActiveUploadItemId(0);
            setUploadProgressDone(false);     
            setActiveUploadErrors({});
            setActiveUploadPercentage({});
            setStopUpdateImagesState(true);
            //   
            const _ngoaikieuFilesRemoved = parseImageRemoved(ngoaikieuImages);
            const _nenkinFilesRemoved = parseImageRemoved(nenkinImages);
            const _hoChieuFilesRemoved = parseImageRemoved(hoChieuImages);
            const _giayNganHangFilesRemoved = parseImageRemoved(giayNganHangImages);
            //
            const props = { userId, hosoMetaData, setUserLoggedInData, step: 0, setUpdateCurrentStep, timeout: 500, resolvedTimeout: 500 };
            const ngoaiKieuResults = await handleRemoveAttachmentUpload({...props, 
                                                                            files : _ngoaikieuFilesRemoved,
                                                                            galleryKey: UPLOADS_GQL_GALLERIES.NENKINS.FRONTCARD,
                                                                            identify : UPLOADS_IDENTITY.NGOAI_KIEU,
                                                                            ref : userCookiesDataRef
                                                                        });
            setTimeout(async () => {
                const nenkinsResults = await handleRemoveAttachmentUpload({...props, 
                                                                                step : 1,
                                                                                files : _nenkinFilesRemoved,
                                                                                galleryKey: UPLOADS_GQL_GALLERIES.NENKINS.IMAGE,
                                                                                ref : userCookiesDataRef,
                                                                                identify : UPLOADS_IDENTITY.NENKIN
                                                                            });
                setTimeout(async () => {
                    const hoChieuResults = await handleRemoveAttachmentUpload({...props, 
                                                                                step : 2,
                                                                                files : _hoChieuFilesRemoved,
                                                                                galleryKey: UPLOADS_GQL_GALLERIES.NENKINS.PASSPORT,
                                                                                identify : UPLOADS_IDENTITY.HO_CHIEU,
                                                                                ref : userCookiesDataRef
                                                                            });
                    setTimeout(async () => {
                        const giayNganHangResults = await handleRemoveAttachmentUpload({...props, 
                            step : 3,
                            files : _giayNganHangFilesRemoved,
                            galleryKey: UPLOADS_GQL_GALLERIES.NENKINS.BANK,
                            identify : UPLOADS_IDENTITY.GIAY_NGAN_HANG,
                            ref : userCookiesDataRef
                        });
                        setShowUpdateModal(false);
                        setStopUpdateImagesState(false);
                        if ( _ngoaikieuFiles.length || _nenkinFiles.length || _hochieuFiles.length || _giayNganHangFiles.length ) {
                            setTimeout(async () => {
                                setShowModal(true);
                                //
                                const uploadProps = { userid : userId, hosoMetaData, activeUploadPercentage, setActiveUploadPercentage,
                                                            activeUploadErrors, setActiveUploadErrors, setActiveUploadItemId, setUserLoggedInData };
                                const ngoaikieuResults = await handleUploadFiles({...uploadProps, ref : userCookiesDataRef, images: _ngoaikieuFiles, gallery_key : UPLOADS_GQL_GALLERIES.NENKINS.FRONTCARD});    
                                const nenkinResults = await handleUploadFiles({...uploadProps, ref : userCookiesDataRef, images: _nenkinFiles, gallery_key : UPLOADS_GQL_GALLERIES.NENKINS.IMAGE}); 
                                const hochieuResults = await handleUploadFiles({...uploadProps, ref : userCookiesDataRef, images: _hochieuFiles, gallery_key : UPLOADS_GQL_GALLERIES.NENKINS.PASSPORT}); 
                                const giayNganHangResults = await handleUploadFiles({...uploadProps, ref : userCookiesDataRef, images: _giayNganHangFiles, gallery_key : UPLOADS_GQL_GALLERIES.NENKINS.BANK}); 
                                setStagChanged(false);
                                setUploadProgressDone(true);
                            }, 1000);
                        }
                        else {
                            setStagChanged(false);
                            setUploadProgressDone(true);   
                        }
                    }, 500);
                }, 500);
            }, 500);
        }
        if ( showUpdateModal ) {             
            performUpdate();
        }
    }, [showUpdateModal]);
    /*console.clear();
    console.log(ngoaikieuImages);
    console.log(nenkinImages);
    console.log(hoChieuImages);
    console.log(giayNganHangImages);*/
  return (
    <>
        <div className="box-acounts__content content-right__accounts height-100s">
            <div className="top-accounts__rights mb-15s">
                <div className="text-top__accounts">
                    <h2 className="fs-32s mb-15s color-blues">{getTranslation(translationStrings, "capnhathoso_label")}</h2>
                </div>
                <div className="groups-btn__accounts">
                    <a href="#" className="btn-opacity__blues">{getTranslation(translationStrings, "mahoso_label")}</a>
                    <a href="#" className={`btn-blues__alls ${!stagChanged ? 'btn__disabled' : ''}`} onClick={handleSubmitUpdate}>{getTranslation(translationStrings, "capnhat_label")}</a>
                </div>
            </div>
            <div className="intros-top__accounts mb-50s">
                <p>{getTranslation(translationStrings, "chontaptinhoackeovathanhanh_label")} <a className="btn-blues__text"> {getTranslation(translationStrings, "huongdanchupanh_label")} </a></p>
                <p>{getTranslation(translationStrings, "chupanhronetkhongqua5mb_label")} <a className="btn-blues__text"> {getTranslation(translationStrings, "cactruonghopanhbiloi_label")} </a></p>
            </div>
            <div className="form-content__accounts">
                <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">{getTranslation(translationStrings, "thongtinhosonenkin_label")}</h3>
                <form id="frmHoSoNenkinUploads">
                    <GroupUploads label = {getTranslation(translationStrings, "anhthengoaikieumattruocmatsau_label")}
                                dragdroplabel = {getTranslation(translationStrings, "chontaptinhoackeotha_label")}
                                changelabel = {getTranslation(translationStrings, "thaydoi_label")}
                                values = {ngoaikieuImages}
                                setValues = {setNgoaiKieuImages}
                                handleChanged = {handleChanged}
                                handleRemove = {handleRemoveUploadItem}
                                translationStrings = {translationStrings}
                                validate = {checkForm}
                                handleValidate = {checkUploadsMinimumValidated} />
                    <GroupUploads label = {getTranslation(translationStrings, "anhnenkin_label")}
                                dragdroplabel = {getTranslation(translationStrings, "chontaptinhoackeotha_label")}
                                changelabel = {getTranslation(translationStrings, "thaydoi_label")}
                                values = {nenkinImages}
                                setValues = {setNenkinImages}
                                handleChanged = {handleChanged} 
                                handleRemove = {handleRemoveUploadItem}
                                translationStrings = {translationStrings}
                                validate = {checkForm}
                                handleValidate = {checkUploadsMinimumValidated} />
                    <GroupUploads label = {getTranslation(translationStrings, "anhhochieu_label")}
                                dragdroplabel = {getTranslation(translationStrings, "chontaptinhoackeotha_label")}
                                changelabel = {getTranslation(translationStrings, "thaydoi_label")}
                                values = {hoChieuImages}
                                setValues = {setHoChieuImages}
                                handleChanged = {handleChanged}
                                handleRemove = {handleRemoveUploadItem}
                                translationStrings = {translationStrings}
                                validate = {checkForm}
                                handleValidate = {checkUploadsMinimumValidated} />                              
                    <GroupUploads label = {getTranslation(translationStrings, "anhgiayxacnhannganhang_label")}
                                dragdroplabel = {getTranslation(translationStrings, "chontaptinhoackeotha_label")}
                                changelabel = {getTranslation(translationStrings, "thaydoi_label")}
                                values = {giayNganHangImages}
                                setValues = {setGiayNganHangImages}
                                handleChanged = {handleChanged}
                                handleRemove = {handleRemoveUploadItem}
                                translationStrings = {translationStrings}
                                validate = {checkForm}
                                handleValidate = {checkUploadsMinimumValidated} />
                </form>
            </div>
        </div>
        <Modal
            isOpen={showUpdateModal}
            onRequestClose={handleCloseUpdateModal}
            className="hosoModal hosoUpdatingModal"
            overlayClassName="hosoOverlay"
            contentLabel="Đang cập nhật dữ liệu hồ sơ"
            shouldCloseOnOverlayClick={false}>
            <HosoNenkinUpdateModal translationStrings={translationStrings}
                            currentStep = {updateCurrentStep} />
        </Modal>
        <Modal
            isOpen={showModal}
            onRequestClose={handleCloseModal}
            className="hosoModal hosoUploadModal"
            overlayClassName="hosoOverlay"
            contentLabel="Đang tải dữ liệu hồ sơ"
            shouldCloseOnOverlayClick={false}>
            {uploadProgressDone ? (
                <span className="close__button" onClick={handleCloseModal}>x</span>
            ) : null}
            <HosoNenkinUploadModal translationStrings={translationStrings}
                                    data = {{ngoaikieuFiles, nenkinFiles, hochieuFiles, giayNganHangFiles}}
                                    activeUploadItemId = {activeUploadItemId} 
                                    activeUploadPercentage = {activeUploadPercentage}
                                    activeUploadErrors = {activeUploadErrors}
                                    uploadProgressDone = {uploadProgressDone} />
        </Modal>
    </>
  )
}
