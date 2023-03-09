import React, {useState, useEffect} from 'preact/compat'
import dynamic from 'next/dynamic';
import lgThumbnail from 'lightgallery/plugins/thumbnail'
import lgZoom from 'lightgallery/plugins/zoom'
const LightGallery = dynamic(() => import('lightgallery/react'), {ssr : false});
function getImageName(src) {
  return src && (src.startsWith('http://') || 
                  src.startsWith('https://')) ? src.split('/').pop().replace('-150x150', '') : '';
}
function getFullImageUrl(src) {
  if ( !src || (!src.startsWith('http://') && !src.startsWith('https://')) ) return src;
  const reg = /\-150x150\..{3,3}$/ig;
  if ( !reg.test(src) ) return src;
  const s = src.split('/');
  const filename = s.pop();
  const ext = filename.substr(filename.length - 3);
  const fn = filename.substr(0, filename.length - 12);
  const newFn = fn + '.' + ext;
  return s.join('/').concat('/', newFn);
}
const showLightGallery = function(setShow, e) {
  e.preventDefault();
  const target = e.target;
  setShow(true);
  setTimeout(function() {        
      const colGalItem = target.closest('.col-gallery-section');
      //console.log(colGalItem);
      colGalItem.querySelector('.item-gallery')
              .click();
  }, 200);
}    
const onAfterClose = function(e) {
  document.body.style.overflow = '';
}
function HoSoGalleryItemTemplate({ data, setShow }) {  
  const name = getImageName(data);
  return (
    <div className="col-lg-4 col-md-4 col-sm-6 col-12">
        <div className="items-uploads__imgs images-changed"
              onClick={showLightGallery.bind(this, setShow)}>
            <div className="box-changes__images mb-10s">
                <img className="img-ups" src={data} alt="" />
            </div>
            <div className="bottom-uploads__imgs"><p className="names-uploads__imgs">{name}</p></div>
        </div>
    </div>
  )
}
export default function HoSoItemTemplate({ data, label, nodata_label }) {
  const [show, setShow] = useState(false);
  const [LgComponent, setLgComponent] = useState(null);
  useEffect(() => {
    const arrGalleries = data.map((src) => {
      const name = getImageName(src);
      const url = getFullImageUrl(src);
        return (
          <a className="item-gallery" key={name} href={url}>
              <img alt={name} title={name} data-src={url} loading="lazy" />
          </a>
      )
    });
    const C = <div style={{display: 'none'}}>
                    <LightGallery
                        thumbnail={false}
                        toggleThumb={false}
                        animateThumb={false}
                        allowMediaOverlap={true}
                        zoomFromOrigin={false}
                        showThumbByDefault={false}
                        selector=".item-gallery"
                        addclassName="lg-fixed-size"
                        speed={500}
                        onAfterClose={onAfterClose}
                        plugins={[lgThumbnail, lgZoom]}>
                        {arrGalleries}
                    </LightGallery>
                </div>
    setLgComponent(C);
}, [data]);
  const arrGalleryItems = data.map(src => <HoSoGalleryItemTemplate key = {src}
                                                                   data = {src}
                                                                   setShow = {setShow} />);
  return (
      <div className="groups-uploads__imgs col-gallery-section mb-35s had-images__changes">
        <p className="title-uploads__imgs mb-10s">{label}</p>
        <div className="list-uploads__imgs">
            {arrGalleryItems.length ? (
              <div className="row">
                  {arrGalleryItems}
              </div>
            ) : (
              <div className="nodata">{nodata_label}</div>
            )}
        </div>
        {show ? (
            <>
                {LgComponent}
            </>
        ) : null}
    </div>
  )
}
