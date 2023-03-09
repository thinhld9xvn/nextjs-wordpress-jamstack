<?php

use GuzzleHttp\RetryMiddleware;
use Memberships\RetrieveHoSoFields;
use Memberships\RetrieveHosoSessionUtils;
use Memberships\SendEmailUtils;
use Options\OPTIONS_EMAIL_FIELDS;
use Options\OPTIONS_EMAIL_STEPS_FIELDS;
use Options\OPTIONS_FIELDS;
use Options\OptionsGetEmailsUtils;
use Options\OptionsGetHoSoUserUtils;
use Options\OptionsGetTranslations;

define('HOME_URI', esc_url(home_url('/')));
// đường dẫn theme
define('THEME_DIR', get_template_directory());
define('THEME_URI', get_template_directory_uri());
// đường dẫn thư viện
define('LIBS_DIR', THEME_DIR . '/inc');
add_theme_support( 'post-thumbnails' );
add_theme_support('nav-menus');	
add_theme_support('widgets');	
add_theme_support( 'title-tag' );
acf_add_options_page(array(
	'page_title' 	=> 'Cài đặt website',
	'menu_title'	=> 'Cài đặt website',
	'menu_slug' 	=> 'theme-settings',
	'capability'	=> 'edit_posts',
	'redirect'		=> false
));
$args = array(
	'primary' => __( 'Primary Menu', 'gco' )
);
register_nav_menus( $args );
require_once(LIBS_DIR . '/constants.php');
//
require_once(LIBS_DIR . '/translations.php');
require_once THEME_DIR  . '/theme_settings/custom_post_types/options.php';
//
require_once ACTIONS_DIR . '/actions.php';
require_once UPLOADS_CLASS_DIR . '/uploads.php';
require_once SLIDER_CLASS_DIR . '/slider.php';
require_once OPTIONS_CLASS_DIR . '/options.php';
require_once POSTS_CLASS_DIR . '/posts.php';
require_once PAGES_CLASS_DIR . '/pages.php';
require_once TAX_CLASS_DIR . '/taxonomies.php';
require_once NAV_MENUS_CLASS_DIR . '/nav-menus.php';
require_once MEMBERSHIPS_CLASS_DIR . '/index.php';
require_once GRAPHQL_CLASS_DIR . '/graphql.php';
//add this to your functions.php file in your theme folder
function sb_add_cpts_to_api( $args, $post_type ) {
  $args['show_in_rest'] = true;
  return $args;
}
add_filter( 'register_post_type_args', 'sb_add_cpts_to_api', 10, 2 );
//
function filter_permalink($permalink) {
	if ( substr($permalink, 0, 4) !== 'http' ) return $permalink;
	$strs = explode('//', $permalink);
	$str = $permalink;
	if ( count($strs) > 0 ) :
		$strs = $strs[1];
		$strs = explode('/', $strs);
		unset($strs[0]);
		$str = implode('/', $strs);
		if ( substr($str, 0, 1) !== '/' ) :
			$str = '/' . $str;
		endif;
	endif;
	if ( substr($str, strlen($str) - 1) === '/' ) :
		return substr($str, 0, strlen($str) - 1);
	endif;
	return $str;
}	
function short_text($text, $limit) {
	$chars_text = strlen($text);				
	//add ... so the user knows the text is actually longer
	if ($chars_text > $limit) {
		$text = mb_substr( $text, 0, $limit, 'UTF-8' );	
		$text = $text . "...";
	}
	return $text;
}
function excerpt($limit) {
	return short_text( get_the_excerpt(), $limit );
}
function title($limit) {
	return short_text( get_the_title(), $limit );
}
function content($limit) {
	return short_text( get_the_content(), $limit );
}
function pn_get_attachment_id_from_url( $attachment_url = '' ) {
	global $wpdb;
	$attachment_id = false;
	// If there is no url, return.
	if ( '' == $attachment_url )
		return;
	// Get the upload directory paths
	$upload_dir_paths = wp_upload_dir();
	// Make sure the upload path base directory exists in the attachment URL, to verify that we're working with a media library image
	if ( false !== strpos( $attachment_url, $upload_dir_paths['baseurl'] ) ) {
		// If this is the URL of an auto-generated thumbnail, get the URL of the original image
		$attachment_url = preg_replace( '/-\d+x\d+(?=\.(jpg|jpeg|png|gif)$)/i', '', $attachment_url );
		// Remove the upload path base directory from the attachment URL
		$attachment_url = str_replace( $upload_dir_paths['baseurl'] . '/', '', $attachment_url );
		// Finally, run a custom database query to get the attachment ID from the modified attachment URL
		$attachment_id = $wpdb->get_var( $wpdb->prepare( "SELECT wposts.ID FROM $wpdb->posts wposts, $wpdb->postmeta wpostmeta WHERE wposts.ID = wpostmeta.post_id AND wpostmeta.meta_key = '_wp_attached_file' AND wpostmeta.meta_value = '%s' AND wposts.post_type = 'attachment'", $attachment_url ) );
	}
	return $attachment_id;
}
function generateRandomString($length = 10) {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyz';
    $charactersLength = strlen($characters);
    $randomString = '';
    for ($i = 0; $i < $length; $i++) {
        $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
}
add_filter( 'woocommerce_rest_check_permissions', 'my_woocommerce_rest_check_permissions', 90, 4 );
function my_woocommerce_rest_check_permissions( $permission, $context, $object_id, $post_type  ){
  return true;
}
function my_customize_rest_cors() {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function( $value ) {
		header( 'Access-Control-Allow-Origin: *' );
        header( 'Access-Control-Allow-Headers: *');
		header( 'Access-Control-Allow-Methods: GET, POST' );
		header( 'Access-Control-Allow-Credentials: true' );
		header( 'Access-Control-Expose-Headers: Link', false );
		return $value;
	} );
}
add_action( 'rest_api_init', 'my_customize_rest_cors', 15 );
function concat_path($s1, $s2) {
	$sub1 = substr($s1, strlen($s1) - 1);
	$sub2 = substr($s2, 0, 1);
	if ( $sub1 === '/' && $sub2 === '/' ) :
		return $s1 . substr($s2, 1);
	endif;
	if ( $sub1 === '/' || $sub2 === '/' ) :
		return $s1 . $s2;
	endif;
	return $s1 . '/' . $s2;
}
function get_jamstack_permalink($path, $permalink) {
	if ( substr($permalink, 0, 4) !== 'http' ) {
		return concat_path($path, $permalink);
	}
	return concat_path($path, filter_permalink($permalink));
}
add_filter ('user_has_cap', 'wpcs_prevent_deletion', 10, 3);
function wpcs_prevent_deletion ($allcaps, $caps, $args) {
	global $current_user;
	if (in_array('editor', $current_user->roles)) :
		if (isset($args[0]) && isset($args[2]) && $args[0] == 'delete_post') {
			$allcaps[$caps[0]] = false;
		}
	endif;
    return $allcaps;
}
//
add_action('user_register', array('\Memberships\createUserHosoUtils', 'perform'));
add_filter('posts_results', function($posts) {
	global $current_user;
	$filtered_posts = [];
	$boolV1 = !is_admin();
	$boolV2 = is_admin() && (empty($_GET['post_type']) || $_GET['post_type'] !== HOSOPT);
	$boolV3 = is_admin() && in_array('administrator', $current_user->roles);
	$boolCheck = $boolV1 || $boolV2 || $boolV3;
	if ( $boolCheck ) :
		return $posts;
	endif;
	foreach ( $posts as $post ) {
		$author_id = (int) $post->post_author;
		$user_id = (int) $current_user->ID;
		if ( $author_id === $user_id ) {
			$filtered_posts[] = $post;
		}
	}
	return $filtered_posts;
});
function rudr_filter_by_the_author() {
	$params = array(
		'name' => 'author', // this is the "name" attribute for filter <select>
		'show_option_all' => 'Tất cả tác giả' // label for all authors (display posts without filter)
	);
	if ( isset($_GET['user']) ) :
		$params['selected'] = $_GET['user']; // choose selected user by $_GET variable
	endif;
	wp_dropdown_users( $params ); // print the ready author list
}
function create_token_hash($user_id, $no) {
	$prefix = '_' . $user_id . '_' . $no;
	return base64_encode(SECURE_AUTH_SALT . $prefix);
}
function create_key_hash($user_id, $no) {
	$prefix = '_' . $user_id . '_' . $no;
	return base64_encode(base64_encode(SECURE_AUTH_SALT . $prefix));
}
function decode_token_hash($value) {
	return base64_decode($value);
}
function decode_key_hash($value) {
	return base64_decode(base64_decode($value));
}
function create_nenkin_confirm_link($url, $key, $token) {
	return add_query_arg(['key' => $key,
						  'token' => $token],
							$url);
}
function get_meta_by_key_decoded($keyStr, $tokenStr) {
	$offset = strlen($tokenStr) + 1;
	$decodeStr = substr($keyStr, $offset);
	//graphql_debug($decodeStr);
	$str = explode('_', $decodeStr);
	$user_id = (int) $str[0];
	$no = (int) $str[1];
	return [$user_id, $no];
}
function check_token_validate($token) {
	if ( !$token ) return false;
	$tokenDecoded = decode_token_hash($token);
	$tokenExts = explode('_', $tokenDecoded);
	$tokenExDecoded = $tokenExts[0];
	return $tokenExDecoded === SECURE_AUTH_SALT;
}
function check_key_validate($key) {
	if ( !$key ) return false;
	$keyDecoded = decode_key_hash($key);
	return 0 === strpos($keyDecoded, SECURE_AUTH_SALT . '_');
}
function get_token_by_decoded($tokenDecoded) {
	$tokenExts = explode('_', $tokenDecoded);
	return $tokenExts[0];
}
function get_meta_confirmed_args($no = 1, $status = 'success') {
	$length = strlen($status);
	return [
		'key' => OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_KEY,
		'value' => "s:2:\"no\";i:{$no};s:6:\"status\";s:{$length}:\"{$status}\"",
		'compare' => 'LIKE'
	];
}
add_action('restrict_manage_posts', 'rudr_filter_by_the_author');
add_filter( 'retrieve_password_message', 
				array('\Memberships\retrievePasswordFilterUtils', 'perform'), 10, 4 );

