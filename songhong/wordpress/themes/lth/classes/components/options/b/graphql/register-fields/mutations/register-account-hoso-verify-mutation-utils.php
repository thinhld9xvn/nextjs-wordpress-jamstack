<?php 
    namespace WP_GraphQL;
    use Memberships\RetrieveHoSoFields;
use Options\OPTIONS_FIELDS;
use Options\OptionsGetTranslations;
use Translations;

    class GQLRegisterAccountHoSoVerifyMutationUtils {   
        public static function register() {
            $mutation_name = 'verifyHoso';
            $config = [
                'inputFields'         => [
                    'userId' => [
                        'type' => 'Int'
                    ]
                ],
                'outputFields'        => [
                    'success' => [
                        'type' => 'Boolean'
                    ]
                ],
                'mutateAndGetPayload' => function( $input, $context, $info ) {
                    $user_id = (int) $input['userId'];
                    $notifications = RetrieveHoSoFields::get_meta_account_notifications($user_id);
                    RetrieveHoSoFields::update_meta_verified($user_id, true);
                    RetrieveHoSoFields::update_meta_account_verified_flag($user_id, OPTIONS_FIELDS::HOSO_VERIFIED_FLAG);
                    array_push($notifications, 'dacapnhaths_label');
                    array_push($notifications, 'processinghoso_label');
                    RetrieveHoSoFields::update_meta_account_notifications($user_id, $notifications);
                    return [
                        'success' => true
                    ];
                }
            ]; 
            GraphQLRegisterMutationUtils::register($mutation_name, $config);   
        }
    }