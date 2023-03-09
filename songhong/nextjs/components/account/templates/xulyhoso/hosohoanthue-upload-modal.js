import { getTranslation } from '@js_dir/utils/translations'
import React, {useEffect} from 'preact/compat'
import { UploadModalTemplate } from '../upload-modal/upload-modal-template'

export default function HosoHoanThueUploadModal({ data, translationStrings, 
                                                    activeUploadItemId, activeUploadPercentage, 
                                                        activeUploadErrors, uploadProgressDone }) {
    const {ngoaiKieuFiles = [], 
            gensenFiles = [], 
                hoChieuFiles = [], 
                    giayChuyenTienFiles = [],
                        giayPhungDuongFiles = [],
                            soTTTaiKhoanFiles = [],
                                myNumbersFiles = []} = data || {};
  return (
    <>
        <h2 className={"modalHsHeadingTitle ".concat(!uploadProgressDone ? 'loading' : '')}>
            {!uploadProgressDone ? (
                <>
                    {getTranslation(translationStrings, "dangtaidulieuhs_label")}
                    <span></span>
                    <span></span>
                    <span></span>
                </>
            ) : (
                <>
                    {getTranslation(translationStrings, "taidulieuhsthanhcong_label")}
                    <span className="padLeft10"><img src="/static/images/check-up-img.svg" alt="check-up" /></span>
                </>
            )}
        </h2>
        <div className="modalBodyHs__contents">
            <div className="row">
                <div className="col-lg-12">
                    <div className="form-content__accounts">
                        <div className="form__contents full__height">
                            {gensenFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "anhgiaygensen_label")}
                                                     data = {gensenFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                            {giayChuyenTienFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "anhgiaychuyentien_label")}
                                                     data = {giayChuyenTienFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                            {giayPhungDuongFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "giaytochungminhquanhevoinguoiphungduong_label")}
                                                     data = {giayPhungDuongFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                            {hoChieuFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "anhhochieu_label")}
                                                     data = {hoChieuFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                            {myNumbersFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "anhthemynumber_label")}
                                                     data = {myNumbersFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                            {soTTTaiKhoanFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "songanhanghoacthongtintk_label")}
                                                     data = {soTTTaiKhoanFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                            {ngoaiKieuFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "anhthengoaikieumattruocmatsau_label")}
                                                     data = {ngoaiKieuFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
