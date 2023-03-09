import React from 'preact/compat'

export default function NavTemplate({ activeId, props, data }) {
  const {handleSelectTab} = props;
  return (
    <ul className="nav nav-price__forms mb-45s">
        {data.map(item => (
            <li key={item}>
                <a className={activeId.id === item.id ? 'active' : ''} 
                  href="#"
                  onClick={handleSelectTab.bind(this, item.id)}>
                    {item.name}
                </a>
            </li>           
        ))}
    </ul>
  )
}
