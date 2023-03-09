<?php 
    namespace Options;
    use Memberships\RetrieveHoSoFields;
    use Memberships\RetrieveHosoSessionUtils;

    class OptionsGetHoSoUserUtils {
        public static function get_users_pagination($paged, $num_per_page, $s = '', $metadata = []) {
            $args = array(
                'number' => $num_per_page,
                'paged' => $paged
            );
            $args['meta_query'] = [];
            if ( !empty($s) ) :		
                if ( FALSE !== filter_var($s, FILTER_VALIDATE_EMAIL) ) :
                    $args['who'] = 'authors';		
                    $args['search'] = $s;	
                    $args['search_columns'] = ['email'];
                else :
                    $args['meta_key'] = 'nickname';
                    $args['meta_value'] = $s;
                    $args['meta_compare'] = 'LIKE';
                endif;
            endif;	
            if ( !empty($metadata) ) :          
                foreach($metadata as $key => $item) :
                    foreach($item as $childkey => $it) :
                        $value = $it['value'];
                        $args['meta_query'][] = [
                            'key' => $it['key'],
                            'value' => $value,
                            'compare' => $it['compare']
                        ];
                    endforeach;
                endforeach;
            endif;
            if ( !empty($args['meta_query']) ) :
                $args['meta_query']['relation'] = 'OR';
            endif;
            //graphql_debug($args);
            $users = new \WP_User_Query( $args );
            $totals = $users->get_total();
            $data = $users->get_results();
            if ( !empty($s) ) :
                $sorted = [];
                $usorted = [];
                foreach ($data as $key => $user) :
                    $username = $user->user_login;
                    if ( 0 === strpos($username, $s) ) : //startsWith
                        $sorted[] = $user;
                    else :
                        $usorted[] = $user;
                    endif;
                endforeach;
                //graphql_debug($sorted);
                $data = array_merge($sorted, $usorted);
            endif;
            return [
                'data' => $data,
                'totals' => $totals
            ];
        }
        public static function get($paged = 1, $num_per_page = 16, $s = '', $metadata = []) {
            $data = [
                'data' => [],
                'totals' => 0, 
                'paged' => $paged,
                'num_per_page' => $num_per_page
            ];
            $results = self::get_users_pagination($paged, $num_per_page, $s, $metadata);
            foreach($results['data'] as $user) :
                $userId = $user->ID;
                $email = $user->user_email;
                $avatar = RetrieveHoSoFields::get_meta_avatar($userId);
                $fullname = RetrieveHoSoFields::get_meta_fullname($userId);
                $address = RetrieveHoSoFields::get_meta_address($userId);
                $phone = RetrieveHoSoFields::get_meta_phone($userId);
                $hs_verified = RetrieveHoSoFields::get_meta_verified($userId);
                $hs_confirmed = RetrieveHoSoFields::get_meta_confirmed($userId);
                $hs_session = RetrieveHosoSessionUtils::payloadFlagHosoExpired($userId);
                $date_created = date( "d/m/Y", strtotime( $user->user_registered ) );
                $hs_notifications = RetrieveHoSoFields::get_meta_account_notifications($userId);
                $data['data'][] = [
                    OPTIONS_FIELDS::USER_ID_FIELD => $user->ID,
                    OPTIONS_FIELDS::USER_NAME_FIELD => $user->user_login,
                    OPTIONS_FIELDS::USER_AVATAR_FIELD => $avatar,
                    OPTIONS_FIELDS::USER_FULLNAME_FIELD => $fullname,
                    OPTIONS_FIELDS::USER_EMAIL_FIELD => $email,
                    OPTIONS_FIELDS::USER_ADDRESS_FIELD => $address,
                    OPTIONS_FIELDS::USER_DATE_CREATED_FIELD => $date_created,
                    OPTIONS_FIELDS::USER_PHONE_FIELD => $phone,
                    OPTIONS_FIELDS::HOSO_VERIFIED_FIELD => $hs_verified,
                    OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_FIELD => $hs_confirmed,
                    OPTIONS_FIELDS::HOSO_SESSION_FIELD => $hs_session,
                    OPTIONS_FIELDS::HOSO_NOTIFICATIONS_FIELD => $hs_notifications
                ];
            endforeach;
            $data['totals'] = $results['totals'];
            return $data;
        }
    }