add_filter('graphql_jwt_auth_before_authenticate', function($username, $password) {
	$user = get_user_by('login', $username);
	$isExpired = RetrieveHosoSessionUtils::checkHosoExpired($user->ID);
	if ( $isExpired ) :
		RetrieveHoSoFields::update_meta_ending_reporter_matching_flag($user->ID, 'expired', true);
		return [
			'status' => 'fail',
			'message' => [
				'label' => 'tkdabivohieuhoa_label'
			]
		];
	endif;
	return [
		'status' => 'success',
		'message' => ''
	];
}, 10, 4);
add_filter('parse_register_additional_user_object_data', function($username, $email) {
	$user = get_user_by('login', $username);
	if ( FALSE !== $user ) :
		return [
			'status' => 'fail',
			'message' => [
				'label' => 'usernamedatontai_label'
			]
		];
	endif;
	if ( email_exists($email) ) :
		return [
			'status' => 'fail',
			'message' => [
				'label' => 'emaildatontai_label'
			]
		];
	endif;
	return [
		'status' => 'success',
		'message' => ''
	];
}, 10, 4);
function reset_meta($user_id) {
	RetrieveHoSoFields::update_meta_account_notifications(6, []);
	RetrieveHoSoFields::reset_meta_user($user_id);
	wp_die();
}
add_action('wp_loaded', function() {
	//update_user_meta(10, '_hoso_step', 9);
	/*RetrieveHoSoFields::update_meta_confirmed(10, 1, 'success');
	RetrieveHoSoFields::update_meta_confirmed(10, 2, 'success');*/
	/*$key = "VVRscmRHNWFRbVpqU0djNFdsQlNUVGsxYVcxUVdqRkxZbmxOU2tSR1pYcE9aRzlrY0hrMmJ6ZFZZWGczZVdoSk0wNXlSRVJKTnpOTmQzZzJhRmxVUmw4eE1GOHg";
	$token = "UTlrdG5aQmZjSGc4WlBSTTk1aW1QWjFLYnlNSkRGZXpOZG9kcHk2bzdVYXg3eWhJM05yRERJNzNNd3g2aFlURl8xMF8x";
	$keyDecoded = decode_key_hash($key);
	$tokenDecoded = decode_token_hash($token);
	$tokenExDecoded = get_token_by_decoded($tokenDecoded);
	list($user_id, $no) = get_meta_by_key_decoded($keyDecoded, $tokenExDecoded);
	echo $keyDecoded . '<br/>';
	echo SECURE_AUTH_SALT . '<br/>';
	echo var_dump(check_key_validate($key));
	//echo $keyDecoded . '<br/>';
	//echo $tokenExDecoded . '<br/>';
	echo $user_id . '_' . $no;
	wp_die();*/
	//update_user_meta(10, '_hoso_step', 5);
	//delete_user_meta(10, '_confirm_nenkin');
	/*$user_id = 10;
	$user_email = 'test1@gmail.com';
	$section = OptionsGetEmailsUtils::get_by_code($user_id, OPTIONS_EMAIL_STEPS_FIELDS::E_UPDATE_CODE);
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
	wp_die();*/
	//delete_user_meta(10, '_confirm_nenkin');
	//RetrieveHoSoFields::update_meta_ending_reporter_flag(10, 'waiting');
	/*$meta = RetrieveHoSoFields::get_meta_ending_reporter_flag(10);
	echo "<pre>";
	print_r($meta);
	wp_die();*/
	/*$now = time() * 1000;
	$started = $now;
	$expired_after_30days = $now + 30 * ONE_DAY_MILISECONDS;
	RetrieveHoSoFields::update_meta_ending_reporter_flag(10, 'waiting', $started, $expired_after_30days, false);*/
	/*RetrieveHoSoFields::update_meta_account_notifications(6, []);
	$notifications = RetrieveHoSoFields::get_meta_account_notifications(6);
	$expiredDays = RetrieveHosoSessionUtils::getExpiredDay(10);
	array_push($notifications, 'dacapnhaths_label');
    array_push($notifications, 'processinghoso_label');
	RetrieveHoSoFields::update_meta_account_notifications(6, $notifications);
	wp_die();*/
	/*array_push($notifications, 'hosoduocchapnhan_label');
	array_push($notifications, 'hosoduocduyetnhantiennenkinl1_label');
	array_push($notifications, 'hosoduocduyetnhantiennenkinl2_label');
	array_push($notifications, 'hosoduocduyetnhantiennenkinl3_label');
	array_push($notifications, 'kthopdongsaunngay_label');
	RetrieveHoSoFields::update_meta_account_notifications(6, $notifications);*/
	//print_r($notifications);
	//wp_die();
	//echo RetrieveHosoSessionUtils::getExpiredDay(10);
	//wp_die();
	//RetrieveHoSoFields::update_meta_account_deny_message(6, "Giấy tờ không hợp lệ");
	//wp_die();
	//RetrieveHoSoFields::reset_meta_user(6);
	//wp_die();
	/*RetrieveHoSoFields::update_meta_account_verified_flag(6, OPTIONS_FIELDS::HOSO_VERIFIED_TRYAGAIN_FLAG);
	wp_die();*/
	/*$site_jamstack_url = get_field('url_jamstack', 'options');
	RetrieveHoSoFields::update_meta_confirmed(6, 1, create_nenkin_confirm_link($site_jamstack_url . NENKINS_NO1_SLUG, 
																				create_key_hash(6, 1), 
																				create_token_hash(6, 1)), 'success');
	wp_die();*/
	/*$notifications = RetrieveHoSoFields::get_meta_account_notifications(6);
	array_push($notifications, "bandaxacnhannhanduoctiennenkinl1_label");*/
    /*RetrieveHoSoFields::update_meta_account_notifications(6, []);
	wp_die();*/
	/*RetrieveHoSoFields::reset_meta_user(6);
	wp_die();*/
	//reset_meta(6);
	/*RetrieveHoSoFields::update_meta_account_refund_nenkin_no3(6, false);
	wp_die();*/
	//RetrieveHoSoFields::reset_meta_user(10);
	//wp_die();
	/*echo "<pre>";
	echo var_dump(get_user_meta(6, OPTIONS_FIELDS::HOSO_VERIFIED_KEY, true));*/
	//delete_user_meta(6, OPTIONS_FIELDS::HOSO_VERIFIED_KEY);
	//echo boolval(get_user_meta(10, OPTIONS_FIELDS::HOSO_VERIFIED_KEY));
	/*$confirmed = get_user_meta(6, OPTIONS_FIELDS::HOSO_CONFIRM_NENKIN_KEY, true);
	echo var_dump($confirmed);*/
	//$confirmed_no1_args = get_meta_confirmed_args(1, 'success');
	//$confirmed_no2_args = get_meta_confirmed_args(2, 'success');
	//echo serialize(RetrieveHoSoFields::get_meta_ending_reporter_flag(6));
	//wp_die();
	/*print_r(OptionsGetHoSoUserUtils::get_users_pagination(1, 30, '', [
		[
			[
				'key' => OPTIONS_FIELDS::HOSO_ENDING_REPORTER_FLAG_KEY,
				'value' => "s:14:\"session_status\";s:7:\"waiting\"",
				'compare' => 'LIKE'
			]
		],
		[
			'key' => OPTIONS_FIELDS::HOSO_VERIFIED_KEY,
			'value' => '1',
			'compare' => '='
		],
		//$confirmed_no1_args,
		//$confirmed_no2_args
		
	])['data']);
	wp_die();*/
});
add_action('wp_loaded', function() {
	/*$params = OptionsGetEmailsUtils::get_by_code(10,
												OPTIONS_EMAIL_STEPS_FIELDS::E_NENKIN_CONFIRM_NO1_CODE);
	$params[OPTIONS_EMAIL_FIELDS::TO] = 'thinhld9xvn@gmail.com';
	$params[OPTIONS_EMAIL_FIELDS::ATTACHMENT] = ABSPATH . '/attachment.pdf';
	$confirm_url = create_nenkin_confirm_link('localhost:3000' . NENKINS_NO1_SLUG, 
												create_key_hash(10, 1), 
												create_token_hash(10, 1));
	$params[OPTIONS_EMAIL_FIELDS::E_CONFIRMLINK] = "<a target='_blank' href='{$confirm_url}'>{$confirm_url}</a>";
	SendEmailUtils::perform($params);      
	wp_die();*/
	//RetrieveHoSoFields::reset_meta_user(10);
	//wp_die();
});