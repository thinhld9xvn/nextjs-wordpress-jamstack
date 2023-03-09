<?php 
    namespace WP_GraphQL;
    class GraphQLRegisterMutationUtils {
        public static function register($mutation_name, $config) {
            register_graphql_mutation( $mutation_name, $config);
        }
    }