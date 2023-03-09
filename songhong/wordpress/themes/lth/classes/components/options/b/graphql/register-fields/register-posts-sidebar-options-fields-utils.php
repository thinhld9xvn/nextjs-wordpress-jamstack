<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetPostsSidebarUtils;

    class GQLRegisterPostsSidebarOptionsFieldsUtils {
        public static function register() {
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ],
                'post_type' => [
                    'type' => 'String'
                ],
                'tax' => [
                    'type' => 'String'
                ]
            ];
            $field_name = 'getPostsSidebarOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $lang = $args['lang'] ? $args['lang'] : 'vi';
                $post_type = $args['post_type'] ? $args['post_type'] : 'post';
                $tax = $args['tax'] ? $args['tax'] : 'category';
                return OptionsGetPostsSidebarUtils::get($post_type, $tax, $lang);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, ['list_of' => OPTIONS_FIELDS::OPTIONS_SERVICES_SIDEBAR_SCHEMA_TYPE]);    
        }
    }