<?php 
    namespace Options;
    use Memberships\RetrieveHoSoFields;

    class OptionsGetEmailsUtils {
        public static function get_by_code($userId, $code) {
            $user = get_user_by('id', $userId);
            $site_jamstack_url = get_field('url_jamstack', 'options');
            $username = $user->user_login;
            $emails_section = get_field('section_emails', 'options');
            $results = [];
            $hotline = HOTLINE_DEFAULT;
            $fullname = RetrieveHoSoFields::get_meta_fullname($userId);
            foreach($emails_section as $key => $section) :
                if ( $section[OPTIONS_EMAIL_FIELDS::CODE] === $code ) :
                    $results = $section;
                    break;
                endif;
            endforeach;
            $results[OPTIONS_EMAIL_FIELDS::E_USERNAME] = $username;
            $results[OPTIONS_EMAIL_FIELDS::E_HOTLINE] = $hotline;
            $results[OPTIONS_EMAIL_FIELDS::E_FULLNAME] = $fullname;
            $results[OPTIONS_EMAIL_FIELDS::E_SITENAME] = SITENAME_DEFAULT;
            $results[OPTIONS_EMAIL_FIELDS::E_SITEURL] = sprintf("<a href='%s'>%s</a>", $site_jamstack_url, SITENAME_DEFAULT);
            return $results;
        }
    }