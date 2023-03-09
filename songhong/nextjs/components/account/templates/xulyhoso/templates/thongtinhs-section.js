import React from 'preact/compat'

export default function ThongTinHsSection({ label, data, no_value, is_link = false, link = '' }) {
  return (
    <div className="groups-accounts__form groups-form__greys mb-20s">
        <p className="label-accounts__forms mb-10s">{label}</p>
        <p className={`label-accounts__forms ${data ? 'has__data' : 'no__data'}`}>{data ? 
                                                    (is_link ? (
                                                                <a href={link}>{data}</a>
                                                               ) : (
                                                                <>{data}</>
                                                               )
                                                    ) : no_value}</p>
    </div>
  )
}
