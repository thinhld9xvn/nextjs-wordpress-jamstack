<?php 
    namespace Memberships;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetHoSoUserUtils;

    class RetrieveHosoCleanup {
        public static function perform() {
            $session_hoso_args = [
                [
                    'key' => OPTIONS_FIELDS::HOSO_ENDING_REPORTER_FLAG_KEY,
                    'value' => "s:14:\"session_status\";s:7:\"waiting\"",
                    'compare' => 'LIKE'
                ]
            ];
            $args = array_merge([], $session_hoso_args);
            $data = OptionsGetHoSoUserUtils::get_users_pagination(1, -1, '', $args)['data'];
            foreach($data as $key => $user) :     
                if ( RetrieveHosoSessionUtils::checkHosoExpired($user->ID) && 
                        RetrieveHosoSessionUtils::getExpiredDay($user->ID) === 0 ) :
                    RetrieveHoSoFields::update_meta_ending_reporter_matching_flag($user->ID, 'expired', true);
                endif;
            endforeach;
        }
    }