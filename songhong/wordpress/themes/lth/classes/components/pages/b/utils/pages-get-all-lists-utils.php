<?php 
    namespace Pages;
    class PagesGetAllListsUtils {   
        public static function get() {
           $args = array(
               'post_type' => 'page',               
               'posts_per_page' => -1,
               'no_paging' => true
           );
           query_posts($args);
           $results = [];
           while ( have_posts() ) : the_post();
                $id = get_the_id();
                $title = get_the_title();
                $content = get_the_content();
                $day = get_the_date("d");
                $month = get_the_date("m");
                $year = get_the_date("Y");
                $background = get_the_post_thumbnail_url(get_the_id(), 'full');
                $result = array(
                    'id' => 'post_' . $id,
                    'url' => filter_permalink(get_the_permalink()), 
                    'title' => htmlspecialchars_decode($title),
                    'text' => htmlspecialchars_decode($title),      
                    'contents' => apply_filters('the_content', $content),  
                    'date_created' => [
                        'day' => $day,
                        'month' => $month,
                        'year' => $year
                    ]
                );
                if ( ! empty( $background ) ) :
                    $result['background'] = [
                        'background' => $background
                    ];
                endif;
                $results[] = $result;
            endwhile;
           wp_reset_query();
           return $results;
        }
    }