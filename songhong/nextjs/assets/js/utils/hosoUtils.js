import { DEFAULT_UPLOAD_VALUE, DEFAULT_USER_AVATAR, ONE_DAY_MILISECONDS, UPLOADS_GQL_GALLERIES } from "@constants/constants";
import { removeAttachmentUpload } from "@lib/mutations/remove-uploads";
import { UpdateHoSoImage } from "@lib/mutations/update-hosonenkin";
import {isEqual, isEmpty} from 'lodash'
import { getHoSoGalleriesFromArr, isDiff } from "./arrayUtils";
import { getUserData } from "./membershipUtils";

export function isConfirmNenkin(data, no) {
    return data.find(st => st.no === no && st.status === 'success');
}
export function isWaitingNenkin(data, no) {
    return data.find(st => st.no === no && st.status === 'waiting');
}
export function isNoNenkin(data, no) {
    return !(data.find(st => st.no === no));
}
export function getConfirmNenkinUrl(data, no) {
    const item = data.find(st => st.no === no);
    if ( !item ) return '';
    return item.url_confirmed || '';
}
export function getUserAvatar(avatar) {
    return avatar || DEFAULT_USER_AVATAR;
}
export function handleChanged(id, identify, values, setValues, msgs, e) {
    if ( e.target.files && e.target.files.length ) {
        const file = e.target.files[0];    
        const size = file.size / (1024 * 1024);
        const ext = file.name.split('.').pop();
        if ( ext !== 'jpg' && ext !== 'jpeg' && ext !== 'png' ) {
            alert(msgs['uploadinvalidimage_label']);
            return;
        }
        if ( size > 5 ) {
            alert(msgs['uploadexceed5mb_label']);
            return;
        }           
        //
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (ev) {
            const uploads = [...values];            
            const uploadItem = uploads.find(item => item.id === id && item.identify === identify);
            uploadItem.file = file;
            uploadItem.src = ev.target.result;
            if ( uploadItem.removed ) {
                uploadItem.removed = false;
                if ( uploadItem.__old_data ) { 
                    delete uploadItem.__old_data;
                }
            }
            /*if ( checkUploadsValidated(uploads) ) {
                uploads.push({...DEFAULT_UPLOAD_VALUE, id : uploads.length});                
            }*/
            setValues([...uploads]);                                              
        } 
    }               
}
export function handleRemoveUploadItem(id, identify, values, setValues, e) {
    e.preventDefault();
    const uploads = [...values];
    const uploadItem = uploads.find(item => item.id === id && item.identify === identify);      
    const originalItem = {...uploadItem};
    //        
    uploadItem.file = null;
    uploadItem.src = null;
    uploadItem.getted = false;   
    //
    uploadItem.removed = true;
    uploadItem.__old_data = {...originalItem};    
    //
    setValues([...uploads]);
}
export function handleAppendDefValue(values, setValues, identify) { 
    const clonedValues = [...values]; 
    const item = {...DEFAULT_UPLOAD_VALUE, 
                    identify, 
                    id : -1};
    if ( values.length === 0 ) {
        clonedValues.push([{...item, id : clonedValues.length},
                           {...item, id : clonedValues.length + 1}]); 
        setValues(clonedValues);  
        return; 
    }
    if ( !checkLastContainerDefValue(values) ) {        
        clonedValues.push({...item, id : clonedValues.length}); 
        setValues(clonedValues); 
        return;
    }
    
}
export function checkUploadsMinimumValidated(values) {
    return values.filter(item => item.src !== null).length >= 2;
}
export function checkLastContainerDefValue(values) {
    return values.length && values[values.length - 1].src === null && values[values.length - 1].file === null;
}
export function getIdentityValue(values) {
    return values.filter(item => item.identify)[0].identify;
}
export function isDiffToOriginImages(values, originValues) {
    const _values = [...values.map(item => item.src)];
    if ( checkLastContainerDefValue(values) ) {
       _values.pop(); 
    }
    const results = _values.filter(item => item !== null);
    return !isEqual(results, originValues);
}
export function getUploadItemsChanged(values, setValues, originValues) {
    if ( !values || values.length === 0 || !originValues || originValues.length === 0 ) return null;  
    //
    //console.log(values, originValues);
    const removements = [...values.map((item, i) => {
        const isDiff = originValues[i] && !item.src;
        if ( !isDiff ) return null;
        return {
            oldUrl : originValues[i],
            action : 'remove'
        }
    }).filter(item => item !== null)];
    //
    const replacements = [...values.map((item, i) => {
        const isDiff = originValues[i] && item.src && originValues[i] !== item.src;
        if ( !isDiff ) return null;
        return {
            oldUrl : originValues[i],
            action : 'update'
        }
    }).filter(item => item !== null)];
    //    
    const results = [...values.filter(item => item.src )];
    setValues(results);        
    return [...replacements.concat(removements)];
}
export function handleSetUploadImages(identify, value, originValue, setValue) {
    if ( originValue && originValue.length && isDiff(getHoSoGalleriesFromArr(value), originValue) ) {
        const values = originValue.map((url, id) => ({...DEFAULT_UPLOAD_VALUE, identify, id, src : url, getted : true, file : null}));
        setValue([...values]);
    }
    if ( originValue && originValue.length === 0 && isDiff(getHoSoGalleriesFromArr(value), originValue) ) {
        setValue([{...DEFAULT_UPLOAD_VALUE, identify, src : null, getted : true, file : null}]);
    }
}
export function setUploadObjectValue(values, setValues, id, v) {
    values[id] = v;
    setValues({...values});
}
export async function handleUploadFiles({ userid, images, gallery_key, hosoMetaData,
                                            ref, activeUploadPercentage, setActiveUploadPercentage,
                                                activeUploadErrors, setActiveUploadErrors, setActiveUploadItemId, setUserLoggedInData }) {
    const doAsyncUpload = async ({i, id, file, identify}) => { 
        return await new Promise(async (resolve, reject) => {  
            const activeUId = `${identify}-${id}`;         
            setActiveUploadItemId(activeUId);
            setUploadObjectValue(activeUploadPercentage, setActiveUploadPercentage, activeUId, 50);
            const results = await UpdateHoSoImage({userid, file, identify, gallery_key, hosoMetaData});
            if ( !results.updateUser && results.length ) {
                const msg = results[0].message;
                setUploadObjectValue(activeUploadErrors, setActiveUploadErrors, activeUId, msg);
                setTimeout(() => {
                    reject(msg);
                }, 500);
                return;
            }
            const {hosoNenkinAnhNgoaiKieu, 
                    hosoNenkinAnhNenkin, 
                    hosoNenkinAnhHoChieu, 
                    hosoNenkinAnhXacNhanNganHang,
                    hosoHoanThueAnhGenSen,
                    hosoHoanThueGiayChuyenTien,
                    hosoHoanThueGiayPhungDuong,
                    hosoHoanThueAnhHoChieu,
                    hosoHoanThueMyNumber,
                    hosoHoanThueSoTTTaiKhoan,
                    hosoHoanThueAnhNgoaiKieu} = results.updateUser.user;
            const data = {...ref.current};
            if ( gallery_key === UPLOADS_GQL_GALLERIES.NENKINS.FRONTCARD ) {  
                data[gallery_key] = [...hosoNenkinAnhNgoaiKieu];    
                setUserLoggedInData({...data});
            }
            if ( gallery_key === UPLOADS_GQL_GALLERIES.NENKINS.PASSPORT ) {
                data[gallery_key] = [...hosoNenkinAnhHoChieu];    
                setUserLoggedInData({...data});
            }
            if ( gallery_key === UPLOADS_GQL_GALLERIES.NENKINS.IMAGE ) {
                data[gallery_key] = [...hosoNenkinAnhNenkin];    
                setUserLoggedInData({...data});
            }
            if ( gallery_key === UPLOADS_GQL_GALLERIES.NENKINS.BANK ) {
                data[gallery_key] = [...hosoNenkinAnhXacNhanNganHang];    
                setUserLoggedInData({...data});
            }
            //
            if ( gallery_key === UPLOADS_GQL_GALLERIES.HOANTHUE.BANK ) {
                data[gallery_key] = [...hosoHoanThueSoTTTaiKhoan];    
                setUserLoggedInData({...data});
            }
            if ( gallery_key === UPLOADS_GQL_GALLERIES.HOANTHUE.FRONTCARD ) {
                data[gallery_key] = [...hosoHoanThueAnhNgoaiKieu];    
                setUserLoggedInData({...data});
            }
            if ( gallery_key === UPLOADS_GQL_GALLERIES.HOANTHUE.GENSEN ) {
                data[gallery_key] = [...hosoHoanThueAnhGenSen];    
                setUserLoggedInData({...data});
            }
            if ( gallery_key === UPLOADS_GQL_GALLERIES.HOANTHUE.TRANSFER ) {
                data[gallery_key] = [...hosoHoanThueGiayChuyenTien];    
                setUserLoggedInData({...data});
            }
            if ( gallery_key === UPLOADS_GQL_GALLERIES.HOANTHUE.RELATIONSHIP ) {
                data[gallery_key] = [...hosoHoanThueGiayPhungDuong];    
                setUserLoggedInData({...data});
            }
            if ( gallery_key === UPLOADS_GQL_GALLERIES.HOANTHUE.PASSPORT ) {
                data[gallery_key] = [...hosoHoanThueAnhHoChieu];    
                setUserLoggedInData({...data});
            }
            if ( gallery_key === UPLOADS_GQL_GALLERIES.HOANTHUE.MYNUMBERS ) {
                data[gallery_key] = [...hosoHoanThueMyNumber];    
                setUserLoggedInData({...data});
            }
            //
            setUploadObjectValue(activeUploadPercentage, setActiveUploadPercentage, activeUId, 100);
            setTimeout(() => {
                resolve(results.updateUser.user);                     
            }, 1000);
        });      
    }
    return await new Promise(async (resolve, reject) => {
        const length = images.length;
        for(let i = 0; i < length; i++) {
            const item = images[i];      
            const {id, file, identify} = item;   
            const results = await doAsyncUpload({i, id, file, identify});
        }
        resolve('success');
    });
    //return await Promise.all(resultPromises);
}
export async function handleRemoveAttachmentUpload({ userId, step, files, galleryKey, identify, ref, hosoMetaData, setUserLoggedInData, setUpdateCurrentStep, timeout }) {
    return await new Promise(async (resolve, reject) => {
        setUpdateCurrentStep(step);   
        if ( files.length ) {
            const data = {...ref.current};
            const results = await removeAttachmentUpload({ userId, 
                                                            galleryKey, 
                                                            identify, 
                                                            hosoMetaData });               
            data[galleryKey] = [...results.removeUploadHosoUser.data];
            ref.current[galleryKey] = [...results.removeUploadHosoUser.data];
            setUserLoggedInData({...data});
            resolve('success');
        } 
        else {
            resolve('success');
        }
    });
}
export function getHosoDateExpired(data) {
    if ( !data ) return -1;
    const {session_expired} = data;
    if ( !session_expired ) return -1;
    const now = (new Date()).getTime();
    return Math.floor((parseInt(session_expired) - now) / ONE_DAY_MILISECONDS);
}   
export function verifyHoso() {
    const data = getUserData();
    if ( !data ) return {
        infoPersonalValidate : false,
        infoNenkinValidate : false,
        infoHoanThueValidate : false,
        validate : false
    };
    const {userdata} = data;    
    const {id, address,
            email,
            facebook_metainfo,
            fullname = '',
            phone,
            addressbanknamebranchvietnam,
            banknamebranchvietnam,
            banknamevietnam,
            birthday = '',
            companyinfo = '',
            fullnamejapan,
            namelastaddress,
            nameunsigned,
            nenkincode,
            nobank,
            nozip, 
            nenskin_frontcard,
            nenkins_passport, 
            nenkins_image, 
            nenkins_bank_images,
            hoanthue_gensen,
            hoanthue_transfer_images,
            hoanthue_giaytoquanhe_images,
            hoanthue_passport,
            hoanthue_mynumber_images,
            hoanthue_sotttaikhoan_images,
            hoanthue_ngoaikieu_images} = userdata;
    //
    const fbInfo = facebook_metainfo ? JSON.parse(facebook_metainfo) : {};
    const companyInfo = companyinfo ? JSON.parse(companyinfo) : [];
    //
    const boolInfoPersonal = !isEmpty(id) && !isEmpty(address) && !isEmpty(email) && !isEmpty(fbInfo) && !isEmpty(companyInfo) && 
                                    !isEmpty(fullname) && !isEmpty(phone) && !isEmpty(addressbanknamebranchvietnam) && !isEmpty(banknamebranchvietnam) && 
                                        !isEmpty(banknamevietnam) && !isEmpty(birthday) && !isEmpty(fullnamejapan) && !isEmpty(namelastaddress) && !isEmpty(nameunsigned) && 
                                            !isEmpty(nenkincode) && !isEmpty(nobank) && !isEmpty(nozip);
    const boolHosoNenkin = !isEmpty(nenskin_frontcard) && !isEmpty(nenkins_passport) && 
                                !isEmpty(nenkins_image) && !isEmpty(nenkins_bank_images);
    const boolHosoHoanThue = !isEmpty(hoanthue_gensen) && !isEmpty(hoanthue_transfer_images) && 
                                !isEmpty(hoanthue_giaytoquanhe_images) && !isEmpty(hoanthue_passport) && !isEmpty(hoanthue_mynumber_images) && 
                                    !isEmpty(hoanthue_sotttaikhoan_images) && !isEmpty(hoanthue_ngoaikieu_images);
    return {
        infoPersonalValidate : boolInfoPersonal,
        infoNenkinValidate : boolHosoNenkin,
        infoHoanThueValidate : boolHosoHoanThue,
        validate : boolInfoPersonal && boolHosoNenkin && boolHosoHoanThue
    };
}
export function getCheckboxPrgStatus(progressStatus, value) {
    if ( !progressStatus[value - 1] ) return false;
    return progressStatus[value - 1];
}