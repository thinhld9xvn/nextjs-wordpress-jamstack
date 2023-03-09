<?php 
    namespace WP_GraphQL;
    class GraphQLRegisterFieldsUtils {
        public static function register($field_name, $args, $resolve_callback, $field_type = 'String') {
            $field_config = [
                'type' => $field_type,
                'args' => $args,
                'resolve' => $resolve_callback,
              ];
              register_graphql_field( 'RootQuery', $field_name, $field_config);
        }
    }