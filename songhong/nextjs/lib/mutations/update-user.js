import {fetchAPI} from '../api';
export async function UpdateUser(props) {
    const {id, facebookInfoValue,
            fullnameValue, phoneValue, addressValue, 
            fullnameJapanValue, nenkinCode,
            noZipValue, nameLastAddressValue, nameUnsignedValue,
            bankNameBranchVietNamValue, noBankValue, companyInfoValue,
            addressBankNameBranchVietNamValue, birthdayValue, bankNameVietNamValue} = props;
    const userFbInfoStr = `""${JSON.stringify(facebookInfoValue)}""`;
    const companyInfoStr = `""${JSON.stringify(companyInfoValue)}""`;
    return await fetchAPI(
        `mutation updateUserMutation {
          updateUser(
            input: {id: "${id}", 
                    address: "${addressValue}", 
                    addressBankNameBranchVietNam: "${addressBankNameBranchVietNamValue}", 
                    bankNameBranchVietNam: "${bankNameBranchVietNamValue}", 
                    bankNameVietNam: "${bankNameVietNamValue}", 
                    birthday: "${birthdayValue}", 
                    companyInfo: "${companyInfoStr}", 
                    facebook: "${userFbInfoStr}", 
                    fullName: "${fullnameValue}", 
                    fullnameJapan: "${fullnameJapanValue}", 
                    nameLastAddress: "${nameLastAddressValue}", 
                    nameUnsigned: "${nameUnsignedValue}", 
                    nenkinCode: "${nenkinCode}", 
                    noBank: "${noBankValue}", 
                    noZip: "${noZipValue}", 
                    phone: "${phoneValue}"}
          ) {
            user {
              id
            }
          }
        }`
    );
}