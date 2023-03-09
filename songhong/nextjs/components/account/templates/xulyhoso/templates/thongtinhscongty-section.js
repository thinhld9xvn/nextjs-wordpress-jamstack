import React from 'preact/compat'

export default function ThongTinHsCongTySection({ label, view_label, data, no_value, handleOpenHsCongTy }) {
  return (
    <div className="groups-accounts__form groups-form__greys mb-20s">
        <p className="label-accounts__forms mb-10s">{label}</p>
        <p className="label-accounts__forms">{data ? (
                                                    <a href="#" onClick={handleOpenHsCongTy.bind(this, data)}>{view_label}</a>
                                                  ) : no_value}</p>
    </div>
  )
}
