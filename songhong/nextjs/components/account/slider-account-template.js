import React, {useRef} from 'preact/compat'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Link from 'next/link';
const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    fade: false,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1
};
function SliderItemTemplate({ data }) {
    const {heading, content, button_url, button_text} = data;
    return (
        <div className="swiper-slide">
            <div className="items-right__accounts fs-16s">                
                <h3 className="titles-bold__alls titles-center__alls fs-40s mb-150s">{heading}</h3>
                <div dangerouslySetInnerHTML={{ __html : content }}></div>
                <Link href={button_url}>
                    <a className="btn-blues__alls fs-15s">{button_text}</a>
                </Link>
            </div>
        </div>
    );
}
export default function SliderAccountTemplate({ data }) {
    const refSlider = useRef(null);
    const arrSliderItems = data.map(item => <SliderItemTemplate key={item}
                                                                data={item} />);
  return (
    <section className="slide-accounts__pass">
        <Slider ref={refSlider} {...settings}>
            {arrSliderItems}
        </Slider>   
        <div className="group-btns__showss">
            <div className="showss-button-prev" onClick={() => refSlider.current.slickNext()}><img src="/static/images/arrow-slide-accounts.svg" /></div>
            <div className="showss-button-next"  onClick={() => refSlider.current.slickPrev()}><img src="/static/images/arrow-slide-accounts.svg" /></div>
        </div>
    </section>
  )
}
