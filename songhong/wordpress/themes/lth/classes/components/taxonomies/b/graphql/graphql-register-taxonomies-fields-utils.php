<?php 
    namespace WP_GraphQL;
    use \Taxonomies\TAXONOMIES_FIELDS;
    use \Taxonomies\TaxGetAllCategoriesUtils;
    class GraphQLRegisterTaxonomiesFieldsUtils {
        public static function register() {
            $field_name = 'getTaxonomiesList';
            $args = [
                'tax' => [
                    'type' => 'String'
                ],
                'term_slug' => [
                    'type' => 'String'
                ],
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ],
                'number' => [
                    'type' => 'Int'
                ]
            ];
            $resolve_callback = function($source, $args, $context, $info) {
                $tax = $args['tax'];
                $lang = !empty($args['lang']) ? $args['lang'] : 'vi';
                $term_slug = !empty($args['term_slug']) ? $args['term_slug'] : null;
                $number = !empty($args['number']) ? $args['number'] : '';
                return TaxGetAllCategoriesUtils::get($tax, $term_slug, $lang, $number);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, 
                                                    $resolve_callback, 
                                                        ['list_of' => TAXONOMIES_FIELDS::TAX_SCHEMA_TYPES]);    
        }
    }