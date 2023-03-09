<?php 
    namespace Options;
    class OptionsGetContactUtils {
        private static function getFieldName($name = '', $lang = 'vi') {
            $prefix = $lang === 'ja' ? '_jp' : '';
            return $name . $prefix;
        }
        public static function get($lang = 'vi') {
            $banner = get_field(self::getFieldName('lh_banner', $lang), 'options');
            $thongdiepsticky = get_field(self::getFieldName('lh_thongdiepsticky', $lang), 'options');
            $gmap = get_field(self::getFieldName('lh_gmap', $lang), 'options');
            $notices = get_field(self::getFieldName('lh_notices', $lang), 'options');
            $address = get_field(self::getFieldName('lh_addresses', $lang), 'options');
            $contents = do_shortcode($lang === 'vi' ? '[contact-form-7 id="441" title="Form liên hệ"]' : '[contact-form-7 id="442" title="Form liên hệ (JP)"]');
            return [
                OPTIONS_FIELDS::LH_BANNER_FIELD => $banner,
                OPTIONS_FIELDS::LH_THONGDIEPSTICKY_FIELD => $thongdiepsticky,
                OPTIONS_FIELDS::LH_GMAP_FIELD => $gmap,
                OPTIONS_FIELDS::LH_NOTICES_FIELD => $notices,
                OPTIONS_FIELDS::LH_FORM_FIELD => $contents,
                OPTIONS_FIELDS::LH_ADDRESS_FIELD => $address
            ]; 
        }
    }