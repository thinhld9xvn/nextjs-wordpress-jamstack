import {isEqual} from 'lodash';
export function isValidateArray(arr) {
    return arr && arr.length > 0;
}
export function isObject(e) {
    return typeof(e) === 'object';
}
export function isUndefined(e) {
    return typeof(e) === 'undefined';
}
export function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
export function isDiff(o1, o2) {
    if (!o1 || !o2) return true; 
    return !isEqual(o1, o2);
}
export function cloneArray(o) {
    if ( !o ) return null;
    return JSON.parse(JSON.stringify(o));
}
export function multiple(o) {
    if ( !o ) return null;
    return o.concat(o);
}
export function isEmptyObj(o) {
    if ( !o ) return true;
    return Object.keys(o).length === 0;
}
export function getHoSoGalleriesFromArr(arr) {
    return arr.filter(im => im.src).map(im => im.src);
}