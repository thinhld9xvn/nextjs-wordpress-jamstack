<?php 
    namespace Options;
    use Memberships\RetrieveHoSoFields;
    use Memberships\RetrieveHosoSessionUtils;

    class OptionsGetAccountUtils {
        private static function getFieldName($name = '', $lang = 'vi') {
            $prefix = $lang === 'ja' ? '_jp' : '';
            return $name . $prefix;
        }
        public static function get($lang = 'vi') {
            $slider = get_field(self::getFieldName('slider_account', $lang), 'options');
            $register_html = get_field(self::getFieldName('note_register_html', $lang), 'options');
            return [
                OPTIONS_FIELDS::ACCOUNT_SLIDER_FIELD => $slider,
                OPTIONS_FIELDS::NOTE_REGISTER_HTML_FIELD => $register_html
            ]; 
        }
        public static function export_galleries_thumbnails($post, $key) {
            $galleries = get_field($key, $post->ID);
            $galleries = !empty($galleries) ? $galleries : [];
            return array_map(function($image) {
                $id = pn_get_attachment_id_from_url($image);
                return wp_get_attachment_image_url($id, 'thumbnail');
            }, $galleries);
        }
        public static function getUser($username = '') {
            $user = get_user_by('login', $username);
            $id = $user->ID;
            $is_admin_role = in_array('administrator', $user->roles);
            $hoso_post = get_page_by_path('hoso-' . $username, OBJECT, HOSOPT);
            $fullname = RetrieveHoSoFields::get_meta_fullname($id);
            $facebook_metainfo = RetrieveHoSoFields::get_meta_facebook($id);
            $address = RetrieveHoSoFields::get_meta_address($id);
            $phone = RetrieveHoSoFields::get_meta_phone($id);
            $fullnamejp = RetrieveHoSoFields::get_meta_fullname_jp($id);
            $nameunsigned = RetrieveHoSoFields::get_meta_name_unsigned($id);
            $birthday = RetrieveHoSoFields::get_meta_birthday($id);
            $nenkincode = RetrieveHoSoFields::get_meta_nenkincode($id);
            $companyinfo = RetrieveHoSoFields::get_meta_companyinfo($id);
            $bankname_vietnam = RetrieveHoSoFields::get_meta_bankname($id);
            $bankname_branch_vietnam = RetrieveHoSoFields::get_meta_brach_bankname($id);
            $address_bankname_branch_vietnam = RetrieveHoSoFields::get_meta_address_brach_bankname($id);
            $nobank = RetrieveHoSoFields::get_meta_nobank($id);
            $namelastaddress = RetrieveHoSoFields::get_meta_name_lastaddress($id);
            $nozip = RetrieveHoSoFields::get_meta_zipcode($id);
            $avatar = RetrieveHoSoFields::get_meta_avatar($id);
            //
            $frontcard = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_NENKIN_ANHTHENGOAIKIEU_FIELD);
            $anhnenkins = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_NENKIN_ANHNENKIN_FIELD);
            $anhhochieu = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_NENKIN_ANHHOCHIEU_FIELD);
            $anhnganhang = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_NENKIN_ANHNGANHANG_FIELD);
            //
            $hoanthue_gensen = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_HOANTHUE_GENSEN_FIELD);
            $hoanthue_giaychuyentien = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYCHUYENTIEN_FIELD);
            $hoanthue_giaycmquanhe = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYTOCMQUANHE_FIELD);
            $hoanthue_hochieu = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_HOANTHUE_HOCHIEU_FIELD);
            $hoanthue_mynumber = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_HOANTHUE_MYNUMBER_FIELD);
            $hoanthue_sotttaikhoan = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_HOANTHUE_SOTTTAIKHOAN_FIELD);
            $hoanthue_ngoaikieu = self::export_galleries_thumbnails($hoso_post, OPTIONS_FIELDS::HOSO_HOANTHUE_NGOAIKIEU_FIELD);
            //
            $step = RetrieveHoSoFields::get_meta_step($id);
            //
            $hs_verified = RetrieveHoSoFields::get_meta_verified($id);
            $confirm_nenkin_hs = RetrieveHoSoFields::get_meta_confirmed($id);
            $hs_session = RetrieveHosoSessionUtils::payloadFlagHosoExpired($id);
            $hs_notifications = RetrieveHoSoFields::get_meta_account_notifications($id);
            //
            $hs_refund_no3 = RetrieveHoSoFields::get_meta_account_refund_nenkin_no3($id);
            //
            return [
                OPTIONS_FIELDS::USER_ID_FIELD => $id,
                OPTIONS_FIELDS::USER_FULLNAME_FIELD => $fullname,
                OPTIONS_FIELDS::USER_ADDRESS_FIELD => $address,
                OPTIONS_FIELDS::USER_PHONE_FIELD => $phone,
                OPTIONS_FIELDS::USER_EMAIL_FIELD => $user->user_email,
                OPTIONS_FIELDS::USER_FACEBOOKINFO_FIELD => $facebook_metainfo,
                OPTIONS_FIELDS::FULLNAMEJP_FIELD => $fullnamejp,
                OPTIONS_FIELDS::NAMEUNSIGNED_FIELD => $nameunsigned,
                OPTIONS_FIELDS::BIRTHDAY_FIELD => $birthday,
                OPTIONS_FIELDS::NENKINCODE_FIELD => $nenkincode,
                OPTIONS_FIELDS::COMPANYINFO_FIELD => $companyinfo,
                OPTIONS_FIELDS::BANKNAME_VIETNAM_FIELD => $bankname_vietnam,
                OPTIONS_FIELDS::BANKNAME_BRANCHVIETNAM_FIELD => $bankname_branch_vietnam,
                OPTIONS_FIELDS::ADDRESS_BANKNAME_BRANCHVIETNAM_FIELD => $address_bankname_branch_vietnam,
                OPTIONS_FIELDS::NOBANK_FIELD => $nobank,
                OPTIONS_FIELDS::NAMELASTADDRESS_FIELD => $namelastaddress,
                OPTIONS_FIELDS::NOZIP_FIELD => $nozip,
                OPTIONS_FIELDS::AVATAR_USER_FIELD => $avatar,
                OPTIONS_FIELDS::ROLE_IS_ADMIN_FIELD => $is_admin_role,
                //
                OPTIONS_FIELDS::HOSO_NENKIN_ANHTHENGOAIKIEU_FIELD => $frontcard,
                OPTIONS_FIELDS::HOSO_NENKIN_ANHNENKIN_FIELD => $anhnenkins,
                OPTIONS_FIELDS::HOSO_NENKIN_ANHHOCHIEU_FIELD => $anhhochieu,
                OPTIONS_FIELDS::HOSO_NENKIN_ANHNGANHANG_FIELD => $anhnganhang,
                //
                OPTIONS_FIELDS::HOSO_HOANTHUE_GENSEN_FIELD => $hoanthue_gensen,
                OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYCHUYENTIEN_FIELD => $hoanthue_giaychuyentien,
                OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYTOCMQUANHE_FIELD => $hoanthue_giaycmquanhe,
                OPTIONS_FIELDS::HOSO_HOANTHUE_HOCHIEU_FIELD => $hoanthue_hochieu,
                OPTIONS_FIELDS::HOSO_HOANTHUE_MYNUMBER_FIELD => $hoanthue_mynumber,
                OPTIONS_FIELDS::HOSO_HOANTHUE_SOTTTAIKHOAN_FIELD => $hoanthue_sotttaikhoan,
                OPTIONS_FIELDS::HOSO_HOANTHUE_NGOAIKIEU_FIELD => $hoanthue_ngoaikieu,
                //
                OPTIONS_FIELDS::HOSO_CURRENT_STEP_FIELD => $step,
                OPTIONS_FIELDS::HOSO_VERIFIED_FIELD => $hs_verified,
                OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_FIELD => $confirm_nenkin_hs,
                OPTIONS_FIELDS::HOSO_NOTIFICATIONS_FIELD => $hs_notifications,
                //
                OPTIONS_FIELDS::HOSO_SESSION_FIELD => $hs_session,
                OPTIONS_FIELDS::HOSO_REFUND_NENKIN_NO3_FIELD => $hs_refund_no3
            ]; 
        }
    }