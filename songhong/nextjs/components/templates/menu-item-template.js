import React, {useState} from 'preact/compat'
import Link from 'next/link'
import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function MenuItemTemplate({ data }) {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const arrSubItems = data.childrens && 
                            data.childrens.length ? data.childrens.map(sub => <MenuItemTemplate key={sub.id}
                                                                                                data = {sub} />) : 
                                                    null;
    const {id, text, url} = data;
    useEffect(() => {
        router.events.on("routeChangeComplete", function(e) {
            setShow(false);
        });
    }, []);
    const handleShow = (e) => {
        e.preventDefault();
        setShow(!show);
    }
    return (
        <>
            <li key={id}  className={show ? 'expand' : ''}>
                <Link href={url}>{text}</Link>
                {data.childrens && data.childrens.length ? (
                    <>
                        <ul>
                            {arrSubItems}
                        </ul>
                        <i onClick={handleShow}></i>
                    </>
                ) : null}
            </li>           
        </>
    );
}
