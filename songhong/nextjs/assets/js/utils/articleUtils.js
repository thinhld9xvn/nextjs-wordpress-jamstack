import { cloneArray, isEmptyObj } from "./arrayUtils";
import { getArticleDateCreated } from "./dateUtils";
import { union } from "lodash";

const NOTHUMBNAIL = '/static/images/nothumbnail.jpg';
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
export function getArticles(data, paged = 1, limit = 6) { // data : danh sách bài đã filter theo cat id rồi
    const from = (paged - 1) * limit;
    const to = paged * limit - 1;    
    return data.filter((e, i) => i >= from && i <= to );
}
export function getThumbnail(data) {
    if (!data || !data.thumbnail) return NOTHUMBNAIL;
    return data.thumbnail;
}
export function getArticleData(data) {
    if ( !data ) return {title : '',
                         url : '',
                         day : '',
                         month : '',
                         year : '',
                         excerpt : '',
                         view_count : 0,
                         thumbnail : NOTHUMBNAIL};
    const {title, url, date_created, view_count, excerpt} = data;
    const {day, month, year} = getArticleDateCreated(date_created);
    const thumbnail = getThumbnail(data);
    return {
        title,
        url,
        day,
        month,
        year,
        view_count,
        excerpt,
        thumbnail
    };
}
export function filterArticlesByCatId(data, cid) {
    return cloneArray(data.filter(e => cid ? inCategory(e, cid, 'id') : false));
}
export function filterArticlesByProps(data, cid, type) {
    return cloneArray(data.filter(e => cid && type ? inCategory(e, cid, 'id') && type === e.post_type : false));
}
export function filterSearchArticles(data, s) {
    const results = data.filter(post => post.title.toLowerCase().indexOf(s.toLowerCase()) !== -1);
    const results2 = data.filter(post => removeVietnameseTones(post.title.toLowerCase()).indexOf(removeVietnameseTones(s.toLowerCase())) !== -1);
    return cloneArray(union(results, results2));
}
export function inCategory(o, cat_id, cid_key = 'id') {
    const categories = o.categories;
    if ( categories ) {
        return categories.filter(cat => cat[cid_key] === cat_id).length;
    }
    return false;
}