<?php 
    namespace WP_GraphQL;
    use Slider\GetSliderItemsUtils;
    use Slider\SLIDER_FIELDS;
    class GraphQLRegisterSliderFieldsUtils {
        public static function register() {
            $field_name = 'getSliderItemsList';
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ]
            ];
            $resolve_callback = function($source, $args, $context, $info) {    
                $lang = $args['lang'] ? $args['lang'] : 'vi';
                return GetSliderItemsUtils::get($lang);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, ['list_of' => SLIDER_FIELDS::SLIDER_FIELDS_TYPE]);    
        }
    }