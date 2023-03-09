export function parse(data) {
    return JSON.parse(data);
}
export function getTranslation(data, k) {
    if ( !data || !data[k] ) return '';
    return data[k];
}