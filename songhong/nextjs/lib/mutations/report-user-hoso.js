import {fetchAPI} from '../api';
export async function ReportUserHoso(userId, steps) {
    const stepsStr = `""${JSON.stringify(steps)}""`;
    return await fetchAPI(
        `mutation reportUserMutation {
          reportHosoUser(
            input: {userId: ${userId}, 
                    steps: "${stepsStr}"}
          ) {
            success
          }
        }`
    );
}
export async function ReportUserStepHoso(userId, step, metadata = {}, attachmentFile = null) {
  const metadataStr = `""${JSON.stringify(metadata)}""`;
  const queryString = {
    query: `
        mutation reportUserMutation($file : Upload) {
          reportHosoStepUser(
            input: {userId: ${userId}, 
                    step: ${step},
                    metadata: "${metadataStr}",
                    attachmentFile: $file}
          ) {
            success
          }
    }`,
    variables: {
        file : attachmentFile
    },
  };
  const fd = new FormData();
  fd.append("operations", JSON.stringify(queryString));
  fd.append("map", '{ "0": ["variables.file"] }');
  fd.append("0", attachmentFile);
  const res = await fetch(process.env.WP_API_URL, {
      method: 'POST',
      body: fd
  });
  const json = await res.json();
  if (json.errors) { 
      return json.errors;
  }
  return json.data;
}