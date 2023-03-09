<?php 
    namespace Memberships;

    use Options\OPTIONS_EMAIL_FIELDS;
    use Options\OPTIONS_EMAIL_STEPS_FIELDS;
    use Options\OptionsGetEmailsUtils;

    class CreateUserHosoUtils {
        public static function perform($user_id) {
            $user = get_user_by('id', $user_id);
            $user_email = $user->user_email;
            $user_login = $user->user_login;
            $section = OptionsGetEmailsUtils::get_by_code($user_id, OPTIONS_EMAIL_STEPS_FIELDS::E_REGISTER_CODE);            
            $my_post = array(
                'post_title'    => "hoso__{$user_login}",
                'post_content'  => '',
                'post_name' => "hoso-{$user_login}",
                'post_status'   => 'publish',
                'post_author'   => (int) $user_id,
                'post_type' => HOSOPT
            );
            $results = wp_insert_post( $my_post );
            if ( !is_wp_error($results) ) :
                SendEmailUtils::perform([
                    OPTIONS_EMAIL_FIELDS::TO => $user_email,
                    OPTIONS_EMAIL_FIELDS::SUBJECT => $section[OPTIONS_EMAIL_FIELDS::SUBJECT],
                    OPTIONS_EMAIL_FIELDS::MESSAGE => $section[OPTIONS_EMAIL_FIELDS::MESSAGE],
                    OPTIONS_EMAIL_FIELDS::E_USERNAME => $section[OPTIONS_EMAIL_FIELDS::E_USERNAME],
                    OPTIONS_EMAIL_FIELDS::E_FULLNAME => $section[OPTIONS_EMAIL_FIELDS::E_FULLNAME],
                    OPTIONS_EMAIL_FIELDS::E_HOTLINE => $section[OPTIONS_EMAIL_FIELDS::E_HOTLINE],
                    OPTIONS_EMAIL_FIELDS::E_SITENAME => $section[OPTIONS_EMAIL_FIELDS::E_SITENAME],
                    OPTIONS_EMAIL_FIELDS::E_SITEURL => $section[OPTIONS_EMAIL_FIELDS::E_SITEURL],
                ]);
            endif;
        }
    }