<?php 
    namespace Options;
    class OPTIONS_FIELDS {
        const OPTIONS_SCHEMA_TYPE = 'OptionsSchemaType';
        const OPTIONS_HOME_PAGE_SCHEMA_TYPE = 'OptionsHomePageSchemaType';
        const OPTIONS_SOCIALS_SCHEMA_TYPE = 'OptionsSocialsSchemaType';
        const OPTIONS_PHONE_SCHEMA_TYPE = 'OptionsPhoneSchemaType';
        const OPTIONS_HOTLINE_SCHEMA_TYPE = 'OptionsHotlineSchemaType';
        //
        const OPTIONS_HOME_INTRO_SCHEMA_TYPE = 'OptionsHomeIntroSchemaType';
        const OPTIONS_HOME_INTRO_VTDL_SCHEMA_TYPE = 'OptionsHomeIntroVTDLSchemaType';
        const OPTIONS_HOME_INTRO_DIACHI_SCHEMA_TYPE = 'OptionsHomeIntroDiaChiSchemaType';
        const OPTIONS_HOME_SERVICES_NUMBER_SCHEMA_TYPE = 'OptionsHomeServicesNumberSchemaType';
        const OPTIONS_HOME_FEEDBACKS_SCHEMA_TYPE = 'OptionsHomeFeedbacksSchemaType';
        const OPTIONS_HOME_INTRO_SLIDER_SCHEMA_TYPE = 'OptionsHomeIntroSliderSchemaType';
        const OPTIONS_BANNER_SCHEMA_TYPE = 'OptionsBannerSchemaType';
        const OPTIONS_GT_SCHEMA_TYPE = 'OptionsGTSchemaType';
        const OPTIONS_GT_TIEUCHI_SCHEMA_TYPE = 'OptionsGTTieuChiSchemaType';
        const OPTIONS_GT_TAMNHIN_SCHEMA_TYPE = 'OptionsGTTamNhinSchemaType';
        //
        const OPTIONS_QAS_SCHEMA_TYPE = 'OptionsQasSchemaType';
        const OPTIONS_QAS_LIST_SCHEMA_TYPE = 'OptionsQasListSchemaType';
        //
        const OPTIONS_CONTACT_SCHEMA_TYPE = 'OptionsContactSchemaType';
        //
        const OPTIONS_CONTACT_ADDRESS_SCHEMA_TYPE = 'OptionsContactAddressSchemaType';
        //
        const OPTIONS_SERVICES_SIDEBAR_SCHEMA_TYPE = 'OptionsServicesSidebarSchemaType';
        //
        const OPTIONS_NENKIN_CALC_SIMPLE_SCHEMA_TYPE = 'OptionsNenkinCalcSchemaType';
        const OPTIONS_NENKIN_CALC_SIMPLE_GROUP_SCHEMA_TYPE = 'OptionsNenkinCalcSimpleGroupSchemaType';
        const OPTIONS_NENKIN_CALC_ADVANCED_GROUP_SCHEMA_TYPE = 'OptionsNenkinCalcAdvancedGroupSchemaType';
        const OPTIONS_NENKIN_CALC_MONTHS_WORKING_SCHEMA_TYPE = 'OptionsNenkinCalcMonthsWorkingSchemaType';
        const OPTIONS_NENKIN_CALC_SALARY_PER_MONTH_SCHEMA_TYPE = 'OptionsNenkinCalcSalaryPerMonthSchemaType';
        const OPTIONS_NENKIN_CALC_PRICE_EXTENDS_SCHEMA_TYPE = 'OptionsNenkinCalcPriceExtendsSchemaType';
        //
        const OPTIONS_NENKIN_CALC_ADVANCED_SCHEMA_TYPE = 'OptionsNenkinCalcAdvancedSchemaType';
        const OPTIONS_NENKIN_CITIES_LIVING_SCHEMA_TYPE = 'OptionsNenkinCalcCitiesLivingSchemaType';
        //
        const OPTIONS_HOANTHUE_CALC_SCHEMA_TYPE = 'OptionsHoanthueCalcSchemaType';
        const OPTIONS_HOANTHUE_GROUP_SCHEMA_TYPE = 'OptionsHoanthueGroupSchemaType';
        //
        const OPTIONS_ACCOUNT_SCHEMA_TYPE = 'OptionsAccountSchemaType';
        const OPTIONS_ACCOUNT_SLIDER_SCHEMA_TYPE = 'OptionsAccountSliderSchemaType';
        //
        const OPTIONS_USERINFO_SCHEMA_TYPE = 'OptionsUserInfoSchemaType';
        const OPTIONS_USERINFO_META_SCHEMA_TYPE = 'OptionsUserInfoMetaSchemaType';
        //
        const OPTIONS_USER_HOSO_PROGRESSING_SCHEMA_TYPE = 'OptionsUserHoSoProgressingSchemaType';
        //
        const OPTIONS_ACCOUNT_HOSO_USERS_SCHEMA_TYPE = 'OptionsAccountHoSoUsersSchemaType';
        const OPTIONS_ACCOUNT_HOSO_USERS_DATA_SCHEMA_TYPE = 'OptionsAccountHoSoUsersDataSchemaType';
        //
        const OPTIONS_ACCOUNT_HOSO_NOTIFICATIONS_SCHEMA_TYPE = 'OptionsAccountHoSoNotificationsSchemaType';
        //
        const OPTIONS_ACCOUNT_HOSO_USER_CONFIRM_STATUS_SCHEMA_TYPE = 'OptionsAccountHoSoUserConfirmStatusSchemaType';
        const OPTIONS_ACCOUNT_HOSO_SESSION_SCHEMA_TYPE = 'OptionsAccountHoSoSessionSchemaType';
        //
        const OPTIONS_ACCOUNT_HOSO_VERIFIED_SCHEMA_TYPE = 'OptionsAccountHoSoVerifiedSchemaType';
        //
        const OPTIONS_EMAIL_TEMPLATE_SCHEMA_TYPE = 'OptionsEmailTemplateSchemaType';
        //
        const LOGO_FIELD = 'logo';
        const LOGO_FOOTER_FIELD = 'logo_footer';
        const COMPANY_NAME_FIELD = 'company_name';
        const COMPANY_ADDRESS_FIELD = 'company_address';
        const COPYRIGHT_FIELD = 'copyright';
        //
        const DATA_FIELD = 'data';
        const PAGED_FIELD = 'paged';
        const NUM_PER_PAGE_FIELD = 'num_per_page';
        const TOTALS_FIELD = 'totals';
        //
        const SOCIALS_FIELD = 'socials';
        const ZALO_FIELD = 'zalo';
        const YOUTUBE_FIELD = 'youtube';
        const TIKTOK_FIELD = 'tiktok';
        const FANPAGE_FIELD = 'fanpage';
        //
        const PHONE_FIELD = 'phone';
        const PHONE_LABEL_FIELD = 'phone_label';
        const PHONE_URL_FIELD = 'phone_url';
        //
        const HOTLINE_FIELD = 'hotline';
        const HOTLINE_VIETNAM_FIELD = 'hotline_vietnam';
        const HOTLINE_NHATBAN_FIELD = 'hotline_nhatban';
        const HOTLINE_VIETNAM_LABEL_FIELD = 'hotline_vietnam_label';
        const HOTLINE_VIETNAM_URL_FIELD = 'hotline_vietnam_url';
        const HOTLINE_NHATBAN_LABEL_FIELD = 'hotline_jp_label';
        const HOTLINE_NHATBAN_URL_FIELD = 'hotline_jp_url';
        //
        const EMAIL_FIELD = 'email';
        //
        const FOOTER_THONGTIN_MENU_FIELD = 'footer_thongtin_menu_html';
        const FOOTER_DICHVU_MENU_FIELD = 'footer_dichvu_menu_html';
        //
        const TRANSLATION_STRINGS_FIELDS = 'translation_strings';
        //
        const HOME_INTRO_FIELD = 'home_intro';
        const GTHSCTY_INTRO_FIELD = 'gt_hs_cong_ty';
        const GTVTDIALY_INTRO_FIELD = 'gt_vitri_dialy';
        const GTLIENLAC_INTRO_FIELD = 'gt_lienlac';
        const GTSLIDER_INTRO_FIELD = 'gt_slider';
        const GTVTDIALY_TRUSO_FIELD = 'tru_so';
        const GTVTDIALY_DIACHI_FIELD = 'dia_chi';        
        //
        const HOME_SERVICES_FIELD = 'home_services';
        const HOME_NETKINSTT_FIELD = 'home_netkinstt';
        const HOME_FEEDBACKS_FIELD = 'home_feedbacks';
        const HOME_LOGO_PARTNERS = 'home_logo_partners';
        const HOME_SERVICESTT_FIELD = 'home_servicestt';
        const HOME_WHAT_SCR_FIELD = 'home_whatscr';
        //
        const AVATAR_FIELD = 'avatar';
        const AUTHOR_FIELD = 'author';
        const SUBJECT_FIELD = 'subject';
        const CONTENT_FIELD = 'content';
        const IMAGE_FIELD = 'image';
        const GALLERY_FIELD = 'gallery';
        const URL_FIELD = 'url';
        const ICON_FIELD = 'icon';
        const HEADING_FIELD = 'heading';
        const NAME_FIELD = 'name';
        const LABEL_FIELD = 'label';
        const ID_FIELD = 'id';
        const RATE_PAYMENT_FIELD = 'rate_payment';
        const BACKGROUND_FIELD = 'background';
        const SERVICES_NUMBER_FIELD = 'gt_dichvu_number';
        const START_VALUE_FIELD = 'start_value';
        const END_VALUE_FIELD = 'end_value';
        const RATE_DEFAULT_FIELD = 'rate_default';
        const RATE_PERCENTAGE_NENKIN_L1_FIELD = 'rate_percentage_nenkin_L1';
        const RATE_PRICE_DEFAULT_FIELD = 'rate_price_default';
        const RATE_PRICE_D1_FIELD = 'rate_price_default_1';
        const RATE_PRICE_D2_FIELD = 'rate_price_default_2';
        const RATE_PRICE_D3_FIELD = 'rate_price_default_3';
        const RATE_PRICE_D4_FIELD = 'rate_price_default_4';
        const RATE_PRICE_D5_FIELD = 'rate_price_default_5';
        const RATE_PRICE_D6_FIELD = 'rate_price_default_6';
        const RATE_PRICE_D7_FIELD = 'rate_price_default_7';        
        const RATE_PRICE_D8_FIELD = 'rate_price_default_8';        
        const RATE_PERCENT_DEFAULT_FIELD = 'rate_percentage_default';
        const RATE_COMPARE_DEFAULT_FIELD = 'price_compare_default';
        const PRICETT_DEAULT_FIELD = 'price_tt_default';
        const PRICE_FIELD = 'price';
        const PRICE_EXTENDS_FIELD = 'price_extends';
        const CITIES_LIVING_FIELD = 'cities_living';
        const MINSAL_FIELD = 'min_sal';
        const BUTTON_TEXT_FIELD = 'button_text';
        const BUTTON_URL_FIELD = 'button_url';
        //
        const BANNER_BACKGROUND_FIELD = 'banner_background';
        //
        const TAM_NHIN_FIELD = 'tam_nhin';
        const TIEU_CHI_FIELD = 'tieu_chi';
        //
        const QA_LISTS_FIELD = 'qa_lists';
        //
        const LH_BANNER_FIELD = 'lh_banner';
        const LH_THONGDIEPSTICKY_FIELD = 'lh_thongdiepsticky';
        const LH_GMAP_FIELD = 'lh_gmap';
        const LH_NOTICES_FIELD = 'lh_notices';
        const LH_FORM_FIELD = 'lh_form';
        const LH_ADDRESS_FIELD = 'lh_address';
        //
        const NENKIN_CALC_SIMPLE_FIELD = 'nenkin_simple_calc';
        const NENKIN_CALC_ADV_FIELD = 'nenkins_advanced_calc';
        const MONTHS_WORKING_FIELD = 'months_working';
        const SALARY_PER_MONTH_FIELD = 'salary_per_month';
        const NENKIN_NOTE_FIELD = 'nenkin_luuy_html';
        const RATE_YEN_TO_VND_FIELD = 'rate_yen_to_vnd';
        const CURRENCY_ACTIVE_FIELD = 'currency_active';
        //
        const HOANTHUE_GROUP_FIELD = 'hoanthue_calc';
        const HOANTHUE_NOTE_HTML_FIELD = 'hoanthue_luuy_html';
        //
        const ACCOUNT_SLIDER_FIELD = 'slider_account';
        const NOTE_REGISTER_HTML_FIELD = 'note_register_html';
        const USER_INFO_FIELD = 'user_info';
        //
        const USER_ID_FIELD = 'id';
        const USER_FULLNAME_FIELD = 'fullname';
        const USER_AVATAR_FIELD = 'avatar';
        const USER_FACEBOOKINFO_FIELD = 'facebook_metainfo';
        const USER_ADDRESS_FIELD = 'address';
        const USER_PHONE_FIELD = 'phone';
        const USER_EMAIL_FIELD = 'email';
        const USER_DATE_CREATED_FIELD = 'date_created';
        const FULLNAMEJP_FIELD = 'fullnamejapan';
        const NAMEUNSIGNED_FIELD = 'nameunsigned';
        const BIRTHDAY_FIELD = 'birthday';
        const NENKINCODE_FIELD = 'nenkincode';
        const COMPANYINFO_FIELD = 'companyinfo';
        const BANKNAME_VIETNAM_FIELD = 'banknamevietnam';
        const BANKNAME_BRANCHVIETNAM_FIELD = 'banknamebranchvietnam';
        const ADDRESS_BANKNAME_BRANCHVIETNAM_FIELD = 'addressbanknamebranchvietnam';
        const NOBANK_FIELD = 'nobank';
        const NAMELASTADDRESS_FIELD = 'namelastaddress';
        const NOZIP_FIELD = 'nozip';
        const AVATAR_USER_FIELD = 'avatar_user';
        const ROLE_IS_ADMIN_FIELD = 'is_admin_role';
        const USER_NAME_FIELD = 'username';
        const HOSO_VERIFIED_FIELD = 'hoso_verified';     
        const HOSO_NOTIFICATIONS_FIELD = 'hoso_notifications';   
        const HOSO_EXPIRED_DAYS_FIELD = 'expired_days';        
        const HOSO_DENY_MESSAGE_FIELD = 'hoso_deny_message';  
        //
        const HOSO_NENKIN_ANHTHENGOAIKIEU_FIELD = 'nenskin_frontcard';
        const HOSO_NENKIN_ANHNENKIN_FIELD = 'nenkins_image';
        const HOSO_NENKIN_ANHHOCHIEU_FIELD = 'nenkins_passport';
        const HOSO_NENKIN_ANHNGANHANG_FIELD = 'nenkins_bank_images';
        //
        const HOSO_HOANTHUE_GENSEN_FIELD = 'hoanthue_gensen';
        const HOSO_HOANTHUE_GIAYCHUYENTIEN_FIELD = 'hoanthue_transfer_images';
        const HOSO_HOANTHUE_GIAYTOCMQUANHE_FIELD = 'hoanthue_giaytoquanhe_images';
        const HOSO_HOANTHUE_HOCHIEU_FIELD = 'hoanthue_passport';
        const HOSO_HOANTHUE_MYNUMBER_FIELD = 'hoanthue_mynumber_images';
        const HOSO_HOANTHUE_SOTTTAIKHOAN_FIELD = 'hoanthue_sotttaikhoan_images';
        const HOSO_HOANTHUE_NGOAIKIEU_FIELD = 'hoanthue_ngoaikieu_images';
        //
        const HOSO_NENKIN_ANHTHENGOAIKIEU_MUTATION_RETURN_FIELD = 'hosoNenkinAnhNgoaiKieu';
        const HOSO_NENKIN_ANHNENKIN_MUTATION_RETURN_FIELD = 'hosoNenkinAnhNenkin';
        const HOSO_NENKIN_ANHHOCHIEU_MUTATION_RETURN_FIELD = 'hosoNenkinAnhHoChieu';
        const HOSO_NENKIN_ANHNGANHANG_MUTATION_RETURN_FIELD = 'hosoNenkinAnhXacNhanNganHang';
        //
        const HOSO_HOANTHUE_GENSEN_MUTATION_RETURN_FIELD = 'hosoHoanThueAnhGenSen';
        const HOSO_HOANTHUE_GIAYCHUYENTIEN_MUTATION_RETURN_FIELD = 'hosoHoanThueGiayChuyenTien';
        const HOSO_HOANTHUE_GIAYTOCMQUANHE_MUTATION_RETURN_FIELD = 'hosoHoanThueGiayPhungDuong';
        const HOSO_HOANTHUE_HOCHIEU_MUTATION_RETURN_FIELD = 'hosoHoanThueAnhHoChieu';
        const HOSO_HOANTHUE_MYNUMBER_MUTATION_RETURN_FIELD = 'hosoHoanThueMyNumber';
        const HOSO_HOANTHUE_SOTTTAIKHOAN_MUTATION_RETURN_FIELD = 'hosoHoanThueSoTTTaiKhoan';
        const HOSO_HOANTHUE_NGOAIKIEU_MUTATION_RETURN_FIELD = 'hosoHoanThueAnhNgoaiKieu';
        //
        const HOSO_CURRENT_STEP_FIELD = 'hoso_current_step';
        const HOSO_UPDATED_FIELD = 'hoso_updated';
        const HOSO_CONFIRM_NENKIN_FIELD = 'hoso_confirm_nenkin';
        const HOSO_SESSION_FIELD = 'hoso_session';
        //
        const HOSO_NENKIN_TIENDO_FIELD = 'nenkins_hoanthanh';
        const HOSO_HOANTHUE_TIENDO_FIELD = 'hoanthue_hoanthanh';
        //
        const HOSO_CONFIRM_NENKIN_KEY = '_confirm_nenkin';
        const HOSO_STEP_KEY = '_hoso_step';
        const HOSO_UPDATED_KEY = '__updated_hs';
        const HOSO_VERIFIED_KEY = '_hoso_verified';
        const HOSO_VERIFIED_MODE_KEY = '_hoso_verified_mode';
        const HOSO_ENDING_REPORTER_FLAG_KEY = '_hoso_ending_reporter_flag';
        const HOSO_NOTIFICATIONS_KEY = 'hoso_notifications';
        const HOSO_DENY_MSG_KEY = 'hoso_deny_msg';
        const HOSO_REFUND_NENKIN_NO3_KEY = 'refund_nenkin_no3';
        //
        const HOSO_NO_FIELD = 'no';
        const HOSO_STATUS_FIELD = 'status';
        const HOSO_CONFIRMED_LINK_FIELD = 'url_confirmed';
        //
        const HOSO_SESSION_STARTED = 'session_started';
        const HOSO_SESSION_EXPIRED = 'session_expired';
        const HOSO_SESSION_STATUS = 'session_status';
        const HOSO_SESSION_IS_EXPIRED = 'expired';
        //
        const HOSO_VERIFIED_FLAG = 'verified';
        const HOSO_VERIFIED_TRYAGAIN_FLAG = 'verified_try_again';
        //
        const HOSO_VERIFIED_FLAG_FIELD = 'hoso_verified_flag';
        //
        const HOSO_REFUND_NENKIN_NO3_FIELD = 'refund_nenkin_no3';
    }   