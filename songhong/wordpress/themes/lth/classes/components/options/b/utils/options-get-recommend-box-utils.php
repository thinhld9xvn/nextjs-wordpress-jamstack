<?php 
    namespace Options;
    use Posts\POST_FIELDS;
    class OptionsGetRecommendBoxUtils {   
        public static function get($lang = 'vi', $limit = -1) {     
            $prefix = $lang === 'vi' ? '' : '_jp';        
            $args = array(
               'post_type' => 'page',
               'posts_per_page' => $limit,
               'lang' => $lang,
               'meta_key' => "advanced_page_options{$prefix}",
               'meta_value' => "show_on_recommended_box",
               'meta_compare' => "LIKE"
           );
           $postsList = query_posts($args);
           $results = []; 
           foreach($postsList as $key => $post) :
                if ( $post->ID === 0 || empty($post->post_name) ) continue;
                $title = $post->post_title;  
                $r = [
                    POST_FIELDS::ID_GQL_FIELD => $post->ID,
                    POST_FIELDS::URL_GQL_FIELD => filter_permalink(get_the_permalink($post)),
                    POST_FIELDS::SLUG_GQL_FIELD => $post->post_name,
                    POST_FIELDS::TITLE_GQL_FIELD => htmlspecialchars_decode($title)
                ];
                $results[] = $r;
            endforeach;
           wp_reset_query();
           return $results;
        }
    }