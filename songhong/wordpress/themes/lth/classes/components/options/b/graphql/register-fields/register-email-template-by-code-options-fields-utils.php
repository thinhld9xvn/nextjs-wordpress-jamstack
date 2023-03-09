<?php 
    namespace WP_GraphQL;

    use Memberships\ParseEmailUtils;
    use Options\OPTIONS_EMAIL_FIELDS;
    use Options\OPTIONS_FIELDS;
    use Options\OptionsGetEmailsUtils;

    class GQLRegisterEmailTemplateByCodeOptionsFieldsUtils {
        public static function register() {
            $args = [
                'username' => [
                    'type' => 'String'
                ],
                'emailCode' => [
                    'type' => 'String'
                ]
            ];
            $field_name = 'getEmailTemplateByCodeOptions';
            $resolve_callback = function($source, $args, $context, $info) {   
                $username = $args['username'];
                $emailCode = $args['emailCode'];
                $user = get_user_by("login", $username);
                $params = OptionsGetEmailsUtils::get_by_code($user->ID, $emailCode);
                $params[OPTIONS_EMAIL_FIELDS::TO] = $user->user_email;
                $content = ParseEmailUtils::parse_by_template($params);
                return [
                    OPTIONS_FIELDS::CONTENT_FIELD => $content
                ];
            };
            GraphQLRegisterFieldsUtils::register($field_name, $args, $resolve_callback, OPTIONS_FIELDS::OPTIONS_EMAIL_TEMPLATE_SCHEMA_TYPE);    
        }
    }