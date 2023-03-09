import Image from 'next/image';
import React from 'preact/compat'

export default function LienLacTemplate({ data }) {
    const {gt_lienlac, phone, socials} = data;
    const {phone_label, phone_url} = phone;
    const {youtube, zalo, fanpage, tiktok} = socials;
  return (
    <div className="intros-about__mains">
        <div dangerouslySetInnerHTML={{
            __html : gt_lienlac
        }}></div>
        <div className="row">
            <div className="col-lg-6 col-md-4 col-sm-4 col-6">
                <div className="items-about__mains">
                    <Image src="/static/images/about-main-icon-2.png"  width={45} height={45} layout="fixed" />
                    <div className="intros-about__mains fs-16s">
                        <p>
                            <a href={phone_url}>{phone_label}</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-4 col-6">
                <div className="items-about__mains">
                    <Image src="/static/images/about-main-icon-3.png"  width={45} height={45} layout="fixed" />
                    <div className="intros-about__mains fs-16s">
                        <p>
                            <a href={youtube}>YouTube</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-4 col-6">
                <div className="items-about__mains">
                    <Image src="/static/images/about-main-icon-4.png"  width={45} height={45} layout="fixed" />
                    <div className="intros-about__mains fs-16s">
                        <p>
                            <a href={zalo}>Zalo 0988-123-456</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-4 col-6">
                <div className="items-about__mains">
                    <Image src="/static/images/about-main-icon-5.png"  width={45} height={45} layout="fixed" />
                    <div className="intros-about__mains fs-16s">
                        <p>
                            <a href={tiktok}>Nenkinhoanthuescr</a>
                        </p>
                    </div>
                </div>
            </div>
            <div className="col-lg-6 col-md-4 col-sm-4 col-6">
                <div className="items-about__mains">
                    <Image src="/static/images/about-main-icon-6.png"  width={45} height={45} layout="fixed" />
                    <div className="intros-about__mains fs-16s">
                        <p>
                            <a href={fanpage}>Fanpage</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

  )
}
