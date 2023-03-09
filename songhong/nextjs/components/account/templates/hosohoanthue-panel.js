// @filename: hosohoanthue-panel.js
import { DEFAULT_UPLOAD_VALUE, UPLOADS_GQL_GALLERIES, UPLOADS_IDENTITY } from '@constants/constants';
import { checkUploadsMinimumValidated, getUploadItemsChanged, handleAppendDefValue, handleChanged, handleRemoveAttachmentUpload, handleRemoveUploadItem, handleSetUploadImages, handleUploadFiles, isDiffToOriginImages } from '@js_dir/utils/hosoUtils';
import { getTranslation } from '@js_dir/utils/translations';
import { parseImageRemoved, parseImagesData } from '@lib/mutations/update-hosonenkin';
import React, {useState, useEffect, useRef} from 'preact/compat'
import Modal from 'react-modal';
import GroupUploads from './form-hosonenkin/group-uploads'
import HosoHoanThueUpdateModal from './xulyhoso/hosohoanthue-update-modal';
import HosoHoanThueUploadModal from './xulyhoso/hosohoanthue-upload-modal';
export default function HoSoHoanThuePanel({ data, translationStrings, props }) {
    const [showModal, setShowModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [uploadProgressDone, setUploadProgressDone] = useState(false);
    const [checkForm, setCheckForm] = useState(false);
    const [userId, setUserId] = useState(null);    
    const { hoanthue_gensen : gensenOriginalImages,
            hoanthue_transfer_images : giayChuyenTienOriginalImages,
            hoanthue_giaytoquanhe_images : giayPhungDuongOriginalImages,
            hoanthue_passport : hoChieuOriginalImages,
            hoanthue_mynumber_images : myNumberOriginalImages,
            hoanthue_sotttaikhoan_images : soTTTaiKhoanOriginalImages,
            hoanthue_ngoaikieu_images : ngoaiKieuOriginalImages } = data || {};
    const {setUserLoggedInData} = props;

    const [ngoaikieuImages, setNgoaiKieuImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.NGOAI_KIEU}, 
                                                                {...DEFAULT_UPLOAD_VALUE, identify :  UPLOADS_IDENTITY.NGOAI_KIEU, id : 1}]);
    const [gensenImages, setGensenImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify :  UPLOADS_IDENTITY.GENSEN}, 
                                                        {...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.GENSEN, id : 1}]);
    const [hoChieuImages, setHoChieuImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.HO_CHIEU}, 
                                                            {...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.HO_CHIEU, id : 1}]);
    const [giayChuyenTienImages, setGiayChuyenTienImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.GIAY_CHUYEN_TIEN}, 
                                                            {...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.GIAY_CHUYEN_TIEN, id : 1}]);
    const [giayPhungDuongImages, setGiayPhungDuongImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.GIAY_CHUNG_MINH_PHUNG_DUONG}, 
                                                            {...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.GIAY_CHUNG_MINH_PHUNG_DUONG, id : 1}]);
    const [myNumberImages, setMyNumberImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.MY_NUMBER}, 
                                                            {...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.MY_NUMBER, id : 1}]);
    const [soTTTaiKhoanImages, setSoTTTaiKhoanImages] = useState([{...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.SO_NGAN_HANG_TTTT}, 
                                                            {...DEFAULT_UPLOAD_VALUE, identify : UPLOADS_IDENTITY.SO_NGAN_HANG_TTTT, id : 1}]);
    const [stagChanged, setStagChanged] = useState(false);    
    //
    const [ngoaiKieuFiles, setNgoaiKieuFiles] = useState([]);
    const [gensenFiles, setGensenFiles] = useState([]);
    const [hoChieuFiles, setHoChieuFiles] = useState([]);
    const [giayChuyenTienFiles, setGiayChuyenTienFiles] = useState([]);
    const [giayPhungDuongFiles, setGiayPhungDuongFiles] = useState([]);
    const [myNumbersFiles, setMyNumbersFiles] = useState([]);
    const [soTTTaiKhoanFiles, setSoTTTaiKhoanFiles] = useState([]);
    //
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
            handleSetUploadImages(UPLOADS_IDENTITY.NGOAI_KIEU, ngoaikieuImages, ngoaiKieuOriginalImages, setNgoaiKieuImages);            
            handleSetUploadImages(UPLOADS_IDENTITY.GENSEN, gensenImages, gensenOriginalImages, setGensenImages);   
            handleSetUploadImages(UPLOADS_IDENTITY.HO_CHIEU, hoChieuImages, hoChieuOriginalImages, setHoChieuImages);            
            handleSetUploadImages(UPLOADS_IDENTITY.GIAY_CHUYEN_TIEN, giayChuyenTienImages, giayChuyenTienOriginalImages, setGiayChuyenTienImages);            
            handleSetUploadImages(UPLOADS_IDENTITY.MY_NUMBER, myNumberImages, myNumberOriginalImages, setMyNumberImages);            
            handleSetUploadImages(UPLOADS_IDENTITY.SO_NGAN_HANG_TTTT, soTTTaiKhoanImages, soTTTaiKhoanOriginalImages, setSoTTTaiKhoanImages);            
            handleSetUploadImages(UPLOADS_IDENTITY.GIAY_CHUNG_MINH_PHUNG_DUONG, giayPhungDuongImages, giayPhungDuongOriginalImages, setGiayPhungDuongImages);            
        }
    }, [data]);
    useEffect(() => {
        //console.log(ngoaikieuImages);
        handleAppendDefValue(ngoaikieuImages, setNgoaiKieuImages, UPLOADS_IDENTITY.NGOAI_KIEU);
        handleAppendDefValue(gensenImages, setGensenImages, UPLOADS_IDENTITY.GENSEN);
        handleAppendDefValue(hoChieuImages, setHoChieuImages, UPLOADS_IDENTITY.HO_CHIEU);
        handleAppendDefValue(giayChuyenTienImages, setGiayChuyenTienImages, UPLOADS_IDENTITY.GIAY_CHUYEN_TIEN);
        handleAppendDefValue(myNumberImages, setMyNumberImages, UPLOADS_IDENTITY.MY_NUMBER);
        handleAppendDefValue(soTTTaiKhoanImages, setSoTTTaiKhoanImages, UPLOADS_IDENTITY.SO_NGAN_HANG_TTTT);
        handleAppendDefValue(giayPhungDuongImages, setGiayPhungDuongImages, UPLOADS_IDENTITY.GIAY_CHUNG_MINH_PHUNG_DUONG);
    }, [ngoaikieuImages, gensenImages, hoChieuImages, giayChuyenTienImages, myNumberImages, soTTTaiKhoanImages, giayPhungDuongImages]);
    useEffect(() => {
        const isDiff = isDiffToOriginImages(ngoaikieuImages, ngoaiKieuOriginalImages) || 
                        isDiffToOriginImages(gensenImages, gensenOriginalImages) || 
                            isDiffToOriginImages(hoChieuImages, hoChieuOriginalImages) || 
                                isDiffToOriginImages(giayChuyenTienImages, giayChuyenTienOriginalImages) || 
                                    isDiffToOriginImages(myNumberImages, myNumberOriginalImages) || 
                                        isDiffToOriginImages(soTTTaiKhoanImages, soTTTaiKhoanOriginalImages) || 
                                            isDiffToOriginImages(giayPhungDuongImages, giayPhungDuongOriginalImages);
        //console.clear();
        //console.log(isDiffToOriginImages(ngoaikieuImages, ngoaiKieuOriginalImages));
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
    }, [ngoaikieuImages, gensenImages, 
            hoChieuImages, giayChuyenTienImages, 
                myNumberImages, soTTTaiKhoanImages, giayPhungDuongImages]);
    useEffect(() => {
        async function performUpdate() {
            const diffNgoaiKieuResults = getUploadItemsChanged(ngoaikieuImages, setNgoaiKieuImages, ngoaiKieuOriginalImages);
            const diffGensenResults = getUploadItemsChanged(gensenImages, setGensenImages, gensenOriginalImages);
            const diffHoChieuResults = getUploadItemsChanged(hoChieuImages, setHoChieuImages, hoChieuOriginalImages);
            const diffGiayChuyenTienResults = getUploadItemsChanged(giayChuyenTienImages, setGiayChuyenTienImages, giayChuyenTienOriginalImages);
            const diffMyNumberResults = getUploadItemsChanged(myNumberImages, setMyNumberImages, myNumberOriginalImages);
            const diffSoTTTaiKhoanResults = getUploadItemsChanged(soTTTaiKhoanImages, setSoTTTaiKhoanImages, soTTTaiKhoanOriginalImages);
            const diffGiayPhungDuongResults = getUploadItemsChanged(giayPhungDuongImages, setGiayPhungDuongImages, giayPhungDuongOriginalImages);
            //
            const hosoMetaData = {};
            hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS] = {};
            if ( diffNgoaiKieuResults ) {            
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.NGOAI_KIEU] = [...diffNgoaiKieuResults];
            }
            if ( diffGensenResults ) {
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.GENSEN] = [...diffGensenResults];
            }
            if ( diffHoChieuResults ) {
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.HO_CHIEU] = [...diffHoChieuResults];
            }
            if ( diffGiayChuyenTienResults ) {
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.GIAY_CHUYEN_TIEN] = [...diffGiayChuyenTienResults];
            }        
            if ( diffMyNumberResults ) {
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.MY_NUMBER] = [...diffMyNumberResults];
            }      
            if ( diffSoTTTaiKhoanResults ) {
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.SO_NGAN_HANG_TTTT] = [...diffSoTTTaiKhoanResults];
            }       
            if ( diffGiayPhungDuongResults ) {
                hosoMetaData[UPLOADS_IDENTITY.REPLACEMENTS][UPLOADS_IDENTITY.GIAY_CHUNG_MINH_PHUNG_DUONG] = [...diffGiayPhungDuongResults];
            }        
            //
            const _ngoaikieuFiles = parseImagesData(ngoaikieuImages);
            const _gensenFiles = parseImagesData(gensenImages);
            const _hochieuFiles = parseImagesData(hoChieuImages);
            const _giayChuyenTienFiles = parseImagesData(giayChuyenTienImages);
            const _myNumberFiles = parseImagesData(myNumberImages);
            const _soTTTaiKhoanFiles = parseImagesData(soTTTaiKhoanImages);
            const _giayPhungDuongFiles = parseImagesData(giayPhungDuongImages);
            //
            setNgoaiKieuFiles(_ngoaikieuFiles);
            setGensenFiles(_gensenFiles);
            setHoChieuFiles(_hochieuFiles);
            setGiayChuyenTienFiles(_giayChuyenTienFiles);
            setMyNumbersFiles(_myNumberFiles);
            setSoTTTaiKhoanFiles(_soTTTaiKhoanFiles);
            setGiayPhungDuongFiles(_giayPhungDuongFiles);
            //
            setUpdateCurrentStep(0);
            setActiveUploadItemId(0);
            setUploadProgressDone(false);     
            setActiveUploadErrors({});
            setActiveUploadPercentage({});
            setStopUpdateImagesState(true); 
            //   
            const _ngoaikieuFilesRemoved = parseImageRemoved(ngoaikieuImages);
            const _gensenFilesRemoved = parseImageRemoved(gensenImages);
            const _hoChieuFilesRemoved = parseImageRemoved(hoChieuImages);
            const _giayChuyenTienFilesRemoved = parseImageRemoved(giayChuyenTienImages);
            const _myNumbersFilesRemoved = parseImageRemoved(myNumberImages);
            const _soTTTaiKhoanFilesRemoved = parseImageRemoved(soTTTaiKhoanImages);
            const _giayPhungDuongFilesRemoved = parseImageRemoved(giayPhungDuongImages);
            //
            const props = { userId, hosoMetaData, setUserLoggedInData, step: 0, setUpdateCurrentStep, timeout: 500 };
            const gensenResults = await handleRemoveAttachmentUpload({...props, 
                                                                        files : _gensenFilesRemoved,
                                                                        galleryKey: UPLOADS_GQL_GALLERIES.HOANTHUE.GENSEN,
                                                                        identify : UPLOADS_IDENTITY.GENSEN,
                                                                        ref : userCookiesDataRef,
                                                                        timeout : 0});
            setTimeout(async () => {
                const giayChuyenTienResults = await handleRemoveAttachmentUpload({...props, 
                                                                                    step: 1,
                                                                                    files : _giayChuyenTienFilesRemoved,
                                                                                    galleryKey: UPLOADS_GQL_GALLERIES.HOANTHUE.TRANSFER,
                                                                                    ref : userCookiesDataRef,
                                                                                    identify : UPLOADS_IDENTITY.GIAY_CHUYEN_TIEN
                                                                                });
                setTimeout(async () => {
                    const giayPhungDuongResults = await handleRemoveAttachmentUpload({...props, 
                                                                                        step: 2,
                                                                                        files : _giayPhungDuongFilesRemoved,
                                                                                        galleryKey: UPLOADS_GQL_GALLERIES.HOANTHUE.RELATIONSHIP,
                                                                                        ref : userCookiesDataRef,
                                                                                        identify : UPLOADS_IDENTITY.GIAY_CHUNG_MINH_PHUNG_DUONG
                                                                                    });                    
                    setTimeout(async () => {
                        const hoChieuResults = await handleRemoveAttachmentUpload({...props, 
                                                                                        step: 3,
                                                                                        files : _hoChieuFilesRemoved,
                                                                                        galleryKey: UPLOADS_GQL_GALLERIES.HOANTHUE.PASSPORT,
                                                                                        ref : userCookiesDataRef,
                                                                                        identify : UPLOADS_IDENTITY.HO_CHIEU
                                                                                    });
                        setTimeout(async () => {
                            const myNumbersResults = await handleRemoveAttachmentUpload({...props, 
                                                                                            step: 4,
                                                                                            files : _myNumbersFilesRemoved,
                                                                                            galleryKey: UPLOADS_GQL_GALLERIES.HOANTHUE.MYNUMBERS,
                                                                                            ref : userCookiesDataRef,
                                                                                            identify : UPLOADS_IDENTITY.MY_NUMBER
                                                                                        });
                            setTimeout(async () => {
                                const soTTTaiKhoanResults = await handleRemoveAttachmentUpload({...props, 
                                                                                                    step: 5,
                                                                                                    files : _soTTTaiKhoanFilesRemoved,
                                                                                                    galleryKey: UPLOADS_GQL_GALLERIES.HOANTHUE.BANK,
                                                                                                    ref : userCookiesDataRef,
                                                                                                    identify : UPLOADS_IDENTITY.SO_NGAN_HANG_TTTT
                                                                                                });
                                setTimeout(async () => {
                                    const ngoaiKieuResults = await handleRemoveAttachmentUpload({...props, 
                                                                                                    step: 6,
                                                                                                    files : _ngoaikieuFilesRemoved,
                                                                                                    galleryKey: UPLOADS_GQL_GALLERIES.HOANTHUE.FRONTCARD,
                                                                                                    ref : userCookiesDataRef,
                                                                                                    identify : UPLOADS_IDENTITY.NGOAI_KIEU
                                                                                                });
                                     setShowUpdateModal(false); 
                                     setStopUpdateImagesState(false);
                                    if ( _ngoaikieuFiles.length || _gensenFiles.length || 
                                        _hochieuFiles.length || _giayChuyenTienFiles.length || _myNumberFiles.length || 
                                        _soTTTaiKhoanFiles.length || _giayPhungDuongFiles.length ) {
                                        setTimeout(async () => {
                                            setShowModal(true);
                                            //
                                            const props = { userid : userId, hosoMetaData, activeUploadPercentage, setActiveUploadPercentage,
                                                                    activeUploadErrors, setActiveUploadErrors, setActiveUploadItemId, setUserLoggedInData };
                                            const gensenResults = await handleUploadFiles({...props, ref : userCookiesDataRef, images: _gensenFiles, gallery_key: UPLOADS_GQL_GALLERIES.HOANTHUE.GENSEN});
                                            const giayChuyenTienResults = await handleUploadFiles({...props, ref : userCookiesDataRef, images: _giayChuyenTienFiles, gallery_key: UPLOADS_GQL_GALLERIES.HOANTHUE.TRANSFER});
                                            const giayPhungDuongResults = await handleUploadFiles({...props, ref : userCookiesDataRef, images: _giayPhungDuongFiles, gallery_key: UPLOADS_GQL_GALLERIES.HOANTHUE.RELATIONSHIP});
                                            const hoChieuResults = await handleUploadFiles({...props, ref : userCookiesDataRef, images: _hochieuFiles, gallery_key: UPLOADS_GQL_GALLERIES.HOANTHUE.PASSPORT});                                            
                                            const myNumbersResults = await handleUploadFiles({...props, ref : userCookiesDataRef, images: _myNumberFiles, gallery_key: UPLOADS_GQL_GALLERIES.HOANTHUE.MYNUMBERS});                                            
                                            const soTTTaiKhoanResults = await handleUploadFiles({...props, ref : userCookiesDataRef, images: _soTTTaiKhoanFiles, gallery_key: UPLOADS_GQL_GALLERIES.HOANTHUE.BANK});                                            
                                            const ngoaikieuResults = await handleUploadFiles({...props, ref : userCookiesDataRef, images: _ngoaikieuFiles, gallery_key: UPLOADS_GQL_GALLERIES.HOANTHUE.FRONTCARD});                                                                                                                                                                                
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
    console.log(gensenImages);
    console.log(hoChieuImages);
    console.log(giayNganHangImages);*/
   // console.log(data);
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
                <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">{getTranslation(translationStrings, "thongtinhosohoanthue_label")}</h3>
                <form id="frmHoSoHoanThueUploads">
                    <GroupUploads label = {getTranslation(translationStrings, "anhgiaygensen_label")}
                                dragdroplabel = {getTranslation(translationStrings, "chontaptinhoackeotha_label")}
                                changelabel = {getTranslation(translationStrings, "thaydoi_label")}
                                values = {gensenImages}
                                setValues = {setGensenImages}
                                handleChanged = {handleChanged}
                                handleRemove = {handleRemoveUploadItem}
                                translationStrings = {translationStrings}
                                validate = {checkForm}
                                handleValidate = {checkUploadsMinimumValidated} />
                    <GroupUploads label = {getTranslation(translationStrings, "anhgiaychuyentien_label")}
                                dragdroplabel = {getTranslation(translationStrings, "chontaptinhoackeotha_label")}
                                changelabel = {getTranslation(translationStrings, "thaydoi_label")}
                                values = {giayChuyenTienImages}
                                setValues = {setGiayChuyenTienImages}
                                handleChanged = {handleChanged} 
                                handleRemove = {handleRemoveUploadItem}
                                translationStrings = {translationStrings}
                                validate = {checkForm}
                                handleValidate = {checkUploadsMinimumValidated} />
                    <GroupUploads label = {getTranslation(translationStrings, "giaytochungminhquanhevoinguoiphungduong_label")}
                                dragdroplabel = {getTranslation(translationStrings, "chontaptinhoackeotha_label")}
                                changelabel = {getTranslation(translationStrings, "thaydoi_label")}
                                values = {giayPhungDuongImages}
                                setValues = {setGiayPhungDuongImages}
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
                    <GroupUploads label = {getTranslation(translationStrings, "anhthemynumber_label")}
                                dragdroplabel = {getTranslation(translationStrings, "chontaptinhoackeotha_label")}
                                changelabel = {getTranslation(translationStrings, "thaydoi_label")}
                                values = {myNumberImages}
                                setValues = {setMyNumberImages}
                                handleChanged = {handleChanged}
                                handleRemove = {handleRemoveUploadItem}
                                translationStrings = {translationStrings}
                                validate = {checkForm}
                                handleValidate = {checkUploadsMinimumValidated} />
                    <GroupUploads label = {getTranslation(translationStrings, "songanhanghoacthongtintk_label")}
                                dragdroplabel = {getTranslation(translationStrings, "chontaptinhoackeotha_label")}
                                changelabel = {getTranslation(translationStrings, "thaydoi_label")}
                                values = {soTTTaiKhoanImages}
                                setValues = {setSoTTTaiKhoanImages}
                                handleChanged = {handleChanged}
                                handleRemove = {handleRemoveUploadItem}
                                translationStrings = {translationStrings}
                                validate = {checkForm}
                                handleValidate = {checkUploadsMinimumValidated} />
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
            <HosoHoanThueUpdateModal translationStrings={translationStrings}
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
            <HosoHoanThueUploadModal translationStrings={translationStrings}
                                    data = {{ngoaiKieuFiles, gensenFiles, hoChieuFiles, giayChuyenTienFiles,
                                                giayPhungDuongFiles, soTTTaiKhoanFiles, myNumbersFiles}}
                                    activeUploadItemId = {activeUploadItemId} 
                                    activeUploadPercentage = {activeUploadPercentage}
                                    activeUploadErrors = {activeUploadErrors}
                                    uploadProgressDone = {uploadProgressDone} />
        </Modal>
    </>
  )
}
