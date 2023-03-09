<?php 
    namespace Options;
    class OptionsGetHoanThueCalcDataUtils {
        private static function getFieldName($name = '', $lang = 'vi') {
            $prefix = $lang === 'ja' ? '_jp' : '';
            return $name . $prefix;
        }
        public static function get($lang = 'vi') {
            $hoanthue_calc = get_field(self::getFieldName('hoanthue_calc', $lang), 'options');
            $hoanthue_note_html = get_field(self::getFieldName('hoanthue_luuy', $lang), 'options');
            return [
                OPTIONS_FIELDS::HOANTHUE_GROUP_FIELD => $hoanthue_calc,
                OPTIONS_FIELDS::HOANTHUE_NOTE_HTML_FIELD => $hoanthue_note_html
            ]; 
        }
    }