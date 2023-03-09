<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetContactUtils;

    class GQLRegisterContactPageOptionsFieldsUtils {
        public static function register() {
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ]
            ];
            $field_name = 'getContactPageOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $lang = $args['lang'] ? $args['lang'] : 'vi';
                return OptionsGetContactUtils::get($lang);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_CONTACT_SCHEMA_TYPE);    
        }
    }