<?php 
    namespace WP_GraphQL;
    use Memberships\RetrieveHoSoFields;
    use Memberships\RetrieveHosoSessionUtils;
    use Options\OPTIONS_FIELDS;
    class GQLRegisterAccountHoSoNotificationsFieldsUtils {
        public static function register() {
            $args = [
                'userId' => [
                    'type' => 'Int'
                ]
            ];
            $field_name = 'getAccountHosoNotificationsOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $userId = $args['userId'];
                $expiredDays = RetrieveHosoSessionUtils::getExpiredDay($userId);
                $notifications = RetrieveHoSoFields::get_meta_account_notifications($userId);
                $deny_msg = RetrieveHoSoFields::get_meta_account_deny_msg($userId);
                $confirmed = RetrieveHoSoFields::get_meta_confirmed($userId);
                return [
                    OPTIONS_FIELDS::HOSO_NOTIFICATIONS_FIELD => $notifications,
                    OPTIONS_FIELDS::HOSO_EXPIRED_DAYS_FIELD => $expiredDays,
                    OPTIONS_FIELDS::HOSO_DENY_MESSAGE_FIELD => $deny_msg,
                    OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_FIELD => $confirmed
                ];
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_ACCOUNT_HOSO_NOTIFICATIONS_SCHEMA_TYPE);    
        }
    }