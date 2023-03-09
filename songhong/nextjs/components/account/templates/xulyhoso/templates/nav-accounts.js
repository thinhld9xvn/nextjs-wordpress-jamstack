import React, {useState, useCallback} from 'preact/compat'
import {SIDEBAR_ACCOUNTS_MODAL_DATA, SIDEBAR_ACCOUNT_IDS} from '@constants/constants'
import { getTranslation } from '@js_dir/utils/translations';
function hasChildrens(data) {
    return data && data.length;
}
function MenuItemTemplate({ data, locale, notificationsCount, router, tabActiveId, translationStrings, handleChangeTabActive, lv = 0 }) {
    const {id, translation_key, childrens} = data;
    const [expand, setExpand] = useState(false);
    const arrChilds = hasChildrens(childrens) && childrens.map(item => <MenuItemTemplate key = {item} 
                                                                                            data = {item} 
                                                                                            locale = {locale} 
                                                                                            translationStrings = {translationStrings}
                                                                                            tabActiveId = {tabActiveId}
                                                                                            lv = {1} 
                                                                                            handleChangeTabActive = {handleChangeTabActive}
                                                                                            notificationsCount = {notificationsCount}
                                                                                            router = {router} />); 
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
    const text = getTranslation(translationStrings, translation_key);
    return (
        <>
            {!hasChildrens(childrens) ? (
                <li id={`item-lists-${id}`} 
                    className={id === tabActiveId ? 'active' : ''}
                    onClick={handleChangeTabActive.bind(this, id)}>
                    <a href="#">
                        {id === SIDEBAR_ACCOUNT_IDS.THONG_BAO ? <span className="fa fa-bell-o notification-item notification-icon"></span> : null}
                        {text} 
                        {id === SIDEBAR_ACCOUNT_IDS.THONG_BAO ? <span className="notification-item notification-count">{`(${notificationsCount})`}</span> : null}
                    </a>
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
export default function NavAccount({ tabActiveId, locale, router, notificationsCount, translationStrings, handleChangeTabActive }) {
    const arrMenuItems = SIDEBAR_ACCOUNTS_MODAL_DATA.map(item => <MenuItemTemplate data = {item}
                                                                                    key = {item}
                                                                                    locale = {locale}
                                                                                    router = {router}
                                                                                    translationStrings = {translationStrings}
                                                                                    tabActiveId = {tabActiveId}
                                                                                    handleChangeTabActive = {handleChangeTabActive}
                                                                                    notificationsCount = {notificationsCount}
                                                                                    lv = {0} />)
  return (
    <div className="nav-acounts__rights">
        <ul>
            {arrMenuItems}
        </ul>
    </div>
  )
}
