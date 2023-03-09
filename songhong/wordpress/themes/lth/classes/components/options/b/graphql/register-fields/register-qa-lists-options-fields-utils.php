<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetQAUtils;

    class GQLRegisterQAListsOptionsFieldsUtils {
        public static function register() {
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ]
            ];
            $field_name = 'getQAListOptions';
             $resolve_callback = function($source, $args, $context, $info) {   
                 $lang = $args['lang'] ? $args['lang'] : 'vi';
                 return OptionsGetQAUtils::get($lang);
             };
             GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_QAS_SCHEMA_TYPE);    
        }
    }