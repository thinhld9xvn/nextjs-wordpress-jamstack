import {fetchAPI} from '../api';
export async function getUserHosoProgressingData(id) { 
    return await fetchAPI(
      `query userHsProgressingInfoPageData {
        tiendohoso : getUserHoSoProgressingOptions(userId: ${id}) {
          hoso_current_step
          refund_nenkin_no3
        }
      }`
    );
  }