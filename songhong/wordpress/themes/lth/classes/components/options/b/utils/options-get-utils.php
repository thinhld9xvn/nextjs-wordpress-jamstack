<?php 
    namespace Options;
    class OptionsGetUtils {
        private static function getFieldName($name = '', $lang = 'vi') {
            $prefix = $lang === 'ja' ? '_jp' : '';
            return $name . $prefix;
        }
        public static function get($lang = 'vi') {
            $logo = get_field(self::getFieldName('logo', $lang), 'options');
            $logo_footer = get_field(self::getFieldName('footer_logo', $lang), 'options');
            $company_name = get_field(self::getFieldName('company_name', $lang), 'options');
            $company_address = get_field(self::getFieldName('company_address', $lang), 'options');
            $copyright = get_field(self::getFieldName('copyright', $lang), 'options');
            $socials = get_field(self::getFieldName('socials', $lang), 'options');
            $phone = get_field(self::getFieldName('phone', $lang), 'options');
            $hotline = get_field(self::getFieldName('hotline', $lang), 'options');
            $email = get_field(self::getFieldName('email', $lang), 'options');
            $menu_ft_thongtin = get_field(self::getFieldName('menu_ft_thongtin', $lang), 'options');
            $menu_ft_dichvu = get_field(self::getFieldName('menu_ft_dichvu', $lang), 'options');
            //
            $hotlineVietNam = [
                'phone_label' => $hotline['hotline_vietnam']['hotline_vietnam_label'],
                'phone_url' => $hotline['hotline_vietnam']['hotline_vietnam_url']
            ];
            $hotlineNhatBan = [
                'phone_label' => $hotline['hotline_nhatban']['hotline_jp_label'],
                'phone_url' => $hotline['hotline_nhatban']['hotline_jp_url']
            ];
            
            return [
                OPTIONS_FIELDS::LOGO_FIELD => $logo,
                OPTIONS_FIELDS::LOGO_FOOTER_FIELD => $logo_footer,
                OPTIONS_FIELDS::COMPANY_NAME_FIELD => $company_name,
                OPTIONS_FIELDS::COMPANY_ADDRESS_FIELD => $company_address,
                OPTIONS_FIELDS::COPYRIGHT_FIELD => $copyright,
                OPTIONS_FIELDS::SOCIALS_FIELD => $socials,
                OPTIONS_FIELDS::PHONE_FIELD => $phone,
                OPTIONS_FIELDS::HOTLINE_FIELD => [
                    'hotline_vietnam' => $hotlineVietNam,
                    'hotline_nhatban' => $hotlineNhatBan
                ],
                OPTIONS_FIELDS::EMAIL_FIELD => $email,
                OPTIONS_FIELDS::FOOTER_THONGTIN_MENU_FIELD => $menu_ft_thongtin,
                OPTIONS_FIELDS::FOOTER_DICHVU_MENU_FIELD => $menu_ft_dichvu,
                OPTIONS_FIELDS::TRANSLATION_STRINGS_FIELDS => OptionsGetTranslations::get($lang)
            ];  
        }
    }