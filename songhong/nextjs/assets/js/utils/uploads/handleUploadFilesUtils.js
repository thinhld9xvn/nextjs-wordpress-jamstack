import { getTranslation } from "../translations";
import { cloneDeep } from "lodash";
import { UpdateAvatar } from "@lib/mutations/update-avatar";
export function getExtFn(name) {
    return name.split('.').pop();
}
export function getShortFn(name, maxLength = 13, limit = 10) {
    const ext = getExtFn(name);
    return name.length > maxLength ? name.substr(0, limit) + '...' + ext : '';
}
export async function handleChooseAvatarFile(props, e) {
    const {setLoading, translationStrings, userId,
                userLoggedInData, setUserLoggedInData} = props;
    const isValidImageFileType = (ext) => {
        return ['jpg', 'jpeg', 'png'].indexOf(ext) !== -1;
    }
    if ( e.target.files && e.target.files.length ) {
        setLoading(true);
        let imageSrc = '';
        var reader = new FileReader();      
        const file = e.target.files[0];
        const ext = file.name.split('.').pop();
        const sizeMB = file.size / (1024 * 1024);
        //console.log(ext);
        if ( !isValidImageFileType(ext) ) {
            setLoading(false);
            setTimeout(() => {
                alert(getTranslation(translationStrings, "uploadinvalidimage_label"));
            }, 100);
            return;
        }
        if ( sizeMB > 1 ) {  // limit 1MB                
            setLoading(false);
            setTimeout(() => {
                alert(getTranslation(translationStrings, "uploadexceed1mb_label"));
            }, 100);
            return;
        }
        reader.readAsDataURL(file);
        reader.onload = function (ev) {               
            imageSrc = ev.target.result;
            //setAvatarImage(ev.target.result);
        }        
        const results = await UpdateAvatar({ id : userLoggedInData.id, file });
        if ( !results.updateUser ) {
            setLoading(false);
            setTimeout(() => {
                alert(getTranslation(translationStrings, "uploaderror_label"));
            }, 100);
            return;
        }
        document.getElementById('output')
                .setAttribute('src', imageSrc);
        setUserLoggedInData({...userLoggedInData, avatar_user : imageSrc});
        setLoading(false);
        //console.log(results);
    }
}
export async function handleAttachEmailFile(props, e) {
    const {setLoading, translationStrings, no, targetFiles, attachmentFiles, setAttachmentFiles} = props;
    const isValidUploadFileType = (ext) =>  {
        return ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx'].indexOf(ext) !== -1;
    }
    const _attachmentFiles = cloneDeep(attachmentFiles);
    const index = _attachmentFiles.findIndex(item => item.no === no);
    if ( targetFiles && targetFiles.length ) {
        setLoading(true);
        //let fileSrc = '';
        var reader = new FileReader();
        const file = targetFiles[0];
        const ext = file.name.split('.').pop();
        const sizeMB = file.size / (1024 * 1024);
        if ( !isValidUploadFileType(ext) ) {
            setLoading(false);
            setTimeout(() => {
                alert(getTranslation(translationStrings, "uploadinvalidemailatt_label"));
            }, 100);
            return;
        }
        if ( sizeMB > 5 ) {  // limit 5MB
            setLoading(false);
            setTimeout(() => {
                alert(getTranslation(translationStrings, "uploadexceed5mb_label"));
            }, 100);
            return;
        }
        reader.readAsDataURL(file);
        reader.onload = function (ev) {               
            //fileSrc = ev.target.result;
            if ( index === -1 ) {
                _attachmentFiles.push({
                    no,
                    name : file.name,
                    file,
                });
            }
            else {
                _attachmentFiles[index] = {..._attachmentFiles[index], 
                                            name : file.name, 
                                            file
                                          };
            }
            setAttachmentFiles([..._attachmentFiles]);
        }       
        setLoading(false);
    }
    else {
        if ( index !== -1 ) {
            _attachmentFiles.splice(index, 1);
            setAttachmentFiles([..._attachmentFiles]);
        }
    }
}