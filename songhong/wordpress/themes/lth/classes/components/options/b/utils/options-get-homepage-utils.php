<?php 
    namespace Options;
    class OptionsGetHomePageUtils {
        private static function getFieldName($name = '', $lang = 'vi') {
            $prefix = $lang === 'ja' ? '_jp' : '';
            return $name . $prefix;
        }
        public static function get($lang = 'vi') {
            $intro = get_field(self::getFieldName('home_gioithieu', $lang), 'options');
            $services = get_field(self::getFieldName('home_dichvu', $lang), 'options');
            $netkinstt = get_field(self::getFieldName('home_thuctrangnetkins_number', $lang), 'options');
            $feedbacks = get_field(self::getFieldName('home_feedbacks', $lang), 'options');
            $logo_partners = get_field(self::getFieldName('logo_partner', $lang), 'options');
            $services_tt = OptionsGetServicesttUtils::get($lang, (int) $netkinstt['gt_dichvu_number']);
            $whatscr_tt = OptionsGetWhatScrUtils::get($lang, (int) $netkinstt['gt_dichvu_number']);
            $intro['gt_slider'] = array_map(function($item) {
                if ( empty($item['gallery']) ) :
                    $item['gallery'] = [];
                endif;
                return $item;
            }, $intro['gt_slider']);
            return [
                OPTIONS_FIELDS::HOME_INTRO_FIELD => $intro,
                OPTIONS_FIELDS::HOME_SERVICES_FIELD => $services,
                OPTIONS_FIELDS::HOME_NETKINSTT_FIELD => $netkinstt,
                OPTIONS_FIELDS::HOME_FEEDBACKS_FIELD => $feedbacks,
                OPTIONS_FIELDS::HOME_LOGO_PARTNERS => $logo_partners,
                OPTIONS_FIELDS::HOME_SERVICESTT_FIELD => $services_tt,
                OPTIONS_FIELDS::HOME_WHAT_SCR_FIELD => $whatscr_tt
            ]; 
        }
    }