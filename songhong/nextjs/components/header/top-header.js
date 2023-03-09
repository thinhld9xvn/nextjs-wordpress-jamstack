import React, { useEffect, useState } from 'preact/compat'
import { useRouter } from 'next/router';
import { LANGUAGES_LABEL, PAGES } from '@constants/constants';
import { useCookies } from 'react-cookie';
import { getSlugPageByLocale, getPageUrlByLocale, getLocationUrl } from '@js_dir/utils/urlUtils';
import { connect } from 'react-redux';
import Link from 'next/link'
import Image from 'next/image';
import { getTranslation } from '@js_dir/utils/translations';
var boolRedirect = true;
function onChangeLang(e, props) {
    e.preventDefault();
    const {router, locale, cookie, setCookie, activePolyLangUrl, updateActiveLang} = props;
    const {asPath, locale: activeLocale} = router;
    const activeUrl = getSlugPageByLocale(asPath); 
    //const s = window.location.search;
    boolRedirect = false;
    if ( activeUrl === '' ) { 
        router.push('/', '/', {locale});
        boolRedirect = true;
    }
    else {
        Object.keys(PAGES)
            .forEach((key, i) => {
            const pageActiveUrl = PAGES[key][activeLocale];
            const locationUrl = getLocationUrl(activeUrl);
            const pathname = locationUrl.pathname.substr(1);
            const params = locationUrl.search;
            //console.log(activeUrl);
            if ( pathname === pageActiveUrl ) {
                const redirectPageUrl = PAGES[key][locale];
                router.push('/' + redirectPageUrl.concat(params || ''),
                                '',
                                {locale});
                boolRedirect = true;
            }
        });
        if ( !boolRedirect ) { // single custom post type || single blog
            if ( activePolyLangUrl ) {
                router.push(activePolyLangUrl, activePolyLangUrl, {locale});
            }
            else {
                router.push('/', '/', {locale});
            }
            boolRedirect = true;
        }
    }
    if(cookie.NEXT_LOCALE !== locale){
        setCookie("NEXT_LOCALE", locale, { path: "/" });
    }
    updateActiveLang(locale);
}
function TopHeader({ data, translationStrings, activePolyLangUrl, updateActiveLang }) {
    const router = useRouter();
    const [ cookie, setCookie ] = useCookies(['NEXT_LOCALE']);
    const [langLabel, setLangLabel] = useState();
    const {fanpage, zalo, youtube, tiktok} = data;
    useEffect(() => {
        setLangLabel(LANGUAGES_LABEL[router.locale]);
    }, [,router.locale]);
  return (
    <div className="top-headers">
        <div className="container">
            <ul className="left-top__headers all-tops__headers">
                <li>
                    <ul className="apps-headers">
                        <li>
                            <a href={fanpage}><Image src="/static/images/img-app-headers-1.png" width={16} height={16} layout="fixed" /></a>
                        </li>
                        <li>
                            <a href={zalo} ><Image src="/static/images/img-app-headers-2.png" width={26} height={10} layout="fixed" /></a>
                        </li>
                        <li>
                            <a href={youtube}><Image src="/static/images/img-app-headers-3.png" width={21} height={14} layout="fixed" /></a>
                        </li>
                        <li>
                            <a href={tiktok}><Image src="/static/images/img-app-headers-4.png" width={15} height={16} layout="fixed" /></a>
                        </li>
                    </ul>
                </li>
                <li>
                    <div className="language-headers">
                        <p className="btn-language__headers">
                            {langLabel} 
                            <i className="fa fa-angle-down" aria-hidden="true"></i>
                        </p>
                        <ul className="list-language__headers">
                            <li>
                                <a href="#" 
                                    onClick={e => onChangeLang(e, {router, locale: 'vi', cookie, setCookie, activePolyLangUrl, updateActiveLang})}>
                                    VIE
                                </a>
                            </li>
                            <li>
                                <a  href="#"
                                    onClick={e => onChangeLang(e, {router, locale: 'ja', cookie, setCookie, activePolyLangUrl, updateActiveLang})}>
                                    JPN
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
            <ul className="all-tops__headers left-top__headers">
                <li>
                    <Link href={getPageUrlByLocale('qa', router.locale)}><a>{getTranslation(translationStrings, "qa_label")}</a></Link>
                </li>
            </ul>
        </div>
    </div>
  )
}
function mapStateToProps(state) {   
    return { 
        activePolyLangUrl : state.globalReducer.activePolyLangUrl,
        translationStrings : state.globalReducer.translationStrings
    }
}
function mapDispatchToProps(dispatch) {
    return {
        updateActiveLang : async (v) => await dispatch({
            type : "UPDATE_ACTIVE_POLYLANG_URL",
            payload : v
        })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);