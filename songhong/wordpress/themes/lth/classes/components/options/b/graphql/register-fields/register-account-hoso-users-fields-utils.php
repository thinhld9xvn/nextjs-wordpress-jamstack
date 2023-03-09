<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetHoSoUserUtils;

    class GQLRegisterAccountHoSoUsersFieldsUtils {
        public static function register() {
            $args = [
                'paged' => [
                    'type' => 'Int'
                ],
                'num_per_page' => [
                    'type' => 'Int'
                ],
                's' => [
                    'type' => 'String'
                ],
                'metadata' => [
                    'type' => 'String'
                ]
            ];
            $field_name = 'getAccountHosoUsersOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $paged = $args['paged'] ? absint($args['paged']) : 1;
                $num_per_page = $args['num_per_page'] ? absint($args['num_per_page']) : 16;
                $s = $args['s'] ? $args['s'] : '';
                $metadata = $args['metadata'] ? json_decode($args['metadata'], true) : '';
                return OptionsGetHoSoUserUtils::get($paged, $num_per_page, $s, $metadata);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_USERS_SCHEMA_TYPE);    
        }
    }