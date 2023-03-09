import React from 'preact/compat'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    fade: false,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 10000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [{
        breakpoint: 992,
        settings: {
            slidesToShow: 3,
        }
    }, {
        breakpoint: 768,
        settings: {
            slidesToShow: 3,
        }
    }, {
        breakpoint: 480,
        settings: {
            slidesToShow: 2,
        }
    }] 
};
function TemplateSliderItem({ data }) {
    return (
        <div className="swiper-slide">
            <div className="items-partner__mains">
                <Image src={data} layout="fill" objectFit="scale-down" />
            </div>
        </div>
    )
}
export default function LogoPartners({ data }) {
    const arrSliderItems = data.map(item => <TemplateSliderItem key = {item} 
                                                                data = {item} />);
  return (
    <div className="bottom-listen__mains">
        <div className="container">
            <div className="sl-partner__mains">
                <Slider {...settings}>
                    {arrSliderItems}
                </Slider>   
                
            </div>
        </div>
    </div>
  )
}
