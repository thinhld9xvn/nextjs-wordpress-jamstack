<?php 
    namespace Memberships;
    class RetrieveHosoSessionUtils {
        public static function checkHosoExpired($user_id) {
            $flag = RetrieveHoSoFields::get_meta_ending_reporter_flag($user_id);
            if ( empty($flag) ) return false;
            $session_started = $flag['session_started'];
            $session_expired = $flag['session_expired'];
            $session_now = time() * 1000;
            return ($session_now - $session_started) >= $session_expired;
        }
        public static function payloadFlagHosoExpired($user_id) {
            $flag = RetrieveHoSoFields::get_meta_ending_reporter_flag($user_id);
            $flag['expired'] = self::checkHosoExpired($user_id);
            $flag['session_status'] = $flag['expired'] ? 'expired' : $flag['session_status'];
            return $flag;
        }
        public static function getExpiredDay($user_id) {
            $flag = RetrieveHoSoFields::get_meta_ending_reporter_flag($user_id);
            if ( empty($flag) ) return -1;
            $session_expired = (int) $flag['session_expired'];
            $session_now = time() * 1000;
            return floor(absint($session_expired - $session_now) / ONE_DAY_MILISECONDS);
        }
    }