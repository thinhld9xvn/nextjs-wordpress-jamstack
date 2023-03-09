import Link from 'next/link';
import React, {useState} from 'preact/compat'
function ServiceSidebarTemplateItem({ data, expandDefault = false }) {
    const [show, setShow] = useState(expandDefault);
    const {id, title, data : postsList, url} = data;
    const handleShowList = (e) => {
        e.preventDefault();
        setShow(!show);
    }
    return (
        <li>
            <span className={"shows-nav__news ".concat(show ? "" : "active-nav__news")} onClick={handleShowList}>
                <i className={`fa fa-caret-${show ? "down" : "right"}`} aria-hidden="true"></i>
                <span></span>
            </span>
            <Link href={url}>{title}</Link>
            <ul className={show ? 'show' : ''}>
                {postsList.map(post => (
                    <li key={post}>
                        <Link href={post.url}>
                            <a>- {post.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </li>
    );
}
export default function CategorySidebarTemplate({ title, data }) {
  return (
    <div className="box-category__sidebars mb-30s">
        <h3 className="titles-bold__alls titles-transform__alls fs-16s mb-15s">{title}</h3>
        <ul className="list-category__sidebars">
            {data.map((item, i) => <ServiceSidebarTemplateItem key = {item} data = {item} expandDefault = {i === 0} />)}
        </ul>
    </div>
  )
}
