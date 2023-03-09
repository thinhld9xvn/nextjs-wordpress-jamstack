<?php 
    namespace Posts;
    class PostsGetTaxonomyUtils {   
        public static function get_taxonomy($post, $post_type = 'post') {
            $taxonomy = 'category';
            if ( $post_type !== 'post' ) :
                $args=array(
                    'object_type' => array($post->post_type) 
                ); 
                $output = 'objects'; // or objects
                $operator = 'and'; // 'and' or 'or'                
                $taxonomies = get_taxonomies($args,$output,$operator);                
                $taxonomy = array_keys($taxonomies)[0];             
            endif;   
            return $taxonomy;
        }
    }