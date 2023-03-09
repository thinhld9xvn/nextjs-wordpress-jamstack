<?php 
    namespace Options;
    use Posts\POST_FIELDS;

    class OptionsGetServicesttUtils {   
        public static function get($lang = 'vi', $limit = -1) {     
            $prefix = $lang === 'vi' ? '' : '_jp';        
            $args = array(
               'post_type' => 'services',
               'posts_per_page' => $limit,
               'lang' => $lang,
               'meta_key' => "advanced_sv_options{$prefix}",
               'meta_value' => "show_on_nenkins_tt_homepage",
               'meta_compare' => "LIKE"
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
                $viewcount = get_post_meta($post->ID, '_post_view', true);
                $viewcount = $viewcount ? (int) $viewcount : 0;                    
                $r = [
                    POST_FIELDS::ID_GQL_FIELD => $post->ID,
                    POST_FIELDS::URL_GQL_FIELD => filter_permalink(get_the_permalink($post)),
                    POST_FIELDS::SLUG_GQL_FIELD => $post->post_name,
                    POST_FIELDS::TITLE_GQL_FIELD => htmlspecialchars_decode($title),      
                    POST_FIELDS::THUMBNAIL_GQL_FIELD => $thumbnail,          
                    POST_FIELDS::DATE_CREATED_GQL_FIELD => [
                        [
                            POST_FIELDS::DAY_GQL_FIELD => $day,
                            POST_FIELDS::MONTH_GQL_FIELD => $month,
                            POST_FIELDS::YEAR_GQL_FIELD => $year
                        ]
                    ],
                    POST_FIELDS::VIEWCOUNT_GQL_FIELD => $viewcount
                ];
                $results[] = $r;
            endforeach;
           wp_reset_query();
           return $results;
        }
    }