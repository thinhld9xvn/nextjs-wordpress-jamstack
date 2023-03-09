import { getTranslation } from "./translations";

export function addBreadcrumbsContext(data, locale, translationStrings) {  
    const breadcrumbsData = [];
    const {base, id, title, data : treeListsData} = data;
    breadcrumbsData.push({
        id : "breadcrumbs_home",
        text : getTranslation(translationStrings, "home_label"),
        url : "/"
    });
    if ( base === 'pages-tree' ) {  
        if ( treeListsData && treeListsData.length ) {
            treeListsData.map((e, i) => {
                let {id, name, url} = e;
                breadcrumbsData.push({
                    id : "breadcrumbs_" + id,
                    text : name,
                    url : url || '#',
                    active : i === treeListsData.length - 1
                });  
            });  
        }
        else {
            breadcrumbsData.push({
                id : "breadcrumbs_" + id,
                text : title,
                active : true
            });  
        }
    }     
    else if ( base === 'category' ) {  
        if ( treeListsData && treeListsData.length ) {
            treeListsData.map((e, i) => {
                let {id, name, url} = e;
                breadcrumbsData.push({
                    id : "breadcrumbs_" + id,
                    text : name,
                    url,
                    active : i === treeListsData.length - 1
                });  
            });  
        }
        else {
            breadcrumbsData.push({
                id : "breadcrumbs_" + id,
                text : title,
                active : true
            });  
        }
    }     
    else {
        breadcrumbsData.push({
            id : "breadcrumbs_" + id,
            text : title,
            active : true
        });  
    }
    return breadcrumbsData;
}