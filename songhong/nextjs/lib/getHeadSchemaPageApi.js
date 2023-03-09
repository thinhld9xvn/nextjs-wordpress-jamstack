export async function getHeadSchemaPage(url) {
    try {
        const res = await fetch(process.env.WP_RANKMATH_API_URL + `?url=${url}`);
        if (!res) return '';
        const json = await res.json();
        if (json.errors) {    
            return '';
        }
        return typeof(json.head) !== 'undefined' && json.head ? json.head :  '';
    } catch {
        return  '';
    }
}