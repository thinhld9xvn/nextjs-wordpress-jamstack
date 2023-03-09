<?php 
    namespace Slider;
    class GetSliderItemsUtils {
        public static function get($lang = 'vi') {
            $results = [];
            $args = array(
                'post_type' => 'slider',
                'posts_per_page' => -1,
                'orderby' => 'id',
                'order' => 'asc',
                'lang' => $lang,
                'no_paging' => true
            );
            query_posts($args);
            while ( have_posts() ) : the_post();
                $pid = get_the_id();
                $thumbnail = get_the_post_thumbnail_url($pid, 'full');
                $results[] = [
                    SLIDER_FIELDS::SLIDER_GQL_ID => $pid,
                    SLIDER_FIELDS::SLIDER_GQL_TITLE => get_the_title(),
                    SLIDER_FIELDS::SLIDER_GQL_THUMBNAIL => !empty($thumbnail) ? $thumbnail : '',
                ];
            endwhile;
            wp_reset_query();
            return $results;
        }
    }
