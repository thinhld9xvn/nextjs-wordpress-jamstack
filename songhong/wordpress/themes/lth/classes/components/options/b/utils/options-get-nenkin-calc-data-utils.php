<?php 
    namespace Options;
    class OptionsGetNenkinCalcDataUtils {
        private static function getFieldName($name = '', $lang = 'vi') {
            $prefix = $lang === 'ja' ? '_jp' : '';
            return $name . $prefix;
        }
        public static function get($lang = 'vi') {
            $nenkin_calc_simple = get_field(self::getFieldName('nenkins_simple_calc', $lang), 'options');
            $nenkin_luuy = get_field(self::getFieldName('nenkins_luuy', $lang), 'options');
            $yen_rate_to_vnd = get_field(self::getFieldName('rate_yen_to_vnd', $lang), 'options');
            $currency = get_field(self::getFieldName('currency_active', $lang), 'options');
            $nenkin_calc_simple['months_working'] = array_map(function($item) {
                if ( empty($item['price_extends']) ) :
                    $item['price_extends'] = [];
                endif;
                return $item;
            }, $nenkin_calc_simple['months_working']);
            return [
                OPTIONS_FIELDS::NENKIN_CALC_SIMPLE_FIELD => $nenkin_calc_simple,
                OPTIONS_FIELDS::NENKIN_NOTE_FIELD => $nenkin_luuy,
                OPTIONS_FIELDS::CURRENCY_ACTIVE_FIELD => $currency,
                OPTIONS_FIELDS::RATE_YEN_TO_VND_FIELD => $yen_rate_to_vnd,
            ]; 
        }
        public static function get_advanced($lang = 'vi') {
            $nenkin_calc_adv = get_field(self::getFieldName('nenkins_advanced_calc', $lang), 'options');
            return [
                OPTIONS_FIELDS::NENKIN_CALC_ADV_FIELD => $nenkin_calc_adv
            ];
        }
    }