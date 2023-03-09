<?php 
    namespace WP_GraphQL;
    class GraphQLRegisterOptionsFieldsUtils {
        public static function register() {
            GQLRegisterSiteOptionsFieldsUtils::register();
            GQLRegisterHomePageOptionsFieldsUtils::register();
            GQLRegisterBannerOptionsFieldsUtils::register();
            GQLRegisterGTPageOptionsFieldsUtils::register();
            GQLRegisterQAListsOptionsFieldsUtils::register();
            GQLRegisterContactPageOptionsFieldsUtils::register();
            GQLRegisterRecommendPageOptionsFieldsUtils::register();
            GQLRegisterPostsSidebarOptionsFieldsUtils::register();
            GQLRegisterFeaturedPostsSidebarOptionsFieldsUtils::register();
            GQLRegisterNenkinSimpleCalcOptionsFieldsUtils::register();
            GQLRegisterNenkinAdvancedCalcOptionsFieldsUtils::register();
            GQLRegisterHoanThueCalcOptionsFieldsUtils::register();
            GQLRegisterAccountOptionsFieldsUtils::register();
            GQLRegisterUserInfoOptionsFieldsUtils::register();     
            GQLRegisterUserHoSoProgressingOptionsFieldsUtils::register(); 
            GQLRegisterAccountHoSoUsersFieldsUtils::register();      
            GQLRegisterAccountHoSoNotificationsFieldsUtils::register();
            GQLRegisterAccountHoSoVerifiedFieldsUtils::register();
            GQLRegisterEmailTemplateByCodeOptionsFieldsUtils::register();
            GQLRegisterAccountHoSoReportMutationUtils::register();
            GQLRegisterAccountHoSoConfirmNenkinMutationUtils::register();
            GQLRegisterAccountHoSoVerifyMutationUtils::register();
        }
    }