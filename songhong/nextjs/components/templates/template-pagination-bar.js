import React, {useState,useRef, useEffect} from "preact/compat"
import { isDiff } from "@js_dir/utils/arrayUtils";
import Pagination from 'react-bootstrap/Pagination'
const PAG_NUM_SHOWN = 3;
const onClick_choosePage = async (n, setPaged, e) => {
    await setPaged(n);    
} 
export default function TemplatePaginationBar({ classname = '', data }) {
    const { paged, numPerPage, total, setPaged } = data; 
    const curPaged = useRef(-1);
    const curTotal = useRef(-1);
    const curNumPerPage = useRef(-1);
    const [itemsPag, setItemsPag] = useState([]);
    useEffect(() => {
        const items = [];
        if ( total && numPerPage ) {
            if ( isDiff(curPaged.current, paged) || 
                    isDiff(curTotal.current, total) || 
                        isDiff(curNumPerPage.current, numPerPage) ) {
                if ( total <= numPerPage ) {
                    items.push(<Pagination.Item key={1} 
                                                active={true}
                                                onClick={e => onClick_choosePage(1, setPaged, e)}>
                                            1
                                </Pagination.Item>);
                }
                if ( total > numPerPage ) {
                    const n = total % numPerPage,
                        k = Math.floor(total / numPerPage),
                        pageCount = n > 0 ? k + 1 : k,
                        lastBgEntryIdx = pageCount - PAG_NUM_SHOWN + 1;
                    let numberPagI = 1;    
                    if ( paged > 1 ) { 
                        items.push(<Pagination.Prev  className="prev" onClick={e => onClick_choosePage(paged - 1 > 0 ? paged - 1 : 1, setPaged, e)} />);                    
                    }
                    for (let number = 0; number < PAG_NUM_SHOWN; number++) {
                        const myPagI = paged < lastBgEntryIdx ? paged + number : number + 1;
                        if ( myPagI <= pageCount ) {
                            numberPagI = myPagI;
                            items.push(<Pagination.Item key={myPagI} 
                                                        active={myPagI === paged}
                                                        onClick={e => onClick_choosePage(myPagI, setPaged, e)}>
                                                    {myPagI}
                                        </Pagination.Item>);
                        }
                    }
                    if ( numberPagI < (pageCount - PAG_NUM_SHOWN) ) {
                        items.push(<Pagination.Ellipsis disabled />);
                    }           
                    for (let number = lastBgEntryIdx; number <= pageCount; number++) {
                        if ( number > numberPagI ) {
                            items.push(<Pagination.Item key={number}
                                active={number === paged}
                                onClick={e => onClick_choosePage(number, setPaged, e)}>
                                {number}
                            </Pagination.Item>);
                        }
                    }
                    items.push(<Pagination.Next className="next" onClick={e => onClick_choosePage(paged + 1 <= pageCount ? paged + 1 : pageCount, setPaged, e)}  />);
                }
                curPaged.current = paged;
                curTotal.current = total;
                curNumPerPage.current = numPerPage;
                setItemsPag(items);
            }
        }
    }); 
    return (
        <>
            {total ? (
                <section className={`pagenigation ${classname}`}>
                    <Pagination>
                        {itemsPag}
                    </Pagination>
                </section>
            ) : null}
        </>
    )
}
