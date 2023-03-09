import {fetchAPI} from '../api';
export async function getAccountHosoNotificationsData(userId) { 
    return await fetchAPI(
      `query getAccountHosoNotifications {
          hs_notifications : getAccountHosoNotificationsOptions(userId: ${userId}) {
            hoso_notifications
            expired_days
            hoso_deny_message
            hoso_confirm_nenkin {
              no
              status
              url_confirmed
            }
          }
        }`
    );
  }