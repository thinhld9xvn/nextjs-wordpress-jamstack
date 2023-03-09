<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetIntroPageUtils;

    class GQLRegisterGTPageOptionsFieldsUtils {
        public static function register() {
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ]
            ];
            $field_name = 'getGioiThieuPageOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $lang = $args['lang'] ? $args['lang'] : 'vi';
                return OptionsGetIntroPageUtils::get($lang);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_GT_SCHEMA_TYPE);    
        }
    }