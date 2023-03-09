<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetNenkinCalcDataUtils;

    class GQLRegisterNenkinAdvancedCalcOptionsFieldsUtils {
        public static function register() {
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ]
            ];
            $field_name = 'getNenkinsAdvancedCalcOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $lang = $args['lang'] ? $args['lang'] : 'vi';
                return OptionsGetNenkinCalcDataUtils::get_advanced($lang);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_NENKIN_CALC_ADVANCED_SCHEMA_TYPE);    
        }
    }