import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
import { UploadModalTemplate } from '../upload-modal/upload-modal-template'

export default function HosoNenkinUploadModal({ data, translationStrings, 
                                                    activeUploadItemId, activeUploadPercentage, 
                                                        activeUploadErrors, uploadProgressDone }) {
    const {ngoaikieuFiles = [], 
            nenkinFiles = [], 
                hochieuFiles = [], 
                    giayNganHangFiles = []} = data || {};
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
                            {ngoaikieuFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "anhthengoaikieumattruocmatsau_label")}
                                                     data = {ngoaikieuFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                            {nenkinFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "anhnenkin_label")}
                                                     data = {nenkinFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                            {hochieuFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "anhhochieu_label")}
                                                     data = {hochieuFiles}
                                                     activeUploadItemId = {activeUploadItemId}
                                                     activeUploadPercentage = {activeUploadPercentage}
                                                     activeUploadErrors = {activeUploadErrors} />
                            ) : null}
                            {giayNganHangFiles.length ? (
                                <UploadModalTemplate label = {getTranslation(translationStrings, "anhgiayxacnhannganhang_label")}
                                                     data = {giayNganHangFiles}
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
