<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetUserHosoProgressingUtils;

    class GQLRegisterUserHoSoProgressingOptionsFieldsUtils {
        public static function register() {
            $field_name = 'getUserHoSoProgressingOptions';
            $userinfo_args = [
                'userId' => [
                    'type' => 'Int'
                ]
            ];
            $resolve_callback = function($source, $args, $context, $info) { 
                return OptionsGetUserHosoProgressingUtils::get($args['userId']);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $userinfo_args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_USER_HOSO_PROGRESSING_SCHEMA_TYPE);    
        }
    }