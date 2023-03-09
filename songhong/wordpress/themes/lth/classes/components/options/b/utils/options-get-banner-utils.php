<?php 
    namespace Options;
    class OptionsGetBannerUtils {
        private static function getFieldName($name = '', $lang = 'vi') {
            $prefix = $lang === 'ja' ? '_jp' : '';
            return $name . $prefix;
        }
        public static function get($lang = 'vi') {
            $intro = get_field(self::getFieldName('banner_background', $lang), 'options');
            return [
                OPTIONS_FIELDS::BANNER_BACKGROUND_FIELD => $intro
            ]; 
        }
    }