import React, {useEffect, useState} from 'preact/compat'
import Link from 'next/link'
function TemplateBreadcrumbsItem({ item, is_last = false }) {
    const {text, url} = item;
    return (
        <li>
            {
                ! is_last ? (
                    <>
                        <Link href = {url}>
                            <a dangerouslySetInnerHTML={{
                                __html : text
                            }}></a>
                        </Link>
                    </>
                ) : null
            }
            {
                is_last ? (
                    <a className="active"
                           dangerouslySetInnerHTML={{
                               __html : text
                           }}></a>
                ) : null
            }
        </li>
    )
}
export default function BreadcrumbsTemplate({data, className = ''}) {
    const [breadcrumbs, setBreadcrumbs] = useState(null);
    useEffect(() => {
        if ( data ) {
            setBreadcrumbs(data.map((e, i) => {
                const is_last_item = i === data.length - 1;
                return <TemplateBreadcrumbsItem key = {e.id}
                                            item = {e}
                                            is_last = {is_last_item} />
            }));
        }
    }, [data]);    
  return (
    <ul className="breadcrumb mb-55s">
        {breadcrumbs}
    </ul>
  )
}
