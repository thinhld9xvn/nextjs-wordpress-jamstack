const LANGUAGES = {
  vi : 'vi',
  ja : 'ja'
};
const LANGUAGES_LABEL = {
  vi : 'VIE',
  ja : 'JPN'
};
const NAVMENUS = {
  vi : 'PRIMARY',
  ja : 'PRIMARY___JA'
};
const PAGES = {
  ABOUT_US : {
    vi : process.env.ABOUT_US_VI,
    ja : process.env.ABOUT_US_JA,
  },
  QA : {
    vi : process.env.QA_VI,
    ja : process.env.QA_JA,
  },
  CONTACT : {
    vi : process.env.CONTACT_VI,
    ja : process.env.CONTACT_JA,
  },
  SERVICES : {
    vi : process.env.SERVICES_VI,
    ja : process.env.SERVICES_JA,
  },
  HDXH : {
    vi : process.env.HDXH_VI,
    ja : process.env.HDXH_JA,
  },
  NENKINS_TERM : {
    vi : process.env.NENKIN_TERM_VI,
    ja : process.env.NENKIN_TERM_JA,
  },
  TINH_TIEN : {
    vi : process.env.TINH_TIEN_NENKINS_THUE_VI,
    ja : process.env.TINH_TIEN_NENKINS_THUE_JA,
  },
  TINH_TIEN_NENKINS : {
    vi : process.env.TINH_TIEN_NENKINS_VI,
    ja : process.env.TINH_TIEN_NENKINS_JA,
  },
  TINH_TIEN_NENKINS_URL : {
    vi : `${process.env.TINH_TIEN_NENKINS_THUE_VI}/${process.env.TINH_TIEN_NENKINS_VI}`,
    ja : `${process.env.TINH_TIEN_NENKINS_THUE_JA}/${process.env.TINH_TIEN_NENKINS_JA}`,
  },
  TINH_TIEN_HOANTHUE : {
    vi : process.env.TINH_TIEN_HOANTHUE_VI,
    ja : process.env.TINH_TIEN_HOANTHUE_JA,
  },
  TINH_TIEN_HOANTHUE_URL : {
    vi : `${process.env.TINH_TIEN_NENKINS_THUE_VI}/${process.env.TINH_TIEN_HOANTHUE_VI}`,
    ja : `${process.env.TINH_TIEN_NENKINS_THUE_JA}/${process.env.TINH_TIEN_HOANTHUE_JA}`,
  },
  BANG_GIA_NENKINS : {
    vi : `${process.env.BANG_GIA_VI}/${process.env.NENKINS_VI}`,
    ja : `${process.env.BANG_GIA_JA}/${process.env.NENKINS_JA}`,
  },
  BANG_GIA_HOANTHUE : {
    vi : `${process.env.BANG_GIA_VI}/${process.env.HOANTHUE_VI}`,
    ja : `${process.env.BANG_GIA_JA}/${process.env.HOANTHUE_JA}`,
  },
  BANG_GIA_BIENPHIENDICH : {
    vi : `${process.env.BANG_GIA_VI}/${process.env.BIENPHIENDICH_VI}`,
    ja : `${process.env.BANG_GIA_JA}/${process.env.BIENPHIENDICH_JA}`,
  },
  BANG_GIA_VISATUCACHLUUTRU : {
    vi : `${process.env.BANG_GIA_VI}/${process.env.VISATUCACHLUUTRU_VI}`,
    ja : `${process.env.BANG_GIA_JA}/${process.env.VISATUCACHLUUTRU_JA}`,
  },
  NEWS: {
    vi : process.env.TINTUC_VI,
    ja : process.env.TINTUC_JA
  },
  VHDS: {
    vi : process.env.VAN_HOA_DOI_SONG_VI,
    ja : process.env.VAN_HOA_DOI_SONG_JA
  },
  VHDS_URL: {
    vi : `${process.env.NEWS_TAX_REWRITE}/${process.env.VAN_HOA_DOI_SONG_VI}`,
    ja : `${process.env.NEWS_TAX_REWRITE}/${process.env.VAN_HOA_DOI_SONG_JA}`
  },
  DANG_NHAP: {
    vi : process.env.DANG_NHAP_VI,
    ja : process.env.DANG_NHAP_JA,
  },
  DANG_KY: {
    vi : process.env.DANG_KY_VI,
    ja : process.env.DANG_KY_JA,
  },
  ACCOUNT: {
    vi : process.env.ACCOUNT_VI,
    ja : process.env.ACCOUNT_JA,
  },
  THONG_TIN_TAI_KHOAN: {
    vi : process.env.ACCOUNT_THONGTINTAIKHOAN_VI,
    ja : process.env.ACCOUNT_THONGTINTAIKHOAN_JA,
  },
  THONG_TIN_TAI_KHOAN_URL: {
    vi : `${process.env.ACCOUNT_VI}/${process.env.ACCOUNT_THONGTINTAIKHOAN_VI}`,
    ja : `${process.env.ACCOUNT_JA}/${process.env.ACCOUNT_THONGTINTAIKHOAN_JA}`,
  },
  CAP_NHAT_HS_NENKIN: {
    vi : process.env.ACCOUNT_CAPNHATHSNENKIN_VI,
    ja : process.env.ACCOUNT_CAPNHATHSNENKIN_JA,
  },
  CAP_NHAT_HS_NENKIN_URL: {
    vi : `${process.env.ACCOUNT_VI}/${process.env.ACCOUNT_CAPNHATHSNENKIN_VI}`,
    ja : `${process.env.ACCOUNT_JA}/${process.env.ACCOUNT_CAPNHATHSNENKIN_JA}`,
  },
  CAP_NHAT_HS_HOANTHUE: {
    vi : process.env.ACCOUNT_CAPNHATHSHOANTHUE_VI,
    ja : process.env.ACCOUNT_CAPNHATHSHOANTHUE_JA,
  },
  CAP_NHAT_HS_HOANTHUE_URL: {
    vi : `${process.env.ACCOUNT_VI}/${process.env.ACCOUNT_CAPNHATHSHOANTHUE_VI}`,
    ja : `${process.env.ACCOUNT_JA}/${process.env.ACCOUNT_CAPNHATHSHOANTHUE_JA}`,
  },
  KIEM_TRA_TIENDOHS: {
    vi : process.env.ACCOUNT_KIEMTRATIENDO_VI,
    ja : process.env.ACCOUNT_KIEMTRATIENDO_JA,
  },
  KIEM_TRA_TIENDOHS_URL: {
    vi : `${process.env.ACCOUNT_VI}/${process.env.ACCOUNT_KIEMTRATIENDO_VI}`,
    ja : `${process.env.ACCOUNT_JA}/${process.env.ACCOUNT_KIEMTRATIENDO_JA}`,
  },
  XU_LY_HS: {
    vi : process.env.ACCOUNT_XULYHS_VI,
    ja : process.env.ACCOUNT_XULYHS_JA
  },
  XU_LY_HS_URL: {
    vi : `${process.env.ACCOUNT_VI}/${process.env.ACCOUNT_XULYHS_VI}`,
    ja : `${process.env.ACCOUNT_JA}/${process.env.ACCOUNT_XULYHS_JA}`,
  },
  DOI_MATKHAU: {
    vi : process.env.ACCOUNT_DOIMATKHAU_VI,
    ja : process.env.ACCOUNT_DOIMATKHAU_JA,
  },
  DOI_MATKHAU_URL: {
    vi : `${process.env.ACCOUNT_VI}/${process.env.ACCOUNT_DOIMATKHAU_VI}`,
    ja : `${process.env.ACCOUNT_JA}/${process.env.ACCOUNT_DOIMATKHAU_JA}`,
  },
  QUEN_MAT_KHAU: {
    vi : process.env.QUEN_MAT_KHAU_VI,
    ja : process.env.QUEN_MAT_KHAU_JA,
  },
  RESET_MAT_KHAU: {
    vi : process.env.RESET_MAT_KHAU_VI,
    ja : process.env.RESET_MAT_KHAU_JA,
  },
  XAC_NHAN_NENKINS_L2: {
    vi : process.env.CONFIRM_NENKINS_NO2_VI,
    ja : process.env.CONFIRM_NENKINS_NO2_JA,
  },
  SEARCH: {
    vi : process.env.SEARCH_VI,
    ja : process.env.SEARCH_JA,
  }
}
const SLUG_TYPE = {
  CATEGORY : 'category',
  PAGE : 'page',
  POST : 'post'
}
const HOANTHUE_OPTIONS = {
  TREN_70_TUOI_VALUE: process.env.TREN_70_TUOI_VALUE,
  DUOI_70_TUOI_VALUE: process.env.DUOI_70_TUOI_VALUE,
  TU_19_DEN_23_TUOI_VALUE: process.env.TU_19_DEN_23_TUOI_VALUE,
  NGOAI_19_DEN_23_TUOI_VALUE: process.env.NGOAI_19_DEN_23_TUOI_VALUE,
  TU_VA_NGOAI_19_DEN_23_TUOI_VALUE: process.env.TU_VA_NGOAI_19_DEN_23_TUOI_VALUE,
  YES_VALUE: process.env.YES_VALUE,
  NO_VALUE: process.env.NO_VALUE,
  HT_MIENTHUE_DEF1 : parseInt(process.env.HT_MIENTHUE_DEF1),
  HT_MIENTHUE_DEF2 : parseInt(process.env.HT_MIENTHUE_DEF2),
  HT_MIENTHUE_DEF3 : parseInt(process.env.HT_MIENTHUE_DEF3),
  HT_MIENTHUE_DEF4 : parseInt(process.env.HT_MIENTHUE_DEF4),
  HT_MIENTHUE_DEF5 : parseInt(process.env.HT_MIENTHUE_DEF5),
  HT_MIENTHUE_DEF6 : parseInt(process.env.HT_MIENTHUE_DEF6),
  HT_MIENTHUE_DEF7 : parseInt(process.env.HT_MIENTHUE_DEF7),
  HT_MIENTHUE_DEF8 : parseInt(process.env.HT_MIENTHUE_DEF8)
}
const SIDEBAR_ACCOUNT_IDS = {
  THONG_TIN_TAI_KHOAN : "thong-tin-tai-khoan",
  THONG_TIN_HO_SO : "thong-tin-ho-so",
  CAP_NHAT_HS : "cap-nhat-ho-so",
  CAP_NHAT_HS_NENKIN : "cap-nhat-ho-so-nenkin",
  CAP_NHAT_HS_HOANTHUE : "cap-nhat-ho-so-hoanthue",
  THONG_TIN_HS_NENKIN : "thong-tin-ho-so-nenkin",
  THONG_TIN_HS_HOANTHUE : "thong-tin-ho-so-hoanthue",
  XU_LY_HS : "xu-ly-ho-so",
  XET_DUYET_TIEN_DO : "xet-duyet-tien-do",
  KIEM_TRA_TIENDOHS : "kiem-tra-tien-do",
  DOI_MATKHAU : "doi-mat-khau",
  THONG_BAO : "thong-bao",
  LOGOUT : "logout"
};
const SIDEBAR_ACCOUNTS_DATA = [
  {
    id : SIDEBAR_ACCOUNT_IDS.THONG_TIN_TAI_KHOAN,
    slug : PAGES.THONG_TIN_TAI_KHOAN,
    url : PAGES.THONG_TIN_TAI_KHOAN_URL,
    translation_key : 'thongtincanhan_label',
    text : ""
  },
  {
    id : SIDEBAR_ACCOUNT_IDS.CAP_NHAT_HS,    
    text : "",
    url : null,    
    translation_key : 'capnhathoso_label',
    childrens : [
      {
        id : SIDEBAR_ACCOUNT_IDS.CAP_NHAT_HS_NENKIN,
        slug : PAGES.CAP_NHAT_HS_NENKIN,
        url : PAGES.CAP_NHAT_HS_NENKIN_URL,
        translation_key : 'nenkin_label',
        text : ""
      },
      {
        id : SIDEBAR_ACCOUNT_IDS.CAP_NHAT_HS_HOANTHUE,
        slug : PAGES.CAP_NHAT_HS_HOANTHUE,
        url : PAGES.CAP_NHAT_HS_HOANTHUE_URL,
        translation_key : 'hoanthue_label',
        text : ""
      }
    ]
  },
  {
    id : SIDEBAR_ACCOUNT_IDS.KIEM_TRA_TIENDOHS,
    slug : PAGES.KIEM_TRA_TIENDOHS,
    url : PAGES.KIEM_TRA_TIENDOHS_URL,
    translation_key : 'kiemtratiendo_label',
    text : ""
  },
  {
    id : SIDEBAR_ACCOUNT_IDS.DOI_MATKHAU,
    slug : PAGES.DOI_MATKHAU,
    url : PAGES.DOI_MATKHAU_URL,
    translation_key : 'doimatkhau_label',
    text : ""
  },
  {
    id : SIDEBAR_ACCOUNT_IDS.LOGOUT,
    slug : null,
    url : "#",
    translation_key : 'logout_label',
    text : ""
  }
];
const SIDEBAR_ADMIN_DATA = [
  {
    id : SIDEBAR_ACCOUNT_IDS.XU_LY_HS,
    slug : PAGES.XU_LY_HS,
    url : PAGES.XU_LY_HS_URL,
    translation_key : 'xulyhoso_label',
    text : ""
  },
];
const SIDEBAR_ACCOUNTS_MODAL_DATA = [
  {
    id : SIDEBAR_ACCOUNT_IDS.THONG_TIN_TAI_KHOAN,
    translation_key : 'thongtincanhan_label'
  },
  {
    id : SIDEBAR_ACCOUNT_IDS.THONG_TIN_HO_SO,    
    translation_key : 'thongtinhoso_label',
    childrens : [
      {
        id : SIDEBAR_ACCOUNT_IDS.THONG_TIN_HS_NENKIN,
        translation_key : 'nenkin_label'
      },
      {
        id : SIDEBAR_ACCOUNT_IDS.THONG_TIN_HS_HOANTHUE,
        translation_key : 'hoanthue_label'
      }
    ]
  },
  {
    id : SIDEBAR_ACCOUNT_IDS.XET_DUYET_TIEN_DO,
    translation_key : 'xetduyettiendo_label'
  }
];
const DEFAULT_UPLOAD_VALUE = {
  id : 0,
  identify : '',
  file : null,
  src : null,
  getted : false,
  uploading : false,
  percentage : 0,
  size : {
    capacity: 0,
    unit : ''
  }
}
const UPLOADS_IDENTITY = {
  REPLACEMENTS : 'replacements',
  NGOAI_KIEU : 'ngoaikieu',
  NENKIN : 'nenkin',
  HO_CHIEU : 'hochieu',
  GIAY_NGAN_HANG : 'giaynganhang',
  GENSEN : 'gensen',
  GIAY_CHUYEN_TIEN : 'giaychuyentien',
  GIAY_CHUNG_MINH_PHUNG_DUONG : 'giaychungminhphungduong',
  MY_NUMBER : 'mynumber',
  SO_NGAN_HANG_TTTT : 'songanhangtttt'
}
const UPLOADS_GQL_GALLERIES = {
  NENKINS : {
    FRONTCARD : "nenskin_frontcard",
    IMAGE : "nenkins_image",
    PASSPORT : "nenkins_passport",
    BANK : "nenkins_bank_images"
  },
  HOANTHUE: {
    FRONTCARD : "hoanthue_ngoaikieu_images",
    GENSEN: "hoanthue_gensen",
    TRANSFER: "hoanthue_transfer_images",
    RELATIONSHIP : "hoanthue_giaytoquanhe_images",
    PASSPORT : "hoanthue_passport",
    MYNUMBERS : "hoanthue_mynumber_images",
    BANK : "hoanthue_sotttaikhoan_images"
  }
}
const PROGRESSING_LABELS = [
  "dangtrongqtcapnhaths_label",
  "hoantaths_label",
  "daktgiaytocannop_label",
  "hoantatviecguitoicucnenkin_label",
  "thongbaoveqdhtdaden_label",
  "thongbaocoqdnhantiennenkinl1_label",
  "xacnhandanhanduoctiennenkinl1_label",
  "thongbaocokqnenkinl2_label",
  "xacnhandanhanduoctiennenkinl2_label",
  "dalamthutucxinhoantralaitienthuenenkinl3_label",
  "xacnhandanhanduoctiennenkinl3_label",
  "thongbaochuyenkhoandaden_label",
  "daxacnhanviecckxong_label",
  "kthopdongsau30ngay_label"
];
const PROGRESSING_STEP_IDS = {
  DANG_CAP_NHAT_HS : {
    label : PROGRESSING_LABELS[0],
    value : 1
  },
  HOAN_TAT_HS : {
    label : PROGRESSING_LABELS[1],
    value : 2
  },
  DA_KT_GIAYTO : {
    label : PROGRESSING_LABELS[2],
    value : 3
  },
  HOAN_TAT_GUI_TOI_CUC_NENKIN : {
    label : PROGRESSING_LABELS[3],
    value : 4
  },
  THONG_BAO_VE_QD_HOANTHUE : {
    label : PROGRESSING_LABELS[4],
    value : 5
  },
  THONG_BAO_CO_KQ_NENKIN_L1 : {
    label : PROGRESSING_LABELS[5],
    value : 6
  },
  XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L1 : {
    label : PROGRESSING_LABELS[6],
    value : 7
  },
  THONG_BAO_CO_KQ_NENKIN_L2 : {
    label : PROGRESSING_LABELS[7],
    value : 8
  },
  XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L2 : {
    label : PROGRESSING_LABELS[8],
    value : 9
  },
  DA_LAM_THU_THUC_XIN_HOAN_TRA_TIEN_L3 : {
    label : PROGRESSING_LABELS[9],
    value : 10
  },
  XAC_NHAN_DA_NHAN_DUOC_TIEN_NENKIN_L3 : {
    label : PROGRESSING_LABELS[10],
    value : 11
  },
  THONG_BAO_CHUYEN_KHOAN_DA_DEN : {
    label : PROGRESSING_LABELS[11],
    value : 12
  },
  DA_XAC_NHAN_VIEC_CHUYEN_KHOAN_XONG : {
    label : PROGRESSING_LABELS[12],
    value : 13
  }, 
  KET_THUC_HOP_DONG: {
    label : PROGRESSING_LABELS[13],
    value : 14
  }
}
const VERIFIED_FLAGS = {
  VERIFIED : 'verified',
  VERIFIED_TRY_AGAIN : 'verified_try_again'
}
const HOSO_FILTER_ITEMS = {
  CHUA_XAC_THUC_HS : {
    id : "chua_xac_thuc_hs",
    value : 1,
    label : "chuaxacthuchoso_label", 
    metadata : [
      {
        key : process.env.VERIFIED_KEY,
        value : "",
        compare : "NOT EXISTS",
      },
      {
        key : process.env.VERIFIED_KEY,
        value : "0",
        compare : "=",
      }
    ]
  },
  DA_XAC_THUC_HS : {
    id : "da_xac_thuc_hs",
    value : 2,
    label : "daxacthuchoso_label",
    metadata : [{
      key : process.env.VERIFIED_KEY,
      value : "1",
      compare : "=",
    }]
  },
  DA_XAC_NHAN_TIEN_L1 : {
    id : "da_xac_nhan_tien_l1",
    value : 3,
    label : "daxacnhantiennenkinl1_label",
    metadata : [{
      key : process.env.CONFIRMED_NENKIN_KEY,
      value : `s:2:"no";i:1;s:6:"status";s:7:"success"`,
      compare : "LIKE",
    }]
  },
  DA_XAC_NHAN_TIEN_L2 : {
    id : "da_xac_nhan_tien_l2",
    value : 4,
    label : "daxacnhantiennenkinl2_label",
    metadata : [{
      key : process.env.CONFIRMED_NENKIN_KEY,
      value : `s:2:"no";i:2;s:6:"status";s:7:"success"`,
      compare : "LIKE",
    }]
  },
  DA_XAC_NHAN_TIEN_L3 : {
    id : "da_xac_nhan_tien_l3",
    value : 5,
    label : "daxacnhantiennenkinl3_label",
    metadata : [{
      key : process.env.CONFIRMED_NENKIN_KEY,
      value : `s:2:"no";i:3;s:6:"status";s:7:"success"`,
      compare : "LIKE",
    }]
  },
  DANG_CHO_XAC_NHAN_TIEN_L1 : {
    id : "dang_cho_xac_nhan_tien_l1",
    value : 6,
    label : "dangchoxacnhantiennenkinl1_label",
    metadata : [{
      key : process.env.CONFIRMED_NENKIN_KEY,
      value : `s:2:"no";i:1;s:6:"status";s:7:"waiting"`,
      compare : "LIKE",
    }]
  },
  DANG_CHO_XAC_NHAN_TIEN_L2 : {
    id : "dang_cho_xac_nhan_tien_l2",
    value : 7,
    label : "dangchoxacnhantiennenkinl2_label",
    metadata : [{
      key : process.env.CONFIRMED_NENKIN_KEY,
      value : `s:2:"no";i:2;s:6:"status";s:7:"waiting"`,
      compare : "LIKE",
    }]
  },
  DANG_CHO_XAC_NHAN_TIEN_L3 : {
    id : "dang_cho_xac_nhan_tien_l3",
    value : 8,
    label : "dangchoxacnhantiennenkinl3_label",
    metadata : [{
      key : process.env.CONFIRMED_NENKIN_KEY,
      value : `s:2:"no";i:3;s:6:"status";s:7:"waiting"`,
      compare : "LIKE",
    }]
  },
  CHUA_XAC_NHAN_TIEN_L1 : {
    id : "chua_xac_nhan_tien_l1",
    value : 9,
    label : "chuaxacnhantiennenkinl1_label",
    metadata : [{
      key : process.env.CONFIRMED_NENKIN_KEY,
      value : "",
      compare : "NOT EXISTS",
    }]
  },
  CHUA_XAC_NHAN_TIEN_L2 : {
    id : "chua_xac_nhan_tien_l2",
    value : 10,
    label : "chuaxacnhantiennenkinl2_label",
    metadata : [{
      key : process.env.CONFIRMED_NENKIN_KEY,
      value : "",
      compare : "NOT EXISTS",
    }]
  },
  CHUA_XAC_NHAN_TIEN_L3 : {
    id : "chua_xac_nhan_tien_l3",
    value : 11,
    label : "chuaxacnhantiennenkinl3_label",
    metadata : [{
      key : process.env.CONFIRMED_NENKIN_KEY,
      value : "",
      compare : "NOT EXISTS",
    }]
  },
  CHUA_KTHD : {
    id : "chua_kthd",
    value : 12,
    label : "chuaketthuchopdong_label",
    metadata : [
      {
        key : process.env.ENDING_REPORTER_FLAG_KEY,
        value : "",
        compare : "NOT EXISTS",
      }
    ]
  },
  DA_KTHD : {
    id : "da_kthd",
    value : 13,
    label : "daketthuchopdong_label",
    metadata : [{
      key : process.env.ENDING_REPORTER_FLAG_KEY,
        value : `s:14:"session_status";s:7:"waiting"`,
        compare : "LIKE",
    }]
  }
}
const MAX_N_LENGTH = 15;
const MAX_M_LENGTH = 3;
const DEFAULT_USER_AVATAR = '/static/images/default-user.png';
const ONE_DAY_MILISECONDS = 1000 * 60 * 60 * 24;
//
module.exports.LANGUAGES = LANGUAGES;
module.exports.LANGUAGES_LABEL = LANGUAGES_LABEL;
module.exports.NAVMENUS = NAVMENUS;
module.exports.PAGES = PAGES;
module.exports.SLUG_TYPE = SLUG_TYPE;
module.exports.HOANTHUE_OPTIONS = HOANTHUE_OPTIONS;
module.exports.SIDEBAR_ACCOUNTS_DATA = SIDEBAR_ACCOUNTS_DATA;
module.exports.DEFAULT_UPLOAD_VALUE = DEFAULT_UPLOAD_VALUE;
module.exports.UPLOADS_IDENTITY = UPLOADS_IDENTITY;
module.exports.MAX_N_LENGTH = MAX_N_LENGTH;
module.exports.MAX_M_LENGTH = MAX_M_LENGTH;
module.exports.SIDEBAR_ACCOUNT_IDS = SIDEBAR_ACCOUNT_IDS;
module.exports.SIDEBAR_ADMIN_DATA = SIDEBAR_ADMIN_DATA;
module.exports.SIDEBAR_ACCOUNTS_MODAL_DATA = SIDEBAR_ACCOUNTS_MODAL_DATA;
module.exports.DEFAULT_USER_AVATAR = DEFAULT_USER_AVATAR;
module.exports.UPLOADS_GQL_GALLERIES = UPLOADS_GQL_GALLERIES;
module.exports.PROGRESSING_LABELS = PROGRESSING_LABELS;
module.exports.PROGRESSING_STEP_IDS = PROGRESSING_STEP_IDS;
module.exports.ONE_DAY_MILISECONDS = ONE_DAY_MILISECONDS;
module.exports.VERIFIED_FLAGS = VERIFIED_FLAGS;
module.exports.HOSO_FILTER_ITEMS = HOSO_FILTER_ITEMS;