export function importSEO(head) {
    document.querySelectorAll('head meta, head script[type="application/ld+json"').forEach(e => e.remove());
    const html = head + document.querySelector('head').innerHTML;
    document.querySelector('head').innerHTML = html;
}
function _get(json, key) {
    const i = json.indexOf(key);
    const index = i + key.length;
    const j = json.indexOf('"', index);
    return json.substr(i + key.length, j - index);
}
function getMetaNameSection(json, key) {
    const name = _get(json, '<meta name="');
    const content = _get(json, ' content="');
    return {
        name, content, type : 'meta'
    }
}
function getMetaPropertySection(json) {
    const property = _get(json, '<meta property="');
    const content = _get(json, ' content="');
    return {
        property, content, type : 'meta'
    }
}
function getScriptSection(json) {
    const key = '<script ';
    const endt = '>';
    const key1 = '</script>';
    const i = json.indexOf(key) + key.length;
    const it = json.indexOf(endt, i) + endt.length;
    const j = json.indexOf(key1, i);
    return {
        name : 'script', content : json.substr(it, j - i), type : 'script'
    }
}
function getTitleSection(json) {
    const key = '<title>';
    const key1 = '</title>';
    const i = json.indexOf(key) + key.length;
    const j = json.indexOf(key1, i);
    return {
        name : 'title', content : json.substr(i, j - i), type : 'title'
    }
}
export function toRankMathJson(head) {
    const headJson = head.replace(/\\"/ig, '"');
    const arrHeadJsons = headJson.split('\n');
    return (arrHeadJsons.map(json => {
        let results = null;
        if ( json.startsWith('<title>') ) {
            results = getTitleSection(json);
        }
        if ( json.startsWith('<meta name=') ) {
            results = getMetaNameSection(json);
        }
        if ( json.startsWith('<meta property=') ) {
            results = getMetaPropertySection(json);
        }
        if ( json.startsWith('<script ') ) {
            results = getScriptSection(json);
        }
        return results;
    })).filter(json => json !== null);
}