<?php 
    namespace WP_GraphQL;
    use Slider\SLIDER_FIELDS;
    class GraphQLRegisterSliderTypesUtils {
        public static function register() {
          register_graphql_object_type( SLIDER_FIELDS::SLIDER_FIELDS_TYPE, [
            'description' => __( 'Slider', 'gco' ),
            'fields' => [   
              SLIDER_FIELDS::SLIDER_GQL_ID => [
                'type' => 'Int', 
                'description' => __( SLIDER_FIELDS::SLIDER_GQL_ID, 'gco' ),
              ],           
              SLIDER_FIELDS::SLIDER_GQL_TITLE => [
                'type' => 'String', 
                'description' => __( SLIDER_FIELDS::SLIDER_GQL_TITLE, 'gco' ),
              ],
              SLIDER_FIELDS::SLIDER_GQL_THUMBNAIL => [
                'type' => 'String', 
                'description' => __( SLIDER_FIELDS::SLIDER_GQL_THUMBNAIL, 'gco' ),
              ]
            ]
          ]);
        }
    }