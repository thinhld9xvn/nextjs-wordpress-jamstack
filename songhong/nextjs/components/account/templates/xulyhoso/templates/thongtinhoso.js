import { getTranslation } from '@js_dir/utils/translations'
import React from 'preact/compat'
import ThongTinHsSection from './thongtinhs-section';
import ThongTinHsCongTySection from './thongtinhscongty-section';

export default function ThongTinHoSo({ data, translationStrings, handleOpenHsCongTy }) {
    const {id, address,
            email,
            facebook_metainfo,
            fullname = '',
            phone,
            addressbanknamebranchvietnam,
            banknamebranchvietnam,
            banknamevietnam,
            birthday = '',
            companyinfo = '',
            fullnamejapan,
            namelastaddress,
            nameunsigned,
            nenkincode,
            nobank,
            nozip} = data || {};
    const {name : fbName} = JSON.parse(facebook_metainfo || '{}');
    const no_value = getTranslation(translationStrings, "nosettings_label");
  return (
    <>
        <h3 className="titles-border__afters titles-transform__alls titles-bold__alls fs-17s mb-35s">{getTranslation(translationStrings, "thongtincoban_label")}</h3>
        <div className="form__contents">
            <ThongTinHsSection label={getTranslation(translationStrings, "hovaten_label")}
                               data = {fullname}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "facebook_label")}
                               data = {fbName}
                               no_value = {no_value}
                               is_link = {true}
                               link = {'#'} />
            <ThongTinHsSection label={getTranslation(translationStrings, "address_label")}
                               data = {address}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "phone_label")}
                               data = {phone}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "email_label")}
                               data = {email}
                               no_value = {no_value}
                               is_link = {true}
                               link = {`mailto:${email}`} />
            <ThongTinHsSection label={getTranslation(translationStrings, "hovatentiengnhat_label")}
                               data = {fullnamejapan}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "tenvietkhongdau_label")}
                               data = {nameunsigned}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "birthday_label")}
                               data = {birthday}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "msnenkin_label")}
                               data = {nenkincode}
                               no_value = {no_value} />
            <ThongTinHsCongTySection label={getTranslation(translationStrings, "congty_label")}
                                    data = {companyinfo}
                                    no_value = {no_value}
                                    view_label = {getTranslation(translationStrings, "xemthongtin_label")}
                                    handleOpenHsCongTy = {handleOpenHsCongTy} />
            <ThongTinHsSection label={getTranslation(translationStrings, "bankkhongdau_label")}
                               data = {banknamevietnam}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "bankchinhanhkhongdau_label")}
                               data = {banknamebranchvietnam}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "bankdiachichinhanhkhongdau_label")}
                               data = {addressbanknamebranchvietnam}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "sotaikhoannganhang_label")}
                               data = {nobank}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "diachicuoicungkhionhat_label")}
                               data = {namelastaddress}
                               no_value = {no_value} />
            <ThongTinHsSection label={getTranslation(translationStrings, "mabuudiendiachicuoicungkhionhat_label")}
                               data = {nozip}
                               no_value = {no_value} />
        </div>
    </>
  )
}