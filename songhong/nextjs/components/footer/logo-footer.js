import Image from 'next/image'
import Link from 'next/link'
import React from 'preact/compat'

export default function LogoFooter({ data }) {
  return (
    <div className="logo-footers mb-30s">
        <Link href="/">
            <a><Image src={data} width={147} height={78} /></a>
        </Link>
    </div>
  )
}
