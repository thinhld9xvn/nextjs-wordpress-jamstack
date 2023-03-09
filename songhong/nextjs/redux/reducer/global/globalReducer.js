import { LANGUAGES } from "@constants/constants";
const initialStates = {  
    translationStrings : [],
    siteOptions: {},
    activeLang : LANGUAGES.vi,
    activePolyLangUrl : null,
    activeUserId : null,
    isAccountPage : false,
    loginSuccess : false,
    isValidateHoso : false,
    isProcessingVerifyHoso : false,
    missingVerifiedHosoMsg : '',
    isAdminRole : false,
    hsNotifications : []
};
export const globalReducer = (state = initialStates, action) => {
    switch ( action.type ) {   
        case 'UPDATE_ACTIVE_USER_ID' :
            return {...state, activeUserId : action.payload};
        case 'UPDATE_ACTIVE_LANGUAGE' :
            return {...state, activeLang : action.payload};
        case 'UPDATE_ACTIVE_POLYLANG_URL' :
            return {...state, activePolyLangUrl : action.payload};
         case 'UPDATE_SITE_OPTIONS' :
            return {...state, siteOptions : {...action.payload}};
        case 'UPDATE_TRANSLATIONS' :
            return {...state, translationStrings : action.payload};
        case 'UPDATE_ACCOUNT_PAGE' :
            return {...state, isAccountPage : action.payload};
        case 'UPDATE_LOGIN_SUCCESS' :
            return {...state, loginSuccess : action.payload};
        case 'UPDATE_VALIDATE_HOSO' :
            return {...state, isValidateHoso : action.payload};
        case 'UPDATE_MISSING_VERIFIED_MSG_HOSO' :
            return {...state, missingVerifiedHosoMsg : action.payload};
         case 'UPDATE_PROCESSING_VERIFY_HOSO' :
            return {...state, isProcessingVerifyHoso : action.payload};
         case 'UPDATE_IS_ROLE_ADMIN_ACCOUNT' :
            return {...state, isAdminRole : action.payload};
        case 'UPDATE_HOSO_NOTIFICATIONS' :
            return {...state, hsNotifications : [...action.payload]};
        default :
            return state;
    }
}