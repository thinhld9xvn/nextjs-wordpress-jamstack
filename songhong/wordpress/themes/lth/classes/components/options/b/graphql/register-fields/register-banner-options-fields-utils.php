<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetBannerUtils;

    class GQLRegisterBannerOptionsFieldsUtils {
        public static function register() {
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ]
            ];
            $field_name = 'getBannerOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $lang = $args['lang'] ? $args['lang'] : 'vi';
                return OptionsGetBannerUtils::get($lang);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_BANNER_SCHEMA_TYPE);    
        }
    }