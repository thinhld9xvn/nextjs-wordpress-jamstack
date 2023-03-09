<?php 
    namespace Options;
    use Posts\POST_FIELDS;
    use Taxonomies\TAXONOMIES_FIELDS;
    class OptionsGetPostsSidebarUtils {   
        private static function get_post_by_term($post_type = 'post', $tax = 'category', $term = '', $lang = 'vi', $limit = 5) { 
            $args = array(
               'post_type' => $post_type,
               'posts_per_page' => $limit,
               'lang' => $lang,
               'posts_per_pag' => $limit,
               'order' => 'DESC',
               'orderby' => 'date',
               'tax_query' => [
                    [
                        'taxonomy' => $tax,
                        'field' => 'slug',
                        'terms' => [$term]
                    ]
               ]
           );
           $postsList = query_posts($args);
           $results = []; 
           foreach($postsList as $key => $post) :
                if ( $post->ID === 0 || empty($post->post_name) ) continue;
                $title = $post->post_title;
                $day = get_the_date("d", $post);
                $month = get_the_date("m", $post);
                $year = get_the_date("Y", $post);
                $thumbnail = get_the_post_thumbnail_url($post->ID, 'large');
                $thumbnail = $thumbnail ? $thumbnail : '';                
                $r = [
                    POST_FIELDS::ID_GQL_FIELD => $post->ID,
                    POST_FIELDS::URL_GQL_FIELD => filter_permalink(get_the_permalink($post)),
                    POST_FIELDS::TITLE_GQL_FIELD => htmlspecialchars_decode($title)
                ];
                $results[] = $r;
            endforeach;
           wp_reset_query();
           return $results;
        }
        public static function get($post_type = 'post', $tax = 'category', $lang = 'vi') {
            $arrTermsList = [];
            $args = array(
                'taxonomy' => $tax,
                'hide_empty' => false,
                'parent' => 0,
                'lang' => $lang,
                'order' => 'ASC',
                'orderby' => 'id'
            );
            $results = get_terms($args);
            if ( $results ) :
                foreach( $results as $key => $term ) :
                    $arrTermsList[] = [
                        TAXONOMIES_FIELDS::ID_GQL_FIELD => $term->term_id,
                        TAXONOMIES_FIELDS::TITLE_GQL_FIELD => $term->name,
                        TAXONOMIES_FIELDS::URL_GQL_FIELD => filter_permalink(get_term_link($term)),
                        POST_FIELDS::DATA_GQL_FIELD => self::get_post_by_term($post_type, $tax, $term->slug, $lang)
                    ];
                endforeach;
            endif;
            return $arrTermsList;
        }
    }