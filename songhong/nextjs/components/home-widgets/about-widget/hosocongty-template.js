import React from 'preact/compat'

export default function HoSoCongTyTemplate({ data }) {
  return (
    <div className="intros-about__mains"
        dangerouslySetInnerHTML={{
            __html : data
        }}>
    </div>
  )
}
