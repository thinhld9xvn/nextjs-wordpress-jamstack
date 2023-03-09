<?php 
    namespace Options;
    class OptionsGetIntroPageUtils {
        private static function getFieldName($name = '', $lang = 'vi') {
            $prefix = $lang === 'ja' ? '_jp' : '';
            return $name . $prefix;
        }
        public static function get($lang = 'vi') {
            $tieuchi = get_field(self::getFieldName('tieu_chi_hoat_dong', $lang), 'options');
            $sumenh = get_field(self::getFieldName('su_menh', $lang), 'options');
            return [
                OPTIONS_FIELDS::TIEU_CHI_FIELD => $tieuchi,
                OPTIONS_FIELDS::TAM_NHIN_FIELD => $sumenh
            ]; 
        }
    }