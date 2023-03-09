<?php 
    namespace WP_GraphQL;
    use Options\OPTIONS_FIELDS;
    
    class GraphQLRegisterUserInputFieldsUtils {
        public static function register() {
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_NENKIN_ANHTHENGOAIKIEU_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_NENKIN_ANHNENKIN_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_NENKIN_ANHHOCHIEU_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_NENKIN_ANHNGANHANG_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            //
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_HOANTHUE_NGOAIKIEU_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_HOANTHUE_GENSEN_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYCHUYENTIEN_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_HOANTHUE_GIAYTOCMQUANHE_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_HOANTHUE_HOCHIEU_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_HOANTHUE_MYNUMBER_MUTATION_RETURN_FIELD, ['list_of' => 'String']);
            GraphQLRegisterFieldTypeUtils::register("User", OPTIONS_FIELDS::HOSO_HOANTHUE_SOTTTAIKHOAN_MUTATION_RETURN_FIELD, ['list_of' => 'String']);            
            //
            GraphQLRegisterFieldTypeUtils::register("RegisterUserInput", "fullName", "String");
            GraphQLRegisterFieldTypeUtils::register("RegisterUserInput", "facebook", "String");
            GraphQLRegisterFieldTypeUtils::register("RegisterUserInput", "address", "String");
            GraphQLRegisterFieldTypeUtils::register("RegisterUserInput", "phone", "String");
            //
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoFile", "Upload");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoIdentity", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoGalleryId", "String");
            //
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "fullName", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "address", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "facebook", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "phone", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "fullnameJapan", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "nameUnsigned", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "birthday", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "nenkinCode", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "companyInfo", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "bankNameVietNam", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "bankNameBranchVietNam", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "addressBankNameBranchVietNam", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "noBank", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "nameLastAddress", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "noZip", "String");
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "avatar", "Upload");
            //
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoNenkinAnhNgoaiKieu", ['list_of' => 'Upload']);
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoNenkinAnhNenkin", ['list_of' => 'Upload']);
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoNenkinAnhHoChieu", ['list_of' => 'Upload']);
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoNenkinAnhXacNhanNganHang", ['list_of' => 'Upload']);
            //
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoHoanThueAnhNgoaiKieu", ['list_of' => 'Upload']);
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoHoanThueAnhGensen", ['list_of' => 'Upload']);
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoHoanThueAnhHoChieu", ['list_of' => 'Upload']);
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoHoanThueGiayChuyenTien", ['list_of' => 'Upload']);
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoHoanThueGiayPhungDuong", ['list_of' => 'Upload']);
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoHoanThueMyNumber", ['list_of' => 'Upload']);
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoHoanThueSoTTTaiKhoan", ['list_of' => 'Upload']);
            //
            GraphQLRegisterFieldTypeUtils::register("UpdateUserInput", "hosoMetaData", "String");
        }
    }