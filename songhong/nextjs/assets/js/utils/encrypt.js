const SALT_KEY = 'b2edc3077098370b026b92dfa1bb1628';
export function encryptPassword(password) {
    return btoa(password) + btoa(SALT_KEY);
}
export function decryptPassword(encrypt) {
    const saltBase64 = btoa(SALT_KEY);
    const salt = encrypt.substr(0, encrypt.length - saltBase64.length);
    return atob(salt);
}