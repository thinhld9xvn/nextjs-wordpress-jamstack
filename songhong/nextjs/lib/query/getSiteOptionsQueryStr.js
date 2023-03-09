import { LANGUAGES, NAVMENUS } from '@constants/constants';
export function getSiteOptionsQueryStr(locale = LANGUAGES.vi) {
  const menuName = NAVMENUS[locale];
    return `
      menuItemsList: getMenuItemsList(name: ${menuName}) {
        id
        text
        type
        url
        order
        childrens {
          id
          text
          type
          url
          order
        }
      }
      siteOptions: getSiteOptions(lang: ${locale.toUpperCase()}) {
        logo
        logo_footer
        company_name
        company_address
        copyright
        email
        hotline {
          hotline_nhatban {
            phone_label
            phone_url
          }
          hotline_vietnam {
            phone_label
            phone_url
          }
        }
        phone {
          phone_label
          phone_url
        }
        socials {
          fanpage
          tiktok
          youtube
          zalo
        }
        footer_dichvu_menu_html
        footer_thongtin_menu_html
        translation_strings
      }`;
  }