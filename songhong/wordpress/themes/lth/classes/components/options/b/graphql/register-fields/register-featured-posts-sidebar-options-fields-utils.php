<?php 
    namespace WP_GraphQL;
    use Options\OptionsFeaturedPostsListSidebarUtils;
    use Posts\POST_FIELDS;

    class GQLRegisterFeaturedPostsSidebarOptionsFieldsUtils {
        public static function register() {
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ],
                'limit' => [
                    'type' => 'Number'
                ]
            ];
            $field_name = 'getFeaturedPostsSidebarOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $lang = $args['lang'] ? $args['lang'] : 'vi';
                $limit = $args['limit'] ? $args['limit'] : 2;
                return OptionsFeaturedPostsListSidebarUtils::get($lang, $limit);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, ['list_of' => POST_FIELDS::POST_SCHEMA_TYPES]);    
        }
    }