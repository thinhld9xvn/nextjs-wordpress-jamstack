<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetHomePageUtils;

    class GQLRegisterHomePageOptionsFieldsUtils {
        public static function register() {
            $field_name = 'getHomePageOptions';
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ]
            ];
            $resolve_callback = function($source, $args, $context, $info) {   
                $lang = $args['lang'] ? $args['lang'] : 'vi';
                return OptionsGetHomePageUtils::get($lang);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_HOME_PAGE_SCHEMA_TYPE);    
        }
    }