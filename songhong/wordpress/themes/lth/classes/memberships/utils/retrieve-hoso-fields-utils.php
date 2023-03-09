<?php 
    namespace Memberships;
    use Options\OPTIONS_FIELDS;

    class RetrieveHoSoFields {
        public static function get_meta_step($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::HOSO_STEP_KEY, true);
            return !empty($meta) ? $meta : 0;
        }
        public static function get_meta_updated($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::HOSO_UPDATED_KEY, true);
            return !empty($meta) ? $meta : false;
        }
        public static function get_meta_verified($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::HOSO_VERIFIED_KEY, true);
            return !empty($meta) ? $meta : false;
        }
        public static function get_meta_account_verified_flag($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::HOSO_VERIFIED_MODE_KEY, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_confirmed($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_KEY, true);
            return !empty($meta) ? $meta : [];
        }
        public static function get_meta_fullname($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::USER_FULLNAME_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_fullname_jp($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::FULLNAMEJP_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_facebook($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::USER_FACEBOOKINFO_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_address($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::USER_ADDRESS_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_phone($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::USER_PHONE_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_name_unsigned($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::NAMEUNSIGNED_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_birthday($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::BIRTHDAY_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_nenkincode($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::NENKINCODE_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_companyinfo($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::COMPANYINFO_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_bankname($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::BANKNAME_VIETNAM_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_brach_bankname($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::BANKNAME_BRANCHVIETNAM_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_address_brach_bankname($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::ADDRESS_BANKNAME_BRANCHVIETNAM_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_nobank($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::NOBANK_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_name_lastaddress($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::NAMELASTADDRESS_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_zipcode($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::NOZIP_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_avatar($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::AVATAR_USER_FIELD, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_ending_reporter_flag($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::HOSO_ENDING_REPORTER_FLAG_KEY, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_account_notifications($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::HOSO_NOTIFICATIONS_KEY, true);
            return !empty($meta) ? $meta : [];
        }
        public static function get_meta_account_deny_msg($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::HOSO_DENY_MSG_KEY, true);
            return !empty($meta) ? $meta : '';
        }
        public static function get_meta_account_refund_nenkin_no3($user_id) {
            $meta = get_user_meta($user_id, OPTIONS_FIELDS::HOSO_REFUND_NENKIN_NO3_KEY, true);
            if ( is_null($meta) ) return null;
            return (bool) $meta;
        }
        //
        public static function update_meta_confirmed($user_id, $no, $url_confirmed = false, $status = 'waiting') {
            $confirmed = self::get_meta_confirmed($user_id);
            $url = FALSE === $url_confirmed ? $confirmed[$no]['url_confirmed'] : $url_confirmed;
            $confirmed[$no] = [
                'no' => $no,
                'status' => $status,
                'url_confirmed' => $url
            ];
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_KEY, $confirmed);
            return $confirmed;
        }
        public static function update_meta_step($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_STEP_KEY, $v);
        }
        public static function update_meta_updated($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_UPDATED_KEY, $v);
        }
        public static function update_meta_verified($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_VERIFIED_KEY, $v);
        }
        public static function update_meta_fullname($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::USER_FULLNAME_FIELD, $v);
        }
        public static function update_meta_address($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::USER_ADDRESS_FIELD, $v);
        }
        public static function update_meta_phone($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::USER_PHONE_FIELD, $v);
        }
        public static function update_meta_facebook($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::USER_FACEBOOKINFO_FIELD, $v);
        }
        public static function update_meta_fullname_jp($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::FULLNAMEJP_FIELD, $v);
        }
        public static function update_meta_nameunsigned($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::NAMEUNSIGNED_FIELD, $v);
        }
        public static function update_meta_birthday($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::BIRTHDAY_FIELD, $v);
        }
        public static function update_meta_nenkincode($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::NENKINCODE_FIELD, $v);
        }
        public static function update_meta_companyinfo($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::COMPANYINFO_FIELD, $v);
        }
        public static function update_meta_bankname($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::BANKNAME_VIETNAM_FIELD, $v);
        }
        public static function update_meta_branch_bankname($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::BANKNAME_BRANCHVIETNAM_FIELD, $v);
        }
        public static function update_meta_address_branch_bankname($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::ADDRESS_BANKNAME_BRANCHVIETNAM_FIELD, $v);
        }
        public static function update_meta_nobank($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::NOBANK_FIELD, $v);
        }
        public static function update_meta_name_lastaddress($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::NAMELASTADDRESS_FIELD, $v);
        }
        public static function update_meta_zipcode($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::NOZIP_FIELD, $v);
        }
        public static function update_meta_avatar($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::AVATAR_USER_FIELD, $v);
        }
        public static function update_meta_ending_reporter_flag($user_id, $status = 'waiting', $started = '', $expired = '', $is_expired = false ) {
            $started = empty($started) ? time() * 1000 : $started; // miliseconds - async in javascript
            $expired = empty($expired) ? $started + 30 * ONE_DAY_MILISECONDS : $expired;
            $value = [
                'session_status' => $status,
                'session_started' => $started,
                'session_expired' => $expired,
                'expired' => $is_expired
            ];
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_ENDING_REPORTER_FLAG_KEY, $value);
        }        
        public static function update_meta_ending_reporter_matching_flag($user_id, $status = 'waiting', $is_expired = false ) {
            $meta_session = self::get_meta_ending_reporter_flag($user_id);
            if ( empty($meta_session) ) :
                self::update_meta_ending_reporter_flag($user_id, $status, '', '', $is_expired);
                return true;
            endif;
            $meta_session['session_status'] = $status;
            $meta_session['expired'] = $is_expired;
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_ENDING_REPORTER_FLAG_KEY, $meta_session);
        }        
        public static function update_meta_account_notifications($user_id, $notifications) {
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_NOTIFICATIONS_KEY, $notifications);
        }
        public static function update_meta_account_deny_message($user_id, $msg) {
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_DENY_MSG_KEY, $msg);
        }
        public static function update_meta_account_verified_flag($user_id, $flag) {
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_VERIFIED_MODE_KEY, $flag);
        }
        public static function update_meta_account_refund_nenkin_no3($user_id, $v) {
            update_user_meta($user_id, OPTIONS_FIELDS::HOSO_REFUND_NENKIN_NO3_KEY, $v);
        }
        //
        public static function reset_meta_user($user_id) {
            self::delete_meta_verified($user_id);
            self::delete_meta_step($user_id);
            self::delete_meta_confirm($user_id);
            self::delete_meta_account_refund_nenkin_no3($user_id);
            self::delete_meta_ending_reporter_flag($user_id);
        }
        public static function delete_meta_verified($user_id) {
            delete_user_meta($user_id, OPTIONS_FIELDS::HOSO_VERIFIED_KEY);
        }
        public static function delete_meta_step($user_id) {
            delete_user_meta($user_id, OPTIONS_FIELDS::HOSO_STEP_KEY);
        }
        public static function delete_meta_confirm($user_id) {
            delete_user_meta($user_id, OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_KEY);
        }
        public static function delete_meta_account_refund_nenkin_no3($user_id) {
           delete_user_meta($user_id, OPTIONS_FIELDS::HOSO_REFUND_NENKIN_NO3_KEY);
        }
        public static function delete_meta_ending_reporter_flag($user_id) {
            delete_user_meta($user_id, OPTIONS_FIELDS::HOSO_ENDING_REPORTER_FLAG_KEY);
        }
    }