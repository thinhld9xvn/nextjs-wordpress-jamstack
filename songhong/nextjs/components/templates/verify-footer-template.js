import { getTranslation } from '@js_dir/utils/translations'
import React, {useEffect, useState} from 'preact/compat'
import Image from 'next/image'
export default function VerifyFooterTemplate({ isValidate = false, isProcessing = false, isTryAgain = false, isVerified = false,
                                                loading = false, handleVerify = null, missingMsg = '', translationStrings, expiredDays = -1 }) {
    const [tooltipBody, setTooltipBody] = useState(null);
    useEffect(() => {
        if (isValidate && loading ) {
            setTooltipBody( <p className="tooltipCenter">
                                <span className="fa fa-spinner fa-spin"></span>
                            </p> );
            return;
        }
        if ( expiredDays >= 0 ) {
            setTooltipBody( <p>{getTranslation(translationStrings, "daketthuchopdong_label")}</p> );
            return;
        }
        if ( !isValidate ) {
            setTooltipBody( <>
                                <p>{getTranslation(translationStrings, "thongtinhosochuadaydu_label")}</p>
                                <p className="tooltipMissingGiayTo">{missingMsg}</p>
                            </> );
            return;
        }
        if ( isVerified ) {
            setTooltipBody( <p>{getTranslation(translationStrings, "thongtinhosohople_label")}</p> );
            return;
        }
        if ( isProcessing ) {
            setTooltipBody( <p>{getTranslation(translationStrings, "processinghoso_label")}</p> );
            return;
        }
        if ( isTryAgain ) {
            setTooltipBody( <p>{getTranslation(translationStrings, "xacthuclai_label")}</p> );
            return;
        }
    }, [loading, isValidate, isProcessing, isTryAgain, isVerified, missingMsg, translationStrings]);
  return (
    <li>
        <a href="#" className={"btn__verify ".concat(isValidate ? ' verify ' : ' not__verify ',
                                                    isProcessing ? ' processing_verify ' : '',
                                                    isTryAgain ? ' try__again ' : '')}
            onClick={handleVerify}>
            <Image className="verify__image" src="/static/images/verifications.png" width={50} height={50} layout="fixed" />      
            {isTryAgain ? (
                <div className="processing_image">
                    <Image src="/static/images/warning-icon.png" width={30} height={30} layout="fixed" />
                </div>                            
            ) : null}       
            {isProcessing ? (
                <div className="processing_image">
                    <Image src="/static/images/hourglass.gif" width={30} height={30} layout="fixed" />
                </div>                            
            ) : null}       
        </a>
        <div className={"verifyTooltip ".concat(isValidate ? ' verify ' : ' not__verify ',
                                                isProcessing ? ' processing_verify ' : '',
                                                isTryAgain ? ' try__again ' : '')}>
            <p className="tooltipHeading">{getTranslation(translationStrings, "xacthuchoso_label")}</p>
            <p className="tooltipBody">
                {tooltipBody}
            </p>
            <i></i>
        </div>
    </li>
  )
}
