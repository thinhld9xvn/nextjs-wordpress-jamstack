<?php 
    namespace Options;
    use Memberships\RetrieveHoSoFields;
    class OptionsGetUserHosoProgressingUtils {
        public static function get($userId) {
            $step = RetrieveHoSoFields::get_meta_step($userId);
            $is_refund = RetrieveHoSoFields::get_meta_account_refund_nenkin_no3($userId);
            return [
                OPTIONS_FIELDS::HOSO_CURRENT_STEP_FIELD => $step,
                OPTIONS_FIELDS::HOSO_REFUND_NENKIN_NO3_FIELD => $is_refund
            ]; 
        }
    }