import React from 'preact/compat'

export default function FooterBottom({data}) {
    const {copyright} = data;
  return (
    <div className="bottom-footers">
        <div className="container">
            <p className="fs-16s">{copyright}</p>
        </div>
    </div>
  )
}
