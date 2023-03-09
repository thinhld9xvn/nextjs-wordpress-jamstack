<?php 
    namespace Options;
    class OptionsGetQAUtils {
        private static function getFieldName($name = '', $lang = 'vi') {
            $prefix = $lang === 'ja' ? '_jp' : '';
            return $name . $prefix;
        }
        public static function get($lang = 'vi') {
            $qas = get_field(self::getFieldName('qa_lists', $lang), 'options');
            return [
                OPTIONS_FIELDS::QA_LISTS_FIELD => $qas
            ]; 
        }
    }