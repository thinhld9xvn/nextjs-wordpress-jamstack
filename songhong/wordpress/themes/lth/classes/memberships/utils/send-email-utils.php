<?php 
    namespace Memberships;
    use Options\OPTIONS_EMAIL_FIELDS;
    
    class SendEmailUtils {
        public static function perform($params) {
            $to = $params[OPTIONS_EMAIL_FIELDS::TO];
            $attachment = $params[OPTIONS_EMAIL_FIELDS::ATTACHMENT];
            list($subject, $message) = ParseEmailUtils::perform($params);
            //
            $header = [
                'Content-Type: text/html; charset=UTF-8'
            ];
            wp_mail($to, $subject, $message, $header, !empty($attachment) ? [$attachment] : 
                                                                            []);
        }
    }