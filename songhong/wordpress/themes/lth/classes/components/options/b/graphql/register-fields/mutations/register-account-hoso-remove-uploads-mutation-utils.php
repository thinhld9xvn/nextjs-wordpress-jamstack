<?php 
    namespace WP_GraphQL;

use Options\OptionsGetAccountUtils;

    class GQLRegisterAccountHoSoRemoveUploadsMutationUtils {    
        private static function remove($params) {
            extract($params);
            //
            require_once(ABSPATH . "wp-admin" . '/includes/image.php');
            require_once(ABSPATH . "wp-admin" . '/includes/file.php');
            require_once(ABSPATH . "wp-admin" . '/includes/media.php');
            //
            $user = get_user_by("ID", $user_id);
            $login_name = $user->user_login;
            $post = get_page_by_path('hoso-' . $login_name, OBJECT, HOSOPT);
            $hosometa = !empty($hoso_metadata) ? json_decode($hoso_metadata, true) : [];
            //
            $replacements = [];	
            //
            if ( isset($hosometa['replacements']) && 
                    isset($hosometa['replacements'][$hoso_diff_key]) ) :
                $replacements = $hosometa['replacements'][$hoso_diff_key];
            endif;
            //
            $galleries = get_field($gallery_key, $post->ID);
            $galleries = !empty($galleries) ? $galleries : [];
            $gids = !empty($galleries) ? array_map(function($url) {
                return (int) pn_get_attachment_id_from_url($url);
            }, $galleries) : [];
            //
            graphql_debug($hosometa);
            foreach ($galleries as $gk => $gv) :
                foreach ($replacements as $rk => $rp) :
                    $gid = pn_get_attachment_id_from_url($rp['oldUrl']);
                    $url = wp_get_attachment_image_url($gid, 'full');
                    if ( $url === $gv ) :                        
                        $gids[$gk] = null;
                    endif;
                endforeach;
            endforeach;             
            update_field($gallery_key, $gids, $post->ID);
            return OptionsGetAccountUtils::export_galleries_thumbnails($post, $gallery_key);
        }
        public static function register() {
            $mutation_name = 'removeUploadHosoUser';
            $config = [
                'inputFields'         => [
                    'userId' => [
                        'type' => 'Int'
                    ],
                    'identify' => [
                        'type' => 'String'
                    ],
                    'galleryKey' => [
                        'type' => 'String'
                    ],
                    'hosoMetaData' => [
                        'type' => 'String'
                    ]
                ],
                'outputFields'        => [
                    'data' => [
                        'type' => ['list_of' => 'String']
                    ]
                ],
                'mutateAndGetPayload' => function( $input, $context, $info ) {
                    $user_id = (int) $input['userId'];
                    $gallery_key = $input['galleryKey'];
                    $hoso_diff_key = $input['identify'];
                    $hoso_metadata = $input['hosoMetaData'];
                    //
                    return [
                        'data' => self::remove([
                            'user_id' => $user_id,
                            'gallery_key' => $gallery_key,
                            'hoso_diff_key' => $hoso_diff_key,
                            'hoso_metadata' => $hoso_metadata
                        ])
                    ];
                }
            ];
            GraphQLRegisterMutationUtils::register($mutation_name, $config);    
        }
    }