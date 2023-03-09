<?php   
    namespace Uploads;

    class RetrieveUploadsHandlerUtils {
        public static function getMaxUploadSize() {
            $max_default_size = 5 * 1024 * 1024; // bytes
            $max_upload_size = wp_max_upload_size() * 1024 * 1024; // bytes
            return $max_default_size > $max_upload_size ? $max_default_size : $max_upload_size;
        }
        public static function upload_sideload($file) {
            if (!function_exists('wp_handle_sideload')) {
                require_once(ABSPATH . 'wp-admin/includes/file.php');
            }
            return wp_handle_sideload($file, [
                'test_form' => false,
                'test_type' => false,
            ]);
        }
        public static function upload_media_sideload($file) {
            require_once(ABSPATH . "wp-admin" . '/includes/image.php');
            require_once(ABSPATH . "wp-admin" . '/includes/file.php');
            require_once(ABSPATH . "wp-admin" . '/includes/media.php');
            $file_array = array(
                'name' => $file['name'],
                'tmp_name' => $file['tmp_name']
            );            
            return media_handle_sideload( $file_array, '0' );
        }
        public static function handle_upload_filesize_error($file) {
            $max_upload_size = self::getMaxUploadSize();
            $filesize = filesize($file['tmp_name']);
            if ( $filesize > ($max_upload_size) ) :
                return [
                    'message' => 'filesizeexceedmb',
                    'exceeded' => $max_upload_size,
                    'success' => false
                ];
            endif;
            return false;
        }
    }