import {fetchAPI} from '../api';
export async function getEmailTemplateByCode(username, code) { 
    return await fetchAPI(
      `query GetEmailTemplateByCodeOptions {
            email_template : getEmailTemplateByCodeOptions(username: "${username}", emailCode: "${code}") {
                content
            }
        }`
    );
  }