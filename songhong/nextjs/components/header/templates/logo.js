import React from 'preact/compat'
import Link from 'next/link';
import Image from 'next/image';
export default function Logo({ data }) {
  return (
    <div className="logo-mains">
        <Link href="/">
            <a>{data ? <Image src={data} width={92} height={49} /> : null}</a>
        </Link>
    </div>
  )
}
