import React, {useEffect, useState} from 'preact/compat'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useRouter } from 'next/router';
import Image from 'next/image';
const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    fade: false,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 10000,
    slidesToShow: 1,
    slidesToScroll: 1
};
function TemplateSliderItem({data}) {
    const {thumbnail} = data;
    return (
        <div className="swiper-slide">
            <div className="items-banner__mains">
                <a href="#">
                    <Image src={thumbnail} layout="fill" objectFit="cover" />
                </a>
            </div>
        </div>
    )
}
export default function SliderWidget({ data }) {
    const router = useRouter();
    useEffect(() => {
        const responsiveArrows = () => {
            try {
                const slideMainsElem = document.querySelector('.slide-mains');
                const arrowsElem = slideMainsElem.querySelectorAll('.slick-arrow');
                let containerWidth = document.querySelector('.container').clientWidth;
                    containerWidth = containerWidth === 0 ? document.getElementById('header').clientWidth : containerWidth;
                //console.log(containerWidth);
                const offset = (window.innerWidth - containerWidth) / 2;
                arrowsElem.forEach(arrowElem => {
                    const isArrowLeft = arrowElem.classList.contains('slick-prev');
                    if ( isArrowLeft ) {
                        arrowElem.style.left = `${offset}px`;
                    } 
                    else {
                        arrowElem.style.right = `${offset}px`;
                    }
                });
            } catch(e) {}
        }
        window.addEventListener('resize', function(e) {
            setTimeout(() => {
                try {
                    responsiveArrows();            
                } catch(e) {

                }
            }, 200);
        });
        setTimeout(() => {
            try {
                responsiveArrows();            
            } catch(e) {
                
            }
        }, 200);
    }, []);
    const arrSliderItems = data.map(item => <TemplateSliderItem key = {item.id} data = {item} />);
    return (
        <section className="slide-mains mb-100s">
            <Slider {...settings}>
                {arrSliderItems}
            </Slider>       
        </section>
    )
}
