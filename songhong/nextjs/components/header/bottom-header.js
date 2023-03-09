import MenuItemTemplate from '@components/templates/menu-item-template'
import Image from 'next/image';
import Link from 'next/link';
import React from 'preact/compat'

export default function BottomHeader({ logo, data, props }) {
    const {showMobileMenu, handleToggleMobileMenu} = props;
    const arrMenuItems = data.map(item => <MenuItemTemplate key={item.id} data={item} />);
  return (
    <div className="bottom-headers">
        <div className="container">
            <span className="button-phone btn_sp_menu"
                  onClick={handleToggleMobileMenu}>
                <i className="fa fa-bars" aria-hidden="true"></i>
            </span>
            <div className="menu">
                <div className="content-menus menu-desktop">
                    <ul>
                        {arrMenuItems}
                    </ul>
                </div>
                <div className={"content-menus main-menu-mobile ".concat(showMobileMenu ? 'active-menu-mobile' : '')}>
                    <div className="header-menu-mobile">
                        <Link href="/">
                            <a className="logo-menu__mobile mb-10s">
                                {logo ? (
                                    <Image src={logo} className="img-fluid" width={92} height={49} />
                                ) : null}
                            </a>
                        </Link>
                    </div>
                    <ul>
                        {arrMenuItems}
                    </ul>
                </div>

            </div>
            <div className={"bg-over-menu ".concat(showMobileMenu ? 'show-over' : '')}></div>
        </div>
    </div>
  )
}
