<?php 
    namespace WP_GraphQL;
    use Posts\POST_FIELDS;
    class GraphQLRegisterArticlesListFieldsUtils {
        public static function register() {
            $field_name = 'getArticlesList';
            $args = [
                'lang' => [
                    'type' => 'LanguageCodeEnum'
                ],
                'post_type' => [
                    'type' => 'String'
                ],  
                'tax' => [
                    'type' => 'String'
                ],  
                'term' => [
                    'type' => 'String'
                ],  
                'limit' => [
                    'type' => 'Int'
                ],
                'slug' => [
                    'type' => 'String'
                ],
                'searchable' => [
                    'type' => 'Boolean'
                ],
                'related' => [
                    'type' => 'Boolean'
                ]
            ];
            $resolve_callback = function($source, $args, $context, $info) {   
                $lang = !empty($args['lang']) ? $args['lang'] : 'vi';
                $post_type = !empty($args['post_type']) ? $args['post_type'] : 'post';
                $tax = !empty($args['tax']) ? $args['tax'] : null;
                $term = !empty($args['term']) ? $args['term'] : null;
                $limit = !empty($args['limit']) ? intval($args['limit']) : -1;
                $slug = !empty($args['slug']) ? $args['slug'] : '';
                $searchable = !empty($args['searchable']) ? $args['searchable'] : false;
                $related = $args['related'];
                return \Posts\PostsGetAllListsUtils::get(['lang' => $lang, 
                                                          'post_type' => $post_type, 
                                                          'tax' => $tax, 
                                                          'term' => $term, 
                                                          'limit' => $limit, 
                                                          'slug' => $slug, 
                                                          'searchable' => $searchable,
                                                          'related' => $related]);
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, ['list_of' => POST_FIELDS::POST_SCHEMA_TYPES]);    
            
        }
    }