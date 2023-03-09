<?php 
    namespace WP_GraphQL;
    use \Posts\POST_FIELDS;
    use Taxonomies\TAXONOMIES_FIELDS;
class GraphQLRegisterArticlesListTypesUtils {
        public static function register() {
          register_graphql_object_type( 'testsv', [
            'description' => __( 'testsv', 'gco' ),
            'fields' => [
              'testfield' => [
                'type' => 'String', 
                'description' => __( 'testfield', 'gco' ),
              ],
            ]
          ]);
          register_graphql_object_type( POST_FIELDS::POST_DATECREATED_SCHEMA_TYPES, [
            'description' => __( POST_FIELDS::POST_DATECREATED_SCHEMA_TYPES, 'gco' ),
            'fields' => [
                POST_FIELDS::DAY_GQL_FIELD => [
                  'type' => 'String', 
                  'description' => __( POST_FIELDS::DAY_GQL_FIELD, 'gco' ),
                ],
                POST_FIELDS::MONTH_GQL_FIELD => [
                  'type' => 'String', 
                  'description' => __( POST_FIELDS::MONTH_GQL_FIELD, 'gco' ),
                ],
                POST_FIELDS::YEAR_GQL_FIELD => [
                  'type' => 'String', 
                  'description' => __( POST_FIELDS::YEAR_GQL_FIELD, 'gco' ),
                ],
            ]
          ]);
          register_graphql_object_type( POST_FIELDS::POST_SCHEMA_TYPES, [
            'description' => __( POST_FIELDS::POST_SCHEMA_TYPES, 'gco' ),
            'fields' => [
              POST_FIELDS::ID_GQL_FIELD => [
                'type' => 'Int', 
                'description' => __( POST_FIELDS::ID_GQL_FIELD, 'gco' ),
              ],
              POST_FIELDS::TITLE_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::TITLE_GQL_FIELD, 'gco' ),
              ],
              POST_FIELDS::NAME_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::NAME_GQL_FIELD, 'gco' ),
              ],
              POST_FIELDS::TEXT_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::TEXT_GQL_FIELD, 'gco' ),
              ],       
              POST_FIELDS::URL_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::URL_GQL_FIELD, 'gco' ),
              ],       
              POST_FIELDS::SLUG_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::SLUG_GQL_FIELD, 'gco' ),
              ],       
              POST_FIELDS::EXCERPT_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::EXCERPT_GQL_FIELD, 'gco' ),
              ],
              POST_FIELDS::CONTENTS_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::CONTENTS_GQL_FIELD, 'gco' ),
              ],
              POST_FIELDS::THUMBNAIL_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::THUMBNAIL_GQL_FIELD, 'gco' )
              ],
              POST_FIELDS::BACKGROUND_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::BACKGROUND_GQL_FIELD, 'gco' )
              ],
              POST_FIELDS::DATE_CREATED_GQL_FIELD => [
                'type' => ['list_of' => POST_FIELDS::POST_DATECREATED_SCHEMA_TYPES], 
                'description' => __( POST_FIELDS::DATE_CREATED_GQL_FIELD, 'gco' )
              ],
              POST_FIELDS::CATEGORIES_GQL_FIELD => [  
                'type' => ['list_of' => TAXONOMIES_FIELDS::TAX_ENTRY_SCHEMA_TYPES], 
                'description' => __( POST_FIELDS::CATEGORIES_GQL_FIELD, 'gco' ),
              ],
              POST_FIELDS::VIEWCOUNT_GQL_FIELD => [  
                'type' => 'Number', 
                'description' => __( POST_FIELDS::VIEWCOUNT_GQL_FIELD, 'gco' ),
              ],
              POST_FIELDS::POLYLANG_POST_GQL_FIELD => [  
                'type' => 'String', 
                'description' => __( POST_FIELDS::POLYLANG_POST_GQL_FIELD, 'gco' ),
              ],
              POST_FIELDS::POST_TYPE_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( POST_FIELDS::POST_TYPE_GQL_FIELD, 'gco' ),
              ],       
            ]
          ]);
        }
    }