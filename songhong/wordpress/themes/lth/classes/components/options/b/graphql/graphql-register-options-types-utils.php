<?php 
    namespace WP_GraphQL;
    use \Options\OPTIONS_FIELDS;
use Posts\POST_FIELDS;
use Taxonomies\TAXONOMIES_FIELDS;

    class GraphQLRegisterOptionsTypesUtils {
        public static function register() {
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_SOCIALS_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_SOCIALS_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::ZALO_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::ZALO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::YOUTUBE_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::YOUTUBE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::TIKTOK_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::TIKTOK_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::FANPAGE_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::FANPAGE_FIELD, 'gco' ),
              ],
            ]
          ]);
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_PHONE_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_PHONE_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::PHONE_LABEL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::PHONE_LABEL_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::PHONE_URL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::PHONE_URL_FIELD, 'gco' ),
              ],
            ]
          ]);
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOTLINE_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOTLINE_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::HOTLINE_VIETNAM_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_PHONE_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::HOTLINE_VIETNAM_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOTLINE_NHATBAN_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_PHONE_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::HOTLINE_NHATBAN_FIELD, 'gco' ),
              ]
            ]
          ]);
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::LOGO_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LOGO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::LOGO_FOOTER_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LOGO_FOOTER_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::COMPANY_NAME_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::COMPANY_NAME_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::COMPANY_ADDRESS_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::COMPANY_ADDRESS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::COPYRIGHT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::COPYRIGHT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::SOCIALS_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_SOCIALS_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::SOCIALS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::PHONE_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_PHONE_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::PHONE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOTLINE_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_HOTLINE_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::HOTLINE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::EMAIL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::EMAIL_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::FOOTER_THONGTIN_MENU_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::FOOTER_THONGTIN_MENU_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::FOOTER_DICHVU_MENU_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::FOOTER_DICHVU_MENU_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::TRANSLATION_STRINGS_FIELDS => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::TRANSLATION_STRINGS_FIELDS, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOME_INTRO_SLIDER_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOME_INTRO_SLIDER_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::IMAGE_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::IMAGE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::GALLERY_FIELD => [
                'type' => ['list_of' => 'String'],
                'description' => __( OPTIONS_FIELDS::GALLERY_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::URL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::URL_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOME_FEEDBACKS_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOME_FEEDBACKS_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::AVATAR_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::AVATAR_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::AUTHOR_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::AUTHOR_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::SUBJECT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::SUBJECT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOME_SERVICES_NUMBER_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOME_SERVICES_NUMBER_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::SERVICES_NUMBER_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::SERVICES_NUMBER_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOME_INTRO_DIACHI_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOME_INTRO_DIACHI_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOME_INTRO_VTDL_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOME_INTRO_VTDL_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::GTVTDIALY_TRUSO_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::GTVTDIALY_TRUSO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::GTVTDIALY_DIACHI_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_HOME_INTRO_DIACHI_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::GTVTDIALY_DIACHI_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOME_INTRO_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOME_INTRO_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::GTHSCTY_INTRO_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::GTHSCTY_INTRO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::GTVTDIALY_INTRO_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_HOME_INTRO_VTDL_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::GTVTDIALY_INTRO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::GTLIENLAC_INTRO_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::GTLIENLAC_INTRO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::GTSLIDER_INTRO_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_HOME_INTRO_SLIDER_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::GTSLIDER_INTRO_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOME_PAGE_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOME_PAGE_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::HOME_INTRO_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_HOME_INTRO_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::HOME_INTRO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOME_SERVICES_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_HOME_SERVICES_NUMBER_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::HOME_SERVICES_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOME_NETKINSTT_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_HOME_SERVICES_NUMBER_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::HOME_NETKINSTT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOME_FEEDBACKS_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_HOME_FEEDBACKS_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::HOME_FEEDBACKS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOME_LOGO_PARTNERS => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOME_LOGO_PARTNERS, 'gco' ),
              ],
              OPTIONS_FIELDS::HOME_SERVICESTT_FIELD => [
                'type' => ['list_of' => POST_FIELDS::POST_SCHEMA_TYPES], 
                'description' => __( OPTIONS_FIELDS::HOME_SERVICESTT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOME_WHAT_SCR_FIELD => [
                'type' => ['list_of' => POST_FIELDS::POST_SCHEMA_TYPES], 
                'description' => __( OPTIONS_FIELDS::HOME_WHAT_SCR_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_BANNER_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_BANNER_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::BANNER_BACKGROUND_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::BANNER_BACKGROUND_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_QAS_LIST_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_QAS_LIST_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::NAME_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::NAME_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'String',
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_GT_TAMNHIN_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_GT_TAMNHIN_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::ICON_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::ICON_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HEADING_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::HEADING_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ],
            ]
          ]);
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_GT_TIEUCHI_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_GT_TIEUCHI_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::BACKGROUND_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::BACKGROUND_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_GT_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_GT_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::TIEU_CHI_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_GT_TIEUCHI_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::TIEU_CHI_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::TAM_NHIN_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_GT_TAMNHIN_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::TAM_NHIN_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_CONTACT_ADDRESS_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_CONTACT_ADDRESS_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::NAME_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::NAME_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_QAS_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_QAS_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::QA_LISTS_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_QAS_LIST_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::QA_LISTS_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_CONTACT_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_CONTACT_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::LH_BANNER_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LH_BANNER_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::LH_THONGDIEPSTICKY_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LH_THONGDIEPSTICKY_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::LH_GMAP_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LH_GMAP_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::LH_NOTICES_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LH_NOTICES_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::LH_FORM_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LH_FORM_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::LH_ADDRESS_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_CONTACT_ADDRESS_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::LH_ADDRESS_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_SERVICES_SIDEBAR_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_SERVICES_SIDEBAR_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              TAXONOMIES_FIELDS::ID_GQL_FIELD => [
                'type' => 'Number', 
                'description' => __( TAXONOMIES_FIELDS::ID_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::TITLE_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::TITLE_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::URL_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::URL_GQL_FIELD, 'gco' ),
              ],
              POST_FIELDS::DATA_GQL_FIELD => [
                'type' => ['list_of' => POST_FIELDS::POST_SCHEMA_TYPES], 
                'description' => __( POST_FIELDS::DATA_GQL_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_PRICE_EXTENDS_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_PRICE_EXTENDS_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::START_VALUE_FIELD => [
                'type' => 'Number',
                'description' => __( OPTIONS_FIELDS::START_VALUE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::END_VALUE_FIELD => [
                'type' => 'Number',
                'description' => __( OPTIONS_FIELDS::END_VALUE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::PRICE_FIELD => [
                'type' => 'Number',
                'description' => __( OPTIONS_FIELDS::PRICE_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_MONTHS_WORKING_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_MONTHS_WORKING_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::LABEL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LABEL_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PAYMENT_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PAYMENT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::START_VALUE_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::START_VALUE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::END_VALUE_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::END_VALUE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::PRICE_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::PRICE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::PRICE_EXTENDS_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_PRICE_EXTENDS_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::PRICE_EXTENDS_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_SALARY_PER_MONTH_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_SALARY_PER_MONTH_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::ID_FIELD => [
                'type' => 'String',
                'description' => __( OPTIONS_FIELDS::ID_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::LABEL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LABEL_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_SIMPLE_GROUP_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_SIMPLE_GROUP_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::MONTHS_WORKING_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_MONTHS_WORKING_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::MONTHS_WORKING_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::SALARY_PER_MONTH_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_SALARY_PER_MONTH_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::SALARY_PER_MONTH_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_DEFAULT_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_DEFAULT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PERCENTAGE_NENKIN_L1_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PERCENTAGE_NENKIN_L1_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D1_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D1_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D2_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D2_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D3_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D3_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PERCENT_DEFAULT_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PERCENT_DEFAULT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_COMPARE_DEFAULT_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_COMPARE_DEFAULT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::PRICETT_DEAULT_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::PRICETT_DEAULT_FIELD, 'gco' ),
              ],
            ]
          ]);
           //
           register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_SIMPLE_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_SIMPLE_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::NENKIN_CALC_SIMPLE_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_SIMPLE_GROUP_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::NENKIN_CALC_SIMPLE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::NENKIN_NOTE_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::NENKIN_NOTE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::CURRENCY_ACTIVE_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::CURRENCY_ACTIVE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_YEN_TO_VND_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_YEN_TO_VND_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_NENKIN_CITIES_LIVING_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_NENKIN_CITIES_LIVING_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::LABEL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::LABEL_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::MINSAL_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::MINSAL_FIELD, 'gco' ),
              ],
            ]
          ]);
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_ADVANCED_GROUP_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_ADVANCED_GROUP_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::CITIES_LIVING_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_NENKIN_CITIES_LIVING_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::CITIES_LIVING_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_DEFAULT_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_DEFAULT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_DEFAULT_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_DEFAULT_FIELD, 'gco' ),
              ],
            ]
          ]);
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_ADVANCED_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_ADVANCED_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::NENKIN_CALC_ADV_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_ADVANCED_GROUP_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::NENKIN_CALC_ADV_FIELD, 'gco' ),
              ],
             
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOANTHUE_GROUP_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOANTHUE_GROUP_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::RATE_PRICE_D1_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D1_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D2_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D2_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D3_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D3_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D4_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D4_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D5_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D5_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D6_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D6_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D7_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D7_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::RATE_PRICE_D8_FIELD => [
                'type' => 'Number', 
                'description' => __( OPTIONS_FIELDS::RATE_PRICE_D8_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_HOANTHUE_CALC_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_HOANTHUE_CALC_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::HOANTHUE_GROUP_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_HOANTHUE_GROUP_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::HOANTHUE_GROUP_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOANTHUE_NOTE_HTML_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::HOANTHUE_NOTE_HTML_FIELD, 'gco' ),
              ],             
            ]
          ]);
           //
           register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_ACCOUNT_SLIDER_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_ACCOUNT_SLIDER_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::HEADING_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::HEADING_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::BUTTON_TEXT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::BUTTON_TEXT_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::BUTTON_URL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::BUTTON_URL_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USER_CONFIRM_STATUS_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USER_CONFIRM_STATUS_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::HOSO_NO_FIELD => [
                'type' => 'Int', 
                'description' => __( OPTIONS_FIELDS::HOSO_NO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_STATUS_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::HOSO_STATUS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_CONFIRMED_LINK_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::HOSO_CONFIRMED_LINK_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_NOTIFICATIONS_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_NOTIFICATIONS_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::HOSO_NOTIFICATIONS_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_NOTIFICATIONS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_EXPIRED_DAYS_FIELD => [
                'type' => 'Int', 
                'description' => __( OPTIONS_FIELDS::HOSO_EXPIRED_DAYS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_DENY_MESSAGE_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::HOSO_DENY_MESSAGE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USER_CONFIRM_STATUS_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_VERIFIED_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_VERIFIED_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::HOSO_VERIFIED_FLAG_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::HOSO_VERIFIED_FLAG_FIELD, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_SESSION_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_SESSION_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::HOSO_SESSION_STATUS => [
                'type' => 'String',
                'description' => __( OPTIONS_FIELDS::HOSO_SESSION_STATUS, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_SESSION_STARTED => [
                'type' => 'String',
                'description' => __( OPTIONS_FIELDS::HOSO_SESSION_STARTED, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_SESSION_EXPIRED => [
                'type' => 'String',
                'description' => __( OPTIONS_FIELDS::HOSO_SESSION_EXPIRED, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_SESSION_IS_EXPIRED => [
                'type' => 'Boolean',
                'description' => __( OPTIONS_FIELDS::HOSO_SESSION_IS_EXPIRED, 'gco' ),
              ],
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_USERINFO_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_USERINFO_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::USER_ID_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_ID_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_FULLNAME_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_FULLNAME_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_ADDRESS_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_ADDRESS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_PHONE_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_PHONE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_EMAIL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_EMAIL_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_FACEBOOKINFO_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_FACEBOOKINFO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::FULLNAMEJP_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::FULLNAMEJP_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::NAMEUNSIGNED_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::NAMEUNSIGNED_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::BIRTHDAY_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::BIRTHDAY_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::NENKINCODE_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::NENKINCODE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::COMPANYINFO_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::COMPANYINFO_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::BANKNAME_VIETNAM_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::BANKNAME_VIETNAM_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::BANKNAME_BRANCHVIETNAM_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::BANKNAME_BRANCHVIETNAM_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::ADDRESS_BANKNAME_BRANCHVIETNAM_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::ADDRESS_BANKNAME_BRANCHVIETNAM_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::NOBANK_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::NOBANK_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::NAMELASTADDRESS_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::NAMELASTADDRESS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::NOZIP_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::NOZIP_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::AVATAR_USER_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::AVATAR_USER_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::ROLE_IS_ADMIN_FIELD => [
                'type' => 'Boolean', 
                'description' => __( OPTIONS_FIELDS::ROLE_IS_ADMIN_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_NENKIN_ANHTHENGOAIKIEU_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_NENKIN_ANHTHENGOAIKIEU_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_NENKIN_ANHNENKIN_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_NENKIN_ANHNENKIN_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_NENKIN_ANHHOCHIEU_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_NENKIN_ANHHOCHIEU_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_NENKIN_ANHNGANHANG_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_NENKIN_ANHNGANHANG_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_HOANTHUE_GENSEN_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_HOANTHUE_GENSEN_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYCHUYENTIEN_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYCHUYENTIEN_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYTOCMQUANHE_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYTOCMQUANHE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_HOANTHUE_HOCHIEU_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_HOANTHUE_HOCHIEU_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_HOANTHUE_MYNUMBER_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_HOANTHUE_MYNUMBER_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_HOANTHUE_SOTTTAIKHOAN_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_HOANTHUE_SOTTTAIKHOAN_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_HOANTHUE_NGOAIKIEU_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_HOANTHUE_NGOAIKIEU_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_CURRENT_STEP_FIELD => [
                'type' => 'Int', 
                'description' => __( OPTIONS_FIELDS::HOSO_CURRENT_STEP_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USER_CONFIRM_STATUS_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USER_CONFIRM_STATUS_SCHEMA_TYPE, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_SESSION_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_SESSION_SCHEMA_TYPE,
                'description' => __( OPTIONS_FIELDS::HOSO_SESSION_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_VERIFIED_FIELD => [
                'type' => 'Boolean', 
                'description' => __( OPTIONS_FIELDS::HOSO_VERIFIED_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_NOTIFICATIONS_FIELD => [
                'type' => ['list_of' => 'String'],
                'description' => __( OPTIONS_FIELDS::HOSO_NOTIFICATIONS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_SESSION_IS_EXPIRED => [
                'type' => 'Boolean', 
                'description' => __( OPTIONS_FIELDS::HOSO_SESSION_IS_EXPIRED, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_REFUND_NENKIN_NO3_FIELD => [
                'type' => 'Boolean', 
                'description' => __( OPTIONS_FIELDS::HOSO_REFUND_NENKIN_NO3_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_ACCOUNT_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_ACCOUNT_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::ACCOUNT_SLIDER_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_ACCOUNT_SLIDER_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::ACCOUNT_SLIDER_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::NOTE_REGISTER_HTML_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::NOTE_REGISTER_HTML_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_USER_HOSO_PROGRESSING_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_USER_HOSO_PROGRESSING_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::HOSO_CURRENT_STEP_FIELD => [
                'type' => 'Int', 
                'description' => __( OPTIONS_FIELDS::HOSO_CURRENT_STEP_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_REFUND_NENKIN_NO3_FIELD => [
                'type' => 'Boolean', 
                'description' => __( OPTIONS_FIELDS::HOSO_REFUND_NENKIN_NO3_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USERS_DATA_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USERS_DATA_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::USER_ID_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_ID_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_NAME_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_NAME_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::AVATAR_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::AVATAR_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_FULLNAME_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_FULLNAME_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_EMAIL_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_EMAIL_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_PHONE_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_PHONE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_ADDRESS_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_ADDRESS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::USER_DATE_CREATED_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::USER_DATE_CREATED_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_VERIFIED_FIELD => [
                'type' => 'Boolean', 
                'description' => __( OPTIONS_FIELDS::HOSO_VERIFIED_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USER_CONFIRM_STATUS_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_NOTIFICATIONS_FIELD => [
                'type' => ['list_of' => 'String'], 
                'description' => __( OPTIONS_FIELDS::HOSO_NOTIFICATIONS_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_SESSION_FIELD => [
                'type' => OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_SESSION_SCHEMA_TYPE, 
                'description' => __( OPTIONS_FIELDS::HOSO_SESSION_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::HOSO_SESSION_IS_EXPIRED => [
                'type' => 'Boolean', 
                'description' => __( OPTIONS_FIELDS::HOSO_SESSION_IS_EXPIRED, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USERS_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USERS_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::DATA_FIELD => [
                'type' => ['list_of' => OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USERS_DATA_SCHEMA_TYPE], 
                'description' => __( OPTIONS_FIELDS::DATA_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::PAGED_FIELD => [
                'type' => 'Int', 
                'description' => __( OPTIONS_FIELDS::PAGED_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::NUM_PER_PAGE_FIELD => [
                'type' => 'Int', 
                'description' => __( OPTIONS_FIELDS::NUM_PER_PAGE_FIELD, 'gco' ),
              ],
              OPTIONS_FIELDS::TOTALS_FIELD => [
                'type' => 'Int', 
                'description' => __( OPTIONS_FIELDS::TOTALS_FIELD, 'gco' ),
              ]
            ]
          ]);
          //
          register_graphql_object_type( OPTIONS_FIELDS::OPTIONS_EMAIL_TEMPLATE_SCHEMA_TYPE, [
            'description' => __( OPTIONS_FIELDS::OPTIONS_EMAIL_TEMPLATE_SCHEMA_TYPE, 'gco' ),
            'fields' => [
              OPTIONS_FIELDS::CONTENT_FIELD => [
                'type' => 'String', 
                'description' => __( OPTIONS_FIELDS::CONTENT_FIELD, 'gco' ),
              ],
            ]
          ]);
        }
    }