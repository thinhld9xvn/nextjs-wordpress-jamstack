<?php 
    namespace Pages;
    class PagesGetMetaPageTypeUtils {  
        public static function get($id) {
            return get_post_meta($id, PAGES_FIELDS::PAGETYPE_FIELD, true);
        }
    }
