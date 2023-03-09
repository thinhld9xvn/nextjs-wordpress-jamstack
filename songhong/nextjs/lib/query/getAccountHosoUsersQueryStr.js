export function getAccountHosoUsersQueryStr($paged = 1, $num_per_page = 16, s = '', metadata = {}) {
  const metadataStr = `""${JSON.stringify(metadata)}""`;
    return(
      `accountHosoUsersOptions : getAccountHosoUsersOptions(paged: ${$paged}, 
                                                              num_per_page: ${$num_per_page}, 
                                                                s : "${s}", 
                                                                  metadata : "${metadataStr}") {
        paged
        num_per_page
        totals
        data {
          id
          username
          avatar
          fullname
          address
          email
          phone
          date_created
          hoso_verified
          hoso_notifications
          hoso_confirm_nenkin {
            no
            status
            url_confirmed
          }
          hoso_session {
            session_status
            session_started
            session_expired
            expired
          }
        }
      }`
    );
  }