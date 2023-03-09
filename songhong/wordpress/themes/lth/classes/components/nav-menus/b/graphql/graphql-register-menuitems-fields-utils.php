<?php 
    namespace WP_GraphQL;   
    use \Nav_Menus\NAVMENUS_FIELDS;
    use \Nav_Menus\NavMenusGetMenuItemsListUtils;
    class GraphQLRegisterMenuItemsFieldsUtils {
        public static function register() {
            $field_name = 'getMenuItemsList';
            $args = [
                'name' => [
                    'type' => 'MenuLocationEnum'
                ]
            ];
            $resolve_callback = function($source, $args, $context, $info) {
                $menuLocations = get_nav_menu_locations();
                $menuID = $menuLocations[$args['name']];
                $results = NavMenusGetMenuItemsListUtils::get($menuID);
                return $results;
            };
            GraphQLRegisterFieldsUtils::register($field_name, 
                                                    $args, 
                                                        $resolve_callback, 
                                                            ['list_of' => NAVMENUS_FIELDS::NAVMENUS_SCHEMA_TYPES]);    
        }
    }