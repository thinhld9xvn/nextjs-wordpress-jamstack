import React, {useState, useEffect} from 'preact/compat'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';
const settings = {
    dots: true,
    arrows: false,
    infinite: false,
    fade: false,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1,
    useTransform : false,
    variableWidth: true
};
function TemplateSliderItem({ data }) {
    const [sizes, setSizes] = useState(null);
    const {avatar, subject, author, content} = data;
    useEffect(() => {
        const myImage = document.createElement('img');
        myImage.src = avatar;
        myImage.onload = function() {
            setSizes({width: this.width, height: this.height});
        }
        myImage.onerror = function() {
        }
    }, [,data]);
    return (
        <div className="swiper-slide">
            <div className="items-listen__mains">
                <p className="quocte-listen__mains titles-md__alls fs-17s mb-60s">
                    {content}
                </p>
                <div className="avatar-listen__mains">
                    {sizes ? (
                        <div className="img-listen__mains">
                            <Image src={avatar} width={sizes.width} height={sizes.height} />
                        </div>
                    ) : null}
                    <div className="intros-listen__mains fs-15s">
                        <p className="titles-bold__alls fs-15s">{author}</p>
                        <p>{subject}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default function FeedbacksSlider({ data }) {
    const arrSliderItems = data.map(item => <TemplateSliderItem key = {item} 
                                                                data = {item} />);
    return (
        <div className="slide-listen__mains">
            <div className="sl-listen__mains">
                <Slider {...settings}>
                    {arrSliderItems}
                </Slider>   
            </div>
        </div>
    );
}
