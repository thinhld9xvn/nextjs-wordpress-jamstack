<?php 
    namespace WP_GraphQL;

    use GraphQL\Error\UserError;
    use Memberships\RetrieveHoSoFields;
    use Memberships\SendEmailUtils;
    use Options\OPTIONS_EMAIL_FIELDS;
    use Options\OPTIONS_EMAIL_STEPS_FIELDS;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetEmailsUtils;
use Uploads\RetrieveUploadsHandlerUtils;

    class GQLRegisterAccountHoSoReportMutationUtils {   
        public static function register() {
            $mutation_name = 'reportHosoStepUser';
            $config = [
                'inputFields'         => [
                    'userId' => [
                        'type' => 'Int'
                    ],
                    'step' => [
                        'type' => 'Int'
                    ],
                    'metadata' => [
                        'type' => 'String'
                    ],
                    'attachmentFile' => [
                        'type' => 'Upload'
                    ]
                ],
                'outputFields'        => [
                    'success' => [
                        'type' => 'Boolean'
                    ]
                ],
                'mutateAndGetPayload' => function( $input, $context, $info ) {
                    $user_id = (int) $input['userId'];
                    $user = get_user_by('id', $user_id);
                    $user_email = $user->user_email;
                    //
                    $step = (int) $input['step'];
                    $metadata = $input['metadata'] ? json_decode($input['metadata'], true) : [];
                    $site_jamstack_url = get_field('url_jamstack', 'options');
                    $notifications = RetrieveHoSoFields::get_meta_account_notifications($user_id);
                    $attachmentFile = '';
                    if ( !empty($input['attachmentFile']) ) :
                        $throwErrors = RetrieveUploadsHandlerUtils::handle_upload_filesize_error($input['attachmentFile']);
                        if ( $throwErrors ) :
                            throw new UserError( __( $throwErrors['message'], 'wp-graphql' ) );
                        endif;
                        $results = RetrieveUploadsHandlerUtils::upload_sideload($input['attachmentFile']);
                        $attachmentFile = $results['file'];
                    endif;
                    if ( $step === OPTIONS_EMAIL_STEPS_FIELDS::CHECK_TO_NENKIN_STEP ) :
                        $isApproved = FALSE !== $metadata['approved'];
                        $denyReasonMsg = $metadata['deny_reason_msg'];
                        $params = OptionsGetEmailsUtils::get_by_code($user_id, 
                                                                     $isApproved ? OPTIONS_EMAIL_STEPS_FIELDS::E_CHECK_TO_NENKIN_CODE :
                                                                                    OPTIONS_EMAIL_STEPS_FIELDS::E_DENY_REPORTER_CODE);
                        $params[OPTIONS_EMAIL_FIELDS::TO] = $user_email;
                        $params[OPTIONS_EMAIL_FIELDS::E_REASONMSG] = $denyReasonMsg ? 
                                                                        "<span style='padding-left: 20px; font-weight: bold; color: #dc0404'>\"{$metadata['deny_reason_msg']}\"</span>" : "";
                        SendEmailUtils::perform($params);
                        array_push($notifications, $isApproved ? 'hosoduocchapnhan_label' : 'hosodabituchoi_label');
                        RetrieveHoSoFields::update_meta_account_notifications($user_id, $notifications);
                        if ( $denyReasonMsg ) :                        
                            RetrieveHoSoFields::update_meta_account_deny_message($user_id, $denyReasonMsg);
                            RetrieveHoSoFields::update_meta_account_verified_flag($user_id, OPTIONS_FIELDS::HOSO_VERIFIED_TRYAGAIN_FLAG);
                            RetrieveHoSoFields::reset_meta_user($user_id);
                            return false;
                        endif;
                    endif;    
                    if ( $step === OPTIONS_EMAIL_STEPS_FIELDS::NENKIN_RESULTS_NO1_STEP ) :
                        $params = OptionsGetEmailsUtils::get_by_code($user_id,                                     
                                                                        OPTIONS_EMAIL_STEPS_FIELDS::E_NENKIN_RESULTS_NO1_CODE);
                        $params[OPTIONS_EMAIL_FIELDS::TO] = $user_email;
                        SendEmailUtils::perform($params);                        
                    endif;
                    if ( $step === OPTIONS_EMAIL_STEPS_FIELDS::NENKIN_CONFIRM_NO1_STEP ) :                        
                        $params = OptionsGetEmailsUtils::get_by_code($user_id,                                     
                                                                        OPTIONS_EMAIL_STEPS_FIELDS::E_NENKIN_CONFIRM_NO1_CODE);
                        $params[OPTIONS_EMAIL_FIELDS::TO] = $user_email;
                        $params[OPTIONS_EMAIL_FIELDS::ATTACHMENT] = $attachmentFile;
                        $confirm_url = create_nenkin_confirm_link($site_jamstack_url . NENKINS_NO1_SLUG, 
                                                                    create_key_hash($user_id, 1), 
                                                                    create_token_hash($user_id, 1));
                        $params[OPTIONS_EMAIL_FIELDS::E_CONFIRMLINK] = "<a target='_blank' href='{$confirm_url}'>{$confirm_url}</a>";
                        RetrieveHoSoFields::update_meta_confirmed($user_id, 1, $confirm_url, 'waiting');
                        SendEmailUtils::perform($params);         
                        array_push($notifications, 'hosoduocduyetnhantiennenkinl1_label');
                        RetrieveHoSoFields::update_meta_account_notifications($user_id, $notifications);              
                    endif;
                    if ( $step === OPTIONS_EMAIL_STEPS_FIELDS::NENKIN_RESULTS_NO2_STEP ) :
                        $params = OptionsGetEmailsUtils::get_by_code($user_id,                                     
                                                                     OPTIONS_EMAIL_STEPS_FIELDS::E_NENKIN_RESULTS_NO2_CODE);
                        $params[OPTIONS_EMAIL_FIELDS::TO] = $user_email;
                        SendEmailUtils::perform($params);
                    endif;
                    if ( $step === OPTIONS_EMAIL_STEPS_FIELDS::NENKIN_CONFIRM_NO2_STEP ) :
                        $params = OptionsGetEmailsUtils::get_by_code($user_id,                                     
                                                                        OPTIONS_EMAIL_STEPS_FIELDS::E_NENKIN_CONFIRM_NO2_CODE);
                        $params[OPTIONS_EMAIL_FIELDS::TO] = $user_email;
                        $params[OPTIONS_EMAIL_FIELDS::ATTACHMENT] = $attachmentFile;
                        $confirm_url = create_nenkin_confirm_link($site_jamstack_url . NENKINS_NO2_SLUG, 
                                                                    create_key_hash($user_id, 2), 
                                                                    create_token_hash($user_id, 2));
                        $params[OPTIONS_EMAIL_FIELDS::E_CONFIRMLINK] = "<a target='_blank' href='{$confirm_url}'>{$confirm_url}</a>";
                        RetrieveHoSoFields::update_meta_confirmed($user_id, 2, $confirm_url, 'waiting');
                        SendEmailUtils::perform($params);
                        array_push($notifications, 'hosoduocduyetnhantiennenkinl2_label');
                        RetrieveHoSoFields::update_meta_account_notifications($user_id, $notifications);
                    endif;
                    if ( $step === OPTIONS_EMAIL_STEPS_FIELDS::NENKIN_FINISH_REFUND_NO3_STEP ) :
                        $params = OptionsGetEmailsUtils::get_by_code($user_id,                                     
                                                                        OPTIONS_EMAIL_STEPS_FIELDS::E_NENKIN_FINISH_REFUND_NO3_CODE);
                        $params[OPTIONS_EMAIL_FIELDS::TO] = $user_email;
                        SendEmailUtils::perform($params);
                    endif;
                    if ( $step === OPTIONS_EMAIL_STEPS_FIELDS::NENKIN_CONFIRM_NO3_STEP ) :
                        $params = OptionsGetEmailsUtils::get_by_code($user_id,                                     
                                                                        OPTIONS_EMAIL_STEPS_FIELDS::E_NENKIN_CONFIRM_NO3_CODE);
                        $confirm_url = create_nenkin_confirm_link($site_jamstack_url . NENKINS_NO2_SLUG, 
                                                                    create_key_hash($user_id, 3), 
                                                                    create_token_hash($user_id, 3));
                        $params[OPTIONS_EMAIL_FIELDS::E_CONFIRMLINK] = "<a target='_blank' href='{$confirm_url}'>{$confirm_url}</a>";
                        $params[OPTIONS_EMAIL_FIELDS::TO] = $user_email;
                        $params[OPTIONS_EMAIL_FIELDS::ATTACHMENT] = $attachmentFile;
                        RetrieveHoSoFields::update_meta_confirmed($user_id, 3, 'waiting');
                        SendEmailUtils::perform($params);
                        array_push($notifications, 'hosoduocduyetnhantiennenkinl3_label');
                        RetrieveHoSoFields::update_meta_account_notifications($user_id, $notifications);
                    endif;
                    if ( $step === OPTIONS_EMAIL_STEPS_FIELDS::ENDING_REPORTER_STEP ) :
                        $params = OptionsGetEmailsUtils::get_by_code($user_id,                                     
                                                                        OPTIONS_EMAIL_STEPS_FIELDS::E_ENDING_REPORTER_CODE);
                        $params[OPTIONS_EMAIL_FIELDS::TO] = $user_email;
                        RetrieveHoSoFields::update_meta_ending_reporter_flag($user_id, 'waiting');
                        SendEmailUtils::perform($params); 
                        array_push($notifications, 'kthopdongsaunngay_label');
                        RetrieveHoSoFields::update_meta_account_notifications($user_id, $notifications);
                    endif;
                    RetrieveHoSoFields::update_meta_step($user_id, $step);
                    return [
                        'success' => true
                    ];
                }
            ]; 
            GraphQLRegisterMutationUtils::register($mutation_name, $config);   
        }
    }