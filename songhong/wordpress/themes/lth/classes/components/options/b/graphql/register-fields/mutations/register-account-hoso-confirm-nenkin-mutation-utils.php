<?php 
    namespace WP_GraphQL;
    use Memberships\RetrieveHoSoFields;
    
    class GQLRegisterAccountHoSoConfirmNenkinMutationUtils {    
        public static function register() {  
            $mutation_name = 'confirmNenkinMoney';
            $config = [
                'inputFields'         => [
                    'key' => [
                        'type' => 'String'
                    ],
                    'token' => [
                        'type' => 'String'
                    ]
                ],
                'outputFields'        => [
                    'success' => [
                        'type' => 'Boolean'
                    ],
                    'msg' => [
                        'type' => 'String'
                    ]
                ],
                'mutateAndGetPayload' => function( $input, $context, $info ) {
                    $key = $input['key'];
                    $token = $input['token'];
                    if ( !check_token_validate($token) || 
                        !check_key_validate($key) ) :
                        return [
                            'success' => false,
                            'msg' => 'Key hoặc Token đầu vào không hợp lệ.'
                        ];
                    endif;                    
                    $keyDecoded = decode_key_hash($key);
                    $tokenDecoded = decode_token_hash($token);                    
                    $tokenExDecoded = get_token_by_decoded($tokenDecoded);
                    list($user_id, $no) = get_meta_by_key_decoded($keyDecoded, $tokenExDecoded);
                    $notifications = RetrieveHoSoFields::get_meta_account_notifications($user_id);
                    $confirm_results = RetrieveHoSoFields::update_meta_confirmed($user_id, $no, false, 'success');
                    array_push($notifications, "bandaxacnhannhanduoctiennenkinl{$no}_label");
                    RetrieveHoSoFields::update_meta_account_notifications($user_id, $notifications);
                    return [
                        'success' => true,
                        'msg' => 'success'
                    ];
                }
            ]; 
            GraphQLRegisterMutationUtils::register($mutation_name, $config);   
        }
    }