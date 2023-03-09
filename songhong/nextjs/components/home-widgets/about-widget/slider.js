import React, {useState, useEffect} from 'preact/compat'
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Modal from 'react-bootstrap/Modal';
import Image from 'next/image';
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
function TemplateSliderChildItem({data}) {
    return (
        <div className="swiper-slide">
            <div className="items-img__abouts" style={{position: 'relative'}}>
                <Image src={data} layout="fill" objectFit="cover" />
            </div>
        </div>
    )
}
function TemplateSliderItem({data, props}) {
    const {image, gallery, url} = data;
    const {setShow, setGallerySlideShow} = props;
    const handleShowGallery = (e) => {
        e.preventDefault();
        if ( url || !gallery || gallery.length === 0 ) return;        
        const arrSliderChildItems = gallery.map((item, k) => <TemplateSliderChildItem key = {item} 
                                                                                        data = {item} />);
        setGallerySlideShow(arrSliderChildItems);
        setShow(true);
    }
    return (
        <div className="swiper-slide">
            <div className="items-abouts__mains">
                <a href={url || '#'}
                    onClick={!url ? handleShowGallery : null}>
                    <Image src={image} layout="fill" objectFit="cover" />
                </a>
            </div>
        </div>
    )
}
export default function AboutSlider({ data }) {
    const [show, setShow] = useState(false);
    const [gallerySlideShow, setGallerySlideShow] = useState([]);
    const arrSliderItems = data.map((item, k) => <TemplateSliderItem key = {k} 
                                                                     data = {item}
                                                                     props = {{setShow, setGallerySlideShow}} />);
    const childSettings = {...settings, arrows: true};
  return (
    <>
        <div className="slide-about__mains">
            <Slider {...settings}>
                {arrSliderItems}
            </Slider>   
        </div>
        <Modal show={show} className="modals-abouts__mains" backdrop="true" onHide={() => setShow(false)} centered>
            <div className="slide-img__abouts">
                <Slider {...childSettings}>
                    {gallerySlideShow}
                </Slider>   
            </div>
        </Modal>
    </>
  )
}
