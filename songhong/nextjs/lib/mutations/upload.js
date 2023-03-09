export async function Upload(file) {
    const queryString = {
        query: `
            mutation uploadFile($file: Upload!) {
                upload(input: {file: $file}) {
                    text
                }
            }
        `,
        variables: {
            file : file
        },
      };
    const fd = new FormData();
    fd.append("operations", JSON.stringify(queryString));
    fd.append("map", '{ "0": ["variables.file"] }');
    fd.append("0", file);
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