<?php
    require_once GRAPHQL_CLASS_UTILS_DIR . '/graphql-register-fields-utils.php';
    require_once GRAPHQL_CLASS_UTILS_DIR . '/graphql-register-mutation-utils.php';
    require_once GRAPHQL_CLASS_UTILS_DIR . '/graphql-register-field-type-utils.php';
    //
    add_filter(\Actions\ACTIONS::GCO_GRAPHQL_UPDATE_USER_MUTATION_ADDITIONAL_DATA_ACTION_PAYLOAD, 
                array('\WP_GraphQL\OptionsUpdateUserMutationUtils', 'payload'), 10, 1);
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterUserInputFieldsUtils', 'register'));
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_UPDATE_USER_MUTATION_ADDITIONAL_DATA_ACTION, 
                array('\WP_GraphQL\OptionsUpdateUserMutationUtils', 'perform'), 10, 5);
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GQLRegisterAccountHoSoRemoveUploadsMutationUtils', 'register'));
    /* register field types */    
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterTaxonomiesTypesUtils', 'register'));
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterArticlesListTypesUtils', 'register'));
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterSliderTypesUtils', 'register'));
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterOptionsTypesUtils', 'register'));
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterMenuItemsTypesUtils', 'register'));
    /* */
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterTaxonomiesFieldsUtils', 'register'));
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterArticlesListFieldsUtils', 'register'));   
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterSliderFieldsUtils', 'register'));
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterOptionsFieldsUtils', 'register'));
    add_action(\Actions\ACTIONS::GCO_GRAPHQL_REGISTER_TYPES, 
                array('\WP_GraphQL\GraphQLRegisterMenuItemsFieldsUtils', 'register'));
    //
    