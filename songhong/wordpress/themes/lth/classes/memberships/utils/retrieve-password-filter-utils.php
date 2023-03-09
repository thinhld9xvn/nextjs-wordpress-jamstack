<?php 
    namespace Memberships;
    class retrievePasswordFilterUtils {
        public static function perform( $message, $key, $user_login, $user_data ) {
            $url = get_field('url_jamstack', 'options');
            $site_name = wp_specialchars_decode( get_option( 'blogname' ), ENT_QUOTES );
            $message   = __( 'Someone has requested a password reset for the following account:' ) . "\r\n\r\n";
            /* translators: %s: Site name. */
            $message .= sprintf( __( 'Site Name: %s', 'gco' ), $site_name ) . "\r\n\r\n";
            /* translators: %s: User login. */
            $message .= sprintf( __( 'Username: %s', 'gco' ), $user_login ) . "\r\n\r\n";
            $message .= __( 'If this was a mistake, ignore this email and nothing will happen.' ) . "\r\n\r\n";
            $message .= __( 'To reset your password, visit the following address:' ) . "\r\n\r\n";
            $message .= $url . "/reset-password/?username={$user_login}&key={$key}\r\n\r\n";
            $requester_ip = $_SERVER['REMOTE_ADDR'];
            if ( $requester_ip ) {
                $message .= sprintf(
                /* translators: %s: IP address of password reset requester. */
                    __( 'This password reset request originated from the IP address %s.' ),
                    $requester_ip
                ) . "\r\n";
            }
            return $message;
        }
    }