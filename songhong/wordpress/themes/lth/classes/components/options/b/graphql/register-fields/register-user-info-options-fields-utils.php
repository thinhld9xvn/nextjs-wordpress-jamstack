<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetAccountUtils;
    class GQLRegisterUserInfoOptionsFieldsUtils {
        public static function register() {
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ]
            ];
            $field_name = 'getUserInfoOptions';
            $userinfo_args = [
                'username' => [
                    'type' => 'String'
                ]
            ];
            $resolve_callback = function($source, $args, $context, $info) { 
                return OptionsGetAccountUtils::getUser($args['username']);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $userinfo_args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_USERINFO_SCHEMA_TYPE);    
        }
    }