<?php 
    namespace WP_GraphQL;
    class GraphQLRegisterFieldTypeUtils {
        public static function register($register_type_name, $field_name, $field_type, $resolve = null) {
            register_graphql_field( $register_type_name, $field_name, [
                'type' => $field_type,
                'description' => __( $field_name, 'wp-graphql' ),
                'resolve' => $resolve ? $resolve : null
            ] );
        }
    }