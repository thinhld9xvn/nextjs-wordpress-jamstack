<?php 
    namespace WP_GraphQL;
    use Options\OptionsGetRecommendBoxUtils;
    use Posts\POST_FIELDS;

    class GQLRegisterRecommendPageOptionsFieldsUtils {
        public static function register() {
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ]
            ];
            $field_name = 'getRecommendPageOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $lang = $args['lang'] ? $args['lang'] : 'vi';
                return OptionsGetRecommendBoxUtils::get($lang);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, ['list_of' => POST_FIELDS::POST_SCHEMA_TYPES]);    
        }
    }