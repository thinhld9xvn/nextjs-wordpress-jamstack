import { LANGUAGES } from '@constants/constants';
export function getHomePageOptionsQueryStr(locale = LANGUAGES.vi, prefix = 'homePageOptions') {
    return(
      `${prefix}: getHomePageOptions(lang: ${locale.toUpperCase()}) {
          home_intro {
            gt_hs_cong_ty
            gt_vitri_dialy {
              tru_so
              dia_chi {
                content
              }
            }
            gt_lienlac 
            gt_slider {
              image
              gallery
              url
            }
          }
          home_netkinstt {
            gt_dichvu_number
          }
          home_services {
            gt_dichvu_number
          }
          home_feedbacks {
            avatar
            author
            subject
            content
          }
          home_logo_partners
          home_servicestt {
            id
            title
            url
            thumbnail
            view_count
            date_created {
              day
              month
              year
            }            
          }
          home_whatscr {
            id
            title
            url
            thumbnail
            view_count
            date_created {
              day
              month
              year
            }            
          }
        }`
    );
  }