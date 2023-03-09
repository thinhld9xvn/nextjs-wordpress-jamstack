import Image from 'next/image';
import React from 'preact/compat'

export default function ViTriDiaLyTemplate({ data }) {
    if ( !data || data.length === 0 ) return <></>;
    const {tru_so, dia_chi} = data[0];
  return (
    <div className="intros-about__mains">
        <div dangerouslySetInnerHTML={{
            __html: tru_so
        }}></div>
        <div className="row">
            {dia_chi.map(item => (
                <div key = {item} className="col-lg-12">
                    <div className="items-about__mains">
                        <Image src="/static/images/about-main-icon-1.png" width={45} height={45} layout="fixed" />
                        <div className="intros-about__mains fs-16s"
                            dangerouslySetInnerHTML={{
                                __html: item.content
                            }}>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}
