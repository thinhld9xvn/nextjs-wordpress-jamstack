import { SIDEBAR_ACCOUNT_IDS } from '@constants/constants';
import { logout } from '@js_dir/utils/membershipUtils';
import { getSlugPathByRouter } from '@js_dir/utils/urlUtils';
import Link from 'next/link';
import React, {useState, useEffect, useCallback} from 'preact/compat'
import AvatarUser from './avatar-user';
function hasChildrens(data) {
    return data && data.length;
}
function hasUrl(url, locale) {;
    return url && url[locale];
}
function AccountItemTemplate({ data, locale, router, lv = 0 }) {
    const {id, text, url, childrens} = data;
    const [expand, setExpand] = useState(false);
    const arrChilds = hasChildrens(childrens) && childrens.map(item => <AccountItemTemplate key = {item} 
                                                                                            data = {item} 
                                                                                            locale = {locale} 
                                                                                            lv = {1} 
                                                                                            router = {router} />);    
    useEffect(() => {
        if ( hasChildrens(childrens) ) {
            setExpand(childrens.filter(item => hasUrl(item.url, locale) && 
                                                getSlugPathByRouter(router) === item.url[locale]).length);
        } 
    }, [,router.locale,router.asPath]);
    const isUrlActive = hasUrl(url, locale) && getSlugPathByRouter(router) === url[locale];
    const handleExpand = useCallback((e) => {
        try {
            const target = e.target;
            const elem = document.getElementById(`item-lists-${id}`).querySelector('ul');
            if (elem && elem.contains(target)) {
                setExpand(true);
            }
            else {
                setExpand(!expand);
            }
        } catch(e) {}
    }, [,expand]);
    const isLogoutItem = id === SIDEBAR_ACCOUNT_IDS.LOGOUT;
    return (
        <>
            {!hasChildrens(childrens) ? (
                <li className={isUrlActive ? 'active' : ''}>
                    <Link href={hasUrl(url, locale) ? `/${url[locale]}` : '#'}>
                        <a onClick={isLogoutItem ? logout.bind(this, router) : null}>{lv > 0 ? '- ' : ''}{text}</a>
                    </Link>
                </li>
            ) : null}
            {hasChildrens(childrens) ? (
                <li id={`item-lists-${id}`} onClick={handleExpand} className={expand ? 'active' : ''}>
                    <p>{text}</p>
                    <span className={`hide-nav__acounts ${expand ? 'active-nav__acounts' : ''}`}>
                        <i className="fa fa-angle-down"></i>
                    </span>
                    <ul className={`transitions-box ${expand ? 'show' : ''}`}>
                        {arrChilds}
                    </ul>
                </li>
            ) : null}
        </>
    )
}
export default function SidebarTemplate({ data, userinfo, locale, router, handleChooseAvatar }) {    
    const arrAccountItems = data.map((item, i) => <AccountItemTemplate key = {item} 
                                                                        data = {item} 
                                                                        locale = {locale} 
                                                                        lv = {0}
                                                                        router = {router} />);    
  return (
    <div className="box-acounts__content right-content__accounts height-100s">
        <AvatarUser data = {userinfo} handleChooseAvatar = {handleChooseAvatar} />
        <div className="nav-acounts__rights">
            <ul>
                {arrAccountItems}
            </ul>
        </div>
    </div>
  )
}
