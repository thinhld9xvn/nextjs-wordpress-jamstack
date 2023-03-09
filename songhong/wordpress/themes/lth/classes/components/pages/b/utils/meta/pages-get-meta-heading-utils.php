<?php 

    namespace Pages;

    class PagesGetMetaHeadingUtils {  

        public static function get($id) {

            return get_post_meta($id, PAGES_FIELDS::HEADING_FIELD, true);

        }

    }

