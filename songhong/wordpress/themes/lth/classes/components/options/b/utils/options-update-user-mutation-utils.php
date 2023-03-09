<?php
    namespace WP_GraphQL;

    use GraphQL\Error\UserError;
    use Memberships\RetrieveHoSoFields;
    use Memberships\SendEmailUtils;
    use Options\OPTIONS_EMAIL_FIELDS;
    use Options\OPTIONS_EMAIL_STEPS_FIELDS;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetAccountUtils;
    use Options\OptionsGetEmailsUtils;
    use Uploads\RetrieveUploadsHandlerUtils;
use WP_Error;

    class OptionsUpdateUserMutationUtils {
        private static function update_hoso_galleries($params) {
            extract($params);
            //
            $user = get_user_by("ID", $user_id);
            $login_name = $user->user_login;
            $post = get_page_by_path('hoso-' . $login_name, OBJECT, HOSOPT);
            $hosometa = !empty($hoso_metadata) ? json_decode($hoso_metadata, true) : [];
            //
            $attachmentIds = [];
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
            foreach ($hoso_data as $imageKey => $image) :
                if ( is_null($image) ) continue;
                $attachmentIds[$imageKey] = RetrieveUploadsHandlerUtils::upload_media_sideload($image);
            endforeach;
            foreach ($galleries as $gk => $gv) :
                $data = [];
                foreach ($replacements as $rk => $rp) :
                    $gid = pn_get_attachment_id_from_url($rp['oldUrl']);
                    $url = wp_get_attachment_image_url($gid, 'full');
                    if ( $url === $gv ) :
                        $data = $rp;
                        break;
                    endif;
                endforeach;
                if ( !empty($data) ) :
                    if ( $data['action'] === 'update' ) :
                        $gids[$gk] = $attachmentIds[$gk];  
                        $attachmentIds[$gk] = null; // mark to remove      
                    endif;
                    if ( $data['action'] === 'remove' ) :
                        $gids[$gk] = null;
                    endif;          
                endif;
            endforeach;   
            $attachmentIds = array_filter($attachmentIds, function($id) {
                return !is_null($id);
            });
            foreach($attachmentIds as $key => $id):
                $gids[] = $id;
            endforeach;
            if ( !empty($gids) ) :
                update_field($gallery_key, $gids, $post->ID);
            else :
                if ( !empty($attachmentIds) ) :
                    update_field($gallery_key, $attachmentIds, $post->ID);
                endif;
            endif;
        }
        public static function update_hoso_image($params) {
            extract($params);
            //
            $user = get_user_by("ID", $user_id);
            $login_name = $user->user_login;
            $post = get_page_by_path('hoso-' . $login_name, OBJECT, HOSOPT);
            $hosometa = !empty($hoso_metadata) ? json_decode($hoso_metadata, true) : [];
            //
            $replacements = [];	
            $boolThaoTac = false;
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
            $attachmentId = RetrieveUploadsHandlerUtils::upload_media_sideload($image);
            foreach ($galleries as $gk => $gv) :
                $data = [];
                foreach ($replacements as $rk => $rp) :
                    $gid = pn_get_attachment_id_from_url($rp['oldUrl']);
                    $url = wp_get_attachment_image_url($gid, 'full');
                    if ( $url === $gv ) :
                        $data = $rp;
                        break;
                    endif;
                endforeach;
                if ( !empty($data) ) :
                    if ( $data['action'] === 'update' ) :
                        $gids[$gk] = $attachmentId;
                        $boolThaoTac = true;
                        break;
                    endif;
                endif;
            endforeach;   
            if ( !$boolThaoTac ) :
                $gids[] = $attachmentId;
            endif;
            update_field($gallery_key, $gids, $post->ID);
        }
        public static function perform($user_id, $input, $mutation_name, $context, $info) {
            $user = get_user_by('id', $user_id);
            $user_email = $user->user_email;            
            //
            $max_upload_size = RetrieveUploadsHandlerUtils::getMaxUploadSize();
            //
            $boolUpdated = false;
            if ( !empty($input['fullName']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_fullname($user_id, $input['fullName']);
            endif;

            if ( !empty($input['address']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_address($user_id, $input['address']);
            endif;

            if ( !empty($input['phone']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_phone($user_id, $input['phone']);
            endif;

            if ( !empty($input['facebook']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_facebook($user_id, $input['facebook']);
            endif;

            if ( !empty($input['fullnameJapan']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_fullname_jp($user_id, $input['fullnameJapan']);
            endif;

            if ( !empty($input['nameUnsigned']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_nameunsigned($user_id, $input['nameUnsigned']);
            endif;

            if ( !empty($input['birthday']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_birthday($user_id, $input['birthday']);
            endif;

            if ( !empty($input['nenkinCode']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_nenkincode($user_id, $input['nenkinCode']);
            endif;

            if ( !empty($input['companyInfo']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_companyinfo($user_id, $input['companyInfo']);
            endif;

            if ( !empty($input['bankNameVietNam']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_bankname($user_id, $input['bankNameVietNam']);
            endif;

            if ( !empty($input['bankNameBranchVietNam']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_branch_bankname($user_id, $input['bankNameBranchVietNam']);
            endif;

            if ( !empty($input['addressBankNameBranchVietNam']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_address_branch_bankname($user_id, $input['addressBankNameBranchVietNam']);
            endif;

            if ( !empty($input['noBank']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_nobank($user_id, $input['noBank']);
            endif;

            if ( !empty($input['nameLastAddress']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_name_lastaddress($user_id, $input['nameLastAddress']);
            endif;

            if ( !empty($input['noZip']) ) :
                $boolUpdated = true;
                RetrieveHoSoFields::update_meta_zipcode($user_id, $input['noZip']);
            endif;
            //
            if ( !empty($input['avatar']) ) :
                $results = RetrieveUploadsHandlerUtils::upload_sideload($input['avatar']);
                RetrieveHoSoFields::update_meta_avatar($user_id, $results['url']);
                $boolUpdated = true;
            endif;
            //
            if ( !empty($input['hosoFile']) ) :
                $throwErrors = RetrieveUploadsHandlerUtils::handle_upload_filesize_error($input['hosoFile']);
                if ( $throwErrors ) :
                    throw new UserError( __( $throwErrors['message'], 'wp-graphql' ) );
                endif;
                self::update_hoso_image(['image' => $input['hosoFile'],
                                        'hoso_metadata' => $input['hosoMetaData'],
                                        'hoso_diff_key' => $input['hosoIdentity'],
                                        'gallery_key' => $input['hosoGalleryId'],
                                        'user_id' => $user_id]);
            endif;
            //
            if ( !empty($input['hosoNenkinAnhNgoaiKieu']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoNenkinAnhNgoaiKieu'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'ngoaikieu',
                                            'gallery_key' => 'nenskin_frontcard',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            if ( !empty($input['hosoNenkinAnhNenkin']) ) :	
                self::update_hoso_galleries(['hoso_data' => $input['hosoNenkinAnhNenkin'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'nenkin',
                                            'gallery_key' => 'nenkins_image',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            if ( !empty($input['hosoNenkinAnhHoChieu']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoNenkinAnhHoChieu'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'hochieu',
                                            'gallery_key' => 'nenkins_passport',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            if ( !empty($input['hosoNenkinAnhXacNhanNganHang']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoNenkinAnhXacNhanNganHang'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'giaynganhang',
                                            'gallery_key' => 'nenkins_bank_images',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            //
            if ( !empty($input['hosoHoanThueAnhNgoaiKieu']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoHoanThueAnhNgoaiKieu'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'ngoaikieu',
                                            'gallery_key' => 'hoanthue_ngoaikieu_images',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            if ( !empty($input['hosoHoanThueAnhGensen']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoHoanThueAnhGensen'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'gensen',
                                            'gallery_key' => 'hoanthue_gensen',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            if ( !empty($input['hosoHoanThueAnhHoChieu']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoHoanThueAnhHoChieu'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'hochieu',
                                            'gallery_key' => 'hoanthue_passport',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            if ( !empty($input['hosoHoanThueGiayChuyenTien']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoHoanThueGiayChuyenTien'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'giaychuyentien',
                                            'gallery_key' => 'hoanthue_transfer_images',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            if ( !empty($input['hosoHoanThueGiayPhungDuong']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoHoanThueGiayPhungDuong'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'giaychungminhphungduong',
                                            'gallery_key' => 'hoanthue_giaytoquanhe_images',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            if ( !empty($input['hosoHoanThueMyNumber']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoHoanThueMyNumber'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'mynumber',
                                            'gallery_key' => 'hoanthue_mynumber_images',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            if ( !empty($input['hosoHoanThueSoTTTaiKhoan']) ) :
                self::update_hoso_galleries(['hoso_data' => $input['hosoHoanThueSoTTTaiKhoan'],
                                            'hoso_metadata' => $input['hosoMetaData'],
                                            'hoso_diff_key' => 'songanhangtttt',
                                            'gallery_key' => 'hoanthue_sotttaikhoan_images',
                                            'user_id' => $user_id]);
                $boolUpdated = true;
            endif;
            //
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
            RetrieveHoSoFields::update_meta_updated($user_id, $boolUpdated);
        }        
        public static function payload($updated_user_id) {
            $user = get_user_by('ID', $updated_user_id);
            $post = get_page_by_path('hoso-' . $user->user_login, OBJECT, HOSOPT);
            //
            $frontcard = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_NENKIN_ANHTHENGOAIKIEU_FIELD);
            $anhnenkins = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_NENKIN_ANHNENKIN_FIELD);
            $anhhochieu = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_NENKIN_ANHHOCHIEU_FIELD);
            $anhnganhang = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_NENKIN_ANHNGANHANG_FIELD);
            //
            $hoanthue_gensen = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_HOANTHUE_GENSEN_FIELD);
            $hoanthue_giaychuyentien = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYCHUYENTIEN_FIELD);
            $hoanthue_giaycmquanhe = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYTOCMQUANHE_FIELD);
            $hoanthue_hochieu = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_HOANTHUE_HOCHIEU_FIELD);
            $hoanthue_mynumber = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_HOANTHUE_MYNUMBER_FIELD);
            $hoanthue_sotttaikhoan = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_HOANTHUE_SOTTTAIKHOAN_FIELD);
            $hoanthue_ngoaikieu = OptionsGetAccountUtils::export_galleries_thumbnails($post, OPTIONS_FIELDS::HOSO_HOANTHUE_NGOAIKIEU_FIELD);
            //
            return [
                'user' => [
                    OPTIONS_FIELDS::USER_ID_FIELD => $updated_user_id,
                    OPTIONS_FIELDS::HOSO_NENKIN_ANHTHENGOAIKIEU_MUTATION_RETURN_FIELD => $frontcard,
                    OPTIONS_FIELDS::HOSO_NENKIN_ANHNENKIN_MUTATION_RETURN_FIELD => $anhnenkins,
                    OPTIONS_FIELDS::HOSO_NENKIN_ANHHOCHIEU_MUTATION_RETURN_FIELD => $anhhochieu,
                    OPTIONS_FIELDS::HOSO_NENKIN_ANHNGANHANG_MUTATION_RETURN_FIELD => $anhnganhang,
                    //
                    OPTIONS_FIELDS::HOSO_HOANTHUE_GENSEN_MUTATION_RETURN_FIELD => $hoanthue_gensen,
                    OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYCHUYENTIEN_MUTATION_RETURN_FIELD => $hoanthue_giaychuyentien,
                    OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYTOCMQUANHE_MUTATION_RETURN_FIELD => $hoanthue_giaycmquanhe,
                    OPTIONS_FIELDS::HOSO_HOANTHUE_HOCHIEU_MUTATION_RETURN_FIELD => $hoanthue_hochieu,
                    OPTIONS_FIELDS::HOSO_HOANTHUE_MYNUMBER_MUTATION_RETURN_FIELD => $hoanthue_mynumber,
                    OPTIONS_FIELDS::HOSO_HOANTHUE_SOTTTAIKHOAN_MUTATION_RETURN_FIELD => $hoanthue_sotttaikhoan,
                    OPTIONS_FIELDS::HOSO_HOANTHUE_NGOAIKIEU_MUTATION_RETURN_FIELD => $hoanthue_ngoaikieu
                ]
            ];
        }
    }