const { LANGUAGES, PAGES, SIDEBAR_ACCOUNTS_DATA, SIDEBAR_ADMIN_DATA } = require("@constants/constants");
function getParamFromURL(param_name) {
    if ( typeof(window) !== 'undefined' ) {
        const url = new URL(window.location.href);
        const value = url.searchParams.get(param_name);
        if ( value ) {
            return '/' === value.substr(value.length - 1) ? value.substr(0, value.length - 1) : 
                                                            value;
        }
    }
    return '';
}  
function getParamFromMyURL(param_name, myUrl) {
    const url = new URL(myUrl);
    const value = url.searchParams.get(param_name);
    if ( value ) {
        return '/' === value.substr(value.length - 1) ? value.substr(0, value.length - 1) : 
                                                        value;
    }
    return '';
}    
function getSlugByLocale(url) {
    return url.split('/').pop();
}
function getSlugPathByRouter(router) {
    if (!router || !router.asPath) return '';
    const pathname = router.asPath.substring(1);
    const num = pathname.length - 1;
    let pos = pathname.indexOf('#');
    if (pos === num) {
        return pathname.substring(0, num);
    }
    pos = pathname.indexOf('?');
    if (pos !== -1) {
        return pathname.substring(0, num);
    }
    return pathname;
}
function getSlugPageByLocale(url) {
    const pos = url.indexOf('?s=');
    if ( pos !== -1 ) {
        url = url.substr(0, pos);
    }
    if ( url.startsWith('/' + LANGUAGES.vi) || 
        url.startsWith('/' + LANGUAGES.ja) ) {
        return url.substr(4);
    }
    return url.substr(1);
}
function getPageUrlByLocale(name = 'home', lang = LANGUAGES.vi) {
    const n = name.toUpperCase();
    return `/${lang}/${PAGES[n][lang]}`;
}
function getHomePageUrlByLocale(lang = LANGUAGES.vi) {
    return lang === LANGUAGES.vi ? process.env.HOME_PAGE_VI : process.env.HOME_PAGE_JA;
}
function getPageUrlByRankMathSlug(slug = '', base = '') {
    return process.env.WP_SITE_URL + `${base ? `/${base}/` : '/'}${slug}`;
}
function getPageUrlBySlug(slug = '', base = '') {
    return `${base ? `/${base}/` : '/'}${slug}`;
}
function getFullPageUrlByLocale(name = 'home', lang = LANGUAGES.vi) {
    const n = name.toUpperCase();
    return process.env.WP_SITE_URL + `/${lang}/${PAGES[n][lang]}`;
}
function getFullPageUrlRankMathByLocale(name = 'home', lang = LANGUAGES.vi) {
    const n = name.toUpperCase();
    return process.env.WP_SITE_URL + `/${PAGES[n][lang]}`;
}
function getLocationUrl(s = '') {
    let str = s;
    if ( !s.startsWith('http://') && !s.startsWith('https://') ) {
        str = `${process.env.NEXTAUTH_URL}${(s.startsWith('/') ? s : `/${s}`)}`;
    }
    return new URL(str);
}
function isAccountPageUrl(router) {
    const pathname = getSlugPathByRouter(router);
    let boolCheck = false;
    const locale = router.locale;
    SIDEBAR_ACCOUNTS_DATA.forEach(pageItem => {
        if ( boolCheck ) return;
        const url = pageItem.url,
              _pathname = url && url[locale] ? url[locale] : '';
        pageItem.childrens && pageItem.childrens.forEach(_pageItem => {
            if ( boolCheck ) return;
            const _url = _pageItem.url;
            const _childpathname = _url && _url[locale] ? _url[locale] : '';
            if ( _childpathname && _childpathname === pathname ) {
                boolCheck = true;
            }
        });
        if ( _pathname && _pathname === pathname ) {
            boolCheck = true;
        }
    });
    return boolCheck;
}
module.exports.getParamFromURL = getParamFromURL;
module.exports.getSlugByLocale = getSlugByLocale;
module.exports.getPageUrlByLocale = getPageUrlByLocale;
module.exports.getSlugPageByLocale = getSlugPageByLocale;
module.exports.getHomePageUrlByLocale = getHomePageUrlByLocale;
module.exports.getFullPageUrlByLocale = getFullPageUrlByLocale;
module.exports.getFullPageUrlRankMathByLocale = getFullPageUrlRankMathByLocale;
module.exports.getPageUrlByRankMathSlug = getPageUrlByRankMathSlug;
module.exports.getPageUrlBySlug = getPageUrlBySlug;
module.exports.isAccountPageUrl = isAccountPageUrl;
module.exports.getLocationUrl = getLocationUrl;
module.exports.getSlugPathByRouter = getSlugPathByRouter;
module.exports.getParamFromMyURL = getParamFromMyURL;