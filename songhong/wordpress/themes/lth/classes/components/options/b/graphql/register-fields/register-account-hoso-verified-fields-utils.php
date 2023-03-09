<?php 
    namespace WP_GraphQL;
    use Memberships\RetrieveHoSoFields;
    use Options\OPTIONS_FIELDS;
    class GQLRegisterAccountHoSoVerifiedFieldsUtils {
        public static function register() {
            $args = [
                'userId' => [
                    'type' => 'Int'
                ]
            ];
            $field_name = 'getAccountHosoVerifiedOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $userId = $args['userId'];
                return [
                    OPTIONS_FIELDS::HOSO_VERIFIED_FLAG_FIELD => RetrieveHoSoFields::get_meta_account_verified_flag($userId)
                ];
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_VERIFIED_SCHEMA_TYPE);    
        }
    }