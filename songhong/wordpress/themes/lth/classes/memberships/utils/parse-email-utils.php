<?php 
    namespace Memberships;
    use Options\OPTIONS_EMAIL_FIELDS;
    class ParseEmailUtils {
        public static function perform($params) {
            $subject = $params[OPTIONS_EMAIL_FIELDS::SUBJECT];
            $message = $params[OPTIONS_EMAIL_FIELDS::MESSAGE];
            $fullname = $params[OPTIONS_EMAIL_FIELDS::E_FULLNAME];
            $hotline = $params[OPTIONS_EMAIL_FIELDS::E_HOTLINE];
            $sitename = $params[OPTIONS_EMAIL_FIELDS::E_SITENAME];
            $siteurl = $params[OPTIONS_EMAIL_FIELDS::E_SITEURL];
            $username = $params[OPTIONS_EMAIL_FIELDS::E_USERNAME];
            $confirmlink = $params[OPTIONS_EMAIL_FIELDS::E_CONFIRMLINK];
            $reasonmsg = $params[OPTIONS_EMAIL_FIELDS::E_REASONMSG];
            //
            $subject = preg_replace("/\{\%sitename\}/", isset($sitename) ? $sitename : '', $subject);
            //
            $message = preg_replace("/\{\%fullname\}/", isset($fullname) ? $fullname : '', $message);
            $message = preg_replace("/\{\%hotline\}/", isset($hotline) ? $hotline : '', $message);
            $message = preg_replace("/\{\%sitename\}/", isset($sitename) ? $sitename : '', $message);
            $message = preg_replace("/\{\%siteurl\}/", isset($siteurl) ? $siteurl : '', $message);
            $message = preg_replace("/\{\%username\}/", isset($username) ? $username : '', $message);
            $message = preg_replace("/\{\%confirmlink\}/", isset($confirmlink) ? $confirmlink : '', $message);
            $message = preg_replace("/\{\%reasonmsg\}/", isset($reasonmsg) ? $reasonmsg : '', $message);
            //
            return [$subject, $message];
        }
        public static function parse_by_template($params) {
            $subject = $params[OPTIONS_EMAIL_FIELDS::SUBJECT];
            $message = $params[OPTIONS_EMAIL_FIELDS::MESSAGE];
            $fullname = $params[OPTIONS_EMAIL_FIELDS::E_FULLNAME];
            $hotline = $params[OPTIONS_EMAIL_FIELDS::E_HOTLINE];
            $sitename = $params[OPTIONS_EMAIL_FIELDS::E_SITENAME];
            $siteurl = $params[OPTIONS_EMAIL_FIELDS::E_SITEURL];
            $username = $params[OPTIONS_EMAIL_FIELDS::E_USERNAME];
            //
            $subject = preg_replace("/\{\%sitename\}/", isset($sitename) ? $sitename : '', $subject);
            //
            $message = preg_replace("/\{\%fullname\}/", isset($fullname) ? $fullname : '', $message);
            $message = preg_replace("/\{\%hotline\}/", isset($hotline) ? $hotline : '', $message);
            $message = preg_replace("/\{\%sitename\}/", isset($sitename) ? $sitename : '', $message);
            $message = preg_replace("/\{\%siteurl\}/", isset($siteurl) ? $siteurl : '', $message);
            $message = preg_replace("/\{\%username\}/", isset($username) ? $username : '', $message);
            $message = preg_replace("/\{\%confirmlink\}/", '<span class="param_e_label">[link xác nhận]</span>', $message);
            $message = preg_replace("/\{\%reasonmsg\}/", '[lý do từ chối]', $message);
            //
            return $message;
        }
    }