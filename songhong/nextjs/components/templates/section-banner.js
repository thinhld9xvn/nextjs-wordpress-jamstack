import Image from 'next/image'
import React from 'preact/compat'

export default function SectionBanner({ title, image }) {
  return (
    <section className="banner-top__alls">
        <div className="img-banner__alls">
            <Image src={image} layout="fill" objectFit="cover" />
        </div>
        <div className="container">
            <h2 className="titles-bold__alls titles-transform__alls  fs-40s">{title}</h2>
        </div>
    </section>
  )
}
