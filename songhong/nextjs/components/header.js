import React, {useEffect, useRef, useState} from 'preact/compat'
import { Router, useRouter } from 'next/router'
import { isDiff, isEmptyObj } from '@js_dir/utils/arrayUtils';
import { connect } from 'react-redux';
import TopHeader from './header/top-header';
import CenterHeader from './header/center-header';
import BottomHeader from './header/bottom-header';
import { getTranslation, parse } from '@js_dir/utils/translations';
import { PAGES } from '@constants/constants';
import Head from 'next/head';
import { checkLoggedIn } from '@js_dir/utils/membershipUtils';
import { getPageUrlByLocale, getSlugPathByRouter } from '@js_dir/utils/urlUtils';
function Header({ siteOptions, translationStrings, UpdateTranslations, UpdateLoginSuccess, loginSuccess }) {
    const router = useRouter();    
    const [showHeader, setShowHeader] = useState(true);
    const [menuItems, setMenuItems] = useState([]);
    const [showMobileMenu, setShowMobileMenu] = useState(false);    
    const originPaddingTop = useRef(-1);
    useEffect(() => {        
        router.events.on("routeChangeComplete", function() {            
            window.scroll(0, 0);
            setShowMobileMenu(false);
        });
    }, []);
    useEffect(() => {       
        const pathname = getSlugPathByRouter(router);
        const locale = router.locale;
        setShowHeader(pathname !== PAGES.DANG_NHAP[locale] &&
                        pathname !== PAGES.DANG_KY[locale] && 
                            pathname !== PAGES.QUEN_MAT_KHAU[locale]);
    }, [,router.locale,router.asPath,siteOptions]);
    useEffect(() => {
        const isLoggedIn = checkLoggedIn();
        if ( isLoggedIn !== loginSuccess ) { 
            UpdateLoginSuccess(isLoggedIn);
        }
    }, [,router.locale,router.asPath,siteOptions]);
    const handleToggleMobileMenu = (e) => {
        e.preventDefault();
        setShowMobileMenu(!showMobileMenu);
    }
    useEffect(() => {
        function toggleMinimizeHeader(e) {
            try {
                if ( originPaddingTop.current === -1 ) {
                    return;
                }
                const header = document.getElementById('header');
                const wrapperElem = document.getElementById('wrapper');
                const paddingTopW = parseInt(wrapperElem.style.paddingTop);
                const height = header.clientHeight;               
                //originPaddingTop.current = paddingTopW;
                if ( window.scrollY > 0 ) {
                    if ( !header.classList.contains('fixed') ) {
                        header.classList.add('fixed');
                    }
                    if ( paddingTopW !== height ) {
                        wrapperElem.style.paddingTop = height + 'px';
                    }
                }
                else {
                    if ( header.classList.contains('fixed') ) {
                        header.classList.remove('fixed');
                    }
                    wrapperElem.style.paddingTop = originPaddingTop.current + 'px';
                }
            } catch(e) {}
        }
        setTimeout(() => {
            try {
                const headerElem = document.getElementById('header');
                const wrapperElem = document.getElementById('wrapper');
                //
                if ( headerElem.classList.contains('fixed') ) {
                    headerElem.classList.remove('fixed');
                }
                //
                const height = headerElem.clientHeight;
                wrapperElem.setAttribute('style', `padding-top: ${height}px`);   
                originPaddingTop.current = height;  
                //
                window.addEventListener('scroll', toggleMinimizeHeader);           
            } catch(e) {}
        }, 200);
    }, [,router.locale,router.asPath]);
    useEffect(() => {        
        function toggleMouseDownShowMenu(e) {
            try {
                const target = e.target;
                const overlayNode = document.querySelector('.bg-over-menu');
                if (overlayNode.contains(target)) {
                    setShowMobileMenu(false);
                }   
            }
            catch(e) {}
        }
        function responsivePopupSlide() {
            setTimeout(() => {     
                try {
                    const headerElem = document.getElementById('header');
                    const popupSlide = document.getElementById('popup-slide__mains');
                    //
                    const height = headerElem.clientHeight;
                    popupSlide.setAttribute('style', `top: ${height + 20}px`);
                } catch(e) {}
            }, 200);
        }
        document.addEventListener('mousedown', toggleMouseDownShowMenu);
        window.addEventListener('resize', responsivePopupSlide);
        responsivePopupSlide();
    }, [,router.locale,router.asPath]);
    useEffect(() => {
        if ( !isEmptyObj(siteOptions) ) {
            if ( isDiff(translationStrings, translations) ) {                
                UpdateTranslations(translations);
            }
        }
    }, [,router.locale,siteOptions]);
    useEffect(() => {
        if ( menuItemsList ) {
            const menuItemsListData = [...menuItemsList];            
            if ( loginSuccess ) {
                menuItemsListData.pop();
                menuItemsListData.push({
                    id : 99999,
                    order : menuItemsListData.length + 1,
                    text : getTranslation(translationStrings, "thongtintaikhoan_label"),
                    type : "page",
                    url : getPageUrlByLocale("thong_tin_tai_khoan_url", router.locale),
                    childrens : null
                });
                if (isDiff(menuItemsListData, menuItems)) {
                    setMenuItems([...menuItemsListData]);
                }
            }
            else {
                if (isDiff(menuItemsListData, menuItems)) {
                    setMenuItems([...menuItemsListData]);
                }
            }
        }
    }, [, router.locale, router.asPath, siteOptions, translationStrings, loginSuccess]);
    if ( isEmptyObj(siteOptions) ) return <></>;    
    const {logo, hotline, email, socials, translation_strings, menuItemsList} = siteOptions;
    const centerHeaderData = {logo, hotline, email};
    const translations = parse(translation_strings);
    //console.log(loginSuccess);    
    //console.log(menuItems);
  return (
    <>
        <Head>
            <script dangerouslySetInnerHTML={{ __html : `
                window.fbAsyncInit = function() {
                  FB.init({
                    appId      : '${process.env.FACEBOOK_ID}',
                    xfbml      : true,
                    version    : 'v2.5'
                  });
                };
            
                (function(d, s, id){
                  var js, fjs = d.getElementsByTagName(s)[0];
                  if (d.getElementById(id)) {return;}
                  js = d.createElement(s); js.id = id;
                  js.src = "//connect.facebook.net/en_US/sdk.js";
                  fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));
            `}} />
        </Head>
        <header>
            <section id="header" className="header">
                <TopHeader data = {socials} />
                {showHeader ? (
                    <>
                        <CenterHeader data = {centerHeaderData} />
                        <BottomHeader data = {menuItems}
                                      logo = {logo}
                                      props = {{showMobileMenu, handleToggleMobileMenu}} />
                    </>
                ) : null}
            </section>        
        </header>
    </>
  )
}
function mapStateToProps(state) {   
    return { 
        siteOptions : state.globalReducer.siteOptions,
        translationStrings : state.globalReducer.translationStrings,
        isAccountPage : state.globalReducer.isAccountPage,
        loginSuccess : state.globalReducer.loginSuccess
    }
}
function mapDispatchToProps(dispatch) {
    return {
        UpdateTranslations : async (v) => await dispatch({
            type : "UPDATE_TRANSLATIONS",
            payload : v
        }),
        UpdateLoginSuccess : async (v) => await dispatch({
            type : "UPDATE_LOGIN_SUCCESS",
            payload : v
        })  
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
