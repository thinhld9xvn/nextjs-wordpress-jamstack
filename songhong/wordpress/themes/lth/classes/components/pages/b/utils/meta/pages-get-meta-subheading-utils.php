<?php 

    namespace Pages;

    class PagesGetMetaSubHeadingUtils {  

        public static function get($id) {

            return get_post_meta($id, PAGES_FIELDS::SUBHEADING_FIELD, true);

        }

    }

