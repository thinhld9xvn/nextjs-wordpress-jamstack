<?php 
    namespace WP_GraphQL;
    use \Taxonomies\TAXONOMIES_FIELDS;
    class GraphQLRegisterTaxonomiesTypesUtils {
        public static function register() {
          register_graphql_object_type( TAXONOMIES_FIELDS::TAX_ENTRY_SCHEMA_TYPES, [
            'description' => __( TAXONOMIES_FIELDS::TAX_ENTRY_SCHEMA_TYPES, 'gco' ),
            'fields' => [
              TAXONOMIES_FIELDS::ID_GQL_FIELD => [
                'type' => 'Int', 
                'description' => __( TAXONOMIES_FIELDS::ID_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::TITLE_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::TITLE_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::NAME_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::NAME_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::TEXT_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::TEXT_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::URL_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::URL_GQL_FIELD, 'gco' ),
              ],       
              TAXONOMIES_FIELDS::THUMBNAIL_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::THUMBNAIL_GQL_FIELD, 'gco' )
              ],       
              TAXONOMIES_FIELDS::CHILDRENS_GQL_FIELD => [
                'type' => ['list_of' => TAXONOMIES_FIELDS::TAX_ENTRY_SCHEMA_TYPES], 
                'description' => __( TAXONOMIES_FIELDS::CHILDRENS_GQL_FIELD, 'gco' ),
              ]
            ]
          ]);
          register_graphql_object_type( TAXONOMIES_FIELDS::TAX_SEO_OGI_MEDIA_DETAILS_TYPES, [
            'description' => __( TAXONOMIES_FIELDS::TAX_SEO_OGI_MEDIA_DETAILS_TYPES, 'gco' ),
            'fields' => [
                TAXONOMIES_FIELDS::SEO_OGI_MEDIA_DETAILS_WIDTH => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_OGI_MEDIA_DETAILS_WIDTH, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_OGI_MEDIA_DETAILS_HEIGHT => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_OGI_MEDIA_DETAILS_HEIGHT, 'gco' ),
                ],
            ]
          ]);
          register_graphql_object_type( TAXONOMIES_FIELDS::TAX_SEO_OGI_TYPES, [
            'description' => __( TAXONOMIES_FIELDS::TAX_SEO_OGI_TYPES, 'gco' ),
            'fields' => [
                TAXONOMIES_FIELDS::SEO_OGI_MEDIA_ITEM_URL => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_OGI_MEDIA_ITEM_URL, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_OGI_MEDIA_DETAILS => [
                  'type' => TAXONOMIES_FIELDS::TAX_SEO_OGI_MEDIA_DETAILS_TYPES, 
                  'description' => __( TAXONOMIES_FIELDS::SEO_OGI_MEDIA_DETAILS, 'gco' ),
                ],
            ]
          ]);
          register_graphql_object_type( TAXONOMIES_FIELDS::TAX_SEO_SCHEMA_TYPES, [
            'description' => __( TAXONOMIES_FIELDS::TAX_SEO_SCHEMA_TYPES, 'gco' ),
            'fields' => [
                TAXONOMIES_FIELDS::TITLE_GQL_FIELD => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::TITLE_GQL_FIELD, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_METADESC => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_METADESC, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_METAKEYWORDS => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_METAKEYWORDS, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_OPENGRAPH_TITLE => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_OPENGRAPH_TITLE, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_OPENGRAPH_DESC => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_OPENGRAPH_DESC, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_OPENGRAPH_IMAGE => [
                  'type' => TAXONOMIES_FIELDS::TAX_SEO_OGI_TYPES, 
                  'description' => __( TAXONOMIES_FIELDS::SEO_OPENGRAPH_IMAGE, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_OPENGRAPH_TYPE => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_OPENGRAPH_TYPE, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_OPENGRAPH_URL => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_OPENGRAPH_URL, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_TWITTER_TITLE => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_TWITTER_TITLE, 'gco' ),
                ],
                TAXONOMIES_FIELDS::SEO_TWITTER_DESC => [
                  'type' => 'String', 
                  'description' => __( TAXONOMIES_FIELDS::SEO_TWITTER_DESC, 'gco' ),
                ],
            ]
          ]);
          register_graphql_object_type( TAXONOMIES_FIELDS::TAX_SCHEMA_TYPES, [
            'description' => __( TAXONOMIES_FIELDS::TAX_SCHEMA_TYPES, 'gco' ),
            'fields' => [
              TAXONOMIES_FIELDS::ID_GQL_FIELD => [
                'type' => 'Int', 
                'description' => __( TAXONOMIES_FIELDS::ID_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::TITLE_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::TITLE_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::NAME_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::NAME_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::TEXT_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::TEXT_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::SLUG_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::SLUG_GQL_FIELD, 'gco' ),
              ],       
              TAXONOMIES_FIELDS::URL_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::URL_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::CHILDRENS_GQL_FIELD => [
                'type' => ['list_of' => TAXONOMIES_FIELDS::TAX_SCHEMA_TYPES], 
                'description' => __( TAXONOMIES_FIELDS::CHILDRENS_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::THUMBNAIL_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::THUMBNAIL_GQL_FIELD, 'gco' )
              ],
              TAXONOMIES_FIELDS::POST_TYPE_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::POST_TYPE_GQL_FIELD, 'gco' )
              ],
              TAXONOMIES_FIELDS::POLYLANG_TERM_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::POLYLANG_TERM_FIELD, 'gco' ),
              ],       
              TAXONOMIES_FIELDS::DESCRIPTION_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::DESCRIPTION_GQL_FIELD, 'gco' ),
              ],       
              TAXONOMIES_FIELDS::SEO_GQL_FIELD => [
                'type' => TAXONOMIES_FIELDS::TAX_SEO_SCHEMA_TYPES, 
                'description' => __( TAXONOMIES_FIELDS::SEO_GQL_FIELD, 'gco' ),
              ],
              TAXONOMIES_FIELDS::COLOR_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::COLOR_GQL_FIELD, 'gco' ),
              ],       
              TAXONOMIES_FIELDS::BACKGROUND_COLOR_GQL_FIELD => [
                'type' => 'String', 
                'description' => __( TAXONOMIES_FIELDS::BACKGROUND_COLOR_GQL_FIELD, 'gco' ),
              ],       
            ]
          ]);
        }
    }